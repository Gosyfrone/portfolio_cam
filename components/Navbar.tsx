import Image from "next/image";
import Link from "next/link";

const liens = [
  { label: "Projets", href: "/projets" },
  { label: "Événementiel", href: "/#evenementiel" },
  { label: "À propos", href: "/#a-propos" },
];

export function Navbar() {
  return (
    <header className="pointer-events-none sticky top-6 z-50 gutter">
      <nav className="pointer-events-auto mx-auto flex h-[72px] w-full max-w-[940px] items-center justify-between rounded-[20px] bg-sand/90 pl-5 pr-4 backdrop-blur-md">
        <Link href="/" aria-label="Accueil — Camille Hermantier Rivet">
          <Image
            src="/logo-camille.svg"
            alt=""
            width={44}
            height={44}
            priority
          />
        </Link>

        <div className="flex items-center gap-6 sm:gap-10">
          <ul className="hidden items-center gap-6 sm:flex sm:gap-10">
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
            href="/#contact"
            className="rounded-pill bg-steel px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
