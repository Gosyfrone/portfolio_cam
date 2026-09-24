"use client";

import Image from "next/image";
import { useRef } from "react";

import { Rail, type RailHandle } from "../Rail";
import { RailArrows } from "../ui";

/** Rail d'images SOLEM (défilement infini + flèches), cartes de même taille. */
export function CarrouselImages({
  images,
  alt,
  carteClassName,
  railClassName = "pl-6 md:pl-16 2xl:pl-32",
}: {
  images: string[];
  alt: string;
  /** Largeur et ratio des cartes. */
  carteClassName: string;
  /** Retrait de gauche : sur mobile, il centre la première carte. */
  railClassName?: string;
}) {
  const controls = useRef<RailHandle | null>(null);

  return (
    <div>
      <Rail controlsRef={controls} speed={26} className={railClassName} trackClassName="gap-4! pr-4!">
        {images.map((src, i) => (
          <div
            key={src}
            className={`relative shrink-0 overflow-hidden rounded-[20px] bg-sand ${carteClassName}`}
          >
            <Image src={src} alt={`${alt} ${i + 1}`} fill sizes="(max-width: 768px) 80vw, 660px" className="object-cover" />
          </div>
        ))}
      </Rail>

      <div className="gutter mt-6 flex justify-center md:justify-end">
        <RailArrows
          onPrev={() => controls.current?.prev()}
          onNext={() => controls.current?.next()}
        />
      </div>
    </div>
  );
}
