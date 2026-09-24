import Image from "next/image";

import { asset } from "@/lib/asset";
import type { Video } from "@/lib/projets";
import { Pastille } from "../projet/Pastille";
import { Bandeau } from "./Bandeau";
import { CarrouselImages } from "./CarrouselImages";
import { CarrouselVideos } from "./CarrouselVideos";
import { Catalogues } from "./Catalogues";

const dossier = "/images/projets/solem";
const serie = (prefixe: string, n: number) =>
  Array.from({ length: n }, (_, i) => `${dossier}/${prefixe}-${String(i + 1).padStart(2, "0")}.webp`);

const video = (nom: string, ratio: number, titre: string): Video => ({
  src: `/videos/solem/${nom}.mp4`,
  poster: `/videos/solem/${nom}.jpg`,
  ratio,
  titre,
});

const videos: Video[] = [
  video("teaser-gamme", 9 / 16, "Lancement de gamme - Inauguration Paysalia 2025"),
  video("installation-bt", 16 / 9, "Tutoriel installation - gamme Bluetooth"),
  video("residentiel", 16 / 9, "Arrosage résidentiel"),
  video("connected-ag", 16 / 9, "Connected AG Made Easy"),
  video("paysalia", 2, "Paysalia 2025"),
  video("installation-bl", 16 / 9, "Tutoriel installation - BL"),
];

/** Mise en page spécifique de la page SOLEM (maquette SOLEM.png). */
export function ContenuSolem() {
  return (
    <>
      <Catalogues />

      <section className="mt-16 md:mt-24">
        <Bandeau
          image={`${dossier}/bandeau-operation.webp`}
          titre="Opération distributeurs"
          sousTitre="SOLEM WORLD CUP - 2026"
          // Sur mobile, le titre remonte au-dessus de l'équipe au lieu de la couvrir.
          texteClassName="font-sf max-md:justify-start max-md:pt-5"
          titreClassName="max-md:text-2xl"
          sousTitreClassName="max-md:mt-1 max-md:text-sm"
          position="50% 40%"
        />
        <div className="mt-8 md:mt-10">
          <CarrouselImages
            images={serie("operation", 9)}
            alt="SOLEM World Cup 2026"
            carteClassName="aspect-[1.44] w-[min(660px,80vw)]"
            railClassName="pl-[10vw] md:pl-16 2xl:pl-32"
          />
        </div>
      </section>

      <section className="mt-16 md:mt-24">
        <Bandeau
          image={`${dossier}/bandeau-distributeurs.webp`}
          titre="Communication distributeurs"
          centre
          position="50% 30%"
          className="h-[220px] md:h-[380px]"
        />
        <div className="mt-8 md:mt-10">
          <CarrouselImages
            images={serie("plv", 10)}
            alt="PLV SOLEM"
            carteClassName="aspect-[0.93] w-[min(330px,62vw)]"
            railClassName="pl-[19vw] md:pl-16 2xl:pl-32"
          />
        </div>
      </section>

      <section className="gutter mt-10 max-md:px-8 max-md:text-center md:mt-12">
        <Pastille className="mb-6">WEBDESIGN</Pastille>
        <div className="relative aspect-[3208/2392] overflow-hidden rounded-[20px] bg-ink">
          <Image
            src={`${dossier}/webdesign.webp`}
            alt="Sites et application SOLEM : pages Europe, KSA (arabe et anglais), catalogues, MySOLEM"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mt-24 md:mt-32">
        {/* Plan de la piscine, muet et en boucle, sous le titre de section. */}
        <div className="relative h-[180px] overflow-hidden md:h-[610px]">
          <video
            src={asset("/videos/solem/piscine.mp4")}
            poster={asset("/videos/solem/piscine.jpg")}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/40" />
          <h2 className="relative grid h-full place-items-center text-4xl tracking-tight text-white md:text-6xl">
            VIDÉOS
          </h2>
        </div>
        <CarrouselVideos videos={videos} />
      </section>
    </>
  );
}
