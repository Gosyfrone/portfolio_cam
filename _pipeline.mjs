import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const BG = [255, 250, 244];
const SCALE = 8;
const SCREENS = 'design/screens';
const RES = 'design/RESSOURCES';

/** Découpe une maquette en blocs image (bandes horizontales × colonnes). */
async function blocs(src, { minW = 400, minH = 300 } = {}) {
  const meta = await sharp(src).metadata();
  const w = Math.round(meta.width / SCALE);
  const h = Math.round(meta.height / SCALE);
  const { data } = await sharp(src).resize(w, h, { kernel: 'nearest' }).removeAlpha()
    .raw().toBuffer({ resolveWithObject: true });

  const plein = (x, y) => {
    const i = (y * w + x) * 3;
    return Math.abs(data[i] - BG[0]) + Math.abs(data[i + 1] - BG[1]) + Math.abs(data[i + 2] - BG[2]) > 14;
  };

  const bandes = [];
  let d = -1;
  for (let y = 0; y <= h; y++) {
    let occupe = false;
    if (y < h) for (let x = 0; x < w && !occupe; x++) occupe = plein(x, y);
    if (occupe) { if (d < 0) d = y; }
    else if (d >= 0) { bandes.push([d, y - 1]); d = -1; }
  }

  const out = [];
  for (const [y0, y1] of bandes) {
    const cols = [];
    let c = -1;
    for (let x = 0; x <= w; x++) {
      let occupe = false;
      if (x < w) for (let y = y0; y <= y1 && !occupe; y++) occupe = plein(x, y);
      if (occupe) { if (c < 0) c = x; }
      else if (c >= 0) { cols.push([c, x - 1]); c = -1; }
    }
    for (const [x0, x1] of cols) {
      let ty = y1, by = y0, lx = x1, rx = x0;
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        if (plein(x, y)) { if (y < ty) ty = y; if (y > by) by = y; if (x < lx) lx = x; if (x > rx) rx = x; }
      }
      const box = {
        left: lx * SCALE, top: ty * SCALE,
        width: Math.min((rx - lx + 1) * SCALE, meta.width - lx * SCALE),
        height: Math.min((by - ty + 1) * SCALE, meta.height - ty * SCALE),
      };
      if (box.width < minW || box.height < minH) continue;
      if (box.width >= meta.width - 8) continue; // bandeau pleine largeur (footer)

      // Un visuel remplit ses lignes de bord à bord ; un paragraphe non.
      const largeur = rx - lx + 1;
      let pleines = 0;
      for (let y = ty; y <= by; y++) {
        let n = 0;
        for (let x = lx; x <= rx; x++) if (plein(x, y)) n++;
        if (n / largeur >= 0.85) pleines++;
      }
      if (pleines / (by - ty + 1) < 0.7) continue; // bloc de texte
      out.push(box);
    }
  }
  return out;
}

/** Signature perceptuelle 12×12 pour rapprocher un bloc d'un fichier source. */
async function signature(input) {
  const { data } = await sharp(input).resize(12, 12, { fit: 'fill' }).removeAlpha()
    .raw().toBuffer({ resolveWithObject: true });
  return data;
}

function distance(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]);
  return s / a.length;
}

export { blocs, signature, distance, SCREENS, RES };
