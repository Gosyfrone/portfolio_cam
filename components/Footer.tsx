import Link from "next/link";

import { contact } from "@/lib/data";
import { Marquee } from "./Marquee";
import { PillLink } from "./ui";

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 overflow-hidden bg-ink pt-20 text-cream">
      <div className="gutter flex flex-wrap items-start justify-between gap-12">
        <nav className="flex flex-wrap gap-4">
          <PillLink
            href="#projets"
            className="bg-cream text-orange"
            badgeClassName="bg-orange text-cream"
          >
            Projets
          </PillLink>
          <PillLink
            href="#evenementiel"
            className="bg-cream text-sage"
            badgeClassName="bg-sage text-cream"
          >
            Événements
          </PillLink>
          <PillLink
            href="#a-propos"
            className="bg-cream text-ink"
            badgeClassName="bg-ink text-cream"
          >
            À propos
          </PillLink>
        </nav>

        <div className="flex flex-wrap items-start gap-12 md:gap-20">
          <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">
            Contact
          </h2>

          <address className="not-italic text-sm leading-7">
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

          <div className="text-sm">
            <p className="font-semibold uppercase tracking-wide">Réseaux</p>
            <Link
              href={contact.linkedin}
              className="mt-1 inline-block underline underline-offset-4 hover:text-orange"
            >
              linkedin
            </Link>
          </div>
        </div>
      </div>

      <Marquee duration={30} pauseOnHover={false} className="mt-16 pb-8">
        <span className="whitespace-nowrap pr-10 text-[clamp(4rem,14vw,13rem)] font-bold leading-none tracking-tight">
          CAMILLEHERMANTIERRIVET
        </span>
      </Marquee>
    </footer>
  );
}
