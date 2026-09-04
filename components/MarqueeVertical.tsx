import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Durée d'un cycle complet, en secondes. Plus grand = plus lent. */
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Défilement vertical infini, 100 % CSS.
 * Même principe que `Marquee` : le contenu est dupliqué et la piste translate
 * de -50 %, ce qui rend la couture invisible.
 */
export function MarqueeVertical({
  children,
  duration = 40,
  reverse = false,
  className = "",
}: Props) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="marquee-y-track"
        data-reverse={reverse}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 flex-col gap-6">{children}</div>
        <div className="flex shrink-0 flex-col gap-6 pt-6" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
