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
  metadataBase: new URL("https://phantomdev.fr"),
  title: "PhantomDev | Création de sites web premium sur-mesure",
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
  ],
  alternates: {
    canonical: "https://phantomdev.fr",
  },
  openGraph: {
    title: "PhantomDev | Création de sites web premium sur-mesure",
    description:
      "Sites web sur-mesure qui convertissent. E-commerce, vitrines, applications premium. Devis gratuit.",
    url: "https://phantomdev.fr",
    siteName: "PhantomDev",
    locale: "fr_FR",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhantomDev | Création de sites web premium",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "PhantomDev",
  url: "https://phantomdev.fr",
  jobTitle: "Architecte digital",
  description:
    "Création de sites web sur-mesure : e-commerce, vitrines, applications premium.",
  knowsAbout: ["Next.js", "React", "E-commerce", "Développement web"],
};

return (
    <html
      lang="fr"
      className={`${geist.variable} ${geistMono.variable} ${cormorant.variable} ${sourceSans.variable} overflow-x-hidden`}
    >
      <body className="overflow-x-hidden font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {children}
      </body>
    </html>
  );
}
