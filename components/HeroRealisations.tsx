import Image from "next/image";
import Link from "next/link";

import { projetsGrille } from "@/lib/projets";
import { MarqueeVertical } from "./MarqueeVertical";

/** Les deux colonnes du hero défilent en sens inverse, à des vitesses différentes. */
const visuels = projetsGrille
  .map((projet) => ({ src: projet.vignette, alt: projet.nom }))
  .filter((visuel): visuel is { src: string; alt: string } => Boolean(visuel.src));

const milieu = Math.ceil(visuels.length / 2);
const colonnes = [visuels.slice(0, milieu), visuels.slice(milieu)];

export function HeroRealisations() {
  return (
    <section className="relative -mt-[96px] flex min-h-screen flex-col overflow-hidden bg-ink pt-[96px] text-cream">
      <div className="gutter flex flex-1 flex-col gap-12 pb-16 lg:flex-row lg:items-center lg:gap-20">
        <div className="max-w-xl pt-10 lg:pt-0">
          {/* ⚠️ Zone laissée vide dans l'export Figma : contenu provisoire. */}
          <p className="text-sm uppercase tracking-[0.2em] text-steel">Portfolio</p>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Réalisations
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream/70">
            Identité visuelle, print, digital et événementiel : une sélection de
            projets menés en agence, en freelance et en entreprise.
          </p>
        </div>

        <div
          className="relative grid h-[58vh] max-h-[720px] min-h-[420px] grid-cols-2 gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] lg:h-[70vh] lg:max-h-none lg:flex-1"
          aria-hidden="true"
        >
          {colonnes.map((colonne, index) => (
            <MarqueeVertical
              key={index}
              duration={index === 0 ? 46 : 58}
              reverse={index === 1}
              className="h-full"
            >
              {colonne.map((visuel) => (
                <div
                  key={visuel.src}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-white/5"
                >
                  <Image
                    src={visuel.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </MarqueeVertical>
          ))}
        </div>
      </div>

      <div className="gutter pb-10">
        <Link
          href="#grille"
          aria-label="Voir les projets"
          className="inline-grid size-11 place-items-center rounded-full border border-cream/40 transition-colors hover:bg-cream hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="1.6">
            <path
              d="M12 4v16m0 0 6-6m-6 6-6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
