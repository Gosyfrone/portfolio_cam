export type Projet = {
  slug: string;
  nom: string;
  tags: string[];
  image: string | null;
  /** false : pas encore de page projet (lien désactivé). */
  aPage?: boolean;
};

export type Evenement = {
  nom: string;
  ville: string;
  stand: string;
  editions: string;
  image: string | null;
};

export const services = [
  "Branding",
  "Identité visuelle",
  "Design graphique",
  "Social Media",
  "Montage",
  "Print",
  "Digital",
  "Motion design",
  "Gestion de projet",
];

export const servicesEvenementiel = [
  "Direction artistique",
  "Création graphique",
  "Production audiovisuelle",
  "Motion design",
  "Gestion de prestataires",
  "Coordination standistes",
  "Gestion logistique",
  "Création de contenus",
  "Communication",
];

/** Ordre de la page Réalisations. */
export const projets: Projet[] = [
  {
    slug: "solem",
    nom: "SOLEM",
    tags: ["Direction artistique", "Identité visuelle", "Événementiel"],
    image: "/images/cartes/01.webp",
  },
  {
    slug: "cma-cgm",
    nom: "CMA CGM",
    tags: ["Identité visuelle", "Print", "Digital"],
    image: "/images/cartes/02.webp",
  },
  {
    slug: "bourbon",
    nom: "BOURBON",
    tags: ["Identité visuelle", "Print", "Digital"],
    image: "/images/cartes/03.webp",
  },
  {
    slug: "sharly-shaper",
    nom: "SHARLY SHAPER",
    tags: ["Community", "Identité visuelle"],
    image: "/images/cartes/04.webp",
  },
  {
    slug: "borealis",
    nom: "BOREALIS",
    tags: ["Direction artistique", "Identité visuelle", "Print"],
    image: "/images/cartes/05.webp",
  },
  {
    slug: "asics",
    nom: "ASICS",
    tags: ["Direction artistique", "Identité visuelle", "Print"],
    image: "/images/cartes/06.webp",
  },
  {
    slug: "merea",
    nom: "MEREA",
    tags: ["Direction artistique", "Identité visuelle"],
    image: "/images/cartes/07.webp",
  },
  {
    slug: "parc-spirou",
    nom: "PARC SPIROU",
    tags: ["Identité visuelle", "Print", "Digital"],
    image: "/images/cartes/08.webp",
  },
  {
    slug: "carmat",
    nom: "CARMAT",
    tags: ["Identité visuelle", "Print", "Digital"],
    image: "/images/cartes/09.webp",
  },
  {
    slug: "rosajou",
    nom: "ROSAJOU",
    tags: ["Direction artistique", "Identité visuelle", "Print"],
    image: "/images/cartes/10.webp",
  },
  {
    slug: "domaine-de-la-gineste",
    nom: "DOMAINE DE LA GINESTE",
    tags: ["Vidéos", "Photos", "Print"],
    image: "/images/cartes/11.webp",
    // Vignette fournie, mais ni maquette ni texte pour la page projet.
    aPage: false,
  },
  {
    slug: "peeka",
    nom: "PEEKA",
    tags: ["Identité visuelle", "Direction artistique"],
    image: "/images/cartes/12.webp",
  },
  {
    slug: "espace-bocaud-jacou",
    nom: "ESPACE BOCAUD JACOU",
    tags: ["Identité visuelle", "Design graphique", "Print"],
    image: "/images/cartes/13.webp",
  },
];

/**
 * Projets du rail « Sélection de projets » de la home.
 * La home ne montre pas tout le catalogue : la maquette y remplace
 * Espace Bocaud Jacou par le Domaine de la Gineste.
 */
export const selectionHome = projets
  .filter((projet) => projet.slug !== "espace-bocaud-jacou")
  .map((projet) => projet.slug);

