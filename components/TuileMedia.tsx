import Image from "next/image";

import type { Media } from "@/lib/projets";

type Props = {
  media: Media;
  /** Ratio de repli quand la tuile n'en impose pas. */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Une tuile de section projet : visuel, vidéo, nuancier de marque ou
 * emplacement en attente de visuel.
 */
export function TuileMedia({
  media,
  ratio = "3 / 2",
  sizes = "(max-width: 768px) 100vw, 45vw",
  priority = false,
  className = "",
}: Props) {
  if (media.genre === "palette") {
    return (
      <div className={`flex flex-col overflow-hidden rounded-card ${className}`}>
        {media.couleurs.map((couleur) => (
          <div
            key={couleur}
            className="flex flex-1 items-center justify-center py-5 text-sm font-semibold tracking-wide text-white"
            style={{ backgroundColor: couleur }}
          >
            {couleur.toUpperCase()}
          </div>
        ))}
      </div>
    );
  }

  if (media.genre === "a-fournir") {
    return (
      <div
        className={`grid place-items-center rounded-card bg-sand ${className}`}
        style={{ aspectRatio: media.ratio ?? ratio }}
      >
        <span className="px-4 text-center text-xs uppercase tracking-widest text-steel">
          {media.label}
        </span>
      </div>
    );
  }

  if (media.genre === "video") {
    return (
      <div
        className={`relative overflow-hidden rounded-card bg-ink ${className}`}
        style={{ aspectRatio: media.ratio ?? ratio, backgroundColor: media.fond }}
      >
        <video
          src={media.src}
          aria-label={media.alt}
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  return (
    <figure
      className={`relative overflow-hidden rounded-card bg-sand ${className}`}
      style={{ aspectRatio: media.ratio ?? ratio, backgroundColor: media.fond }}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={
          media.contenir
            ? "object-contain p-4"
            : `object-cover ${media.ancrage === "haut" ? "object-top" : ""}`
        }
      />
      {media.surimpression ? (
        <Image
          src={media.surimpression.src}
          alt=""
          width={media.surimpression.largeur}
          height={media.surimpression.hauteur}
          className="absolute left-1/2 top-1/2 w-[36%] -translate-x-1/2 -translate-y-1/2"
        />
      ) : null}
      {media.legende ? (
        <figcaption className="absolute left-4 top-3 text-xs font-medium text-white drop-shadow">
          {media.legende}
        </figcaption>
      ) : null}
    </figure>
  );
}
