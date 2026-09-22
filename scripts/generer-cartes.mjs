/**
 * Régénère les vignettes de la page Réalisations depuis design/screens/Realisations.png.
 *
 * Les logos de marque sont incrustés dans la maquette : c'est elle qui fixe
 * leur position sur la carte. À relancer après chaque mise à jour de l'écran.
 * L'ordre des blocs (haut → bas, gauche → droite) suit `projets` dans lib/data.ts.
 */
import fs from "fs";
import path from "path";

import sharp from "sharp";

import { blocs, SCREENS } from "../_pipeline.mjs";

const SRC = path.join(SCREENS, "Realisations.png");
const DEST = "public/images/cartes";

const boxes = await blocs(SRC);
fs.mkdirSync(DEST, { recursive: true });

let n = 0;
for (const box of boxes) {
  const nom = `${String(++n).padStart(2, "0")}.webp`;
  await sharp(SRC)
    .extract(box)
    .resize({ width: 1400 })
    .webp({ quality: 82 })
    .toFile(path.join(DEST, nom));
  console.log(`${nom}  top=${box.top} ${box.width}×${box.height}`);
}
console.log(`\n${n} cartes régénérées dans ${DEST}`);
