"use client";

import { useRef, useState } from "react";

import { salonsFrancais, salonsInternationaux } from "@/lib/data";
import { CarteEvenement } from "./CarteEvenement";
import { Rail, type RailHandle } from "./Rail";
import { SectionTitre } from "./SectionTitre";
import { Segmente } from "./Segmente";
import { RailArrows } from "./ui";

const options = [
  { id: "fr", label: "Salons Français" },
  { id: "intl", label: "Salons Internationaux" },
];

export function SectionEvenements() {
  const [onglet, setOnglet] = useState("fr");
  const controls = useRef<RailHandle | null>(null);

  const evenements = onglet === "fr" ? salonsFrancais : salonsInternationaux;

  return (
    <section className="bg-cream py-24">
      <SectionTitre
        action={
          <Segmente
            label="Type de salons"
            options={options}
            valeur={onglet}
            onChange={setOnglet}
          />
        }
      >
        Sélection des{" "}
        <span className="font-light italic text-sage">événements SOLEM</span>.
      </SectionTitre>

      {/* La clé force le remontage du rail : le défilement repart proprement au changement d'onglet. */}
      <Rail
        key={onglet}
        controlsRef={controls}
        speed={26}
        className="mt-10 pl-6 md:pl-16 2xl:pl-32"
      >
        {evenements.map((evenement) => (
          <CarteEvenement key={evenement.nom} evenement={evenement} />
        ))}
      </Rail>

      <div className="gutter mt-8 flex justify-end">
        <RailArrows
          onPrev={() => controls.current?.prev()}
          onNext={() => controls.current?.next()}
        />
      </div>
    </section>
  );
}
