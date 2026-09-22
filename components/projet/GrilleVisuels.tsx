import Image from "next/image";

import type { FicheProjet } from "@/lib/projets";
import type { Rangee } from "@/lib/visuels";
import { Pastille } from "./Pastille";

/**
 * Rangées de visuels reprenant la mise en page de la maquette : chaque
 * visuel garde sa part de largeur et son ratio, la rangée garde sa largeur.
 * Sous md, les visuels s'empilent.
 */
export function GrilleVisuels({
  rangees,
  fiche,
}: {
  rangees: Rangee[];
  fiche: FicheProjet;
}) {
  return (
    <div className="gutter space-y-3 md:space-y-4">
      {rangees.map((rangee, i) => (
        <section key={i} className={rangee.label ? "pt-6 first:pt-0 md:pt-10" : undefined}>
          {rangee.label ? (
            <Pastille ton={rangee.ton} className="mb-4">
              {rangee.label}
            </Pastille>
          ) : null}

          {rangee.texte && fiche.blocTexte ? (
            <RangeeTexte rangee={rangee} fiche={fiche} />
          ) : (
            <div
              className="flex w-full flex-col gap-3 md:w-[var(--largeur)] md:flex-row md:gap-4"
              style={{ "--largeur": `${rangee.largeur * 100}%` } as React.CSSProperties}
            >
              {rangee.visuels.map((visuel) => (
                <Visuel
                  key={visuel.src}
                  src={visuel.src}
                  ratio={visuel.ratio}
                  // flex-grow proportionnel à la largeur : les hauteurs de la
                  // rangée s'alignent comme dans la maquette.
                  className="md:[flex:var(--part)_1_0%]"
                  style={{ "--part": visuel.part } as React.CSSProperties}
                  sizes={`(max-width: 768px) 100vw, ${Math.round(visuel.part * rangee.largeur * 100)}vw`}
                  alt={`${fiche.nom} — visuel`}
                />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function RangeeTexte({ rangee, fiche }: { rangee: Rangee; fiche: FicheProjet }) {
  const visuel = rangee.visuels[0];
  return (
    <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
      <Visuel
        src={visuel.src}
        ratio={visuel.ratio}
        sizes="(max-width: 768px) 100vw, 50vw"
        alt={`${fiche.nom} — visuel`}
      />
      <div className="space-y-5">
        {fiche.blocTexte?.map((p) => (
          <div key={p.titre}>
            <h2 className="text-2xl font-medium">{p.titre}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slate">{p.texte}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Visuel({
  src,
  ratio,
  sizes,
  alt,
  className = "",
  style,
}: {
  src: string;
  ratio: number;
  sizes: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] bg-sand ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
