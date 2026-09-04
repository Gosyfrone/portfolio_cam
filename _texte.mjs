import sharp from 'sharp';
import fs from 'fs';
const OUT = process.argv[2];
const man = JSON.parse(fs.readFileSync('_manifest.json', 'utf8'));
const ECRAN = {
  'cma-cgm': 'CMA CGM', bourbon: 'BOURBON', 'sharly-shaper': 'SHARLY SHAPER',
  borealis: 'BOREALIS', asics: 'ASCIS', merea: 'merea', 'parc-spirou': 'SPIROU',
  carmat: 'CARMAT', rosajou: 'ROSAJOU', peeka: 'PEEKA', 'espace-bocaud-jacou': 'BOCAUD',
};
for (const [slug, ecran] of Object.entries(ECRAN)) {
  const src = `design/screens/${ecran}.png`;
  const meta = await sharp(src).metadata();
  const parts = [];
  // En-tête : titre + description + rôle
  parts.push(await sharp(src).extract({ left: 0, top: 200, width: meta.width, height: 1000 })
    .resize(1200).jpeg({ quality: 78 }).toBuffer());
  // Bandes au-dessus de chaque rangée : pastilles de section éventuelles
  const lignes = [...new Set(man[slug].map(i => i.ligne))].sort((a, b) => a - b);
  for (const l of lignes) {
    const top = Math.max(0, l - 150);
    parts.push(await sharp(src).extract({ left: 200, top, width: 2600, height: Math.min(140, meta.height - top) })
      .resize(1200).jpeg({ quality: 78 }).toBuffer());
  }
  const metas = await Promise.all(parts.map(p => sharp(p).metadata()));
  const H = metas.reduce((s, m) => s + m.height + 6, 0);
  let y = 0;
  const composite = parts.map((input, i) => { const t = y; y += metas[i].height + 6; return { input, left: 0, top: t }; });
  await sharp({ create: { width: 1200, height: H, channels: 3, background: '#ff00ff' } })
    .composite(composite).jpeg({ quality: 78 }).toFile(`${OUT}/txt_${slug}.jpg`);
  console.log(slug, 'ok', H);
}
