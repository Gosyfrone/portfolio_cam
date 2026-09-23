import Image from "next/image";

import { asset } from "@/lib/asset";

/**
 * Hero de la home : plan large du Domaine de la Gineste en fond, muet et
 * en boucle, avec la signature « Bienvenue » posée par-dessus.
 * Passer `VIDEO_FOND` à `null` rend l'affiche seule.
 */
const VIDEO_FOND: string | null = "/videos/home/accueil.mp4";
const AFFICHE = "/images/home-hero.jpg";

export function Hero() {
  return (
    <section className="relative -mt-[96px] flex min-h-[100svh] flex-col items-center justify-end overflow-hidden pt-[96px] pb-10 text-white md:pb-14">
      {VIDEO_FOND ? (
        <video
          src={asset(VIDEO_FOND)}
          poster={asset(AFFICHE)}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <Image
          src={AFFICHE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      <div className="relative z-10 flex flex-col items-center">
        <Image src="/logo-camille.svg" alt="" width={70} height={70} priority />

        <p className="mt-4 text-3xl font-light italic drop-shadow-sm md:text-[40px]">
          Bienvenue
        </p>

        <a
          href="#projets"
          aria-label="Voir les projets"
          className="mt-14 grid size-9 place-items-center rounded-full border border-white/80 transition-colors hover:bg-white hover:text-ink md:mt-20"
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
