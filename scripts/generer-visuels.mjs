/**
 * Reconstruit lib/visuels.ts à partir de _manifest.json.
 *
 * Le manifeste donne, pour chaque visuel découpé dans la maquette Figma,
 * sa largeur (`colonne`) et sa position verticale (`ligne`) en pixels @2x.
 * On regroupe les visuels par rangée et on conserve les proportions :
 * la grille du site reproduit ainsi la mise en page d'origine.
 */
import fs from "fs";

const LARGEUR_CONTENU = 3264; // largeur utile de la maquette @2x (3840 - 2×288)
const TOLERANCE = 24; // deux visuels à moins de 24 px sont sur la même rangée

// Pastilles de section relevées sur les maquettes, indexées par `ligne`.
const PASTILLES = {
  "cma-cgm": {
    1752: { label: "Campagne Heading to safety", ton: "encre" },
    8752: { label: "Leaflet Safety Barriers", ton: "brique" },
    9784: { label: "Poster Risques Psycho-Sociaux", ton: "encre" },
    10728: { label: "Livre de recette", ton: "sauge" },
  },
  bourbon: {
    1504: { label: "Campagne Horizon", ton: "bleu" },
    5096: { label: "Campagne Safety Post", ton: "brique" },
  },
};

// Blocs de la maquette remplacés par un rendu spécifique (vidéos, etc.).
const EXCLUS = {
  "sharly-shaper": ["/images/projets/sharly-shaper/03.webp"],
};

const manifeste = JSON.parse(fs.readFileSync("_manifest.json", "utf8"));
const sortie = {};

for (const [slug, visuels] of Object.entries(manifeste)) {
  if (slug.startsWith("__")) continue;
  const rangees = [];
  for (const visuel of visuels.filter((v) => !EXCLUS[slug]?.includes(v.src))) {
    const derniere = rangees.at(-1);
    if (derniere && Math.abs(derniere.ligne - visuel.ligne) <= TOLERANCE) {
      derniere.visuels.push(visuel);
    } else {
      rangees.push({ ligne: visuel.ligne, visuels: [visuel] });
    }
  }

  sortie[slug] = rangees.map((rangee) => {
    const largeurs = rangee.visuels.map((v) => v.colonne);
    const totale = largeurs.reduce((a, b) => a + b, 0);
    const pastille = PASTILLES[slug]?.[rangee.ligne];
    return {
      ...(pastille ?? {}),
      ...(rangee.visuels.some((v) => v.texte) ? { texte: true } : {}),
      // Part de la largeur utile occupée par la rangée (les rangées partielles
      // du Figma restent partielles ; au-delà de 95 %, c'est une rangée pleine
      // largeur aux arrondis de découpe près).
      largeur:
        totale / LARGEUR_CONTENU >= 0.95
          ? 1
          : Math.round((totale / LARGEUR_CONTENU) * 1000) / 1000,
      visuels: rangee.visuels.map((v) => ({
        src: v.src,
        ratio: v.ratio,
        part: Math.round((v.colonne / totale) * 1000) / 1000,
      })),
    };
  });
}

const entete = `// ⚠️ Fichier généré par scripts/generer-visuels.mjs à partir de _manifest.json.
// Ne pas éditer à la main : relancer \`node scripts/generer-visuels.mjs\`.

export type Visuel = {
  src: string;
  /** Largeur / hauteur du visuel. */
  ratio: number;
  /** Part de la largeur de la rangée occupée par ce visuel. */
  part: number;
};

export type Rangee = {
  /** Pastille de section affichée au-dessus de la rangée, si le Figma en a une. */
  label?: string;
  ton?: "encre" | "bleu" | "brique" | "sauge";
  /** Le visuel partage sa rangée avec le texte « blocTexte » du projet. */
  texte?: boolean;
  /** Part de la largeur utile occupée par la rangée (1 = pleine largeur). */
  largeur: number;
  visuels: Visuel[];
};

export const visuelsParProjet: Record<string, Rangee[]> = `;

fs.writeFileSync("lib/visuels.ts", entete + JSON.stringify(sortie, null, 2) + ";\n");
console.log(
  Object.entries(sortie)
    .map(([k, v]) => `${k}: ${v.length} rangées`)
    .join("\n"),
);
