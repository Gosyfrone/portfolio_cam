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

export const clients = [
  { nom: "Asics", logo: "/images/logos/asics.svg" },
  { nom: "Bourbon", logo: "/images/logos/bourbon.svg" },
  { nom: "CMA CGM", logo: "/images/logos/cma-cgm.svg" },
  { nom: "CNRS", logo: "/images/logos/cnrs.svg" },
  { nom: "CPPM", logo: "/images/logos/cppm.svg" },
  { nom: "Borealis", logo: "/images/logos/borealis.svg" },
  { nom: "Rosajou", logo: "/images/logos/rosajou.svg" },
  { nom: "Sharly Shaper", logo: "/images/logos/sharly-shaper.svg" },
  // Manquants dans l'export Figma : CARMAT, Jacou (fichier 1×1 px)
];

export const contact = {
  email: "camillehermantierrivet@gmail.com",
  telephone: "06 31 59 95 99",
  linkedin: "#",
};
