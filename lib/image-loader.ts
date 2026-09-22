import type { ImageLoaderProps } from "next/image";

import { basePath } from "./asset";

/**
 * Pas de serveur d'optimisation sur GitHub Pages : on sert le fichier de
 * `public/` tel quel (les visuels sont déjà en webp, redimensionnés en amont).
 *
 * Ce loader existe surtout pour le basePath : `next/image` ne l'applique pas
 * aux chemins passés en chaîne de caractères, contrairement à `next/link`.
 */
export default function imageLoader({ src }: ImageLoaderProps) {
  return src.startsWith("/") ? `${basePath}${src}` : src;
}
