"use client";

import { useLayoutEffect, useRef, useState } from "react";

export type OptionSegment = { id: string; label: string };

type Props = {
  options: OptionSegment[];
  valeur: string;
  onChange: (valeur: string) => void;
  /** Couleur de la pastille active, du texte inactif et de la bordure. */
  ton?: string;
  /** Fond du conteneur (les onglets SOLEM sont posés sur un aplat blanc). */
  fond?: string;
  label: string;
};

/**
 * Sélecteur segmenté : la pastille glisse d'une option à l'autre.
 * Les libellés n'ont pas la même largeur, on mesure donc le bouton actif
 * pour caler la pastille exactement dessus.
 */
export function Segmente({
  options,
  valeur,
  onChange,
  ton = "var(--color-sage)",
  fond,
  label,
}: Props) {
  const boutons = useRef<Record<string, HTMLButtonElement | null>>({});
  const [curseur, setCurseur] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const mesurer = () => {
      const actif = boutons.current[valeur];
      if (actif) {
        setCurseur({ left: actif.offsetLeft, width: actif.offsetWidth });
      }
    };
    mesurer();
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, [valeur, options]);

  return (
    <div
      role="tablist"
      aria-label={label}
      className="relative flex items-center rounded-pill border p-1"
      style={{ borderColor: fond ? "rgba(0,0,0,.08)" : ton, backgroundColor: fond }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-0 rounded-pill transition-[transform,width] duration-300 ease-out"
        style={{
          width: curseur.width,
          transform: `translateX(${curseur.left}px)`,
          backgroundColor: ton,
        }}
      />
      {options.map((option) => (
        <button
          key={option.id}
          ref={(el) => {
            boutons.current[option.id] = el;
          }}
          type="button"
          role="tab"
          aria-selected={valeur === option.id}
          onClick={() => onChange(option.id)}
          className="relative z-10 whitespace-nowrap rounded-pill px-6 py-2.5 text-[15px] transition-colors duration-300"
          style={{ color: valeur === option.id ? "#fff" : ton }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
