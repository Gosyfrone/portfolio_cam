import Link from "next/link";

import type { Projet } from "@/lib/projets";

/** Navigation « projet précédent / suivant » en bas de page. */
export function NavProjets({
  precedent,
  suivant,
}: {
  precedent?: Projet;
  suivant?: Projet;
}) {
  if (!precedent && !suivant) return null;

  return (
    <nav
      aria-label="Projets"
      className="gutter flex items-center justify-between gap-6 py-16"
    >
      {precedent ? (
        <Link
          href={`/projets/${precedent.slug}`}
          className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-wide transition-colors hover:text-orange"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="1.6">
            <path
              d="M20 12H4m0 0 6-6m-6 6 6 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {precedent.nom}
        </Link>
      ) : (
        <span />
      )}

      {suivant ? (
        <Link
          href={`/projets/${suivant.slug}`}
          className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-wide transition-colors hover:text-orange"
        >
          {suivant.nom}
          <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="1.6">
            <path
              d="M4 12h16m0 0-6-6m6 6-6 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
