import sharp from 'sharp';
import fs from 'fs';
const OUT = process.argv[2];
const man = JSON.parse(fs.readFileSync('_manifest.json', 'utf8'));
const ECRAN = {
  'cma-cgm': 'CMA CGM', bourbon: 'BOURBON', 'sharly-shaper': 'SHARLY SHAPER',
  borealis: 'BOREALIS', asics: 'ASCIS', merea: 'merea', 'parc-spirou': 'SPIROU',
  carmat: 'CARMAT', rosajou: 'ROSAJOU', peeka: 'PEEKA', 'espace-bocaud-jacou': 'BOCAUD',
};
const comp = []; let y = 0; const W = 1300;
for (const [slug, ecran] of Object.entries(ECRAN)) {
  const src = `design/screens/${ecran}.png`;
  const meta = await sharp(src).metadata();
  const lignes = [...new Set(man[slug].map(i => i.ligne))].sort((a, b) => a - b);
  for (const l of lignes) {
    const top = Math.max(0, l - 130);
    const bande = await sharp(src).extract({ left: 250, top, width: 1250, height: 120 }).jpeg({ quality: 85 }).toBuffer();
    const svg = Buffer.from(`<svg width="${W}" height="26"><text x="4" y="20" font-family="monospace" font-size="18" fill="#c00">${slug} @${l}</text></svg>`);
    comp.push({ input: svg, left: 0, top: y }); y += 26;
    comp.push({ input: bande, left: 0, top: y }); y += 124;
  }
}
await sharp({ create: { width: W, height: y, channels: 3, background: '#ffffff' } })
  .composite(comp).jpeg({ quality: 85 }).toFile(`${OUT}/pastilles.jpg`);
const m = await sharp(`${OUT}/pastilles.jpg`).metadata();
const H = 1450, n = Math.ceil(m.height / H);
for (let i = 0; i < n; i++) {
  await sharp(`${OUT}/pastilles.jpg`).extract({ left: 0, top: i * H, width: W, height: Math.min(H, m.height - i * H) }).jpeg({ quality: 85 }).toFile(`${OUT}/past_${i}.jpg`);
}
console.log('slices', n, m.height);
