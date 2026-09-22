"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Durée d'un cycle complet, en secondes. Plus grand = plus lent. */
  duration?: number;
  /**
   * Vitesse en px/seconde, comme les rails d'images. Prioritaire sur
   * `duration` : la durée du cycle est recalculée d'après la largeur réelle
   * du contenu, donc ajouter ou retirer un élément ne change pas l'allure.
   */
  speed?: number;
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
  speed,
  reverse = false,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const copie = useRef<HTMLDivElement>(null);
  const [mesuree, setMesuree] = useState<number | null>(null);

  useEffect(() => {
    const element = copie.current;
    if (!speed || !element) return;

    const mesurer = () => setMesuree(element.getBoundingClientRect().width / speed);
    mesurer();

    // Les logos sont des images : la largeur bouge au chargement et au resize.
    const observateur = new ResizeObserver(mesurer);
    observateur.observe(element);
    return () => observateur.disconnect();
  }, [speed]);

  const cycle = mesuree ?? duration;

  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        data-reverse={reverse}
        data-pause={pauseOnHover}
        style={{ "--marquee-duration": `${cycle}s` } as React.CSSProperties}
      >
        <div ref={copie} className="flex shrink-0 items-center" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
