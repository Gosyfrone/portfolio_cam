import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EnteteProjet } from "@/components/EnteteProjet";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { NavProjets } from "@/components/NavProjets";
import { SectionProjet } from "@/components/SectionProjet";
import { getProjet, getVoisins, projets } from "@/lib/projets";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projets.map((projet) => ({ slug: projet.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projet = getProjet(slug);
  if (!projet) return {};

  return {
    title: `${projet.nom} — Camille Hermantier Rivet`,
    description: projet.intro,
  };
}

export default async function PageProjet({ params }: Props) {
  const { slug } = await params;
  const projet = getProjet(slug);
  if (!projet) notFound();

  const { precedent, suivant } = getVoisins(slug);

  return (
    <>
      <Navbar />
      <main className="pt-6">
        <EnteteProjet projet={projet} />

        <div className="pb-8">
          {projet.sections.map((section, index) => (
            <SectionProjet key={index} section={section} ton={projet.ton} />
          ))}
        </div>

        <NavProjets precedent={precedent} suivant={suivant} />
      </main>
      <Footer />
    </>
  );
}
