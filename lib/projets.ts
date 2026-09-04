/**
 * Contenu des pages projet.
 *
 * Chaque page suit la même trame que le Figma : en-tête (retour, titre, texte
 * d'intro, rôle), puis une suite de sections étiquetées par une pilule aux
 * couleurs de la marque, puis la navigation projet précédent / suivant.
 */

export type Bloc = {
  titre: string;
  texte: string;
};

/** Une tuile de section : image, vidéo, nuancier ou emplacement à fournir. */
export type Media =
  | {
      genre: "image";
      src: string;
      alt: string;
      /** Aplat posé derrière le visuel (les mockups détourés du Figma en ont un). */
      fond?: string;
      /** Légende blanche posée en haut à gauche de la tuile. */
      legende?: string;
      /** Ratio CSS de la tuile. Défaut : 3/2. */
      ratio?: string;
      /** Affiche le visuel en entier au lieu de le recadrer. */
      contenir?: boolean;
      /** Recadre depuis le haut plutôt que depuis le centre. */
      ancrage?: "haut";
      /** Logo posé au centre du visuel (bandeau de marque). */
      surimpression?: { src: string; largeur: number; hauteur: number };
    }
  | {
      genre: "video";
      src: string;
      alt: string;
      ratio?: string;
      fond?: string;
    }
  | {
      genre: "palette";
      couleurs: string[];
    }
  | {
      genre: "a-fournir";
      label: string;
      ratio?: string;
    };

export type Etiquette = {
  texte: string;
  /** Couleur relevée sur le Figma (texte + bordure de la pilule). */
  ton: string;
};

export type Section =
  /** Grille figée de tuiles. */
  | {
      type: "grille";
      etiquette?: Etiquette;
      /** Nombre de colonnes à partir de md. Défaut : 2. */
      colonnes?: 1 | 2 | 3 | 4;
      /** Panneau coloré posé derrière la grille. */
      fond?: string;
      medias: Media[];
    }
  /** Rail à défilement automatique + flèches (comme la home). */
  | {
      type: "rail";
      etiquette?: Etiquette;
      medias: Media[];
    }
  /** Rail à onglets (les catalogues SOLEM : Europe / KSA / USA). */
  | {
      type: "onglets";
      etiquette?: Etiquette;
      onglets: { id: string; label: string; medias: Media[] }[];
    }
  /** Visuel à gauche, blocs de texte à droite (page Sharly Shaper). */
  | {
      type: "duo";
      etiquette?: Etiquette;
      media: Media;
      blocs: Bloc[];
    };

export type Projet = {
  slug: string;
  nom: string;
  /** Étiquettes affichées sous la vignette, séparées par des « | ». */
  tags: string[];
  vignette: string | null;
  /** Surtitre gris au-dessus de l'intro. */
  chapeau?: string;
  intro: string;
  blocs: Bloc[];
  role: string[];
  /** Couleur d'accent de la marque, utilisée par les pilules de section. */
  ton: string;
  sections: Section[];
  /** Le texte d'intro est justifié sur toute la largeur (page Sharly Shaper). */
  introLarge?: boolean;
};

const img = (
  src: string,
  alt: string,
  extra: Partial<Extract<Media, { genre: "image" }>> = {},
): Media => ({ genre: "image", src, alt, ...extra });

/* ------------------------------------------------------------------ */

