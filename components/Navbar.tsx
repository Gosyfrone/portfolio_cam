"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const liens = [
  { label: "Projets", href: "/projets" },
  { label: "Événementiel", href: "/#evenementiel" },
  { label: "À propos", href: "/#a-propos" },
];

export function Navbar() {
  const [ouvert, setOuvert] = useState(false);

  // Échap referme le menu mobile.
  useEffect(() => {
    if (!ouvert) return;
    const fermer = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", fermer);
    return () => window.removeEventListener("keydown", fermer);
  }, [ouvert]);

  return (
    <header className="pointer-events-none sticky top-6 z-50 gutter">
      <nav className="pointer-events-auto relative mx-auto flex h-[50px] w-full max-w-[940px] items-center justify-between rounded-pill bg-sand/90 pl-3.5 pr-4 backdrop-blur-md md:h-[72px] md:rounded-[20px] md:pl-5">
        <Link
          href="/"
          aria-label="Accueil — Camille Hermantier-Rivet"
          className="flex items-center gap-2.5 md:gap-3"
          onClick={() => setOuvert(false)}
        >
          <Image
            src="/logo-camille.svg"
            alt=""
            width={44}
            height={44}
            priority
            className="size-[35px] md:size-11"
          />
          <span className="whitespace-nowrap text-[clamp(13px,3.8vw,15px)] text-orange md:text-[17px]">
            Camille Hermantier-Rivet
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-10">
            {liens.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="text-sm text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-orange"
                >
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#contact"
            className="rounded-pill bg-steel px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
          >
            Contact
          </Link>
        </div>

        {/* Menu burger : deux traits qui se croisent à l'ouverture. */}
        <button
          type="button"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          onClick={() => setOuvert((o) => !o)}
          className="grid size-9 place-items-center md:hidden"
        >
          <span className="relative block h-3 w-[18px]">
            <span
              className={`absolute left-0 h-[1.5px] w-full rounded-full bg-steel transition-transform duration-300 ${
                ouvert ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-full rounded-full bg-steel transition-transform duration-300 ${
                ouvert ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>

        <div
          id="menu-mobile"
          className={`absolute inset-x-0 top-full mt-2 origin-top rounded-[25px] bg-sand/95 p-6 backdrop-blur-md transition-[opacity,transform] duration-300 md:hidden ${
            ouvert ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
          inert={!ouvert}
        >
          <ul className="flex flex-col items-center gap-5">
            {liens.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  onClick={() => setOuvert(false)}
                  className="text-base text-ink underline decoration-1 underline-offset-4"
                >
                  {lien.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contact"
                onClick={() => setOuvert(false)}
                className="inline-block rounded-pill bg-steel px-6 py-2.5 text-sm font-semibold text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
