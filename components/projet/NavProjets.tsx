import Link from "next/link";

import { voisins } from "@/lib/projets";

/** Liens « ← projet précédent » / « projet suivant → » en bas de page. */
export function NavProjets({ slug }: { slug: string }) {
  const { precedent, suivant } = voisins(slug);

  return (
    <nav
      aria-label="Autres projets"
      className="flex items-center justify-between px-6 py-20 text-sm font-medium md:px-8"
    >
      {precedent ? (
        <Link
          href={`/projets/${precedent.slug}`}
          className="group flex items-center gap-2 uppercase hover:text-orange"
        >
          <Fleche className="rotate-180 transition-transform group-hover:-translate-x-1" />
          {precedent.nom}
        </Link>
      ) : (
        <span />
      )}
      {suivant ? (
        <Link
          href={`/projets/${suivant.slug}`}
          className="group flex items-center gap-2 uppercase hover:text-orange"
        >
          {suivant.nom}
          <Fleche className="transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </nav>
  );
}

function Fleche({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-4 ${className}`} fill="none" strokeWidth="1.8" aria-hidden="true">
      <path
        d="M4 12h16m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
