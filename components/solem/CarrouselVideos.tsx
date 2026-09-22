"use client";

import { useState } from "react";

import type { Video } from "@/lib/projets";
import { RailArrows } from "../ui";

/**
 * Carrousel de vidéos centré : la vidéo active est lisible (contrôles natifs),
 * ses voisines dépassent sur les côtés et servent de raccourci.
 */
export function CarrouselVideos({ videos }: { videos: Video[] }) {
  const [actif, setActif] = useState(0);
  const n = videos.length;
  const aller = (i: number) => setActif(((i % n) + n) % n);

  const courante = videos[actif];

  return (
    <div className="overflow-hidden py-16 md:py-28">
      <div className="relative flex h-[min(62vh,600px)] items-center justify-center">
        {[-1, 0, 1].map((decalage) => {
          const video = videos[(actif + decalage + n) % n];
          const centre = decalage === 0;
          return (
            <div
              key={`${video.src}-${decalage}`}
              className={`absolute top-1/2 overflow-hidden rounded-[20px] bg-ink transition-all duration-500 ${
                centre ? "z-10" : "hidden h-[72%] opacity-90 md:block"
              }`}
              style={{
                aspectRatio: video.ratio,
                // La vidéo centrale est bornée par la largeur d'écran ; les
                // voisines débordent de moitié hors du cadre.
                height: centre ? `min(100%, calc(88vw / ${video.ratio}))` : undefined,
                left: centre ? "50%" : decalage < 0 ? "0" : "100%",
                transform: `translate(${centre ? "-50%" : decalage < 0 ? "-55%" : "-45%"}, -50%)`,
              }}
            >
              {centre ? (
                <video
                  key={video.src}
                  src={video.src}
                  poster={video.poster}
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
                  <img src={video.poster} alt="" className="size-full object-cover" />
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