export const projets: Projet[] = [
  {
    slug: "solem",
    nom: "SOLEM",
    tags: ["Direction artistique", "Identité visuelle", "Événementiel"],
    vignette: "/images/projets/solem.png",
    intro:
      "Un périmètre international : France, Europe, Afrique, Moyen-Orient, Amérique latine et États-Unis organisé autour de trois volets complémentaires.",
    blocs: [
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
    role: ["Chargée communication & événementiel"],
    ton: "#5281CC",
    sections: [
      {
        type: "onglets",
        etiquette: { texte: "Catalogues", ton: "#5281CC" },
        onglets: [
          {
            id: "europe",
            label: "Europe",
            medias: [
              img("/images/projets/solem/europe.webp", "Catalogue SOLEM Europe"),
              img(
                "/images/projets/solem/capture-decran-2026-09-03-a-22-09-51.webp",
                "Dépliant produit SOLEM",
              ),
            ],
          },
          {
            id: "ksa",
            label: "KSA",
            medias: [{ genre: "a-fournir", label: "Catalogue KSA" }],
          },
          {
            id: "usa",
            label: "USA",
            medias: [{ genre: "a-fournir", label: "Catalogue USA" }],
          },
        ],
      },
      {
        type: "rail",
        etiquette: { texte: "Op Coupe du monde", ton: "#5281CC" },
        medias: [
          img("/images/projets/solem/cartes5.webp", "Visuel SOLEM World Cup 2026"),
          img("/images/projets/solem/maillot-solem-fr.webp", "Maillot SOLEM France"),
          img("/images/projets/solem/maillot-solem-es.webp", "Maillot SOLEM Espagne"),
          img("/images/projets/solem/maillot-solem-pt.webp", "Maillot SOLEM Portugal"),
          img("/images/projets/solem/maillot-solem-ma.webp", "Maillot SOLEM Maroc"),
          img("/images/projets/solem/maillot-solem-ksa.webp", "Maillot SOLEM Arabie saoudite"),
          img("/images/projets/solem/maillot-solem-tu.webp", "Maillot SOLEM Tunisie"),
          img("/images/projets/solem/maillot-solem-usa.webp", "Maillot SOLEM États-Unis"),
          img("/images/projets/solem/cartes7.webp", "Carte d'accompagnement du maillot SOLEM"),
        ],
      },
      {
        type: "rail",
        etiquette: { texte: "Communication distributeurs", ton: "#5281CC" },
        medias: [
          img(
            "/images/projets/solem/capture-decran-2026-09-03-a-22-07-35.webp",
            "Roll-ups SOLEM pour le réseau de distribution",
          ),
          img("/images/projets/solem/capture-decran-2026-09-03-a-21-18-11.webp", "PLV WooBee"),
          img("/images/projets/solem/capture-decran-2026-09-03-a-21-18-36.webp", "PLV BL-IP"),
          img("/images/projets/solem/capture-decran-2026-09-03-a-21-18-21.webp", "PLV LR-MS"),
          img("/images/projets/solem/capture-decran-2026-09-03-a-21-18-29.webp", "PLV LR-AG"),
          img("/images/projets/solem/presntoirs-carton.webp", "Présentoir carton SOLEM"),
          img(
            "/images/projets/solem/capture-decran-2026-09-03-a-21-18-58.webp",
            "Présentoir SOLEM en point de vente",
          ),
          img(
            "/images/projets/solem/capture-decran-2026-09-03-a-21-17-48.webp",
            "Linéaire SOLEM en magasin",
          ),
          img("/images/projets/solem/capture-decran-2026-09-03-a-21-20-22.webp", "Oriflamme SOLEM"),
        ],
      },
      {
        type: "grille",
        etiquette: { texte: "Webdesign", ton: "#5281CC" },
        colonnes: 4,
        fond: "#0B2239",
        medias: [
          img("/images/projets/solem/solem-eu-home.webp", "Page d'accueil SOLEM Europe", {
            ratio: "9 / 26",
            ancrage: "haut",
          }),
          img("/images/projets/solem/one-page-solem-v4.webp", "One-page SOLEM France", {
            ratio: "9 / 26",
            ancrage: "haut",
          }),
          img("/images/projets/solem/catalogs.webp", "Page catalogues du site SOLEM", {
            ratio: "9 / 26",
            ancrage: "haut",
          }),
          img("/images/projets/solem/one-page-solem-ksa-en.webp", "One-page SOLEM KSA (EN)", {
            ratio: "9 / 26",
            ancrage: "haut",
          }),
          img("/images/projets/solem/home.webp", "Accueil de l'espace SOLEM", {
            ratio: "9 / 26",
            ancrage: "haut",
          }),
          img("/images/projets/solem/app-mysolem-desktop-v2.webp", "Application MySOLEM", {
            ratio: "9 / 26",
            ancrage: "haut",
          }),
          img("/images/projets/solem/one-page-solem-ksa-ar.webp", "One-page SOLEM KSA (AR)", {
            ratio: "9 / 26",
            ancrage: "haut",
          }),
        ],
      },
    ],
  },

  {
    slug: "sharly-shaper",
    nom: "SHARLY SHAPER",
    tags: ["Community", "Identité visuelle"],
    vignette: "/images/projets/sharly-shaper/mockup-vignette.webp",
    introLarge: true,
    intro:
      "Sharly Shaper était une entreprise de communication digitale basée à Marseille, animée également par un collectif d'indépendants du secteur. J'y ai assuré la création graphique de la charte éditoriale, participé à l'élaboration de la ligne éditoriale, et contribué à la création de contenus sur les réseaux sociaux.",
    blocs: [],
    role: ["Identité visuelle", "Graphisme", "Community manager"],
    ton: "#F2B705",
    sections: [
      {
        type: "grille",
        colonnes: 1,
        medias: [
          img(
            "/images/projets/sharly-shaper/mockup-vignette.webp",
            "Grille Instagram Sharly Shaper",
            { ratio: "3 / 2" },
          ),
        ],
      },
      {
        type: "duo",
        media: img("/images/projets/sharly-shaper/insta-1.webp", "Publications Sharly Shaper", {
          fond: "#F2B705",
          ratio: "1 / 1",
          contenir: true,
        }),
        blocs: [
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
      },
      {
        type: "grille",
        colonnes: 3,
        fond: "#1462E6",
        medias: [
          {
            genre: "video",
            src: "/videos/sharly-shaper/sequence-01.mp4",
            alt: "Séquence vidéo — session drone au Portugal",
            ratio: "9 / 16",
          },
          {
            genre: "video",
            src: "/videos/sharly-shaper/sequence-02.mp4",
            alt: "Séquence vidéo — présentation produit",
            ratio: "9 / 16",
          },
          {
            genre: "video",
            src: "/videos/sharly-shaper/sequence-03.mp4",
            alt: "Séquence vidéo — reportage domaine viticole",
            ratio: "9 / 16",
          },
        ],
      },
    ],
  },

  {
    slug: "cma-cgm",
    nom: "CMA CGM",
    tags: ["Identité visuelle", "Print", "Digital"],
    vignette: "/images/projets/cma-cgm/vignette.webp",
    chapeau: "Client accompagné en agence → campagnes print et web",
    intro:
      "Plusieurs campagnes déployées à travers des supports print et web, à destination de publics variés au sein de la compagnie.",
    blocs: [
      {
        titre: "Heading to Safety",
        texte:
          "Conception de l'univers graphique et illustratif dans son ensemble, décliné à travers les 12 best practices, diffusées sur des supports de communication interne et externe, dont une série de posts réseaux sociaux.",
      },
      {
        titre: "Communication équipages",
        texte:
          "Campagnes pensées pour être déployées à bord des navires : posters de sensibilisation aux risques psycho-sociaux dédiés à la santé mentale en mer, leaflets et safety posts Safety Barriers pour la prévention des gestes barrières, ainsi qu'un livre de recettes destiné aux cuisines de bord.",
      },
    ],
    role: ["Direction artistique", "Identité visuelle", "Graphisme"],
    ton: "#433D78",
    sections: [
      {
        type: "grille",
        etiquette: { texte: "Campagne Heading to safety", ton: "#433D78" },
        colonnes: 2,
        medias: [
          img(
            "/images/projets/cma-cgm/cma-heading-to-safety-kakemono-en-simul2.webp",
            "Kakemonos Heading to Safety",
          ),
          img(
            "/images/projets/cma-cgm/cma-calendrier-best-practices-kv-a5-simul-2.webp",
            "Calendrier 12 best practices",
          ),
          img(
            "/images/projets/cma-cgm/cma-heading-to-safety-ecran-ascenseur.webp",
            "Habillage des écrans internes",
          ),
          img(
            "/images/projets/cma-cgm/cma-heading-to-safety-powerpoint-simul.webp",
            "Modèle de présentation Heading to Safety",
          ),
          img("/images/projets/cma-cgm/cma-sticker-3x3-simul.webp", "Stickers Heading to Safety"),
          img(
            "/images/projets/cma-cgm/cma-heading-to-safety-marquage-au-sol-1000x1000-simul.webp",
            "Marquage au sol en entrepôt",
          ),
        ],
      },
      {
        type: "grille",
        colonnes: 2,
        medias: [
          img(
            "/images/projets/cma-cgm/crea-heading-to-safety-sac-a-dos-v2.webp",
            "Sac à dos Heading to Safety",
          ),
          img(
            "/images/projets/cma-cgm/crea-heading-to-safety-polo-homme-v2.webp",
            "Polo Heading to Safety",
          ),
        ],
      },
      {
        type: "grille",
        colonnes: 4,
        fond: "#DDE3F7",
        medias: [
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-2022.webp",
            "Post réseaux sociaux — best practice 1",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-20222.webp",
            "Post réseaux sociaux — best practice 2",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-20223.webp",
            "Post réseaux sociaux — best practice 3",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-20224.webp",
            "Post réseaux sociaux — best practice 4",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-20225.webp",
            "Post réseaux sociaux — best practice 5",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-20226.webp",
            "Post réseaux sociaux — best practice 6",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-20227.webp",
            "Post réseaux sociaux — best practice 7",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-20228.webp",
            "Post réseaux sociaux — best practice 8",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-20229.webp",
            "Post réseaux sociaux — best practice 9",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-202210.webp",
            "Post réseaux sociaux — best practice 10",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-202211.webp",
            "Post réseaux sociaux — best practice 11",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-10-202212.webp",
            "Post réseaux sociaux — best practice 12",
            { ratio: "1 / 1", contenir: true },
          ),
          img(
            "/images/projets/cma-cgm/cma-post-instagram-kv-1080x1080-heading-to-safety-v2-10-2022.webp",
            "Post réseaux sociaux — clôture de campagne",
            { ratio: "1 / 1", contenir: true },
          ),
        ],
      },
      {
        type: "grille",
        etiquette: { texte: "Leaflet Safety Barriers", ton: "#B15354" },
        colonnes: 3,
        medias: [
          img("/images/projets/cma-cgm/safety-barriers-2.webp", "Affiche Stay in your safe area", {
            ratio: "3 / 4",
          }),
          img(
            "/images/projets/cma-cgm/leaflet-safety-barriers-2.webp",
            "Leaflet Safety Barriers déplié",
            { ratio: "3 / 4" },
          ),
          img("/images/projets/cma-cgm/leaflet-safety-barriers.webp", "Leaflet Safety Barriers", {
            ratio: "3 / 4",
          }),
        ],
      },
      {
        type: "grille",
        etiquette: { texte: "Poster Risques Psycho-Sociaux", ton: "#0A142F" },
        colonnes: 3,
        medias: [
          img("/images/projets/cma-cgm/vignette.webp", "Posters risques psycho-sociaux à bord"),
          { genre: "a-fournir", label: "Poster en situation" },
          { genre: "a-fournir", label: "Poster en situation" },
        ],
      },
      {
        type: "grille",
        etiquette: { texte: "Livre de recette", ton: "#8CC0B9" },
        colonnes: 2,
        medias: [
          img("/images/projets/cma-cgm/mockup02.webp", "Couverture du livre de recettes"),
          img("/images/projets/cma-cgm/mockup01.webp", "Intérieur du livre de recettes"),
          img("/images/projets/cma-cgm/mockup03.webp", "Fiche recette"),
          img("/images/projets/cma-cgm/tuto.webp", "Tips photo pour les cuisines de bord"),
        ],
      },
    ],
  },

  {
    slug: "bourbon",
    nom: "BOURBON",
    tags: ["Identité visuelle", "Print", "Digital"],
    vignette: "/images/projets/bourbon.png",
    chapeau: "Client accompagné en agence → campagnes print et web",
    // ⚠️ Page absente de l'export Figma : textes provisoires, à valider.
    intro:
      "Bourbon est un armateur français de services maritimes à l'offshore pétrolier. Accompagnement des campagnes de communication interne du groupe, à destination des équipages comme des équipes à terre.",
    blocs: [
      {
        titre: "Programme Horizon",
        texte:
          "Déclinaison de l'identité du programme Horizon sur l'ensemble des supports : guides utilisateurs, affichage, brochures et supports de présentation.",
      },
      {
        titre: "Safety Post",
        texte:
          "Création des Safety Posts, affiches de retour d'expérience diffusées à bord des navires pour partager les bonnes pratiques de sécurité.",
      },
    ],
    role: ["Identité visuelle", "Graphisme", "Print", "Web"],
    ton: "#2F62B5",
    sections: [
      {
        type: "grille",
        etiquette: { texte: "Programme Horizon", ton: "#2F62B5" },
        colonnes: 2,
        medias: [
          img("/images/projets/bourbon/horizon-guide.webp", "Affichage Horizon en extérieur"),
          img("/images/projets/bourbon/decli-poster.webp", "Déclinaison des affiches Horizon"),
          img("/images/projets/bourbon/mockup-a4-brochure.webp", "Gamme de supports Horizon"),
          img(
            "/images/projets/bourbon/photo-mockup-5000-x-3333-px.webp",
            "Support de présentation Horizon en salle de réunion",
          ),
        ],
      },
      {
        type: "grille",
        etiquette: { texte: "Safety Post", ton: "#2F62B5" },
        colonnes: 2,
        medias: [
          img(
            "/images/projets/bourbon/safetypost-mockup.webp",
            "Safety Post — météo difficile au mouillage",
            { contenir: true, fond: "#F1F1EF" },
          ),
          img("/images/projets/bourbon/08.webp", "Supports digitaux Bourbon"),
        ],
      },
    ],
  },

  {
    slug: "borealis",
    nom: "BOREALIS",
    tags: ["Direction artistique", "Identité visuelle", "Print"],
    vignette: "/images/projets/borealis/inter-01.webp",
    chapeau: "Client accompagné en agence → campagnes print",
    intro:
      "Borealis est l'identité vin du groupe C10, réseau français de distribution de boissons pour les professionnels.",
    blocs: [
      {
        titre: "Catalogue Foire aux Vins 2021",
        texte:
          "Réalisation de l'identité visuelle du catalogue 2021, pensée pour mettre en valeur la sélection de la marque.",
      },
    ],
    role: ["Identité visuelle", "Graphisme"],
    ton: "#E8336E",
    sections: [
      {
        type: "grille",
        colonnes: 1,
        medias: [
          img("/images/projets/borealis/couv-magazine-vignette.webp", "Couverture du catalogue Foire aux Vins", {
            ratio: "16 / 7",
          }),
        ],
      },
      {
        type: "grille",
        colonnes: 3,
        medias: [
          img("/images/projets/borealis/prestige-22.webp", "Catalogue Borealis — gamme Prestige"),
          img("/images/projets/borealis/prestige-21.webp", "Couverture Foire aux Vins 2021"),
          img("/images/projets/borealis/variete9.webp", "Catalogue Borealis — gamme Variété"),
        ],
      },
      {
        type: "grille",
        colonnes: 1,
        medias: [
          img("/images/projets/borealis/inter-01.webp", "Pages intérieures du catalogue", {
            ratio: "16 / 9",
          }),
        ],
      },
      {
        type: "grille",
        colonnes: 3,
        medias: [
          img("/images/projets/borealis/origine6.webp", "Catalogue Borealis — gamme Origine"),
          img("/images/projets/borealis/origine1.webp", "Couverture Origine"),
          img("/images/projets/borealis/variete16.webp", "Catalogue Borealis — illustration Variété"),
        ],
      },
      {
        type: "grille",
        colonnes: 1,
        medias: [
          img("/images/projets/borealis/inter-02.webp", "Double page du catalogue et couverture Prestige", {
            ratio: "16 / 9",
          }),
        ],
      },
    ],
  },

  {
    slug: "asics",
    nom: "ASICS",
    tags: ["Direction artistique", "Identité visuelle", "Print"],
    vignette: "/images/projets/asics.png",
    chapeau: "Client accompagné en agence → campagnes print",
    intro:
      "Conception du format du mémo à destination des vendeurs en points de vente, à travers l'Europe. Un support pensé pour rythmer la relation avec le réseau, décliné deux fois par an selon les saisons : printemps/été et automne/hiver.",
    blocs: [
      {
        titre: "Évolution du support",
        texte:
          "Deux périodes de collaboration avec cette même agence, dont une en freelance, ont permis de faire évoluer le design intérieur de ce mémo au fil des déclinaisons, en l'adaptant aux temps forts de la marque, dont plusieurs opérations spécifiques menées pour Decathlon.",
      },
    ],
    role: ["Direction artistique", "Identité visuelle", "Graphisme"],
    ton: "#0B3EA8",
    sections: [
      {
        type: "grille",
        colonnes: 2,
        medias: [
          img("/images/projets/asics/m-a.webp", "Mémo ASICS — déclinaison tennis"),
          img("/images/projets/asics/mockup-asics-2024-bis.webp", "Mémo ASICS Decathlon automne-hiver 2024"),
          img("/images/projets/asics/mockup-asics-2024-2.webp", "Mémo ASICS — déclinaison running"),
          img("/images/projets/asics/mockup-asics-2024.webp", "Mémo ASICS 2024"),
        ],
      },
      {
        type: "grille",
        colonnes: 3,
        medias: [
          img("/images/projets/asics/mockup-piste-texte-1.webp", "Mémo ASICS — piste texte"),
          img("/images/projets/asics/mockup-piste-texte-2.webp", "Mémo ASICS — piste texte, seconde version"),
          img("/images/projets/asics/mockup-piste-traits.webp", "Mémo ASICS — piste traits"),
        ],
      },
      {
        type: "grille",
        colonnes: 2,
        medias: [
          img("/images/projets/asics/piste-texte.webp", "Planches du mémo — piste texte", {
            fond: "#DAD9EE",
            contenir: true,
          }),
          img("/images/projets/asics/piste-traits.webp", "Planches du mémo — piste traits", {
            fond: "#E1EFE4",
            contenir: true,
          }),
        ],
      },
    ],
  },

  {
    slug: "rosajou",
    nom: "ROSAJOU",
    tags: ["Direction artistique", "Identité visuelle", "Print"],
    vignette: "/images/projets/rosajou/eclat-3.webp",
    chapeau: "Client accompagné en agence → campagnes print",
    intro:
      "ROSAJOU est une marque française de maquillage haut de gamme pour petites filles, distribuée aux Galeries Lafayette ainsi que dans des points de vente plus confidentiels.",
    blocs: [
      {
        titre: "Relation revendeurs",
        texte:
          "Contribution à la création de plusieurs supports destinés à dynamiser et renforcer la relation avec les revendeurs, avec pour objectif de multiplier les points de contact tout au long de l'année : courriers papier à destination des distributeurs France (80 % du réseau), pensés comme des attentions régulières, et visuels pour le site web, renouvelés trois à quatre fois par an.",
      },
      {
        titre: "Catalogue & brochure",
        texte:
          "Refonte du catalogue, dans sa version 2024, et création d'une mini brochure dédiée à l'ensemble de la gamme.",
      },
    ],
    role: ["Direction artistique", "Identité visuelle", "Graphisme", "Photos"],
    ton: "#E8547F",
    sections: [
      {
        type: "grille",
        colonnes: 1,
        medias: [
          img("/images/projets/rosajou/motif-copie.webp", "Bandeau de marque Rosajou", {
            ratio: "16 / 5",
            surimpression: {
              src: "/images/projets/rosajou/logo-rosajou.webp",
              largeur: 1021,
              hauteur: 426,
            },
          }),
        ],
      },
      {
        type: "grille",
        colonnes: 3,
        medias: [
          img("/images/projets/rosajou/coquette.webp", "Visuel de marque — s'amuser en beauté", {
            ratio: "3 / 4",
          }),
          img("/images/projets/rosajou/lc-rosajou-0015-modifier.webp", "Packshot soin Rosajou", {
            ratio: "3 / 4",
          }),
          img(
            "/images/projets/rosajou/lc-rosajou-0010-modifier-gamme2-fev22.webp",
            "Composition produits Rosajou",
            { ratio: "3 / 4" },
          ),
        ],
      },
      {
        type: "grille",
        colonnes: 3,
        medias: [
          img("/images/projets/rosajou/eclat-1.webp", "Brochure Rosajou fermée"),
          img("/images/projets/rosajou/eclat-2.webp", "Brochure Rosajou ouverte"),
          img("/images/projets/rosajou/eclat-3.webp", "Double page produits de la brochure"),
        ],
      },
      {
        type: "grille",
        colonnes: 3,
        medias: [
          img("/images/projets/rosajou/parfum-ia.webp", "Visuel parfum Rosajou", { ratio: "3 / 4" }),
          img(
            "/images/projets/rosajou/lc-rosajou-0006-modifier-gamme3-fev22.webp",
            "Trousse et gamme Rosajou",
            { ratio: "3 / 4" },
          ),
          img("/images/projets/rosajou/motif-copie.webp", "Motif Rosajou", { ratio: "3 / 4" }),
        ],
      },
      {
        type: "grille",
        colonnes: 3,
        medias: [
          img("/images/projets/rosajou/bracelet.webp", "Bracelets Rosajou", { fond: "#CCE7F3" }),
          img("/images/projets/rosajou/02.webp", "Affiche illustrée Rosajou en chambre d'enfant"),
          img("/images/projets/rosajou/fiche-produit-1.webp", "Fiches produit Rosajou", {
            fond: "#CCE7F3",
          }),
        ],
      },
      {
        type: "grille",
        colonnes: 2,
        medias: [
          img("/images/projets/rosajou/2.webp", "Catalogue Rosajou — pages ongles"),
          img("/images/projets/rosajou/3.webp", "Catalogue Rosajou — double page"),
        ],
      },
    ],
  },

  {
    slug: "parc-spirou",
    nom: "PARC SPIROU",
    tags: ["Identité visuelle", "Print", "Digital"],
    vignette: "/images/projets/parc-spirou/capture-decran-2026-08-21-a-23-27-29.webp",
    chapeau: "Client accompagné en agence → campagnes print et web",
    // ⚠️ Page absente de l'export Figma : textes provisoires, à valider.
    intro:
      "Parc Spirou Provence est un parc d'attractions dédié à l'univers de la bande dessinée, implanté à Monteux.",
    blocs: [
      {
        titre: "Campagnes saisonnières",
        texte:
          "Création et déclinaison des supports de communication du parc : flyers d'ouverture, grilles tarifaires, publicités presse, goodies et habillage des espaces.",
      },
    ],
    role: ["Identité visuelle", "Graphisme", "Print"],
    ton: "#E2001A",
    sections: [
      {
        type: "grille",
        etiquette: { texte: "Print", ton: "#E2001A" },
        colonnes: 2,
        medias: [
          img("/images/projets/parc-spirou/spirou-1.webp", "Flyers d'ouverture du Parc Spirou"),
          img("/images/projets/parc-spirou/spirou-2.webp", "Grille tarifaire du Parc Spirou"),
        ],
      },
      {
        type: "grille",
        etiquette: { texte: "Goodies", ton: "#E2001A" },
        colonnes: 2,
        medias: [
          img("/images/projets/parc-spirou/parcspirou-goodies.webp", "Stylos Parc Spirou", {
            ratio: "3 / 4",
            contenir: true,
            fond: "#EFEFEF",
          }),
          img("/images/projets/parc-spirou/parcspirou-pub.webp", "Sachet boulangerie Parc Spirou", {
            ratio: "3 / 4",
          }),
        ],
      },
      {
        type: "grille",
        etiquette: { texte: "Habillage", ton: "#E2001A" },
        colonnes: 1,
        medias: [
          img(
            "/images/projets/parc-spirou/capture-decran-2026-08-21-a-23-27-29.webp",
            "Habillage extérieur du Parc Spirou",
            { ratio: "16 / 8" },
          ),
        ],
      },
    ],
  },

  {
    slug: "carmat",
    nom: "CARMAT",
    tags: ["Identité visuelle", "Print", "Digital"],
    vignette: "/images/projets/carmat/mockup-vignette.webp",
    chapeau: "Client accompagné en agence → campagnes print",
    intro:
      "Carmat est une entreprise française spécialisée dans la conception du cœur artificiel Aeson, destiné aux patients en insuffisance cardiaque.",
    blocs: [
      {
        titre: "Identité de marque Aeson",
        texte:
          "Participation à la création de l'identité de marque Aeson, ainsi qu'à la déclinaison des supports de communication print et web destinés aux médecins et aux patients.",
      },
      {
        titre: "Séminaires & conférences",
        texte:
          "Accompagnement dans l'organisation et la communication des séminaires et conférences.",
      },
    ],
    role: ["Identité visuelle", "Graphisme", "Print", "Web"],
    ton: "#3FAEBF",
    sections: [
      {
        type: "grille",
        colonnes: 3,
        medias: [
          img("/images/projets/carmat/08-brochure-mockup.webp", "Brochure Aeson en main", {
            ratio: "3 / 4",
          }),
          img("/images/projets/carmat/mockup-vignette.webp", "Double page de la brochure Aeson", {
            ratio: "3 / 4",
          }),
          { genre: "palette", couleurs: ["#3FAEBF", "#5EBDCD", "#BF8993", "#3F446C", "#2EBCA4"] },
        ],
      },
      {
        type: "grille",
        colonnes: 2,
        medias: [
          img("/images/projets/carmat/roll-aeson.webp", "Roll-ups Aeson", {
            fond: "#FFFFFF",
            contenir: true,
          }),
          img("/images/projets/carmat/fiches-aeson.webp", "Fiches Aeson"),
        ],
      },
      {
        type: "grille",
        etiquette: { texte: "Brochure patient", ton: "#2EBCA4" },
        colonnes: 3,
        medias: [
          img(
            "/images/projets/carmat/perfect-binding-brochure-mockup-1-client.webp",
            "Brochure patient Aeson",
          ),
          img(
            "/images/projets/carmat/perfect-binding-brochure-mockup-5-client.webp",
            "Brochure patient ouverte",
          ),
          img(
            "/images/projets/carmat/perfect-binding-brochure-mockup-6-client.webp",
            "Brochure patient — détail",
          ),
        ],
      },
      {
        type: "grille",
        etiquette: { texte: "Livret clinicien", ton: "#3F446C" },
        colonnes: 1,
        medias: [
          img(
            "/images/projets/carmat/livret-clinicien-3volets.webp",
            "Livret clinicien trois volets",
            { ratio: "16 / 9", fond: "#EDEDED", contenir: true },
          ),
        ],
      },
      {
        type: "grille",
        etiquette: { texte: "15 ans", ton: "#3F446C" },
        colonnes: 3,
        medias: [
          img("/images/projets/carmat/affichea4.webp", "Affiche des 15 ans de Carmat", {
            fond: "#E9B8C4",
            contenir: true,
          }),
          img("/images/projets/carmat/car-logo-anniversaire-fr.webp", "Logo des 15 ans de Carmat", {
            fond: "#FFFFFF",
            contenir: true,
          }),
          img("/images/projets/carmat/baniere-web.webp", "Bannière web des 15 ans"),
        ],
      },
      {
        type: "grille",
        colonnes: 1,
        medias: [
          img("/images/projets/carmat/vitrophanie-carmat-on-air-2.webp", "Vitrophanie Carmat on air", {
            ratio: "16 / 9",
          }),
        ],
      },
    ],
  },

  {
    slug: "merea",
    nom: "MEREA",
    tags: ["Direction artistique", "Identité visuelle"],
    vignette: "/images/projets/merea/mockup-vignette.webp",
    chapeau: "Projet fictif — Master, Intuit Lab",
    intro:
      "Né comme un terrain d'exploration libre : imaginer une marque de A à Z, du concept à la stratégie de communication, en passant par l'identité visuelle et la maquette du site web.",
    blocs: [
      {
        titre: "Le concept",
        texte:
          "MEREA est un social club imaginé pour incarner la Marseille cosmopolite, un lieu de rencontre où les frontières culturelles s'effacent au profit de l'échange et du partage. Chaque mois, une culture différente y est mise à l'honneur et se découvre à travers cinq espaces : Le Cosmopolite (restaurant), Le Bar des Voyageurs, La Scène du Monde (scène ouverte), Ciné Horizon (cinéma) et Harmonie Sport (salle de sport).",
      },
      {
        titre: "Identité et déclinaison",
        texte:
          "Une identité graphique en noir, blanc et orange, portée par une trame en demi-teintes et des illustrations qui évoquent le voyage et la mixité culturelle. Le site web décline ce concept mois après mois : programmation, réservations, plan du lieu, pour donner à chaque culture mise à l'honneur (ici, les Comores) un véritable espace d'expression.",
      },
    ],
    role: ["Branding", "Direction artistique", "Identité visuelle", "Webdesign", "Graphisme"],
    ton: "#FF8249",
    sections: [
      {
        type: "grille",
        colonnes: 3,
        medias: [
          img("/images/projets/merea/1.webp", "Affiche La Cosmopolitanie", { ratio: "1 / 1" }),
          img("/images/projets/merea/logo.webp", "Logo MEREA", {
            ratio: "1 / 1",
            fond: "#000000",
            contenir: true,
          }),
          { genre: "palette", couleurs: ["#00B0B9", "#A0D3D3", "#FCB7A0", "#FF8249", "#F2004F"] },
        ],
      },
      {
        type: "grille",
        colonnes: 2,
        medias: [
          img("/images/projets/merea/digital.webp", "Déclinaisons digitales de MEREA", {
            ratio: "9 / 15",
          }),
          img("/images/projets/merea/affichage.webp", "Affichage urbain MEREA", {
            ratio: "9 / 15",
          }),
        ],
      },
      {
        type: "grille",
        colonnes: 2,
        fond: "#000000",
        medias: [
          img(
            "/images/projets/merea/camille-melaine-socialclub-groupe4-page-15.webp",
            "Maquette du site MEREA — Le Cosmopolite",
            { ratio: "9 / 26", ancrage: "haut" },
          ),
          img(
            "/images/projets/merea/camille-melaine-socialclub-groupe4-page-17.webp",
            "Maquette du site MEREA — Ciné Horizon",
            { ratio: "9 / 26", ancrage: "haut" },
          ),
        ],
      },
      {
        type: "grille",
        colonnes: 3,
        medias: [
          img(
            "/images/projets/merea/camille-melaine-socialclub-groupe4-page-04.webp",
            "Le Cosmopolite — supports",
            { ratio: "9 / 22", ancrage: "haut" },
          ),
          img(
            "/images/projets/merea/camille-melaine-socialclub-groupe4-page-05.webp",
            "Le Bar des Voyageurs — supports",
            { ratio: "9 / 22", ancrage: "haut" },
          ),
          img(
            "/images/projets/merea/camille-melaine-socialclub-groupe4-page-09.webp",
            "L'épicerie / boutique MEREA",
            { ratio: "9 / 22", ancrage: "haut" },
          ),
        ],
      },
    ],
  },

  {
    slug: "domaine-de-la-gineste",
    nom: "DOMAINE DE LA GINESTE",
    tags: ["Vidéos", "Photos", "Print"],
    vignette: null,
    chapeau: "Client accompagné en agence",
    // ⚠️ Page absente de l'export Figma et aucun visuel fourni.
    intro:
      "Domaine viticole accompagné sur la production de contenus : captations vidéo, photographies et supports print.",
    blocs: [],
    role: ["Vidéos", "Photos", "Print"],
    ton: "#7A8B4A",
    sections: [
      {
        type: "grille",
        colonnes: 2,
        medias: [
          { genre: "a-fournir", label: "Visuel à fournir" },
          { genre: "a-fournir", label: "Visuel à fournir" },
        ],
      },
    ],
  },

  {
    slug: "espace-bocaud",
    nom: "ESPACE BOCAUD JACOU",
    tags: ["Identité visuelle", "Design graphique", "Print"],
    vignette: "/images/projets/espace-bocaud/site-1050x590.webp",
    chapeau: "Client accompagné en agence → campagnes print et web",
    intro:
      "Création et déclinaison des supports print et web de chaque campagne, de l'intégration web au suivi de production, jusqu'à l'impression des affiches et bâches grand format.",
    blocs: [],
    role: ["Graphisme", "Print", "Web"],
    ton: "#7EC6BC",
    sections: [
      {
        type: "grille",
        colonnes: 2,
        medias: [
          img(
            "/images/projets/espace-bocaud/capture-decran-2024-07-04-a-19-40-38.webp",
            "Affiche Joyeuses Pâques — Espace Bocaud",
            { fond: "#8FC7BE", contenir: true, ratio: "4 / 3" },
          ),
          img("/images/projets/espace-bocaud/80x120.webp", "Affiche Soldes — Espace Bocaud", {
            fond: "#F5C842",
            contenir: true,
            ratio: "4 / 3",
          }),
        ],
      },
      {
        type: "grille",
        colonnes: 1,
        medias: [
          img("/images/projets/espace-bocaud/site-1050x590.webp", "Bâche Soldes — Fondez de plaisir", {
            fond: "#F1AFC5",
            contenir: true,
            ratio: "16 / 7",
          }),
        ],
      },
      {
        type: "grille",
        colonnes: 1,
        medias: [
          img(
            "/images/projets/espace-bocaud/bache-hd-400x100-espacebocaux-paques-2019.webp",
            "Bâche grand format Joyeuses Pâques",
            { fond: "#8FC7BE", contenir: true, ratio: "16 / 6" },
          ),
        ],
      },
      {
        type: "grille",
        colonnes: 1,
        medias: [
          img("/images/projets/espace-bocaud/bache-4x1m-soldes.webp", "Bâche grand format Soldes", {
            fond: "#F5C842",
            contenir: true,
            ratio: "16 / 6",
          }),
        ],
      },
    ],
  },

  {
    slug: "peeka",
    nom: "PEEKA",
    tags: ["Identité visuelle", "Direction artistique"],
    vignette: "/images/projets/peeka/vignette.webp",
    chapeau: "Projet fictif — Master, Intuit Lab",
    intro:
      "Né comme un terrain d'exploration libre : imaginer une marque de savon de A à Z, du concept à la stratégie de communication, en passant par l'identité visuelle et la maquette du site web.",
    blocs: [
      {
        titre: "Le concept",
        texte:
          "Repenser le savon de demain multifonctionnel, protecteur, capable de s'adapter à chaque foyer en cassant les codes du produit d'hygiène classique. L'enjeu : le rendre à la fois inoffensif et attrayant. Son nom, PEEKA, fait écho au syndrome pica, son slogan résume l'ambition du projet « ce n'est pas que du savon ».",
      },
    ],
    role: ["Branding", "Direction artistique", "Identité visuelle", "Webdesign", "Graphisme"],
    ton: "#F08A1E",
    sections: [
      {
        type: "grille",
        colonnes: 1,
        medias: [
          img("/images/projets/peeka/image-de-marque.webp", "Image de marque PEEKA", {
            ratio: "16 / 9",
          }),
          img(
            "/images/projets/peeka/com-globale-communiquer-sur-le-pourquoi-de-notre-marque.webp",
            "Supports print PEEKA",
            { ratio: "16 / 9" },
          ),
          img(
            "/images/projets/peeka/image-de-marque-style-et-ton-de-langage.webp",
            "Style et ton de langage PEEKA",
            { ratio: "16 / 9" },
          ),
          img("/images/projets/peeka/com-globale.webp", "Maquette du site PEEKA", {
            ratio: "16 / 9",
          }),
        ],
      },
    ],
  },
];

/**
 * Ordre du prototype Figma pour la navigation « projet précédent / suivant »
 * en bas de page. Il diffère volontairement de l'ordre de la grille.
 */
const ordreNavigation = [
  "solem",
  "sharly-shaper",
  "cma-cgm",
  "bourbon",
  "borealis",
  "asics",
  "rosajou",
  "parc-spirou",
  "carmat",
  "merea",
  "espace-bocaud",
  "peeka",
];

/** Ordre de la grille de la page Réalisations (lecture ligne par ligne). */
export const ordreGrille = [
  "solem",
  "cma-cgm",
  "bourbon",
  "sharly-shaper",
  "borealis",
  "asics",
  "merea",
  "parc-spirou",
  "carmat",
  "rosajou",
  "domaine-de-la-gineste",
  "peeka",
  "espace-bocaud",
];

const parSlug = new Map(projets.map((projet) => [projet.slug, projet]));

export function getProjet(slug: string) {
  return parSlug.get(slug);
}

/** Les projets dans l'ordre de la grille Réalisations. */
export const projetsGrille = ordreGrille
  .map((slug) => parSlug.get(slug))
  .filter((projet): projet is Projet => Boolean(projet));

/** Voisins d'un projet dans l'ordre du prototype. */
export function getVoisins(slug: string) {
  const index = ordreNavigation.indexOf(slug);
  if (index === -1) return { precedent: undefined, suivant: undefined };
  return {
    precedent: index > 0 ? parSlug.get(ordreNavigation[index - 1]) : undefined,
    suivant:
      index < ordreNavigation.length - 1
        ? parSlug.get(ordreNavigation[index + 1])
        : undefined,
  };
}

/** Bandeau défilant de la page Réalisations. */
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
