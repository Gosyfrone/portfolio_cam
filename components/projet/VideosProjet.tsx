"use client";

import { useRef, useState } from "react";

import { asset } from "@/lib/asset";
import type { FicheProjet } from "@/lib/projets";

/**
 * Vidéos posées sur un aplat de couleur, lues au survol et avec le son.
 *
 * Trois vidéos en lecture automatique simultanée se parasitaient ; ici une
 * seule joue à la fois, celle que l'on regarde. Le son a besoin d'une
 * interaction préalable avec la page pour être autorisé : si le navigateur
 * refuse, on retombe sur une lecture muette plutôt que sur rien du tout.
 */
export function VideosProjet({ videos }: { videos: NonNullable<FicheProjet["videos"]> }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const actifRef = useRef<number | null>(null);
  const [actif, setActif] = useState<number | null>(null);

  const arreter = (i: number) => {
    if (actifRef.current === i) {
      actifRef.current = null;
      setActif(null);
    }
    const video = refs.current[i];
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    video.muted = true;
  };

  const lancer = (i: number) => {
    refs.current.forEach((_, j) => {
      if (j !== i) arreter(j);
    });

    const video = refs.current[i];
    if (!video) return;

    actifRef.current = i;
    setActif(i);
    video.muted = false;
    video.play().catch(() => {
      // Le survol ne vaut pas activation : sans clic préalable, le son est bloqué.
      if (actifRef.current !== i) return;
      video.muted = true;
      video.play().catch(() => {});
    });
  };

  return (
    <div className="gutter mt-3 md:mt-4">
      <div
        className="flex flex-col items-center justify-around gap-8 rounded-[20px] px-6 py-12 sm:flex-row md:py-20"
        style={{ backgroundColor: videos.fond }}
      >
        {videos.items.map((video, i) => (
          <div
            key={video.src}
            className="relative w-[min(70vw,280px)] sm:w-[26%]"
            onMouseEnter={() => lancer(i)}
            onMouseLeave={() => arreter(i)}
          >
            <video
              ref={(el) => {
                refs.current[i] = el;
              }}
              src={asset(video.src)}
              poster={asset(video.poster)}
              loop
              playsInline
              preload="metadata"
              tabIndex={0}
              // Au doigt comme au clavier, il n'y a pas de survol : on bascule.
              onClick={() => (actif === i ? arreter(i) : lancer(i))}
              onFocus={() => lancer(i)}
              onBlur={() => arreter(i)}
              className="w-full cursor-pointer rounded-[18px] bg-ink shadow-xl outline-offset-4"
              style={{ aspectRatio: video.ratio }}
            />

            {/* Pastille de lecture, effacée pendant que la vidéo tourne. */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-300 ${
                actif === i ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="grid size-12 place-items-center rounded-full bg-ink/45 backdrop-blur-sm">
                <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-white">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
