"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

import { Pastille } from "../projet/Pastille";
import { ImagePlaceholder } from "../ui";

const zones = [
  { id: "europe", label: "EUROPE", image: "/images/projets/solem/catalogue-europe.webp" },
  // Visuels des catalogues KSA et USA pas encore fournis.
  { id: "ksa", label: "KSA", image: null },
  { id: "usa", label: "USA", image: null },
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

      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-sand md:aspect-[1.39]">
        {actif.image ? (
          <Image
            key={actif.id}
            src={actif.image}
            alt={`Catalogue SOLEM ${actif.label}`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder label={`Catalogue ${actif.label} — visuel à fournir`} />
        )}
      </div>
    </section>
  );
}
