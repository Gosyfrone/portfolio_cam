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
    <section id="a-propos" className="gutter scroll-mt-28 bg-cream py-24">
      <div className="grid gap-12 lg:grid-cols-[476px_1fr] lg:gap-20">
        <div className="relative aspect-[476/525] w-full overflow-hidden rounded-[20px] bg-sand">
          <Image
            src="/images/portrait-camille.png"
            alt="Portrait de Camille Hermantier Rivet"
            fill
            sizes="(max-width: 1024px) 100vw, 476px"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="flex flex-wrap items-center gap-3 text-3xl font-bold tracking-tight md:text-[34px]">
            Hello, moi c&apos;est
            <Image src="/logo-camille.svg" alt="" width={44} height={44} />
            <span className="font-light italic">Camille</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Chargée de communication et événementiel, je conçois et pilote des
            projets d&apos;identité visuelle, print, web et événementiel.
            <br />
            Chez SOLEM, je participe à la stratégie de communication de la marque
            sur un périmètre France, Europe, Afrique, Moyen-Orient. Ma mission
            couvre deux volets : la communication de SOLEM, et l&apos;accompagnement
            du réseau de distribution dans ses actions de communication, création
            de contenus graphiques, projets print, web et événementiel.
          </p>

          <PillLink
            href="#contact"
            className="mt-8 bg-orange text-white"
            badgeClassName="bg-white text-orange"
          >
            Contact
          </PillLink>

          <dl className="mt-12 grid gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-3xl font-bold tracking-tight">
                  {stat.chiffre}
                </dt>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide">
                  {stat.label}
                </p>
                <dd className="mt-2 text-sm leading-relaxed text-slate">
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
