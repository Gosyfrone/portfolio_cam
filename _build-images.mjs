import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { blocs, signature, distance, SCREENS, RES } from './_pipeline.mjs';

/** Écran source → slug de projet. */
const PROJETS = [
  ['SOLEM', null, null],
  ['CMA CGM', 'CMA CGM', 'cma-cgm'],
  ['BOURBON', 'BOURBON', 'bourbon'],
  ['SHARLY SHAPER', 'SHARLY SHAPER', 'sharly-shaper'],
  ['BOREALIS', 'BOREALIS', 'borealis'],
  ['ASCIS', null, 'asics'],
  ['merea', null, 'merea'],
  ['SPIROU', null, 'parc-spirou'],
  ['CARMAT', null, 'carmat'],
  ['ROSAJOU', null, 'rosajou'],
  ['DOMAINE', null, null],
  ['PEEKA', null, 'peeka'],
  ['BOCAUD', null, 'espace-bocaud-jacou'],
];

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

  const boxes = await blocs(src);
  const fichiers = dossier ? ressources(path.join(RES, dossier)) : [];
  const sigsRes = await Promise.all(fichiers.map(signature));

  const dir = path.join(DEST, slug);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const items = [];
  let i = 0;
  for (const box of boxes) {
    const nom = `${String(++i).padStart(2, '0')}.webp`;
    const crop = await sharp(src).extract(box).png().toBuffer();

    // Un visuel haute définition existe-t-il dans RESSOURCES ?
    let origine = null;
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
        if (ecart < 0.12) origine = { fichier: fichiers[bestIdx], score: Math.round(best) };
      }
    }

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
