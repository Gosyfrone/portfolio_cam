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
    <div className="gutter space-y-4 max-md:px-8">
      {rangees.map((rangee, i) => (
        <section
          key={i}
          className={`max-md:text-center ${rangee.label ? "pt-6 first:pt-0 md:pt-10" : ""}`}
        >
          {rangee.label ? (
            <Pastille ton={rangee.ton} className="mb-4">
              {rangee.label}
            </Pastille>
          ) : null}

          {rangee.texte && fiche.blocTexte ? (
            <RangeeTexte rangee={rangee} fiche={fiche} />
          ) : (
            <>
              <CarrouselMobile rangee={rangee} fiche={fiche} />
              <div
                className={`flex w-full flex-col gap-4 md:w-[var(--largeur)] md:flex-row ${
                  carrouselDe(rangee, fiche) ? "max-md:hidden" : ""
                }`}
                style={{ "--largeur": `${rangee.largeur * 100}%` } as React.CSSProperties}
              >
                {rangee.visuels.map((visuel) =>
                  fiche.defilement?.remplace === visuel.src ? (
                    <ColonnesDefilantes
                      key={visuel.src}
                      colonnes={fiche.defilement.colonnes}
                      ratio={visuel.ratio}
                      className="md:[flex:var(--part)_1_0%]"
                      style={{ "--part": visuel.part } as React.CSSProperties}
                    />
                  ) : (
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
                  ),
                )}
              </div>
            </>
          )}
        </section>
      ))}
    </div>
  );
}

function carrouselDe(rangee: Rangee, fiche: FicheProjet) {
  return fiche.carrouselsMobile?.find((c) => rangee.visuels.some((v) => v.src === c.rangee));
}

/**
 * Carrousel mobile d'une rangée : défilement natif avec aimantation, bord à
 * bord, la carte active centrée et ses voisines qui dépassent.
 */
function CarrouselMobile({ rangee, fiche }: { rangee: Rangee; fiche: FicheProjet }) {
  const carrousel = carrouselDe(rangee, fiche);
  if (!carrousel) return null;
  const images = carrousel.images ?? rangee.visuels;
  const largeur = carrousel.largeur ?? 80;

  return (
    <div
      className="-mx-8 flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
      style={{ paddingInline: `${(100 - largeur) / 2}vw` }}
    >
      {images.map((image) => (
        <Visuel
          key={image.src}
          src={image.src}
          ratio={image.ratio}
          className="shrink-0 snap-center"
          style={{ width: `${largeur}vw` }}
          sizes={`${largeur}vw`}
          alt={`${fiche.nom} — visuel`}
        />
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

/**
 * Fond sombre et deux longues captures de site en défilement infini :
 * celle de gauche monte, celle de droite descend (cf. HeroRealisations).
 */
function ColonnesDefilantes({
  colonnes,
  ratio,
  className = "",
  style,
}: {
  colonnes: [string, string];
  ratio: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex justify-center gap-[7.5%] overflow-hidden rounded-[20px] bg-ink ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      {colonnes.map((src, i) => (
        <div key={src} className="w-[25.5%]">
          <div
            className="marquee-y flex flex-col"
            data-reverse={i === 1}
            style={{ "--marquee-duration": "90s" } as React.CSSProperties}
          >
            {[src, src].map((s, j) => (
              // Deux copies, chacune suivie de son espacement : le -50% de
              // l'animation tombe pile sur le début de la seconde.
              <div key={j} className="pb-4 md:pb-6">
                <Image
                  src={s}
                  alt=""
                  width={900}
                  height={4300}
                  sizes="(max-width: 768px) 25vw, 26vw"
                  className="h-auto w-full rounded-[12px]"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
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
