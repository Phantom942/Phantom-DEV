import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";
import { faqItems } from "@/data/faq";
import { LangAttribute } from "@/components/LangAttribute";

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
    default: "PhantomDev | Création de sites web premium sur-mesure",
    template: "%s | PhantomDev",
  },
  description:
    "Création de sites web premium sur-mesure. E-commerce, SaaS, vitrines. Devis gratuit sous 48h. Performance Lighthouse 90+. Réponse rapide.",
  keywords: [
    "création site web",
    "développeur web freelance",
    "création site web France",
    "site vitrine sur-mesure",
    "développement e-commerce",
    "refonte site web",
    "Next.js",
    "agence web",
    "site sur-mesure",
    "développement web",
  ],
  alternates: {
    canonical: "https://phantomdev.fr",
  },
  verification: {
    google: "HZvfGLZepr3elEwyUp-gNB9r9oQQ4L4tXC0kjfWDYjw",
  },
  openGraph: {
    type: "website",
    title: "PhantomDev — Création sites web premium | Devis gratuit 48h",
    description:
      "Sites web sur-mesure qui convertissent. E-commerce, SaaS, vitrines. Devis gratuit sous 48h. Performance garantie Lighthouse 90+.",
    url: "https://phantomdev.fr",
    siteName: "PhantomDev",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PhantomDev — Solutions Web Haute Performance & Design Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhantomDev — Création sites web premium | Devis gratuit 48h",
    description:
      "Sites web sur-mesure. E-commerce, SaaS. Devis gratuit sous 48h. Performance garantie.",
    images: ["/og-image.png"],
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
      "Création de sites web premium sur-mesure. Sites vitrines, e-commerce, SaaS. Next.js, React, Node.js. Devis gratuit sous 48h. Performance Lighthouse 90+.",
    image: "https://phantomdev.fr/og-image.png",
    sameAs: ["https://github.com/Phantom942"],
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
    ],
    priceRange: "€€",
    serviceType: [
      "Création de sites web",
      "Développement web sur-mesure",
      "Sites vitrines",
      "E-commerce",
      "Applications SaaS",
      "Intégration IA",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "SaaS",
      "E-commerce",
      "Développement web",
    ],
    slogan: "Des sites web premium qui convertissent.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["French", "English"],
      areaServed: ["FR", "GB", "US"],
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <html
      lang="fr"
      className={`${geist.variable} ${geistMono.variable} ${cormorant.variable} ${sourceSans.variable} overflow-x-clip`}
    >
      <body className="overflow-x-clip font-sans antialiased">
        <LangAttribute />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
