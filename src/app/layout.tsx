import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LangAttribute } from "@/components/LangAttribute";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { SkipToContent } from "@/components/SkipToContent";
import { StealthAmbientBackground } from "@/components/StealthAmbientBackground";
import JsonLd from "@/components/JsonLd";
import { defaultOpenGraphImage } from "@/lib/social-metadata";
import { TranslationsProvider } from "@/context/TranslationsContext";
import { MotionLazyRoot } from "@/components/MotionLazyRoot";
import { fr } from "@/data/translations/fr";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  preload: true,
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
    default:
      "PhantomDev | Développement web sur-mesure — Next.js, SaaS & e-commerce",
    template: "%s | PhantomDev",
  },
  description:
    "Développement web sur-mesure : Next.js, React, TypeScript. Sites vitrines, e-commerce, SaaS et intégration IA. Lighthouse 90+ garanti · Devis gratuit sous 24h · Projets remote worldwide.",
  keywords: [
    "développement web sur-mesure",
    "création site internet",
    "développeur Next.js freelance",
    "application SaaS sur-mesure",
    "e-commerce Next.js",
    "site vitrine premium",
    "React TypeScript",
    "intégration IA",
    "Core Web Vitals",
    "refonte site web",
    "automatisation web",
    "freelance développeur React",
    "installation GrapheneOS",
  ],
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
    title: "PhantomDev — Développement web Next.js & SaaS | Devis gratuit 24h",
    description:
      "Sites vitrines, e-commerce et applications SaaS en Next.js · React · TypeScript. Performance Lighthouse 90+ garantie. Devis gratuit sous 24h · Remote worldwide.",
    url: "https://phantomdev.fr",
    siteName: "PhantomDev",
    locale: "fr_FR",
    alternateLocale: ["en_GB", "en_US"],
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhantomDev — Développement web Next.js & SaaS | Devis gratuit 24h",
    description:
      "Développement web sur-mesure Next.js, SaaS et e-commerce. Lighthouse 90+ garanti · Devis gratuit sous 24h · Remote worldwide.",
    images: [defaultOpenGraphImage.url],
  },
  other: {
    "geo.region": "FR",
    "geo.placename": "France",
    "geo.position": "48.812;2.395",
    "ICBM": "48.812, 2.395",
    target: "global",
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
      className={`${sourceSans.variable} ${spaceGrotesk.variable} overflow-x-clip`}
    >
      <body className="relative overflow-x-clip bg-zinc-950 font-sans antialiased">
        <TranslationsProvider value={fr}>
          <MotionLazyRoot>
            <StealthAmbientBackground />
            <SkipToContent />
            <LangAttribute />
            <JsonLd />
            <div className="relative z-[1]">{children}</div>
            <FloatingWhatsAppButton />
          </MotionLazyRoot>
        </TranslationsProvider>
      </body>
    </html>
  );
}
