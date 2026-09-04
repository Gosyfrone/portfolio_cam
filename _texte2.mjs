import sharp from 'sharp';
const OUT = process.argv[2];
const ECRAN = {
  'cma-cgm': 'CMA CGM', bourbon: 'BOURBON', 'sharly-shaper': 'SHARLY SHAPER',
  borealis: 'BOREALIS', asics: 'ASCIS', merea: 'merea', 'parc-spirou': 'SPIROU',
  carmat: 'CARMAT', rosajou: 'ROSAJOU', peeka: 'PEEKA', 'espace-bocaud-jacou': 'BOCAUD',
};
const cases = [];
for (const [slug, ecran] of Object.entries(ECRAN)) {
  const src = `design/screens/${ecran}.png`;
  const texte = await sharp(src).extract({ left: 260, top: 480, width: 1960, height: 900 }).resize(1300).jpeg({ quality: 82 }).toBuffer();
  const role = await sharp(src).extract({ left: 2820, top: 780, width: 900, height: 460 }).resize(700).jpeg({ quality: 82 }).toBuffer();
  cases.push({ slug, texte, role });
}
// une seule planche : chaque projet = bande texte + bande rôle
let y = 0; const comp = []; const W = 2020;
for (const c of cases) {
  const mt = await sharp(c.texte).metadata(); const mr = await sharp(c.role).metadata();
  const svg = Buffer.from(`<svg width="${W}" height="30"><text x="6" y="22" font-family="monospace" font-size="22" fill="#c00">${c.slug}</text></svg>`);
  comp.push({ input: svg, left: 0, top: y }); y += 32;
  comp.push({ input: c.texte, left: 0, top: y });
  comp.push({ input: c.role, left: 1310, top: y });
  y += Math.max(mt.height, mr.height) + 14;
}
await sharp({ create: { width: W, height: y, channels: 3, background: '#ffffff' } })
  .composite(comp).jpeg({ quality: 82 }).toFile(`${OUT}/entetes.jpg`);
console.log('ok', y);
