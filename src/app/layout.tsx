import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_Infant, Great_Vibes } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Trung Hiếu & Khánh Linh — Thiệp Cưới",
  description: "Trân trọng kính mời đến dự lễ thành hôn và tiệc cưới Trung Hiếu & Khánh Linh",
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
    <html lang="vi" className="h-full">
      <body
        className={`${cormorantGaramond.variable} ${cormorantInfant.variable} ${greatVibes.variable} min-h-full font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
