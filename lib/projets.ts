/**
 * Contenu des pages projet (textes relevés sur les maquettes Figma).
 * Les visuels des pages génériques viennent de lib/visuels.ts ;
 * la page SOLEM a sa propre mise en page (components/solem).
 */

export type Paragraphe = { titre?: string; texte: string };

export type Video = {
  src: string;
  poster: string;
  /** Largeur / hauteur. */
  ratio: number;
  titre?: string;
};

export type FicheProjet = {
  slug: string;
  nom: string;
  /** Petite illustration à côté du titre (mascotte Spirou). */
  illustration?: string;
  description: Paragraphe[];
  role: string[];
  /** Texte affiché à côté du visuel marqué `texte` dans lib/visuels.ts. */
  blocTexte?: Paragraphe[];
  /** Vidéos affichées sous la grille, sur un fond de couleur. */
  videos?: { fond: string; items: Video[] };
};

/** Ordre des flèches précédent / suivant en bas de page. */
export const fiches: FicheProjet[] = [
  {
    slug: "solem",
    nom: "SOLEM",
    description: [
      {
        texte:
          "Un périmètre international : France, Europe, Afrique, Moyen-Orient, Amérique latine et États-Unis organisé autour de trois volets complémentaires.",
      },
      {
        titre: "Communication de la marque",
        texte:
          "Inscrire chaque projet dans une réflexion stratégique alignée sur les objectifs commerciaux, puis personnaliser les supports qui portent l'image de marque selon les spécificités de chaque marché : PLV, catalogues traduits et adaptés aux usages de chaque zone, lancements de gammes, interviews, créations vidéo, présence digitale.",
      },
      {
        titre: "Pilotage opérationnel",
        texte:
          "Événements, communication auprès du réseau de distributeurs, gestion de la relation avec les prestataires pour garantir la bonne exécution de chaque projet.",
      },
      {
        titre: "Événementiel",
        texte:
          "Présence de SOLEM sur de nombreux salons professionnels à travers le monde, et accompagnement de la communication de la marque directement sur les stands des distributeurs, au plus près des marchés locaux.",
      },
    ],
    role: ["Chargée", "communication", "& événementiel"],
  },
  {
    slug: "sharly-shaper",
    nom: "SHARLY SHAPER",
    description: [
      {
        texte:
          "Sharly Shaper était une entreprise de communication digitale basée à Marseille, animée également par un collectif d'indépendants du secteur. J'y ai assuré la création graphique de la charte éditoriale, participé à l'élaboration de la ligne éditoriale, et contribué à la création de contenus sur les réseaux sociaux.",
      },
    ],
    role: ["Identité visuelle", "Graphisme", "Community manager"],
    blocTexte: [
      {
        titre: "Démarche créa",
        texte:
          "Une ligne éditoriale pensée pour partager les valeurs du collectif, mettre en avant ses membres, et transmettre créativité et savoir-faire à la communauté.",
      },
      {
        titre: "Concept graphique",
        texte:
          "Une ambiance dynamique et colorée, portée par un fond texturé façon papier pour un rendu vivant. La grille de post joue avec les lignes, qui se prolongent d'un visuel à l'autre symbole du cheminement et de l'accompagnement proposés par Sharly Shaper, élément identitaire fort de sa charte graphique.",
      },
      {
        titre: "Stratégie vidéo",
        texte:
          "Une place donnée à la vidéo, au-delà des publications statiques, pour un ton plus humain et moderne en s'appropriant les tendances, ou en créant les siennes.",
      },
    ],
    videos: {
      fond: "#1f6fd6",
      items: ["01", "02", "03"].map((n) => ({
        src: `/videos/sharly-shaper/sequence-${n}.mp4`,
        poster: `/videos/sharly-shaper/sequence-${n}.jpg`,
        ratio: 498 / 1080,
      })),
    },
  },
  {
    slug: "cma-cgm",
    nom: "CMA CGM",
    description: [
      {
        texte:
          "CMA CGM est un client accompagné en agence, sur plusieurs campagnes déployées à travers des supports print et web, à destination de publics variés au sein de la compagnie.",
      },
      {
        texte:
          "La campagne Heading to Safety a impliqué la conception de l'univers graphique et illustratif dans son ensemble, décliné à travers les 12 best practices, diffusées sur des supports de communication interne et externe, dont une série de posts réseaux sociaux.\nD'autres campagnes, destinées aux équipages et pensées pour être déployées à bord des navires, ont donné lieu à la création de posters de sensibilisation aux risques psycho-sociaux, dédiés à la santé mentale en mer, de leaflets et safety posts Safety Barriers pour la prévention des gestes barrières, ainsi qu'à la conception d'un livre de recettes destiné aux cuisines de bord.",
      },
    ],
    role: ["Direction artistique", "Identité visuelle", "Graphisme"],
  },
  {
    slug: "bourbon",
    nom: "BOURBON",
    description: [
      {
        texte:
          "Bourbon est un client accompagné en agence, pour lequel j'ai participé à la création d'Horizon, une plateforme interne dédiée à la gestion d'équipe. J'en ai conçu l'identité graphique, déclinée sur différents supports, brochure et template de présentation.\nLe projet s'est également étendu à la conception, en collaboration avec un illustrateur, d'une série de Safety Posters destinés aux navires de la compagnie.",
      },
    ],
    role: ["Direction artistique", "Identité visuelle", "Graphisme"],
  },
  {
    slug: "borealis",
    nom: "BOREALIS",
    description: [
      {
        texte:
          "Borealis est l'identité vin du groupe C10, réseau français de distribution de boissons pour les professionnels. En agence, j'ai réalisé l'identité visuelle du catalogue 2021 dédié à la Foire aux Vins, pensée pour mettre en valeur la sélection de la marque.",
      },
    ],
    role: ["Identité visuelle", "Graphisme"],
  },
  {
    slug: "asics",
    nom: "ASICS",
    description: [
      {
        texte:
          "Asics est une marque accompagnée en agence, pour laquelle j'ai conçu le format du mémo à destination des vendeurs en points de vente, à travers l'Europe un support pensé pour rythmer la relation avec le réseau, décliné deux fois par an selon les saisons : printemps/été et automne/hiver.\nDeux périodes de collaboration avec cette même agence, dont une en freelance, m'ont permis de faire évoluer le design intérieur de ce mémo au fil des déclinaisons, en l'adaptant aux temps forts de la marque dont plusieurs opérations spécifiques menées pour Decathlon.",
      },
    ],
    role: ["Direction artistique", "Identité visuelle", "Graphisme"],
  },
  {
    slug: "rosajou",
    nom: "ROSAJOU",
    description: [
      {
        texte:
          "ROSAJOU est une marque française de maquillage haut de gamme pour petites filles, distribuée aux Galeries Lafayette ainsi que dans des points de vente plus confidentiels. Accompagnée en agence, j'ai contribué à la création de plusieurs supports destinés à dynamiser et renforcer la relation avec ses revendeurs, avec pour objectif de multiplier les points de contact tout au long de l'année.\nLe dispositif s'est notamment traduit par des courriers papier à destination des distributeurs France qui représentent 80 % du réseau pensés comme des attentions régulières, ainsi que par la production de visuels pour le site web, renouvelés trois à quatre fois par an. Le projet a également inclus la refonte du catalogue, dans sa version 2024, et la création d'une mini brochure dédiée à l'ensemble de la gamme.",
      },
    ],
    role: ["Direction artistique", "Identité visuelle", "Graphisme", "Photos"],
  },
  {
    slug: "parc-spirou",
    nom: "PARC SPIROU",
    illustration: "/images/projets/parc-spirou-mascotte.webp",
    description: [
      {
        texte:
          "Le Parc Spirou Provence est un client accompagné en agence, pour lequel j'ai contribué au graphisme ainsi qu'à la mise en œuvre du plan de communication 2018/2019, à la conception des supports print et web, et au déploiement des opérations marketing. Une mission qui s'étendait également à la thématisation du parc, à travers la création et la fabrication des décors, des coverings et de la signalétique.",
      },
    ],
    role: ["Identité visuelle", "Graphisme", "Print", "Web"],
  },
  {
    slug: "carmat",
    nom: "CARMAT",
    description: [
      {
        texte:
          "Carmat est un client accompagné en agence, pour lequel j'ai participé à la création de l'identité de marque Aeson, ainsi qu'à la déclinaison des supports de communication print et web destinés aux médecins et aux patients. Un accompagnement qui s'est aussi étendu à l'organisation et à la communication de leurs séminaires et conférences.",
      },
    ],
    role: ["Identité visuelle", "Graphisme", "Print", "Web"],
  },
  {
    slug: "merea",
    nom: "MEREA",
    description: [
      {
        texte:
          "MEREA est né dans le cadre de mon Master à Intuit Lab, comme un terrain d'exploration libre : imaginer une marque de A à Z, du concept à la stratégie de communication, en passant par l'identité visuelle et la maquette du site web.",
      },
      {
        texte:
          "Le concept : révéler le Marseille cosmopolite, cette ville où se croisent tant de cultures sans toujours se rencontrer. MEREA prend la forme d'un social club réunissant cinq univers : cinéma, bar, restaurant, scène ouverte et épicerie pensés comme autant de points de rencontre. Chaque mois, une culture différente y est mise à l'honneur, invitant à la découverte et au partage à travers l'ensemble de ces espaces.",
      },
    ],
    role: [
      "Branding",
      "Direction artistique",
      "Identité visuelle",
      "Webdesign",
      "Graphisme",
    ],
  },
  {
    slug: "espace-bocaud-jacou",
    nom: "ESPACE BOCAUD JACOU",
    description: [
      {
        texte:
          "Espace Bocaud Jacou est un client accompagné en agence, pour lequel je créais et déclinais les supports print et web de chaque campagne de l'intégration web au suivi de production, jusqu'à l'impression des affiches et bâches grand format.",
      },
    ],
    role: ["Graphisme", "Print", "Web"],
  },
  {
    slug: "peeka",
    nom: "PEEKA",
    description: [
      {
        texte:
          "PEEKA est né dans le cadre de mon Master à Intuit Lab, comme un terrain d'exploration libre : imaginer une marque de savon de A à Z, du concept à la stratégie de communication, en passant par l'identité visuelle et la maquette du site web.",
      },
      {
        texte:
          "Le concept : repenser le savon de demain multifonctionnel, protecteur, capable de s'adapter à chaque foyer en cassant les codes du produit d'hygiène classique. L'enjeu : le rendre à la fois inoffensif et attrayant. Son nom, PEEKA, fait écho au syndrome pica ; son slogan résume l'ambition du projet « ce n'est pas que du savon. »",
      },
    ],
    role: [
      "Branding",
      "Direction artistique",
      "Identité visuelle",
      "Webdesign",
      "Graphisme",
    ],
  },
];

export function ficheParSlug(slug: string) {
  return fiches.find((fiche) => fiche.slug === slug);
}

/** Projets voisins pour la navigation en bas de page. */
export function voisins(slug: string) {
  const i = fiches.findIndex((fiche) => fiche.slug === slug);
  return {
    precedent: i > 0 ? fiches[i - 1] : null,
    suivant: i >= 0 && i < fiches.length - 1 ? fiches[i + 1] : null,
  };
}
