import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "PhantomDev | L'Excellence Numérique",
  description:
    "Architecte digital spécialisé dans les solutions Next.js de haute performance.",
  keywords: [
    "développement web",
    "ingénierie logicielle",
    "PhantomDev",
    "portfolio",
    "Next.js",
  ],
  openGraph: {
    title: "PhantomDev | L'Excellence Numérique",
    description:
      "Architecte digital spécialisé dans les solutions Next.js de haute performance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geist.variable} ${geistMono.variable} ${cormorant.variable} ${sourceSans.variable} overflow-x-hidden`}
    >
      <body className="overflow-x-hidden font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
