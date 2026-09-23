"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { salonsFrancais, salonsInternationaux } from "@/lib/data";
import { CarteEvenement } from "./CarteEvenement";
import { Rail, type RailHandle } from "./Rail";
import { SectionTitre } from "./SectionTitre";
import { RailArrows } from "./ui";

type Onglet = "fr" | "intl";

export function SectionEvenements() {
  const [onglet, setOnglet] = useState<Onglet>("fr");
  const controls = useRef<RailHandle | null>(null);

  const evenements = onglet === "fr" ? salonsFrancais : salonsInternationaux;

  return (
    <section className="bg-cream pt-14 pb-4 md:py-24">
      <SectionTitre action={<Toggle valeur={onglet} onChange={setOnglet} />}>
        Sélection des{" "}
        <span className="font-light italic text-sage">événements SOLEM</span>.
      </SectionTitre>

      {/* La clé force le remontage du rail : le défilement repart proprement au changement d'onglet. */}
      <Rail
        key={onglet}
        controlsRef={controls}
        speed={26}
        className="mt-7 pl-6 md:mt-10 md:pl-16 2xl:pl-32"
      >
        {evenements.map((evenement) => (
          <CarteEvenement key={evenement.nom} evenement={evenement} />
        ))}
      </Rail>

      <div className="gutter mt-3 flex justify-end md:mt-8">
        <RailArrows
          onPrev={() => controls.current?.prev()}
          onNext={() => controls.current?.next()}
        />
      </div>
    </section>
  );
}

function Toggle({
  valeur,
  onChange,
}: {
  valeur: Onglet;
  onChange: (valeur: Onglet) => void;
}) {
  const options: { id: Onglet; label: string }[] = [
    { id: "fr", label: "Salons Français" },
    { id: "intl", label: "Salons Internationaux" },
  ];

  const boutons = useRef<Record<string, HTMLButtonElement | null>>({});
  const [curseur, setCurseur] = useState({ left: 0, width: 0 });

  // Les deux libellés n'ont pas la même largeur : on mesure le bouton actif
  // pour que la pastille se cale exactement dessus.
  useLayoutEffect(() => {
    const mesurer = () => {
      const actif = boutons.current[valeur];
      if (actif) {
        setCurseur({ left: actif.offsetLeft, width: actif.offsetWidth });
      }
    };
    mesurer();
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, [valeur]);

  return (
    <div
      role="tablist"
      aria-label="Type de salons"
      className="relative flex items-center rounded-pill border border-sage/60 p-1"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 rounded-pill bg-sage transition-[transform,width] duration-300 ease-out"
        style={{
          width: curseur.width,
          transform: `translateX(${curseur.left}px)`,
          left: 0,
        }}
      />
      {options.map((option) => (
        <button
          key={option.id}
          ref={(el) => {
            boutons.current[option.id] = el;
          }}
          type="button"
          role="tab"
          aria-selected={valeur === option.id}
          onClick={() => onChange(option.id)}
          className={`relative z-10 whitespace-nowrap rounded-pill px-4 py-2 text-[13px] md:px-6 md:py-2.5 md:text-[15px] transition-colors duration-300 ${
            valeur === option.id ? "text-white" : "text-sage"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