export const salonsFrancais: Evenement[] = [
  {
    nom: "PAYSALIA",
    ville: "LYON",
    stand: "Stand 24 m2",
    editions: "Édition 2026",
    image: "/images/evenements/paysalia-lyon.png",
  },
  {
    nom: "SIVAL",
    ville: "ANGERS",
    stand: "Stand 18 m²",
    editions: "Édition 2025 | 2026 | 2027",
    image: "/images/evenements/sival-angers.png",
  },
  {
    nom: "SALON DES MAIRES",
    ville: "PARIS",
    stand: "",
    editions: "Édition 2025 | 2026",
    image: "/images/evenements/salon-des-maires-paris.png",
  },
];

export const salonsInternationaux: Evenement[] = [
  {
    nom: "TECHNOGREEN",
    ville: "ÉGYPTE",
    stand: "Stand distributeur",
    editions: "Édition 2026",
    image: "/images/evenements/technogreen-egypte.png",
  },
  {
    nom: "EIMA",
    ville: "ITALIE",
    stand: "Stand 32 m2",
    editions: "Édition 2026",
    image: "/images/evenements/eima-italie.png",
  },
  {
    nom: "SIAM",
    ville: "MAROC",
    stand: "Stand distributeur",
    editions: "Édition 2025 | 2026",
    image: "/images/evenements/siam-maroc.png",
  },
  {
    nom: "FIMA",
    ville: "ESPAGNE",
    stand: "Stand 20 m²",
    editions: "Édition 2025",
    image: "/images/evenements/fima-espagne.png",
  },
  {
    nom: "SMART CITIES",
    ville: "ARABIE SAOUDITE",
    stand: "Stand 36 m²",
    editions: "Édition 2025 | 2027",
    image: null,
  },
  {
    nom: "IA SHOW",
    ville: "LAS VEGAS",
    stand: "Stand 16 m²",
    editions: "Édition 2026",
    image: "/images/evenements/ia-show-las-vegas.png",
  },
];

/** Logiciels (bandeau orange de la page Réalisations). */
export const outils = [
  "Photoshop",
  "Illustrator",
  "Indesign",
  "Figma",
  "After Effect",
  "Première Pro",
  "Lightroom",
  "WordPress",
  "Midjourney",
  "Gigapixel",
];

export type Client = {
  nom: string;
  logo: string;
  /** Dimensions natives du fichier, en px CSS : ce sont celles de la maquette. */
  largeur: number;
  hauteur: number;
};

/**
 * Bandeau « Ils m'ont fait confiance », dans l'ordre de la maquette.
 *
 * Chaque logo est dessiné à sa taille native : le designer les a équilibrés
 * optiquement, un monogramme carré étant plus haut qu'un logotype en ligne.
 * Les normaliser sur une hauteur commune casse cet équilibre.
 */
export const clients: Client[] = [
  { nom: "Asics", logo: "/images/logos/asics.svg", largeur: 130, hauteur: 43 },
  { nom: "Bourbon", logo: "/images/logos/bourbon.svg", largeur: 224, hauteur: 43 },
  // Le fichier CMA CGM porte 30 px de marge en haut et en bas : c'est voulu.
  { nom: "CMA CGM", logo: "/images/logos/cma-cgm.svg", largeur: 131, hauteur: 79 },
  { nom: "CNRS", logo: "/images/logos/cnrs.svg", largeur: 63, hauteur: 63 },
  // Absent de l'export Figma : détouré depuis Home.png.
  { nom: "Carmat", logo: "/images/logos/carmat.png", largeur: 189, hauteur: 43 },
  { nom: "CPPM", logo: "/images/logos/cppm.svg", largeur: 66, hauteur: 81 },
  { nom: "Borealis", logo: "/images/logos/borealis.svg", largeur: 215, hauteur: 73 },
  { nom: "Sharly Shaper", logo: "/images/logos/sharly-shaper.svg", largeur: 63, hauteur: 85 },
  { nom: "Rosajou", logo: "/images/logos/rosajou.svg", largeur: 185, hauteur: 64 },
  // Toujours manquant : Jacou (fichier 1×1 px dans l'export).
];

export const contact = {
  email: "camillehermantierrivet@gmail.com",
  telephone: "06 31 59 95 99",
  linkedin: "#",
};
