import type { ReactNode } from "react";

export type Ton = "encre" | "bleu" | "brique" | "sauge";

const tons: Record<Ton, string> = {
  encre: "border-ink text-ink",
  bleu: "border-[#4f74c4] text-[#4f74c4]",
  brique: "border-[#c0584a] text-[#c0584a]",
  sauge: "border-sage text-sage",
};

/** Étiquette de section cerclée (« Campagne Horizon », « CATALOGUES »…). */
export function Pastille({
  children,
  ton = "bleu",
  className = "",
}: {
  children: ReactNode;
  ton?: Ton;
  className?: string;
}) {
  return (
    <p
      className={`inline-block rounded-lg border px-3 py-1 text-[15px] ${tons[ton]} ${className}`}
    >
      {children}
    </p>
  );
}
