import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} overflow-x-hidden font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
