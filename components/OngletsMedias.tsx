"use client";

import { useState } from "react";

import type { Etiquette, Media } from "@/lib/projets";
import { EtiquetteSection } from "./EtiquetteSection";
import { RailMedias } from "./RailMedias";
import { Segmente } from "./Segmente";

type Onglet = { id: string; label: string; medias: Media[] };

/**
 * Section à onglets : l'étiquette à gauche, le sélecteur segmenté à droite,
 * et le rail qui repart de zéro à chaque changement de marché.
 */
export function OngletsMedias({
  onglets,
  etiquette,
  ton,
}: {
  onglets: Onglet[];
  etiquette?: Etiquette;
  ton: string;
}) {
  const [actif, setActif] = useState(onglets[0]?.id);
  const courant = onglets.find((onglet) => onglet.id === actif) ?? onglets[0];

  return (
    <div>
      <div className="gutter flex flex-wrap items-center justify-between gap-4">
        {etiquette ? <EtiquetteSection etiquette={etiquette} /> : <span />}
        <Segmente
          label="Marché"
          options={onglets.map(({ id, label }) => ({ id, label }))}
          valeur={courant.id}
          onChange={setActif}
          ton={ton}
          fond="#ffffff"
        />
      </div>

      {/* La clé force le remontage : le défilement repart proprement. */}
      <RailMedias key={courant.id} medias={courant.medias} />
    </div>
  );
}
