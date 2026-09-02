import { Marquee } from "./Marquee";
import { Sparkle } from "./ui";

type Props = {
  items: string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
  sparkleClassName?: string;
  /** "sparkle" = étoile 8 branches (bandeau vert), "dot" = point médian (bandeau événementiel). */
  separateur?: "sparkle" | "dot";
};

/** Bandeau de mots-clés en défilement infini. */
export function BandeauServices({
  items,
  duration = 45,
  className = "bg-sage text-white",
  itemClassName = "text-lg md:text-xl",
  sparkleClassName = "text-white/80",
  separateur = "sparkle",
}: Props) {
  return (
    <Marquee duration={duration} className={className}>
      {items.map((item) => (
        <div key={item} className="flex items-center py-3.5">
          <span className={`whitespace-nowrap px-6 ${itemClassName}`}>
            {item}
          </span>
          {separateur === "sparkle" ? (
            <Sparkle className={`size-4 ${sparkleClassName}`} />
          ) : (
            <span aria-hidden="true" className={sparkleClassName}>
              ·
            </span>
          )}
        </div>
      ))}
    </Marquee>
  );
}
