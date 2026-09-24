import Image from "next/image";
import Link from "next/link";

import type { FicheProjet } from "@/lib/projets";

/** Titre, description et rôle en tête de chaque page projet. */
export function EnteteProjet({ fiche }: { fiche: FicheProjet }) {
  return (
    <header className="gutter pb-12 pt-12 max-md:px-8 md:pb-24">
      <Link
        href="/projets"
        aria-label="Retour aux réalisations"
        className="inline-grid size-10 place-items-center rounded-full transition-colors hover:bg-ink/5"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="1.6">
          <path
            d="M20 12H4m0 0 6-6m-6 6 6 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* Mobile : tout centré, et le rôle remonte entre le titre et le texte
          (le bloc texte passe en `contents` pour que `order` s'applique). */}
      <div className="mt-6 flex flex-col items-center gap-y-8 text-center md:flex-row md:flex-wrap md:justify-between md:gap-x-20 md:gap-y-10 md:text-left lg:flex-nowrap">
        <div className="contents md:block md:max-w-[900px] lg:max-w-[min(900px,60%)]">
          <h1 className="order-1 flex flex-wrap items-center justify-center gap-6 text-[44px] font-bold leading-tight tracking-tight md:justify-start md:text-7xl lg:text-[88px] lg:leading-none">
            {fiche.nom}
            {fiche.illustration ? (
              <Image
                src={fiche.illustration}
                alt=""
                width={100}
                height={115}
                className="h-16 w-auto md:h-24"
              />
            ) : null}
          </h1>

          <div className="order-3">
            {fiche.accroche ? (
              <p className="text-[13px] text-ink md:mt-8 md:text-sm">{fiche.accroche}</p>
            ) : null}

            {/* Les maquettes refaites avec une accroche ont un texte plus grand et
                aligné à gauche ; SOLEM et Sharly Shaper gardent l'ancienne mise en forme. */}
            <div
              className={`text-[15px] leading-relaxed text-slate ${
                fiche.accroche
                  ? "mt-3 space-y-3 md:mt-2 md:text-lg md:leading-snug"
                  : "space-y-4 md:mt-8 md:text-base"
              }`}
            >
              {fiche.description.map((p, i) => (
                <div key={i}>
                  {p.titre ? (
                    <h2 className={`mb-1 font-medium text-ink ${fiche.accroche ? "md:text-[19px]" : ""}`}>
                      {p.titre}
                    </h2>
                  ) : null}
                  <p className={`whitespace-pre-line ${fiche.accroche ? "" : "md:text-justify"}`}>
                    {p.texte}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-2 flex shrink-0 flex-col items-center gap-3 md:flex-row md:gap-6">
          <Image src="/logo-camille.svg" alt="" width={120} height={120} className="size-[37px] md:size-[120px]" />
          <div className="text-[15px] md:text-sm">
            <p className="font-bold uppercase">Rôle</p>
            <ul className="mt-1 text-slate md:mt-2">
              {fiche.role.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
