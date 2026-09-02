import Link from "next/link";
import type { ReactNode } from "react";

/** Petite étoile 8 branches utilisée comme séparateur dans les bandeaux. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      fill="currentColor"
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d="M12 12 10.6 3.2A1.4 1.4 0 0 1 12 1.6a1.4 1.4 0 0 1 1.4 1.6L12 12Z"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}

/** Flèche en diagonale dans une pastille (boutons « Voir tous les projets », etc.). */
export function ArrowBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid size-6 place-items-center rounded-full ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" className="size-3" fill="none" strokeWidth="2">
        <path
          d="M4 12L12 4M12 4H5.5M12 4v6.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

type PillLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  badgeClassName?: string;
};

/** Bouton pilule avec pastille flèche. */
export function PillLink({
  href,
  children,
  className = "",
  badgeClassName = "",
}: PillLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-pill py-1.5 pl-4 pr-1.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
    >
      {children}
      <ArrowBadge className={badgeClassName} />
    </Link>
  );
}

/** Flèches ← → de navigation d'un carrousel. */
export function RailArrows({
  onPrev,
  onNext,
  className = "",
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Précédent"
        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-ink/5"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="1.6">
          <path
            d="M20 12H4m0 0 6-6m-6 6 6 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Suivant"
        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-ink/5"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="1.6">
          <path
            d="M4 12h16m0 0-6-6m6 6-6 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

/** Placeholder visuel tant que l'image du Figma n'est pas fournie. */
export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="grid size-full place-items-center bg-sand">
      <span className="px-4 text-center text-xs uppercase tracking-widest text-steel">
        {label}
      </span>
    </div>
  );
}
