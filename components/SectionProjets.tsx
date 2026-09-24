"use client";

import { useRef } from "react";

import { projets, selectionHome } from "@/lib/data";
import { CarteProjet } from "./CarteProjet";
import { Rail, type RailHandle } from "./Rail";
import { SectionTitre } from "./SectionTitre";
import { PillLink, RailArrows } from "./ui";

/** Projets listés sur mobile à la place du rail, dans l'ordre de la maquette. */
const SELECTION_MOBILE = ["solem", "domaine-de-la-gineste", "asics", "sharly-shaper", "cma-cgm"];

export function SectionProjets() {
  const controls = useRef<RailHandle | null>(null);
  const selection = projets.filter((projet) => selectionHome.includes(projet.slug));
  const selectionMobile = SELECTION_MOBILE.flatMap((slug) =>
    projets.filter((projet) => projet.slug === slug),
  );

  const voirTout = (
    <PillLink
      href="/projets"
      className="bg-orange text-white max-md:py-2 max-md:pl-5 max-md:text-[15px]"
      badgeClassName="bg-white text-orange"
    >
      Voir tous les projets
    </PillLink>
  );

  return (
    <section id="projets" className="scroll-mt-28 bg-cream py-14 md:py-24">
      <SectionTitre action={voirTout}>
        Sélection de <span className="font-light italic text-orange">projets</span>
        .
      </SectionTitre>

      {/* Mobile : une colonne de cartes plutôt qu'un rail. */}
      <div className="gutter mt-7 flex flex-col gap-7 md:hidden">
        {selectionMobile.map((projet) => (
          <CarteProjet key={projet.slug} projet={projet} pleineLargeur />
        ))}
        <div className="mt-2 flex justify-center">{voirTout}</div>
      </div>

      <div className="hidden md:block">
        <Rail
          controlsRef={controls}
          speed={26}
          className="mt-10 pl-16 2xl:pl-32"
        >
          {selection.map((projet) => (
            <CarteProjet key={projet.slug} projet={projet} />
          ))}
        </Rail>

        <div className="gutter mt-8 flex justify-end">
          <RailArrows
            onPrev={() => controls.current?.prev()}
            onNext={() => controls.current?.next()}
          />
        </div>
      </div>
    </section>
  );
}
