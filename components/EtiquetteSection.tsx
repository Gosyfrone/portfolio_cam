import type { Etiquette } from "@/lib/projets";

/** Pilule outlinée qui ouvre chaque section d'une page projet. */
export function EtiquetteSection({ etiquette }: { etiquette: Etiquette }) {
  return (
    <p
      className="inline-flex rounded-[6px] border px-3 py-1.5 text-[13px] uppercase tracking-wide"
      style={{ borderColor: etiquette.ton, color: etiquette.ton }}
    >
      {etiquette.texte}
    </p>
  );
}
