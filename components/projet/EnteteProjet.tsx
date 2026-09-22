import Image from "next/image";
import Link from "next/link";

import type { FicheProjet } from "@/lib/projets";

/** Titre, description et rôle en tête de chaque page projet. */
export function EnteteProjet({ fiche }: { fiche: FicheProjet }) {
  return (
    <header className="gutter pb-16 pt-12 md:pb-24">
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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-20 gap-y-10 lg:flex-nowrap">
        <div className="max-w-[900px] lg:max-w-[min(900px,60%)]">
          <h1 className="flex flex-wrap items-center gap-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-[88px] lg:leading-none">
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

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-slate md:text-base">
            {fiche.description.map((p, i) => (
              <div key={i}>
                {p.titre ? (
                  <h2 className="mb-1 font-medium text-ink">{p.titre}</h2>
                ) : null}
                <p className="whitespace-pre-line md:text-justify">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-6">
          <Image src="/logo-camille.svg" alt="" width={120} height={120} className="size-20 md:size-[120px]" />
          <div className="text-sm">
            <p className="font-bold uppercase">Rôle</p>
            <ul className="mt-2 text-slate">
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
