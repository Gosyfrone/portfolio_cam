"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

type RailProps = {
  children: ReactNode;
  /** Vitesse du défilement automatique, en px/seconde. */
  speed?: number;
  className?: string;
  trackClassName?: string;
  /** Rempli par le Rail : donne accès aux flèches depuis le parent. */
  controlsRef?: RefObject<RailHandle | null>;
};

export type RailHandle = {
  prev: () => void;
  next: () => void;
};

/**
 * Rail de cartes : défilement automatique infini + flèches manuelles.
 * Le contenu est dupliqué ; l'offset est bouclé modulo la moitié de la piste,
 * ce qui rend la couture invisible et permet de naviguer dans les deux sens.
 *
 * Sur mobile, pas de défilement automatique : une carte occupe l'écran, on
 * avance aux flèches ou d'un glissement du doigt.
 */
export function Rail({
  children,
  speed = 28,
  className = "",
  trackClassName = "",
  controlsRef,
}: RailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstHalfRef = useRef<HTMLDivElement>(null);
  const state = useRef({ offset: 0, target: null as number | null, paused: false });
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  const toucher = useRef<{ x: number; y: number } | null>(null);

  const step = useCallback(
    (direction: 1 | -1) => {
      const half = firstHalfRef.current;
      const card = half?.firstElementChild as HTMLElement | null;
      const suivante = card?.nextElementSibling as HTMLElement | null;
      // L'écart entre deux cartes varie d'un rail à l'autre : on le mesure.
      const distance = card
        ? suivante
          ? suivante.offsetLeft - card.offsetLeft
          : card.getBoundingClientRect().width + 32
        : 400;
      const s = state.current;
      s.target = (s.target ?? s.offset) + direction * distance;
    },
    [],
  );

  useEffect(() => {
    if (!controlsRef) return;
    controlsRef.current = { prev: () => step(1), next: () => step(-1) };
  }, [controlsRef, step]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const petit = window.matchMedia("(max-width: 47.99rem)");
    const update = () => {
      setReduced(query.matches);
      setMobile(petit.matches);
    };
    update();
    query.addEventListener("change", update);
    petit.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      petit.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;

      const track = trackRef.current;
      const half = firstHalfRef.current;
      if (track && half) {
        const width = half.getBoundingClientRect().width;
        const s = state.current;

        if (s.target !== null) {
          const delta = s.target - s.offset;
          if (Math.abs(delta) < 0.5) {
            s.offset = s.target;
            s.target = null;
          } else {
            s.offset += delta * Math.min(1, dt * 6);
          }
        } else if (!s.paused && !reduced && !mobile) {
          s.offset -= speed * dt;
        }

        if (width > 0) {
          while (s.offset <= -width) {
            s.offset += width;
            if (s.target !== null) s.target += width;
          }
          while (s.offset > 0) {
            s.offset -= width;
            if (s.target !== null) s.target -= width;
          }
        }

        track.style.transform = `translate3d(${s.offset}px, 0, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [speed, reduced, mobile]);

  return (
    <div
      className={`touch-pan-y overflow-hidden ${className}`}
      onMouseEnter={() => (state.current.paused = true)}
      onMouseLeave={() => (state.current.paused = false)}
      onTouchStart={(e) => {
        const t = e.touches[0];
        toucher.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const debut = toucher.current;
        toucher.current = null;
        if (!debut) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - debut.x;
        // Geste surtout vertical : c'est la page qu'on fait défiler.
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(t.clientY - debut.y)) return;
        step(dx > 0 ? 1 : -1);
      }}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div ref={firstHalfRef} className={`flex shrink-0 gap-8 pr-8 ${trackClassName}`}>
          {children}
        </div>
        <div className={`flex shrink-0 gap-8 pr-8 ${trackClassName}`} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
