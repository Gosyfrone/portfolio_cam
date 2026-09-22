import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { blocs, signature, distance, SCREENS, RES } from './_pipeline.mjs';

/** Écran source → slug de projet. */
const PROJETS = [
  ['CMA CGM', 'CMA CGM', 'cma-cgm'],
  ['BOURBON', 'BOURBON', 'bourbon'],
  ['SHARLY SHAPER', 'SHARLY SHAPER', 'sharly-shaper'],
  ['BOREALIS', 'BOREALIS', 'borealis'],
  ['ASCIS', 'ASICS', 'asics'],
  ['merea', 'MEREA', 'merea'],
  ['SPIROU', 'PARC SPIROU', 'parc-spirou'],
  ['CARMAT', 'CARMAT', 'carmat'],
  ['ROSAJOU', 'ROSAJOU', 'rosajou'],
  ['PEEKA', 'PEEKA', 'peeka'],
  ['BOCAUD', 'ESPACE BOCAUD  JACOU', 'espace-bocaud-jacou'],
];

/**
 * Blocs que le découpage automatique ne sait pas isoler (fond proche du
 * crème, bloc accolé à un paragraphe) : relevés à la main sur la maquette @2x.
 * `texte` : le paragraphe voisin est rendu en HTML à côté du visuel.
 */
const MANUELS = {
  'sharly-shaper': [
    { left: 280, top: 1329, width: 3280, height: 1380 },
    { left: 280, top: 2756, width: 1568, height: 1068, texte: true },
  ],
  peeka: [{ left: 288, top: 1355, width: 3272, height: 1839 }],
  // Blocs sur fond blanc, trop proches du crème pour le seuil automatique
  // (boîtes précisées avec _box.mjs).
  'cma-cgm': [
    { left: 1763, top: 1752, width: 1762, height: 1168 },
    { left: 318, top: 4064, width: 1400, height: 1010 },
  ],
  rosajou: [
    { left: 273, top: 2776, width: 938, height: 1331 },
    { left: 277, top: 6912, width: 1622, height: 1081 },
  ],
  carmat: [{ left: 286, top: 6860, width: 3268, height: 1586 }],
};

/** Un bloc uni (zone grise laissée vide dans le Figma) n'est pas un visuel. */
async function estVide(buffer) {
  const { channels } = await sharp(buffer).stats();
  return channels.slice(0, 3).every((c) => c.stdev < 3);
}

const DEST = 'public/images/projets';
const manifest = {};

/** Fichiers d'un dossier RESSOURCES, récursif, images seulement. */
function ressources(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...ressources(p));
    else if (/\.(png|jpe?g)$/i.test(e.name)) out.push(p);
  }
  return out;
}

for (const [ecran, dossier, slug] of PROJETS) {
  if (!slug) continue;
  const src = path.join(SCREENS, `${ecran}.png`);
  if (!fs.existsSync(src)) { console.log(`⚠ pas de maquette pour ${slug}`); continue; }

  const boxes = [...(MANUELS[slug] ?? []), ...(await blocs(src))]
    .sort((a, b) => a.top - b.top || a.left - b.left);
  const fichiers = dossier ? ressources(path.join(RES, dossier)) : [];
  const sigsRes = await Promise.all(fichiers.map(signature));

  const dir = path.join(DEST, slug);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  // 1er passage : découpe des blocs et meilleur candidat HD de chacun.
  const blocsProjet = [];
  for (const box of boxes) {
    const { texte, ...zone } = box;
    const crop = await sharp(src).extract(zone).png().toBuffer();
    if (await estVide(crop)) continue;

    // Un visuel haute définition existe-t-il dans RESSOURCES ?
    let candidat = null;
    if (fichiers.length) {
      const sig = await signature(crop);
      let best = Infinity, bestIdx = -1;
      for (let k = 0; k < sigsRes.length; k++) {
        const d = distance(sig, sigsRes[k]);
        if (d < best) { best = d; bestIdx = k; }
      }
      if (best < 18) {
        // Le visuel HD ne remplace le recadrage que s'il a le même cadrage :
        // sinon object-cover recadrerait le mockup autrement que dans la maquette.
        const m = await sharp(fichiers[bestIdx]).metadata();
        const ecart = Math.abs(m.width / m.height - box.width / box.height) / (box.width / box.height);
        if (ecart < 0.12) candidat = { fichier: fichiers[bestIdx], score: best };
      }
    }
    blocsProjet.push({ box, texte, crop, candidat });
  }

  // Un fichier HD ne sert qu'une fois : en cas de doublon, le bloc le plus
  // ressemblant le garde, les autres restent en découpe de maquette.
  const meilleurs = {};
  for (const b of blocsProjet) {
    if (!b.candidat) continue;
    const f = b.candidat.fichier;
    if (!meilleurs[f] || b.candidat.score < meilleurs[f].candidat.score) meilleurs[f] = b;
  }

  const items = [];
  let i = 0;
  for (const b of blocsProjet) {
    const { box, texte, crop } = b;
    const origine = b.candidat && meilleurs[b.candidat.fichier] === b ? b.candidat : null;
    const nom = `${String(++i).padStart(2, '0')}.webp`;

    const entree = await sharp(origine ? origine.fichier : crop)
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: 82 }).toBuffer();
    fs.writeFileSync(path.join(dir, nom), entree);

    const dim = await sharp(entree).metadata();
    items.push({
      src: `/images/projets/${slug}/${nom}`,
      // La largeur du bloc dans la maquette pilote la répartition en ligne.
      colonne: box.width, ligne: box.top,
      ratio: +(box.width / box.height).toFixed(4),
      origine: origine ? path.basename(origine.fichier) : 'maquette',
      ...(texte ? { texte: true } : {}),
    });
  }
  manifest[slug] = items;
  console.log(`${slug}: ${items.length} visuels (${items.filter(v => v.origine !== 'maquette').length} en HD)`);
}

// Vignettes de la page Réalisations
const cartes = await blocs(path.join(SCREENS, 'Realisations.png'));
fs.mkdirSync('public/images/cartes', { recursive: true });
manifest.__cartes = [];
let n = 0;
for (const box of cartes) {
  const nom = `${String(++n).padStart(2, '0')}.webp`;
  await sharp(path.join(SCREENS, 'Realisations.png')).extract(box)
    .resize({ width: 1400 }).webp({ quality: 82 })
    .toFile(path.join('public/images/cartes', nom));
  manifest.__cartes.push(`/images/cartes/${nom}`);
}
console.log(`cartes: ${n}`);

fs.writeFileSync('_manifest.json', JSON.stringify(manifest, null, 2));
