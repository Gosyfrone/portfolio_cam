import Image from "next/image";

import { clients } from "@/lib/data";
import { Marquee } from "./Marquee";

export function Confiance() {
  return (
    <section className="mb-7 bg-sage py-9 text-white md:mb-12 md:py-14">
      <h2 className="gutter text-center text-[17px] font-bold tracking-tight md:text-[28px]">
        Ils m&apos;ont fait <span className="font-light italic">confiance</span>
      </h2>

      {/* Hauteur de piste fixe et logos à leur taille native, centrés sur un
          axe commun : l'écart reste le même de part et d'autre de la boucle.
          Sur mobile, tout est réduit d'un quart. */}
      {/* Même vitesse que les rails d'images de la home (26 px/s). */}
      <Marquee speed={26} className="mt-6 md:mt-10">
        {clients.map((client) => (
          <div
            key={client.nom}
            className="flex h-[68px] shrink-0 items-center justify-center px-6 md:h-[92px] md:px-[38px]"
          >
            <Image
              src={client.logo}
              alt={client.nom}
              width={client.largeur}
              height={client.hauteur}
              className="h-[calc(var(--h)*0.72)] w-auto max-w-none md:h-(--h)"
              style={{ "--h": `${client.hauteur}px` } as React.CSSProperties}
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
