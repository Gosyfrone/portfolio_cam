/**
 * ⚠️ Section provisoire.
 * Le contenu du hero est absent de l'export Figma (zone blanche dans Home.png) :
 * la structure est en place, le contenu réel reste à intégrer.
 */
export function Hero() {
  return (
    <section className="gutter relative -mt-[96px] flex min-h-[92vh] items-center bg-white pt-[96px]">
      <div className="w-full max-w-[1100px]">
        <p className="text-sm uppercase tracking-[0.2em] text-steel">
          Zone hero — contenu à fournir
        </p>
        <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Camille Hermantier{" "}
          <span className="italic font-light text-orange">Rivet</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-slate">
          Chargée de communication et événementiel — identité visuelle, print,
          web et événementiel.
        </p>
      </div>
    </section>
  );
}
