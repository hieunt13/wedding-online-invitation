import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Cormorant_Infant,
  Great_Vibes,
  Imperial_Script,
} from "next/font/google";
import weddingConfig from "@/config/wedding.config.json";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cormorantInfant = Cormorant_Infant({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin", "vietnamese"],
  weight: "400",
});

const imperialScript = Imperial_Script({
  variable: "--font-imperial",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: weddingConfig.meta.title,
  description: weddingConfig.meta.description,
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${cormorantGaramond.variable} ${cormorantInfant.variable} ${greatVibes.variable} ${imperialScript.variable} min-h-dvh font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
