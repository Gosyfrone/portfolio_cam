"use client";

import { useRef, useState } from "react";

import { asset } from "@/lib/asset";
import type { Video } from "@/lib/projets";
import { RailArrows } from "../ui";

/** Hauteur du cadre : sert de référence à toutes les mesures du carrousel. */
const HAUTEUR_CADRE = "min(62vh, 600px)";
/** Part de cette hauteur prise par les vidéos voisines. */
const PART_VOISINE = 0.72;

/**
 * Carrousel de vidéos centré : la vidéo active est lisible (contrôles natifs),
 * ses voisines dépassent sur les côtés et servent de raccourci.
 *
 * Les voisines se placent par rapport aux bords de la vidéo centrale, pas par
 * rapport au cadre : la gamme mélange du 16/9 et du portrait, et un ancrage sur
 * le cadre faisait varier l'écart du simple au décuple selon le format affiché.
 * Elles sont estompées pour que l'œil reste sur celle de devant.
 */
export function CarrouselVideos({ videos }: { videos: Video[] }) {
  const [actif, setActif] = useState(0);
  const n = videos.length;
  const aller = (i: number) => setActif(((i % n) + n) % n);

  const courante = videos[actif];

  // Glissement du doigt (mobile) : une vidéo par geste, les flèches restent.
  const toucher = useRef<{ x: number; y: number } | null>(null);

  // Aucun pourcentage dans ces variables : elles servent à calculer des
  // positions horizontales, où « % » se rapporterait à la largeur du cadre.
  const hauteurCentre = `min(${HAUTEUR_CADRE}, calc(88vw / ${courante.ratio}))`;
  const demiLargeurCentre = `calc(${hauteurCentre} * ${courante.ratio} / 2)`;
  const bordCentre = `calc(50% + ${demiLargeurCentre} + var(--ecart))`;

  return (
    <div
      className="touch-pan-y overflow-hidden py-16 md:py-28"
      onTouchStart={(e) => {
        const t = e.touches[0];
        toucher.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const debut = toucher.current;
        toucher.current = null;
        if (!debut) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - debut.x;
        // Geste surtout vertical : c'est la page qu'on fait défiler.
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(t.clientY - debut.y)) return;
        aller(actif + (dx < 0 ? 1 : -1));
      }}
    >
      <div
        className="relative"
        style={
          {
            height: HAUTEUR_CADRE,
            "--ecart": "clamp(16px, 3vw, 48px)",
          } as React.CSSProperties
        }
      >
        {[-1, 0, 1].map((decalage) => {
          const video = videos[(actif + decalage + n) % n];
          const centre = decalage === 0;

          const placement: React.CSSProperties = centre
            ? {
                height: hauteurCentre,
                left: "50%",
                transform: "translate(-50%, -50%)",
              }
            : {
                height: `calc(${HAUTEUR_CADRE} * ${PART_VOISINE})`,
                transform: "translateY(-50%)",
                ...(decalage < 0 ? { right: bordCentre } : { left: bordCentre }),
              };

          return (
            <div
              key={`${video.src}-${decalage}`}
              className={`absolute top-1/2 overflow-hidden rounded-[20px] bg-ink transition-all duration-500 ${
                centre
                  ? "z-10"
                  : "hidden opacity-60 saturate-50 hover:opacity-100 hover:saturate-100 md:block"
              }`}
              style={{ aspectRatio: video.ratio, ...placement }}
            >
              {centre ? (
                <video
                  key={video.src}
                  src={asset(video.src)}
                  poster={asset(video.poster)}
                  controls
                  playsInline
                  preload="metadata"
                  className="size-full object-contain"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => aller(actif + decalage)}
                  aria-label={`Voir la vidéo ${video.titre ?? ""}`}
                  className="size-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(video.poster)} alt="" className="size-full object-cover" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="gutter mt-6 text-center text-sm font-medium uppercase" aria-live="polite">
        {courante.titre}
      </p>

      <RailArrows
        onPrev={() => aller(actif - 1)}
        onNext={() => aller(actif + 1)}
        className="mt-8 justify-center"
      />
    </div>
  );
}
