import Image from "next/image";

import { PillLink } from "./ui";

const stats = [
  {
    chiffre: "100%",
    label: "POLYVALENTE",
    texte:
      "Stratégie, contenus, identité visuelle, print, web, événementiel : des compétences développées sur l'ensemble de la chaîne, de la réflexion à la réalisation, en équipe comme en autonomie.",
  },
  {
    chiffre: "6 ans",
    label: "D'EXPÉRIENCE",
    texte:
      "Un parcours mené de la réflexion stratégique à la production des supports, entre agence, freelance, institutionnel et entreprise.",
  },
  {
    chiffre: "100%",
    label: "PASSIONNÉE",
    texte:
      "La curiosité comme moteur, le désir de contribuer à la croissance d'une structure et d'évoluer avec elle.",
  },
];

export function APropos() {
  return (
    <section id="a-propos" className="gutter scroll-mt-28 bg-cream pt-10 pb-14 md:py-24">
      {/* Sur mobile le titre passe au-dessus de la photo : la grille place les
          trois blocs, la photo s'étend sur deux lignes à partir de lg. */}
      <div className="grid gap-y-6 text-center md:text-left lg:grid-cols-[476px_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-20">
        <h2 className="flex items-center justify-center gap-2.5 text-[clamp(1rem,4.6vw,1.25rem)] font-bold tracking-tight md:justify-start md:gap-3 md:text-[34px] lg:col-start-2 lg:row-start-1">
          Hello, moi c&apos;est
          <Image
            src="/logo-camille.svg"
            alt=""
            width={44}
            height={44}
            className="size-[45px] md:size-11"
          />
          <span className="font-light italic">Camille</span>
        </h2>

        <div className="relative aspect-[332/360] w-full overflow-hidden rounded-[20px] bg-sand md:aspect-[476/525] lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <Image
            src="/images/portrait-camille.png"
            alt="Portrait de Camille Hermantier Rivet"
            fill
            sizes="(max-width: 1024px) 100vw, 476px"
            className="object-cover"
          />
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <p className="mx-auto max-w-2xl text-[15px] leading-[1.9] text-slate md:mx-0 md:text-lg md:leading-relaxed">
            <strong className="font-semibold md:font-normal">
              Chargée de communication et événementiel,
            </strong>{" "}
            je conçois et pilote des projets d&apos;identité visuelle, print, web
            et animations de marque.
            <br />
            Chez SOLEM, je participe à la stratégie de communication de la marque
            sur un périmètre France, Europe, Afrique, Moyen-Orient. Ma mission
            couvre deux volets :
            <br />
            la communication de SOLEM, et l&apos;accompagnement
            du réseau de distribution dans ses actions de communication, création
            de contenus graphiques, projets print, web et événementiel.
          </p>

          <PillLink
            href="#contact"
            className="mt-6 bg-orange text-white md:mt-8"
            badgeClassName="bg-white text-orange"
          >
            Contact
          </PillLink>

          <dl className="mt-10 grid gap-12 sm:grid-cols-3 md:mt-12 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="mx-auto max-w-[260px] md:mx-0 md:max-w-none">
                <dt className="text-[38px] font-bold leading-none tracking-tight md:text-3xl md:leading-normal">
                  {stat.chiffre}
                </dt>
                <p className="mt-2 text-[15px] font-bold uppercase md:mt-1 md:text-xs md:font-semibold md:tracking-wide">
                  {stat.label}
                </p>
                <dd className="mt-2 text-sm leading-snug text-slate md:leading-relaxed">
                  {stat.texte}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
