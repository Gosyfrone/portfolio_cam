import Image from "next/image";

import { VideoFond } from "./VideoFond";

/**
 * Hero de la home : plan du Domaine de la Gineste en fond, muet et en
 * boucle (version verticale sur mobile), avec la signature « Bienvenue »
 * posée par-dessus. La photo reste dessous le temps que la vidéo charge.
 */
const VIDEO = { src: "/videos/home/accueil.mp4", poster: "/videos/home/accueil.jpg" };
const VIDEO_MOBILE = {
  src: "/videos/home/accueil-mobile.mp4",
  poster: "/videos/home/accueil-mobile.jpg",
};

export function Hero() {
  return (
    <section className="relative -mt-[74px] flex min-h-[100svh] flex-col items-center justify-end overflow-hidden pt-[74px] pb-8 text-white md:-mt-[96px] md:pt-[96px] md:pb-14">
      <Image
        src="/images/home-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <VideoFond
        desktop={VIDEO}
        mobile={VIDEO_MOBILE}
        className="absolute inset-0 size-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/logo-camille.svg"
          alt=""
          width={70}
          height={70}
          priority
          className="size-[35px] md:size-[70px]"
        />

        <p className="mt-1 text-[22px] font-light italic drop-shadow-sm md:mt-4 md:text-[40px]">
          Bienvenue
        </p>

        <a
          href="#projets"
          aria-label="Voir les projets"
          className="mt-4 grid size-9 place-items-center rounded-full transition-colors hover:bg-white hover:text-ink md:mt-20 md:border md:border-white/80"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" strokeWidth="1.6">
            <path
              d="M12 4v16m0 0-6-6m6 6 6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
