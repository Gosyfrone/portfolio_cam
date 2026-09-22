import Image from "next/image";

// Visuels de design/RESSOURCES/Realisations, répartis sur deux colonnes.
const colonnes = [
  ["07", "05", "08", "11", "01", "09"],
  ["06", "03", "10", "04", "12", "02"],
].map((ids) => ids.map((id) => `/images/realisations/${id}.webp`));

/**
 * Hero sombre de la page Réalisations : deux colonnes de visuels qui
 * défilent en sens inverse. Le contenu texte de gauche est vide dans la
 * maquette ; seul le titre de page y est posé.
 */
export function HeroRealisations() {
  return (
    <section className="relative -mt-[96px] flex min-h-[100svh] overflow-hidden bg-ink pt-[96px] text-cream">
      <div className="gutter relative z-10 flex flex-1 flex-col justify-end pb-10 md:pb-14">
        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          Réalisations<span className="text-orange">.</span>
        </h1>
        <a
          href="#liste"
          aria-label="Voir les projets"
          className="mt-10 grid size-10 place-items-center rounded-full border border-cream/80 transition-colors hover:bg-cream hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="1.6">
            <path
              d="M12 4v16m0 0-6-6m6 6 6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[4%] hidden w-[38%] max-w-[760px] gap-[6%] md:flex"
      >
        {colonnes.map((images, i) => (
          <div key={i} className="flex-1">
            <div
              className="marquee-y flex flex-col"
              data-reverse={i === 1}
              style={{ "--marquee-duration": "70s" } as React.CSSProperties}
            >
              {[...images, ...images].map((src, j) => (
                <div
                  key={j}
                  className="relative mb-6 aspect-[4/3] overflow-hidden rounded-card"
                >
                  <Image src={src} alt="" fill sizes="20vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
