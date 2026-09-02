import Image from "next/image";

import { clients } from "@/lib/data";
import { Marquee } from "./Marquee";

export function Confiance() {
  return (
    <section className="bg-sage py-14 text-white">
      <h2 className="gutter text-center text-2xl font-bold tracking-tight md:text-[28px]">
        Ils m&apos;ont fait <span className="font-light italic">confiance</span>
      </h2>

      <Marquee duration={38} className="mt-10">
        {clients.map((client) => (
          <div
            key={client.nom}
            className="flex h-16 w-[220px] shrink-0 items-center justify-center px-4"
          >
            <Image
              src={client.logo}
              alt={client.nom}
              width={180}
              height={64}
              className="h-full w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
