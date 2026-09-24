import Image from "next/image";

/** Photo pleine largeur assombrie avec un titre de section par-dessus. */
export function Bandeau({
  image,
  titre,
  sousTitre,
  centre = false,
  position = "center",
  className = "h-[300px] md:h-[610px]",
  texteClassName = "",
  titreClassName = "",
  sousTitreClassName = "",
}: {
  image: string;
  titre: string;
  sousTitre?: string;
  centre?: boolean;
  /** object-position de la photo. */
  position?: string;
  className?: string;
  /** Classes du bloc titre (police, etc.). */
  texteClassName?: string;
  titreClassName?: string;
  sousTitreClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${centre ? "bg-ink/35 backdrop-blur-[2px]" : "bg-gradient-to-r from-ink/55 via-ink/20 to-transparent"}`}
      />
      <div
        className={`gutter relative flex h-full flex-col text-white ${
          centre ? "items-center justify-center text-center" : "justify-center"
        } ${texteClassName}`}
      >
        <h2 className={`text-4xl font-light tracking-tight md:text-6xl ${titreClassName}`}>{titre}</h2>
        {sousTitre ? (
          <p className={`mt-2 text-lg font-light uppercase md:text-3xl ${sousTitreClassName}`}>{sousTitre}</p>
        ) : null}
      </div>
    </div>
  );
}
