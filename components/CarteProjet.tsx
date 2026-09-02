import Image from "next/image";
import Link from "next/link";

import type { Projet } from "@/lib/data";
import { ImagePlaceholder } from "./ui";

export function CarteProjet({ projet }: { projet: Projet }) {
  return (
    <article className="w-[min(600px,78vw)] shrink-0">
      <div className="relative aspect-[600/470] overflow-hidden rounded-card bg-sand">
        {projet.image ? (
          <Image
            src={projet.image}
            alt={projet.nom}
            fill
            sizes="(max-width: 768px) 78vw, 600px"
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        ) : (
          <ImagePlaceholder label={`Visuel ${projet.nom}`} />
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide">
            {projet.nom}
          </h3>
          <p className="mt-0.5 text-[13px] text-orange">
            {projet.tags.join(" | ")}
          </p>
        </div>

        <Link
          href={`/projets/${projet.slug}`}
          className="shrink-0 rounded-pill bg-ink px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-orange"
        >
          Voir le projet
        </Link>
      </div>
    </article>
  );
}
