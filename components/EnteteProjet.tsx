import Image from "next/image";
import Link from "next/link";

import type { Projet } from "@/lib/projets";

/** En-tête d'une page projet : retour, titre, texte de présentation et rôle. */
export function EnteteProjet({ projet }: { projet: Projet }) {
  return (
    <header className="gutter pb-6 pt-10 md:pt-14">
      <Link
        href="/projets"
        aria-label="Retour aux réalisations"
        className="inline-grid size-9 place-items-center rounded-full transition-colors hover:bg-ink/5"
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

      <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
        <div>
          <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-[76px]">
            {projet.nom}
          </h1>

          {projet.chapeau ? (
            <p className="mt-6 text-[13px] text-steel">{projet.chapeau}</p>
          ) : null}

          <div className={projet.chapeau ? "mt-2" : "mt-6"}>
            <p
              className={`max-w-[62ch] text-[15px] leading-relaxed text-ink ${
                projet.introLarge ? "text-justify" : ""
              }`}
            >
              {projet.intro}
            </p>

            {projet.blocs.map((bloc) => (
              <div key={bloc.titre} className="mt-5 max-w-[62ch]">
                <h2 className="text-[15px] font-semibold">{bloc.titre}</h2>
                <p className="mt-1 text-[15px] leading-relaxed text-ink">{bloc.texte}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-4 lg:pt-6">
          <Image
            src="/logo-camille.svg"
            alt=""
            width={72}
            height={72}
            className="shrink-0"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide">Rôle</p>
            <ul className="mt-1 space-y-0.5 text-[13px] text-slate">
              {projet.role.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
