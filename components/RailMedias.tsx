"use client";

import { useRef } from "react";

import type { Media } from "@/lib/projets";
import { Rail, type RailHandle } from "./Rail";
import { TuileMedia } from "./TuileMedia";
import { RailArrows } from "./ui";

/** Rail de visuels à défilement automatique, avec flèches sous le rail à droite. */
export function RailMedias({ medias }: { medias: Media[] }) {
  const controls = useRef<RailHandle | null>(null);

  return (
    <>
      <Rail controlsRef={controls} speed={26} className="mt-6 pl-6 md:pl-16 2xl:pl-32">
        {medias.map((media, index) => (
          <TuileMedia
            key={index}
            media={media}
            className="w-[min(600px,78vw)] shrink-0"
            sizes="(max-width: 768px) 78vw, 600px"
          />
        ))}
      </Rail>

      <div className="gutter mt-6 flex justify-end">
        <RailArrows
          onPrev={() => controls.current?.prev()}
          onNext={() => controls.current?.next()}
        />
      </div>
    </>
  );
}
