"use client";

import { useRef } from "react";

import { projetsGrille } from "@/lib/projets";
import { CarteProjet } from "./CarteProjet";
import { Rail, type RailHandle } from "./Rail";
import { SectionTitre } from "./SectionTitre";
import { PillLink, RailArrows } from "./ui";

export function SectionProjets() {
  const controls = useRef<RailHandle | null>(null);

  return (
    <section id="projets" className="scroll-mt-28 bg-cream py-24">
      <SectionTitre
        action={
          <PillLink
            href="/projets"
            className="bg-orange text-white"
            badgeClassName="bg-white text-orange"
          >
            Voir tous les projets
          </PillLink>
        }
      >
        Sélection de <span className="font-light italic text-orange">projets</span>
        .
      </SectionTitre>

      <Rail
        controlsRef={controls}
        speed={26}
        className="mt-10 pl-6 md:pl-16 2xl:pl-32"
      >
        {projetsGrille.map((projet) => (
          <CarteProjet key={projet.slug} projet={projet} />
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
