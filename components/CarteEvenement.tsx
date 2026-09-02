import Image from "next/image";

import type { Evenement } from "@/lib/data";
import { ImagePlaceholder } from "./ui";

export function CarteEvenement({ evenement }: { evenement: Evenement }) {
  return (
    <article className="w-[min(600px,78vw)] shrink-0">
      <div className="relative aspect-[600/440] overflow-hidden rounded-card bg-sand">
        {evenement.image ? (
          <Image
            src={evenement.image}
            alt={`${evenement.nom} — ${evenement.ville}`}
            fill
            sizes="(max-width: 768px) 78vw, 600px"
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        ) : (
          <ImagePlaceholder label={`Visuel ${evenement.nom}`} />
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="text-sm uppercase tracking-wide">
          <span className="font-bold">{evenement.nom}</span>
          <span className="text-slate"> | {evenement.ville}</span>
        </h3>
        {evenement.stand ? (
          <p className="shrink-0 text-[13px] text-sage">{evenement.stand}</p>
        ) : null}
      </div>
      <p className="mt-0.5 text-[13px] text-slate">{evenement.editions}</p>
    </article>
  );
}
