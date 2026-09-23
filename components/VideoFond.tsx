"use client";

import { useEffect, useState } from "react";

import { asset } from "@/lib/asset";

type Source = { src: string; poster: string };

/**
 * Vidéo de fond muette en boucle, avec une version verticale pour mobile.
 * La source est choisie côté client : rendre les deux <video> et en masquer
 * une en CSS ferait télécharger les deux fichiers.
 */
export function VideoFond({
  desktop,
  mobile,
  className = "",
}: {
  desktop: Source;
  mobile: Source;
  className?: string;
}) {
  const [source, setSource] = useState<Source | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 48rem)");
    const choisir = () => setSource(query.matches ? desktop : mobile);
    choisir();
    query.addEventListener("change", choisir);
    return () => query.removeEventListener("change", choisir);
  }, [desktop, mobile]);

  if (!source) return null;

  return (
    <video
      key={source.src}
      src={asset(source.src)}
      poster={asset(source.poster)}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      className={className}
    />
  );
}
