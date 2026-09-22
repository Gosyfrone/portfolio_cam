import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { EnteteProjet } from "@/components/projet/EnteteProjet";
import { GrilleVisuels } from "@/components/projet/GrilleVisuels";
import { NavProjets } from "@/components/projet/NavProjets";
import { VideosProjet } from "@/components/projet/VideosProjet";
import { ContenuSolem } from "@/components/solem/ContenuSolem";
import { ficheParSlug, fiches } from "@/lib/projets";
import { visuelsParProjet } from "@/lib/visuels";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return fiches.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fiche = ficheParSlug((await params).slug);
  if (!fiche) return {};
  return {
    title: `${fiche.nom} — Camille Hermantier Rivet`,
    description: fiche.description[0]?.texte,
  };
}

export default async function PageProjet({ params }: Props) {
  const { slug } = await params;
  const fiche = ficheParSlug(slug);
  if (!fiche) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-8">
        <EnteteProjet fiche={fiche} />

        {slug === "solem" ? (
          <ContenuSolem />
        ) : (
          <>
            <GrilleVisuels rangees={visuelsParProjet[slug] ?? []} fiche={fiche} />
            {fiche.videos ? <VideosProjet videos={fiche.videos} /> : null}
          </>
        )}

        <NavProjets slug={slug} />
      </main>
      <Footer />
    </>
  );
}
