import type { ReactNode } from "react";

export function SectionTitre({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="gutter flex flex-wrap items-center justify-between gap-6">
      <h2 className="text-3xl font-bold tracking-tight md:text-[40px]">
        {children}
      </h2>
      {action}
    </div>
  );
}
