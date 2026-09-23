import Image from "next/image";

import { clients } from "@/lib/data";
import { Marquee } from "./Marquee";

export function Confiance() {
  return (
    <section className="mb-12 bg-sage py-14 text-white">
      <h2 className="gutter text-center text-2xl font-bold tracking-tight md:text-[28px]">
        Ils m&apos;ont fait <span className="font-light italic">confiance</span>
      </h2>

      {/* Hauteur de piste fixe et logos à leur taille native, centrés sur un
          axe commun : l'écart reste le même de part et d'autre de la boucle. */}
      {/* Même vitesse que les rails d'images de la home (26 px/s). */}
      <Marquee speed={26} className="mt-10">
        {clients.map((client) => (
          <div
            key={client.nom}
            className="flex h-[92px] shrink-0 items-center justify-center px-[38px]"
          >
            <Image
              src={client.logo}
              alt={client.nom}
              width={client.largeur}
              height={client.hauteur}
              className="w-auto max-w-none"
              style={{ height: client.hauteur }}
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
