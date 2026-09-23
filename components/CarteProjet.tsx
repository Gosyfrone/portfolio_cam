import Image from "next/image";
import Link from "next/link";

import type { Projet } from "@/lib/data";
import { ImagePlaceholder } from "./ui";

export function CarteProjet({
  projet,
  pleineLargeur = false,
}: {
  projet: Projet;
  /** Grille de la page Réalisations : la carte prend sa colonne. */
  pleineLargeur?: boolean;
}) {
  const lien = projet.aPage === false ? null : `/projets/${projet.slug}`;

  const visuel = (
    <div
      className={`relative overflow-hidden rounded-card bg-sand ${
        pleineLargeur ? "aspect-square md:aspect-[3/2]" : "aspect-[600/470]"
      }`}
    >
      {projet.image ? (
        <Image
          src={projet.image}
          alt={projet.nom}
          fill
          sizes={pleineLargeur ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 78vw, 600px"}
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      ) : (
        <ImagePlaceholder label={`Visuel ${projet.nom}`} />
      )}
    </div>
  );

  return (
    <article className={pleineLargeur ? "w-full" : "w-[min(600px,78vw)] shrink-0"}>
      {lien ? (
        <Link href={lien} tabIndex={-1} aria-hidden="true">
          {visuel}
        </Link>
      ) : (
        visuel
      )}

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold uppercase tracking-wide md:text-sm">
            {projet.nom}
          </h3>
          <p className="mt-0.5 text-xs text-orange md:text-[13px]">
            {projet.tags.join(" | ")}
          </p>
        </div>

        {lien ? (
          <Link
            href={lien}
            className="shrink-0 rounded-pill bg-ink px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-orange"
          >
            Voir le projet
          </Link>
        ) : (
          <span className="shrink-0 rounded-pill bg-sand px-4 py-2 text-xs font-medium text-steel">
            Bientôt
          </span>
        )}
      </div>
    </article>
  );
}
