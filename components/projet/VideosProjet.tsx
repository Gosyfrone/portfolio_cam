import { asset } from "@/lib/asset";
import type { FicheProjet } from "@/lib/projets";

/** Vidéos en lecture automatique (muettes, en boucle) sur un aplat de couleur. */
export function VideosProjet({ videos }: { videos: NonNullable<FicheProjet["videos"]> }) {
  return (
    <div className="gutter mt-3 md:mt-4">
      <div
        className="flex flex-col items-center justify-around gap-8 rounded-[20px] px-6 py-12 sm:flex-row md:py-20"
        style={{ backgroundColor: videos.fond }}
      >
        {videos.items.map((video) => (
          <video
            key={video.src}
            src={asset(video.src)}
            poster={asset(video.poster)}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-[min(70vw,280px)] rounded-[18px] bg-ink shadow-xl sm:w-[26%]"
            style={{ aspectRatio: video.ratio }}
          />
        ))}
      </div>
    </div>
  );
}
