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
      "PhantomDev | Sites web & automatisation pour TPE et PME",
    template: "%s | PhantomDev",
  },
  description:
    "Sites vitrines, e-commerce, réservation en ligne et automatisation pour TPE, PME et artisans. Plus de clients, moins de tâches répétitives. Devis gratuit sous 24h.",
  keywords: [
    "création site internet",
    "site vitrine professionnel",
    "site web artisan",
    "site web garage",
    "automatisation garage",
    "gain de temps artisan",
    "CRM PME local",
    "prise de rendez-vous en ligne",
    "boutique en ligne",
    "automatisation PME",
    "intelligence artificielle entreprise",
    "visibilité Google",
    "refonte site web",
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
    title: "PhantomDev — Sites web qui convertissent | Devis gratuit 24h",
    description:
      "Sites vitrines, e-commerce et réservation en ligne pour TPE et PME. Automatisation et IA sur demande. Devis gratuit sous 24h sur WhatsApp.",
    url: "https://phantomdev.fr",
    siteName: "PhantomDev",
    locale: "fr_FR",
    alternateLocale: ["en_GB", "en_US"],
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhantomDev — Sites web qui convertissent | Devis gratuit 24h",
    description:
      "Sites vitrines, e-commerce et automatisation pour TPE et PME. Devis gratuit sous 24h · Remote worldwide.",
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
