import sharp from 'sharp';
const [,, src, out, top, height, width] = process.argv;
const img = sharp(src);
const meta = await img.metadata();
const t = parseInt(top), h = Math.min(parseInt(height), meta.height - t);
const w = width ? parseInt(width) : meta.width;
await sharp(src).extract({ left: 0, top: t, width: w, height: h }).resize({ width: 1400, withoutEnlargement: true }).png().toFile(out);
console.log(`src ${meta.width}x${meta.height} -> crop top=${t} h=${h}`);
