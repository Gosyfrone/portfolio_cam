import { APropos } from "@/components/APropos";
import { BandeauServices } from "@/components/BandeauServices";
import { Confiance } from "@/components/Confiance";
import { Evenementiel } from "@/components/Evenementiel";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SectionEvenements } from "@/components/SectionEvenements";
import { SectionProjets } from "@/components/SectionProjets";
import { services } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BandeauServices items={services} />
        <SectionProjets />
        <Evenementiel />
        <SectionEvenements />
        <APropos />
        <Confiance />
      </main>
      <Footer />
    </>
  );
}
