import type { ReactNode } from "react";

export function SectionTitre({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="gutter flex flex-col items-center gap-5 text-center md:flex-row md:flex-wrap md:justify-between md:gap-6 md:text-left">
      <h2 className="text-[clamp(1.25rem,5.6vw,1.75rem)] font-bold tracking-tight md:text-[40px]">
        {children}
      </h2>
      {action}
    </div>
  );
}
