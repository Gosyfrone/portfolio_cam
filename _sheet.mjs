import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
const [,, dir, out] = process.argv;
const files = fs.readdirSync(dir).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
const COL = 4, CELL = 340, LABEL = 34;
const rows = Math.ceil(files.length / COL);
const composites = [];
for (let i = 0; i < files.length; i++) {
  const buf = await sharp(path.join(dir, files[i])).resize(CELL - 16, CELL - 16, { fit: 'inside' }).png().toBuffer();
  const m = await sharp(buf).metadata();
  composites.push({ input: buf, left: (i % COL) * CELL + 8, top: Math.floor(i / COL) * (CELL + LABEL) + 8 });
  const svg = Buffer.from(`<svg width="${CELL}" height="${LABEL}"><text x="4" y="20" font-family="monospace" font-size="13" fill="#000">${i}: ${files[i].slice(0,42).replace(/&/g,'&amp;')}</text></svg>`);
  composites.push({ input: svg, left: (i % COL) * CELL, top: Math.floor(i / COL) * (CELL + LABEL) + CELL });
}
await sharp({ create: { width: COL * CELL, height: rows * (CELL + LABEL), channels: 3, background: '#fff' } })
  .composite(composites).png().toFile(out);
console.log(files.map((f,i)=>`${i}: ${f}`).join('\n'));
