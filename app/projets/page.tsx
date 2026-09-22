import type { Metadata } from "next";

import { BandeauServices } from "@/components/BandeauServices";
import { CarteProjet } from "@/components/CarteProjet";
import { Footer } from "@/components/Footer";
import { HeroRealisations } from "@/components/HeroRealisations";
import { Navbar } from "@/components/Navbar";
import { outils, projets } from "@/lib/data";

export const metadata: Metadata = {
  title: "Réalisations — Camille Hermantier Rivet",
  description:
    "Identité visuelle, print, digital et événementiel : l'ensemble des projets de Camille Hermantier Rivet.",
};

export default function Realisations() {
  return (
    <>
      <Navbar />
      <main>
        <HeroRealisations />
        <BandeauServices
          items={outils}
          className="bg-orange text-white"
          itemClassName="text-lg md:text-2xl"
        />

        <section
          id="liste"
          aria-label="Tous les projets"
          className="gutter grid scroll-mt-28 gap-x-12 gap-y-14 py-20 md:grid-cols-2 md:py-28"
        >
          {projets.map((projet) => (
            <CarteProjet key={projet.slug} projet={projet} pleineLargeur />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
