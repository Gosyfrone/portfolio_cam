import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Durée d'un cycle complet, en secondes. Plus grand = plus lent. */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

/**
 * Défilement horizontal infini, 100 % CSS.
 * Le contenu est dupliqué et la piste translate de -50 % : la boucle est invisible.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        data-reverse={reverse}
        data-pause={pauseOnHover}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
