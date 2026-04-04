import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";
import { LangAttribute } from "@/components/LangAttribute";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { SkipToContent } from "@/components/SkipToContent";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": "https://phantomdev.fr/#organization",
    name: "PhantomDev",
    url: "https://phantomdev.fr",
    description:
      "Création de sites web premium sur-mesure. Sites vitrines, e-commerce, SaaS. Next.js, React, Node.js. Devis gratuit sous 24h. Performance Lighthouse 90+. France, Europe, international.",
    image: "https://phantomdev.fr/og-image.png",
    sameAs: ["https://github.com/Phantom942"],
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "Luxembourg" },
      { "@type": "Country", name: "Germany" },
    ],
    priceRange: "€€",
    serviceType: [
      "Création de sites web",
      "Développement web sur-mesure",
      "Sites vitrines",
      "E-commerce",
      "Applications SaaS",
      "Intégration IA",
      "Installation GrapheneOS (Google Pixel)",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "SaaS",
      "E-commerce",
      "Développement web",
      "GrapheneOS",
    ],
    slogan: "Des sites web premium qui convertissent.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["French", "English"],
      areaServed: ["FR", "GB", "US", "CA", "CH", "BE", "LU", "DE"],
      url: "https://phantomdev.fr/contact",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services PhantomDev",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Site vitrine sur-mesure", description: "Conception web premium, interfaces raffinées, UX conversion." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce et marketplace", description: "Plateformes e-commerce robustes, paiement, gestion stocks." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Application SaaS", description: "Applications métier sur-mesure, scalables, performantes." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Intégration IA", description: "Chatbots, recommandations, automatisation intelligente." } },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://phantomdev.fr/#website",
    url: "https://phantomdev.fr",
    name: "PhantomDev",
    description: "Création de sites web premium sur-mesure — France, Europe, international",
    publisher: { "@id": "https://phantomdev.fr/#organization" },
    inLanguage: ["fr", "en"],
  };

  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${cormorant.variable} ${sourceSans.variable} overflow-x-clip`}
    >
      <body className="overflow-x-clip font-sans antialiased">
        <SkipToContent />
        <LangAttribute />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
