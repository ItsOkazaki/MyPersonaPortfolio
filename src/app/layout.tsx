import type { Metadata } from "next";
import { Bebas_Neue, Anton } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Mostapha Rahmani | Portfolio",
  description: "Persona 3 Themed Portfolio of Mostapha Rahmani",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${anton.variable}`}>
      <body className="bg-[#04060f] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
