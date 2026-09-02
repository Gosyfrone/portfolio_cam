import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

// ⚠️ Police provisoire : le Figma expose la variable « family/Font 1 ».
// Dès que le vrai nom est connu, il n'y a que cet import à changer.
const display = Figtree({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Camille Hermantier Rivet — Communication & événementiel",
  description:
    "Chargée de communication et événementiel : identité visuelle, print, web et événementiel.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={display.variable}>
      <body>{children}</body>
    </html>
  );
}
