import Image from "next/image";
import Link from "next/link";

import { projetsGrille } from "@/lib/projets";
import { ImagePlaceholder } from "./ui";

/** Grille deux colonnes de la page Réalisations. */
export function GrilleProjets() {
  return (
    <section id="grille" className="gutter scroll-mt-24 py-20">
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
        {projetsGrille.map((projet) => (
          <article key={projet.slug}>
            <Link
              href={`/projets/${projet.slug}`}
              className="group block overflow-hidden rounded-card"
            >
              <div className="relative aspect-[600/415] bg-sand">
                {projet.vignette ? (
                  <Image
                    src={projet.vignette}
                    alt={projet.nom}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <ImagePlaceholder label={`Visuel ${projet.nom}`} />
                )}
              </div>
            </Link>

            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide">{projet.nom}</h2>
                <p className="mt-0.5 text-[13px] text-orange">{projet.tags.join(" | ")}</p>
              </div>

              <Link
                href={`/projets/${projet.slug}`}
                className="shrink-0 rounded-pill bg-ink px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-orange"
              >
                Voir le projet
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
