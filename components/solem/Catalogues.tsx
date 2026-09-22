"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

import { Pastille } from "../projet/Pastille";

const dossier = "/images/projets/solem";

/** Une zone peut porter plusieurs visuels : ils s'affichent alors côte à côte. */
const zones = [
  { id: "europe", label: "EUROPE", images: [`${dossier}/catalogue-europe.webp`] },
  {
    id: "ksa",
    label: "KSA",
    images: [
      `${dossier}/catalogue-ksa-couvertures.webp`,
      `${dossier}/catalogue-ksa.webp`,
    ],
  },
  { id: "usa", label: "USA", images: [`${dossier}/catalogue-usa.webp`] },
] as const;

type Zone = (typeof zones)[number]["id"];

/** Catalogues SOLEM, un onglet par zone. */
export function Catalogues() {
  const [zone, setZone] = useState<Zone>("europe");
  const actif = zones.find((z) => z.id === zone)!;

  const boutons = useRef<Record<string, HTMLButtonElement | null>>({});
  const [curseur, setCurseur] = useState({ left: 0, width: 0 });

  // Même principe que la bascule des salons : la pastille se cale sur le bouton actif.
  useLayoutEffect(() => {
    const mesurer = () => {
      const bouton = boutons.current[zone];
      if (bouton) setCurseur({ left: bouton.offsetLeft, width: bouton.offsetWidth });
    };
    mesurer();
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, [zone]);

  return (
    <section className="gutter">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Pastille>CATALOGUES</Pastille>

        <div
          role="tablist"
          aria-label="Zone du catalogue"
          className="relative flex items-center rounded-pill border border-orange/40 p-1"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-0 rounded-pill bg-orange transition-[transform,width] duration-300 ease-out"
            style={{ width: curseur.width, transform: `translateX(${curseur.left}px)` }}
          />
          {zones.map((z) => (
            <button
              key={z.id}
              ref={(el) => {
                boutons.current[z.id] = el;
              }}
              type="button"
              role="tab"
              aria-selected={zone === z.id}
              onClick={() => setZone(z.id)}
              className={`relative z-10 rounded-pill px-5 py-2 text-xs font-semibold transition-colors duration-300 md:px-7 ${
                zone === z.id ? "text-white" : "text-orange"
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
      </div>

      {actif.images.length === 1 ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-sand md:aspect-[1.39]">
          <Image
            key={actif.id}
            src={actif.images[0]}
            alt={`Catalogue SOLEM ${actif.label}`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {actif.images.map((image, i) => (
            <div
              key={image}
              className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-sand"
            >
              <Image
                src={image}
                alt={`Catalogue SOLEM ${actif.label} — visuel ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
