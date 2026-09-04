import type { Metadata } from "next";

import { BandeauServices } from "@/components/BandeauServices";
import { Footer } from "@/components/Footer";
import { GrilleProjets } from "@/components/GrilleProjets";
import { HeroRealisations } from "@/components/HeroRealisations";
import { Navbar } from "@/components/Navbar";
import { outils } from "@/lib/projets";

export const metadata: Metadata = {
  title: "Réalisations — Camille Hermantier Rivet",
  description:
    "Sélection de projets d'identité visuelle, print, digital et événementiel.",
};

export default function Realisations() {
  return (
    <>
      <Navbar />
      <main>
        <HeroRealisations />
        <BandeauServices
          items={outils}
          duration={50}
          className="bg-orange text-white"
          itemClassName="text-lg md:text-xl"
          sparkleClassName="text-white"
        />
        <GrilleProjets />
      </main>
      <Footer />
    </>
  );
}
