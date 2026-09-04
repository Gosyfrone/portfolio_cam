import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const BG = [255, 250, 244];
const SCALE = 8; // analyse à 1/8

const [, , src, outDir, minWArg, minHArg] = process.argv;
const minW = parseInt(minWArg ?? '400');
const minH = parseInt(minHArg ?? '300');

const meta = await sharp(src).metadata();
const w = Math.round(meta.width / SCALE);
const h = Math.round(meta.height / SCALE);
const { data } = await sharp(src).resize(w, h, { kernel: 'nearest' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });

const isContent = (x, y) => {
  const i = (y * w + x) * 3;
  return Math.abs(data[i] - BG[0]) + Math.abs(data[i + 1] - BG[1]) + Math.abs(data[i + 2] - BG[2]) > 14;
};

// bandes horizontales
const rowHas = [];
for (let y = 0; y < h; y++) {
  let n = 0;
  for (let x = 0; x < w; x++) if (isContent(x, y)) n++;
  rowHas.push(n > 0);
}

const bands = [];
let start = -1;
for (let y = 0; y <= h; y++) {
  if (y < h && rowHas[y]) { if (start < 0) start = y; }
  else if (start >= 0) { bands.push([start, y - 1]); start = -1; }
}

fs.mkdirSync(outDir, { recursive: true });
const found = [];

for (const [y0, y1] of bands) {
  // colonnes dans la bande
  const colHas = [];
  for (let x = 0; x < w; x++) {
    let n = 0;
    for (let y = y0; y <= y1; y++) if (isContent(x, y)) n++;
    colHas.push(n > 0);
  }
  const cols = [];
  let cs = -1;
  for (let x = 0; x <= w; x++) {
    if (x < w && colHas[x]) { if (cs < 0) cs = x; }
    else if (cs >= 0) { cols.push([cs, x - 1]); cs = -1; }
  }

  for (const [x0, x1] of cols) {
    // bbox serrée
    let ty = y1, by = y0, lx = x1, rx = x0;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      if (isContent(x, y)) { if (y < ty) ty = y; if (y > by) by = y; if (x < lx) lx = x; if (x > rx) rx = x; }
    }
    const box = {
      left: lx * SCALE, top: ty * SCALE,
      width: (rx - lx + 1) * SCALE, height: (by - ty + 1) * SCALE,
    };
    box.width = Math.min(box.width, meta.width - box.left);
    box.height = Math.min(box.height, meta.height - box.top);
    if (box.width < minW || box.height < minH) continue;
    if (box.width >= meta.width - 8) continue; // bandeau pleine largeur (footer)
    // densité : un bloc de texte est majoritairement vide, une image est pleine
    let fill = 0, total = 0;
    for (let y = ty; y <= by; y++) for (let x = lx; x <= rx; x++) { total++; if (isContent(x, y)) fill++; }
    if (fill / total < 0.6) continue;
    found.push(box);
  }
}

const base = path.basename(src, path.extname(src)).toLowerCase().replace(/[^a-z0-9]+/g, '-');
let i = 0;
for (const box of found) {
  const out = path.join(outDir, `${base}-${String(++i).padStart(2, '0')}.png`);
  await sharp(src).extract(box).png().toFile(out);
  console.log(`${path.basename(out)}  ${box.width}x${box.height} @ ${box.left},${box.top}`);
}
console.log(`→ ${found.length} blocs`);
