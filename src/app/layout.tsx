import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  Source_Sans_3,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { LangAttribute } from "@/components/LangAttribute";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { SkipToContent } from "@/components/SkipToContent";
import { StealthAmbientBackground } from "@/components/StealthAmbientBackground";
import JsonLd from "@/components/JsonLd";
import { defaultOpenGraphImage } from "@/lib/social-metadata";

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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://phantomdev.fr"),
  title: {
    default: "PhantomDev | Création de sites web premium sur-mesure — International",
    template: "%s | PhantomDev",
  },
  description:
    "Création de sites web premium sur-mesure. E-commerce, SaaS, vitrines. Devis gratuit sous 24h. Performance Lighthouse 90+. France, Europe, international.",
  keywords: [
    "création site web",
    "développeur web freelance",
    "développeur web international",
    "site vitrine sur-mesure",
    "développement e-commerce",
    "refonte site web",
    "Next.js",
    "agence web remote",
    "site sur-mesure",
    "développement web Europe",
    "freelance web international",
    "installation GrapheneOS",
    "Google Pixel",
  ],
  alternates: {
    canonical: "https://phantomdev.fr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "HZvfGLZepr3elEwyUp-gNB9r9oQQ4L4tXC0kjfWDYjw",
  },
  openGraph: {
    type: "website",
    title: "PhantomDev — Création sites web premium | Devis gratuit 24h",
    description:
      "Sites web sur-mesure qui convertissent. E-commerce, SaaS, vitrines. Devis gratuit sous 24h. Performance garantie. France, Europe, international.",
    url: "https://phantomdev.fr",
    siteName: "PhantomDev",
    locale: "fr_FR",
    alternateLocale: ["en_GB", "en_US"],
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhantomDev — Création sites web premium | Devis gratuit 24h",
    description:
      "Sites web sur-mesure. E-commerce, SaaS. Devis gratuit sous 24h. Performance garantie. International.",
    images: [defaultOpenGraphImage.url],
  },
  other: {
    "geo.region": "EU",
    "geo.placename": "Europe",
    "target": "global",
  },
  icons: {
    icon: [{ url: "/images/phantom-logo.png", type: "image/png" }],
    apple: [{ url: "/images/phantom-logo.png", type: "image/png" }],
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
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${cormorant.variable} ${sourceSans.variable} ${spaceGrotesk.variable} overflow-x-clip`}
    >
      <body className="relative overflow-x-clip bg-zinc-950 font-sans antialiased">
        <StealthAmbientBackground />
        <SkipToContent />
        <LangAttribute />
        <JsonLd />
        <div className="relative z-[1]">{children}</div>
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
