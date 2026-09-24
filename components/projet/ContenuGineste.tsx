import Image from "next/image";

const dossier = "/images/projets/domaine-de-la-gineste";

// Deux colonnes décalées (maquette « Domaine de la Gineste ») : portrait 2:3
// puis 3:4 à gauche, l'inverse à droite, pour que les deux se terminent ensemble.
const colonnes = [
  [
    { src: `${dossier}/01.webp`, ratio: 2 / 3, alt: "Machine à vendanger et tracteur au Domaine" },
    { src: `${dossier}/03.webp`, ratio: 3 / 4, alt: "Bouteilles du Domaine devant la façade" },
  ],
  [
    { src: `${dossier}/02.webp`, ratio: 3 / 4, alt: "Bouteilles du Domaine sous la treille" },
    { src: `${dossier}/04.webp`, ratio: 2 / 3, alt: "Déchargement du raisin pendant les vendanges" },
  ],
];

/** Mise en page spécifique de la page Domaine de la Gineste. */
export function ContenuGineste() {
  return (
    <>
      <Bandeau className="h-[260px] md:h-auto md:aspect-[2.47]" position="50% 70%" />

      <div className="gutter py-10 max-md:px-8 md:py-12">
        <div className="mx-auto grid max-w-[872px] grid-cols-2 gap-3 md:gap-6">
          {colonnes.map((photos, i) => (
            <div key={i} className="flex flex-col gap-3 md:gap-[26px]">
              {photos.map((photo) => (
                <div
                  key={photo.src}
                  className="relative overflow-hidden rounded-[20px] bg-sand"
                  style={{ aspectRatio: photo.ratio }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 436px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Bandeau className="h-[180px] md:h-auto md:aspect-[3.67]" position="50% 85%" />
    </>
  );
}

function Bandeau({ className, position }: { className: string; position: string }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <Image
        src={`${dossier}/bandeau.webp`}
        alt="Vendanges au soleil couchant, Domaine de la Gineste"
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
