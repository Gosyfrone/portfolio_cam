import Image from "next/image";

import { servicesEvenementiel } from "@/lib/data";
import { BandeauServices } from "./BandeauServices";

export function Evenementiel() {
  return (
    <section
      id="evenementiel"
      className="relative flex min-h-[438px] scroll-mt-24 flex-col justify-between overflow-hidden"
    >
      <Image
        src="/images/evenementiel-fond.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/20" aria-hidden="true" />

      <div className="relative flex flex-1 items-center justify-center py-20">
        <h2 className="text-center text-[clamp(2.5rem,9vw,8rem)] font-bold leading-none tracking-tight text-white">
          ÉVÉNEMENTIEL
        </h2>
      </div>

      <BandeauServices
        items={servicesEvenementiel}
        duration={55}
        className="relative bg-ink/45 text-white backdrop-blur-[2px]"
        itemClassName="text-base md:text-lg"
        separateur="dot"
        sparkleClassName="text-white/70"
      />
    </section>
  );
}
