// Boîte englobante précise d'un bloc clair dans une zone approximative de maquette.
import sharp from 'sharp';
const [,, src, x0, y0, x1, y1] = process.argv.map((v, i) => i > 2 ? +v : v);
const W = x1 - x0, H = y1 - y0;
const { data } = await sharp(src, { limitInputPixels: false }).extract({ left: x0, top: y0, width: W, height: H })
  .removeAlpha().raw().toBuffer({ resolveWithObject: true });
const on = (x, y) => { const i = (y * W + x) * 3; return Math.abs(data[i] - 255) + Math.abs(data[i + 1] - 250) + Math.abs(data[i + 2] - 244) > 6; };
const plusLongue = (n, occ) => { let best = [0, -1], d = -1; for (let k = 0; k <= n; k++) { if (k < n && occ(k)) { if (d < 0) d = k; } else if (d >= 0) { if (k - d > best[1] - best[0]) best = [d, k]; d = -1; } } return best; };
const cols = plusLongue(W, (x) => { let n = 0; for (let y = 0; y < H; y += 2) n += on(x, y); return n > H / 2 * 0.3; });
const rows = plusLongue(H, (y) => { let n = 0; for (let x = cols[0]; x < cols[1]; x += 2) n += on(x, y); return n > (cols[1] - cols[0]) / 2 * 0.3; });
console.log(JSON.stringify({ left: x0 + cols[0], top: y0 + rows[0], width: cols[1] - cols[0], height: rows[1] - rows[0] }));
