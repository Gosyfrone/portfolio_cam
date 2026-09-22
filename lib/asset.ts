/**
 * Préfixe un chemin de `public/` par le basePath de déploiement.
 *
 * `next/image` et `next/link` le font d'eux-mêmes ; seuls les `<video>` et
 * `<img>` bruts doivent passer par ici.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (chemin: string) => `${basePath}${chemin}`;
