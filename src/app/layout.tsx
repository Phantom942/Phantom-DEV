import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";
import { faqItems } from "@/data/faq";

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
    "PhantomDev : création de sites web sur-mesure avec Next.js. E-commerce, plateformes SaaS, sites vitrines. Performance et design premium. Devis gratuit.",
  keywords: [
    "création site web",
    "développement web",
    "Next.js",
    "e-commerce",
    "site vitrine",
    "PhantomDev",
    "agence web",
    "site sur-mesure",
    "création site web France",
    "développement web sur-mesure",
  ],
  alternates: {
    canonical: "https://phantomdev.fr",
  },
  verification: {
    google: "HZvfGLZepr3elEwyUp-gNB9r9oQQ4L4tXC0kjfWDYjw",
  },
  openGraph: {
    type: "website",
    title: "PhantomDev — Solutions Web Haute Performance & Design Premium",
    description:
      "PhantomDev — Solutions Web Haute Performance & Design Premium. Sites vitrines, e-commerce, applications sur-mesure. Devis gratuit sous 48h.",
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
    title: "PhantomDev — Solutions Web Haute Performance & Design Premium",
    description:
      "Sites vitrines, e-commerce, applications sur-mesure. Devis gratuit sous 48h.",
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
    "@type": "ProfessionalService",
    "@id": "https://phantomdev.fr/#organization",
    name: "PhantomDev",
    url: "https://phantomdev.fr",
    description:
      "Expertise en développement web sur-mesure : sites vitrines, e-commerce, applications SaaS. Stack React, Node.js, Next.js. Interfaces haute performance et référencement.",
    sameAs: ["https://github.com/Phantom942"],
    areaServed: { "@type": "Country", name: "France" },
    serviceType: [
      "Développement web",
      "Création de sites vitrines",
      "E-commerce",
      "Applications SaaS",
      "Intégration IA",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "SaaS",
      "E-commerce",
      "Développement web",
      "Interfaces haute performance",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "French",
      areaServed: "FR",
      url: "https://phantomdev.fr/#contact",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services PhantomDev",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Développement web sur-mesure" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sites vitrines et e-commerce" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Applications SaaS" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Intégration IA" } },
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
