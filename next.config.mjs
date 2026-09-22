/**
 * Le site est publié sur GitHub Pages en export statique.
 * Sur un dépôt de projet, l'URL est préfixée par le nom du dépôt
 * (https://<compte>.github.io/portfolio_cam) : la CI passe ce préfixe via
 * NEXT_PUBLIC_BASE_PATH, alors qu'en local la variable est vide.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  // Pages sert /projets/solem/ : sans slash final, le fichier HTML est introuvable.
  trailingSlash: true,
  // Pas de serveur d'optimisation sur Pages, et `next/image` n'applique pas le
  // basePath aux chemins en chaîne : le loader personnalisé s'en charge.
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
};

export default nextConfig;
