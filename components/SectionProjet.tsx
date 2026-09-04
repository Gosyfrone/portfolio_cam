import type { Section } from "@/lib/projets";
import { EtiquetteSection } from "./EtiquetteSection";
import { OngletsMedias } from "./OngletsMedias";
import { RailMedias } from "./RailMedias";
import { TuileMedia } from "./TuileMedia";

const colonnes: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

const tailles: Record<number, string> = {
  1: "(max-width: 768px) 100vw, 80vw",
  2: "(max-width: 768px) 100vw, 42vw",
  3: "(max-width: 768px) 45vw, 28vw",
  4: "(max-width: 768px) 45vw, 21vw",
};

/** Rendu d'une section de page projet, selon son type. */
export function SectionProjet({ section, ton }: { section: Section; ton: string }) {
  if (section.type === "onglets") {
    return (
      <section className="py-10">
        <OngletsMedias onglets={section.onglets} etiquette={section.etiquette} ton={ton} />
      </section>
    );
  }

  if (section.type === "rail") {
    return (
      <section className="py-10">
        {section.etiquette ? (
          <div className="gutter">
            <EtiquetteSection etiquette={section.etiquette} />
          </div>
        ) : null}
        <RailMedias medias={section.medias} />
      </section>
    );
  }

  if (section.type === "duo") {
    return (
      <section className="gutter py-10">
        {section.etiquette ? (
          <div className="mb-6">
            <EtiquetteSection etiquette={section.etiquette} />
          </div>
        ) : null}

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <TuileMedia media={section.media} sizes="(max-width: 768px) 100vw, 45vw" />
          <div className="flex flex-col justify-center gap-6">
            {section.blocs.map((bloc) => (
              <div key={bloc.titre}>
                <h2 className="text-xl font-medium md:text-2xl">{bloc.titre}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{bloc.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const nb = section.colonnes ?? 2;

  return (
    <section className="gutter py-10">
      {section.etiquette ? (
        <div className="mb-6">
          <EtiquetteSection etiquette={section.etiquette} />
        </div>
      ) : null}

      <div
        className={
          section.fond ? "rounded-[20px] p-5 md:p-10" : undefined
        }
        style={section.fond ? { backgroundColor: section.fond } : undefined}
      >
        <div className={`grid gap-5 ${colonnes[nb]}`}>
          {section.medias.map((media, index) => (
            <TuileMedia key={index} media={media} sizes={tailles[nb]} />
          ))}
        </div>
      </div>
    </section>
  );
}
