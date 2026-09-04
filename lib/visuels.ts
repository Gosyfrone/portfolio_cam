// ⚠️ Fichier généré par scripts/generer-visuels.mjs à partir de _manifest.json.
// Ne pas éditer à la main : relancer `node scripts/generer-visuels.mjs`.

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
  /** Part de la largeur utile occupée par la rangée (1 = pleine largeur). */
  largeur: number;
  visuels: Visuel[];
};

export const visuelsParProjet: Record<string, Rangee[]> = {
  "cma-cgm": [
    {
      "label": "Campagne Heading to safety",
      "ton": "encre",
      "largeur": 0.429,
      "visuels": [
        {
          "src": "/images/projets/cma-cgm/01.webp",
          "ratio": 1.1986,
          "part": 1
        }
      ]
    },
    {
      "largeur": 0.971,
      "visuels": [
        {
          "src": "/images/projets/cma-cgm/02.webp",
          "ratio": 1.3359,
          "part": 0.442
        },
        {
          "src": "/images/projets/cma-cgm/03.webp",
          "ratio": 1.687,
          "part": 0.558
        }
      ]
    },
    {
      "largeur": 0.537,
      "visuels": [
        {
          "src": "/images/projets/cma-cgm/04.webp",
          "ratio": 1.7381,
          "part": 1
        }
      ]
    },
    {
      "largeur": 0.993,
      "visuels": [
        {
          "src": "/images/projets/cma-cgm/05.webp",
          "ratio": 1.35,
          "part": 0.333
        },
        {
          "src": "/images/projets/cma-cgm/06.webp",
          "ratio": 1.35,
          "part": 0.333
        },
        {
          "src": "/images/projets/cma-cgm/07.webp",
          "ratio": 1.35,
          "part": 0.333
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/cma-cgm/08.webp",
          "ratio": 1.279,
          "part": 1
        }
      ]
    },
    {
      "label": "Leaflet Safety Barriers",
      "ton": "brique",
      "largeur": 0.985,
      "visuels": [
        {
          "src": "/images/projets/cma-cgm/09.webp",
          "ratio": 1.34,
          "part": 0.333
        },
        {
          "src": "/images/projets/cma-cgm/10.webp",
          "ratio": 1.34,
          "part": 0.333
        },
        {
          "src": "/images/projets/cma-cgm/11.webp",
          "ratio": 1.34,
          "part": 0.333
        }
      ]
    },
    {
      "label": "Poster Risques Psycho-Sociaux",
      "ton": "encre",
      "largeur": 0.985,
      "visuels": [
        {
          "src": "/images/projets/cma-cgm/12.webp",
          "ratio": 1.5,
          "part": 0.336
        },
        {
          "src": "/images/projets/cma-cgm/13.webp",
          "ratio": 1.4944,
          "part": 0.331
        },
        {
          "src": "/images/projets/cma-cgm/14.webp",
          "ratio": 1.5056,
          "part": 0.333
        }
      ]
    },
    {
      "label": "Livre de recette",
      "ton": "sauge",
      "largeur": 0.971,
      "visuels": [
        {
          "src": "/images/projets/cma-cgm/15.webp",
          "ratio": 1.65,
          "part": 0.5
        },
        {
          "src": "/images/projets/cma-cgm/16.webp",
          "ratio": 1.65,
          "part": 0.5
        }
      ]
    },
    {
      "largeur": 0.971,
      "visuels": [
        {
          "src": "/images/projets/cma-cgm/17.webp",
          "ratio": 1.6639,
          "part": 0.5
        },
        {
          "src": "/images/projets/cma-cgm/18.webp",
          "ratio": 1.6639,
          "part": 0.5
        }
      ]
    }
  ],
  "bourbon": [
    {
      "label": "Campagne Horizon",
      "ton": "bleu",
      "largeur": 0.988,
      "visuels": [
        {
          "src": "/images/projets/bourbon/01.webp",
          "ratio": 1.1765,
          "part": 0.496
        },
        {
          "src": "/images/projets/bourbon/02.webp",
          "ratio": 1.1941,
          "part": 0.504
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/bourbon/03.webp",
          "ratio": 1.6667,
          "part": 1
        }
      ]
    },
    {
      "label": "Campagne Safety Post",
      "ton": "brique",
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/bourbon/04.webp",
          "ratio": 1.6532,
          "part": 1
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/bourbon/05.webp",
          "ratio": 2.0197,
          "part": 1
        }
      ]
    }
  ],
  "sharly-shaper": [
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/sharly-shaper/01.webp",
          "ratio": 1.9758,
          "part": 1
        }
      ]
    }
  ],
  "borealis": [
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/borealis/01.webp",
          "ratio": 2.9638,
          "part": 1
        }
      ]
    },
    {
      "largeur": 0.99,
      "visuels": [
        {
          "src": "/images/projets/borealis/02.webp",
          "ratio": 1.4889,
          "part": 0.332
        },
        {
          "src": "/images/projets/borealis/03.webp",
          "ratio": 1.5,
          "part": 0.334
        },
        {
          "src": "/images/projets/borealis/04.webp",
          "ratio": 1.5,
          "part": 0.334
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/borealis/05.webp",
          "ratio": 1.9245,
          "part": 1
        }
      ]
    },
    {
      "largeur": 0.988,
      "visuels": [
        {
          "src": "/images/projets/borealis/06.webp",
          "ratio": 1.5056,
          "part": 0.333
        },
        {
          "src": "/images/projets/borealis/07.webp",
          "ratio": 1.5169,
          "part": 0.335
        },
        {
          "src": "/images/projets/borealis/08.webp",
          "ratio": 1.5056,
          "part": 0.333
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/borealis/09.webp",
          "ratio": 1.8296,
          "part": 1
        }
      ]
    }
  ],
  "asics": [
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/asics/01.webp",
          "ratio": 2.9565,
          "part": 1
        }
      ]
    },
    {
      "largeur": 0.985,
      "visuels": [
        {
          "src": "/images/projets/asics/02.webp",
          "ratio": 1.7788,
          "part": 0.5
        },
        {
          "src": "/images/projets/asics/03.webp",
          "ratio": 1.7788,
          "part": 0.5
        }
      ]
    },
    {
      "largeur": 0.985,
      "visuels": [
        {
          "src": "/images/projets/asics/04.webp",
          "ratio": 1.7788,
          "part": 0.5
        },
        {
          "src": "/images/projets/asics/05.webp",
          "ratio": 1.7788,
          "part": 0.5
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/asics/06.webp",
          "ratio": 7.0345,
          "part": 1
        }
      ]
    },
    {
      "largeur": 0.971,
      "visuels": [
        {
          "src": "/images/projets/asics/07.webp",
          "ratio": 1.4194,
          "part": 0.333
        },
        {
          "src": "/images/projets/asics/08.webp",
          "ratio": 1.4194,
          "part": 0.333
        },
        {
          "src": "/images/projets/asics/09.webp",
          "ratio": 1.4194,
          "part": 0.333
        }
      ]
    },
    {
      "largeur": 0.985,
      "visuels": [
        {
          "src": "/images/projets/asics/10.webp",
          "ratio": 1.2968,
          "part": 0.5
        },
        {
          "src": "/images/projets/asics/11.webp",
          "ratio": 1.2968,
          "part": 0.5
        }
      ]
    }
  ],
  "merea": [
    {
      "largeur": 0.961,
      "visuels": [
        {
          "src": "/images/projets/merea/01.webp",
          "ratio": 1.0147,
          "part": 0.352
        },
        {
          "src": "/images/projets/merea/02.webp",
          "ratio": 1.1765,
          "part": 0.408
        },
        {
          "src": "/images/projets/merea/03.webp",
          "ratio": 0.7068,
          "part": 0.24
        }
      ]
    },
    {
      "largeur": 0.931,
      "visuels": [
        {
          "src": "/images/projets/merea/04.webp",
          "ratio": 0.7767,
          "part": 0.211
        },
        {
          "src": "/images/projets/merea/05.webp",
          "ratio": 1.068,
          "part": 0.289
        },
        {
          "src": "/images/projets/merea/06.webp",
          "ratio": 0.7767,
          "part": 0.211
        },
        {
          "src": "/images/projets/merea/07.webp",
          "ratio": 1.068,
          "part": 0.289
        }
      ]
    },
    {
      "largeur": 0.995,
      "visuels": [
        {
          "src": "/images/projets/merea/08.webp",
          "ratio": 1.8044,
          "part": 1
        }
      ]
    },
    {
      "largeur": 0.983,
      "visuels": [
        {
          "src": "/images/projets/merea/09.webp",
          "ratio": 0.3025,
          "part": 0.489
        },
        {
          "src": "/images/projets/merea/10.webp",
          "ratio": 0.3164,
          "part": 0.511
        }
      ]
    }
  ],
  "parc-spirou": [
    {
      "largeur": 0.936,
      "visuels": [
        {
          "src": "/images/projets/parc-spirou/01.webp",
          "ratio": 0.8594,
          "part": 0.288
        },
        {
          "src": "/images/projets/parc-spirou/02.webp",
          "ratio": 1.2656,
          "part": 0.424
        },
        {
          "src": "/images/projets/parc-spirou/03.webp",
          "ratio": 0.8594,
          "part": 0.288
        }
      ]
    },
    {
      "largeur": 0.968,
      "visuels": [
        {
          "src": "/images/projets/parc-spirou/04.webp",
          "ratio": 0.5649,
          "part": 0.22
        },
        {
          "src": "/images/projets/parc-spirou/05.webp",
          "ratio": 0.8182,
          "part": 0.319
        },
        {
          "src": "/images/projets/parc-spirou/06.webp",
          "ratio": 1.1818,
          "part": 0.461
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/parc-spirou/07.webp",
          "ratio": 1.8545,
          "part": 1
        }
      ]
    },
    {
      "largeur": 0.971,
      "visuels": [
        {
          "src": "/images/projets/parc-spirou/08.webp",
          "ratio": 1.8333,
          "part": 0.5
        },
        {
          "src": "/images/projets/parc-spirou/09.webp",
          "ratio": 1.8505,
          "part": 0.5
        }
      ]
    },
    {
      "largeur": 0.963,
      "visuels": [
        {
          "src": "/images/projets/parc-spirou/10.webp",
          "ratio": 0.7792,
          "part": 0.305
        },
        {
          "src": "/images/projets/parc-spirou/11.webp",
          "ratio": 1.0065,
          "part": 0.394
        },
        {
          "src": "/images/projets/parc-spirou/12.webp",
          "ratio": 0.7662,
          "part": 0.3
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/parc-spirou/13.webp",
          "ratio": 1.0909,
          "part": 1
        }
      ]
    }
  ],
  "carmat": [
    {
      "largeur": 0.961,
      "visuels": [
        {
          "src": "/images/projets/carmat/01.webp",
          "ratio": 0.4139,
          "part": 0.288
        },
        {
          "src": "/images/projets/carmat/02.webp",
          "ratio": 0.6531,
          "part": 0.452
        },
        {
          "src": "/images/projets/carmat/03.webp",
          "ratio": 0.3764,
          "part": 0.26
        }
      ]
    },
    {
      "largeur": 0.971,
      "visuels": [
        {
          "src": "/images/projets/carmat/04.webp",
          "ratio": 1.3333,
          "part": 0.333
        },
        {
          "src": "/images/projets/carmat/05.webp",
          "ratio": 1.3333,
          "part": 0.333
        },
        {
          "src": "/images/projets/carmat/06.webp",
          "ratio": 1.3333,
          "part": 0.333
        }
      ]
    },
    {
      "largeur": 0.99,
      "visuels": [
        {
          "src": "/images/projets/carmat/07.webp",
          "ratio": 1.6423,
          "part": 0.5
        },
        {
          "src": "/images/projets/carmat/08.webp",
          "ratio": 1.6423,
          "part": 0.5
        }
      ]
    },
    {
      "largeur": 0.99,
      "visuels": [
        {
          "src": "/images/projets/carmat/09.webp",
          "ratio": 1.3767,
          "part": 0.498
        },
        {
          "src": "/images/projets/carmat/10.webp",
          "ratio": 1.3904,
          "part": 0.502
        }
      ]
    }
  ],
  "rosajou": [
    {
      "largeur": 0.993,
      "visuels": [
        {
          "src": "/images/projets/rosajou/01.webp",
          "ratio": 2.9137,
          "part": 1
        }
      ]
    },
    {
      "largeur": 0.694,
      "visuels": [
        {
          "src": "/images/projets/rosajou/02.webp",
          "ratio": 0.903,
          "part": 0.527
        },
        {
          "src": "/images/projets/rosajou/03.webp",
          "ratio": 0.8072,
          "part": 0.473
        }
      ]
    },
    {
      "largeur": 0.988,
      "visuels": [
        {
          "src": "/images/projets/rosajou/04.webp",
          "ratio": 1.4362,
          "part": 0.335
        },
        {
          "src": "/images/projets/rosajou/05.webp",
          "ratio": 1.4255,
          "part": 0.333
        },
        {
          "src": "/images/projets/rosajou/06.webp",
          "ratio": 1.4255,
          "part": 0.333
        }
      ]
    },
    {
      "largeur": 0.985,
      "visuels": [
        {
          "src": "/images/projets/rosajou/07.webp",
          "ratio": 1.3284,
          "part": 0.443
        },
        {
          "src": "/images/projets/rosajou/08.webp",
          "ratio": 1,
          "part": 0.333
        },
        {
          "src": "/images/projets/rosajou/09.webp",
          "ratio": 0.6716,
          "part": 0.224
        }
      ]
    },
    {
      "largeur": 0.983,
      "visuels": [
        {
          "src": "/images/projets/rosajou/10.webp",
          "ratio": 1.0909,
          "part": 0.269
        },
        {
          "src": "/images/projets/rosajou/11.webp",
          "ratio": 1.7778,
          "part": 0.439
        },
        {
          "src": "/images/projets/rosajou/12.webp",
          "ratio": 1.1818,
          "part": 0.292
        }
      ]
    },
    {
      "largeur": 0.495,
      "visuels": [
        {
          "src": "/images/projets/rosajou/13.webp",
          "ratio": 1.4963,
          "part": 1
        }
      ]
    }
  ],
  "peeka": [
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/peeka/01.webp",
          "ratio": 1.786,
          "part": 1
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/peeka/02.webp",
          "ratio": 1.7783,
          "part": 1
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/peeka/03.webp",
          "ratio": 1.7783,
          "part": 1
        }
      ]
    }
  ],
  "espace-bocaud-jacou": [
    {
      "largeur": 0.941,
      "visuels": [
        {
          "src": "/images/projets/espace-bocaud-jacou/01.webp",
          "ratio": 1.1707,
          "part": 0.5
        },
        {
          "src": "/images/projets/espace-bocaud-jacou/02.webp",
          "ratio": 1.1707,
          "part": 0.5
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/espace-bocaud-jacou/03.webp",
          "ratio": 2.2921,
          "part": 1
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/espace-bocaud-jacou/04.webp",
          "ratio": 3.3171,
          "part": 1
        }
      ]
    },
    {
      "largeur": 1,
      "visuels": [
        {
          "src": "/images/projets/espace-bocaud-jacou/05.webp",
          "ratio": 3.3171,
          "part": 1
        }
      ]
    }
  ]
};
