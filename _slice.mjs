import sharp from 'sharp';
const [,, src, outPrefix, sliceH = 2000] = process.argv;
const m = await sharp(src).metadata();
const h = parseInt(sliceH);
let i = 0;
for (let top = 0; top < m.height; top += h, i++) {
  const height = Math.min(h, m.height - top);
  await sharp(src).extract({ left: 0, top, width: m.width, height })
    .resize({ width: 1500, withoutEnlargement: true }).png()
    .toFile(`${outPrefix}_${String(i).padStart(2,'0')}.png`);
}
console.log(`${src}: ${m.width}x${m.height} -> ${i} slices`);
