import Link from "next/link";

import { contact } from "@/lib/data";
import { Marquee } from "./Marquee";
import { PillLink } from "./ui";

/** Sur mobile, les pilules sont empilées et un cran plus grandes. */
const pilule = "max-md:py-1.5 max-md:pl-6 max-md:text-base";
const pastille = "max-md:size-7";

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 overflow-hidden bg-ink pt-16 text-cream md:pt-36">
      <div className="gutter flex flex-col items-center gap-12 text-center md:flex-row md:flex-wrap md:items-start md:justify-between md:text-left">
        <nav className="order-last flex flex-col items-center gap-6 md:order-none md:flex-row md:flex-wrap md:gap-4">
          <PillLink
            href="/projets"
            className={`bg-cream text-orange ${pilule}`}
            badgeClassName={`bg-orange text-cream ${pastille}`}
          >
            Projets
          </PillLink>
          <PillLink
            href="/#evenementiel"
            className={`bg-cream text-sage ${pilule}`}
            badgeClassName={`bg-sage text-cream ${pastille}`}
          >
            Événements
          </PillLink>
          <PillLink
            href="/#a-propos"
            className={`bg-cream text-ink ${pilule}`}
            badgeClassName={`bg-ink text-cream ${pastille}`}
          >
            À propos
          </PillLink>
        </nav>

        <div className="flex flex-col items-center gap-5 md:flex-row md:flex-wrap md:items-start md:gap-20">
          <h2 className="text-[32px] font-bold tracking-tight md:text-[28px]">
            Contact
          </h2>

          <address className="text-base not-italic leading-[1.8] md:text-sm md:leading-7">
            <a href={`mailto:${contact.email}`} className="hover:text-orange">
              {contact.email}
            </a>
            <br />
            <a
              href={`tel:${contact.telephone.replace(/\s/g, "")}`}
              className="hover:text-orange"
            >
              {contact.telephone}
            </a>
          </address>

          <div className="mt-3 text-base md:mt-0 md:text-sm">
            <p className="font-semibold uppercase tracking-wide">Réseaux</p>
            <Link
              href={contact.linkedin}
              className="mt-2 inline-block underline underline-offset-4 hover:text-orange md:mt-1"
            >
              linkedin
            </Link>
          </div>
        </div>
      </div>

      <Marquee duration={30} pauseOnHover={false} className="mt-10 pb-6 md:mt-40 md:pb-8">
        <span className="whitespace-nowrap pr-10 text-[12.5rem] font-bold leading-none tracking-tight md:text-[clamp(4rem,16vw,20rem)]">
          CAMILLEHERMANTIERRIVET
        </span>
      </Marquee>
    </footer>
  );
}
