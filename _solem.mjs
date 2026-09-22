/**
 * Visuels de la page SOLEM : bloc webdesign et bandeau « Vidéos » découpés
 * dans la maquette (compositions Figma sans source), le reste repris en HD
 * depuis RESSOURCES.
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC = 'design/screens/SOLEM.png';
const RES = 'design/RESSOURCES/SOLEM';
const DEST = 'public/images/projets/solem';
fs.rmSync(DEST, { recursive: true, force: true });
fs.mkdirSync(DEST, { recursive: true });

const decoupes = {
  webdesign: { left: 296, top: 9519, width: 3208, height: 2392 },
  'bandeau-videos': { left: 0, top: 12100, width: 3840, height: 1172 },
};
for (const [nom, zone] of Object.entries(decoupes)) {
  await sharp(SRC, { limitInputPixels: false }).extract(zone)
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 80 }).toFile(path.join(DEST, `${nom}.webp`));
}

const hd = {
  'bandeau-operation': 'maillot-riversa.jpg',
  'bandeau-distributeurs': 'com-distrib.JPG',
  'catalogue-europe': 'europe.jpg',
  'operation-01': 'Cartes5.jpg',
  'operation-02': 'MAILLOT-SOLEM-FR.png',
  'operation-03': 'MAILLOT-SOLEM-ES.png',
  'operation-04': 'MAILLOT-SOLEM-PT.png',
  'operation-05': 'MAILLOT-SOLEM-MA.png',
  'operation-06': 'MAILLOT-SOLEM-TU.png',
  'operation-07': 'MAILLOT-SOLEM-KSA.png',
  'operation-08': 'MAILLOT-SOLEM-USA.png',
  'operation-09': 'Cartes7.jpg',
  'plv-01': 'Capture d’écran 2026-09-03 à 22.07.35.png',
  'plv-02': 'Capture d’écran 2026-09-03 à 21.18.36.png',
  'plv-03': 'Capture d’écran 2026-09-03 à 21.18.11.png',
  'plv-04': 'Capture d’écran 2026-09-03 à 21.18.58.png',
  'plv-05': 'Capture d’écran 2026-09-03 à 21.18.21.png',
  'plv-06': 'Capture d’écran 2026-09-03 à 21.18.29.png',
  'plv-07': 'presntoirs-carton.jpg',
  'plv-08': 'Capture d’écran 2026-09-03 à 21.20.22.png',
  'plv-09': 'Capture d’écran 2026-09-03 à 21.17.48.png',
  'plv-10': 'Capture d’écran 2026-09-03 à 22.09.51.png',
};
for (const [nom, fichier] of Object.entries(hd)) {
  const out = path.join(DEST, `${nom}.webp`);
  await sharp(path.join(RES, fichier)).resize({ width: nom.startsWith('bandeau') ? 2400 : 1800, withoutEnlargement: true })
    .webp({ quality: 82 }).toFile(out);
  const m = await sharp(out).metadata();
  console.log(nom, m.width, m.height, (m.width / m.height).toFixed(3));
}
