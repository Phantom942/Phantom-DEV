export type ProjectType = "vitrine" | "application";

export const projects = [
  {
    id: "phantom-art",
    type: "vitrine" as const,
    title: "Phantom Art",
    imageBg: "white" as const,
    /** Pastilles type portfolio (style carte mockup). */
    tags: ["Site vitrine", "Design", "Art & culture"],
    description:
      "Site pour collectionneurs d’art : présentation des services, image élégante et navigation simple.",
    techs: ["Next.js", "Tailwind", "Vercel"],
    lighthouseScore: 98,
    result: "Lighthouse 98%",
    image: "/images/logos/phantom-art.png",
    mockupImage: "/images/mockups/phantom-art.png",
    href: "https://www.phantomart.fr/",
    details: {
      enjeu: "Plateforme premium pour collectionneurs, expérience luxe sans compromis.",
      solution: "Next.js App Router + Tailwind + Vercel Edge.",
      gain: "Lighthouse 98% · Chargement <1s.",
    },
  },
  {
    id: "redk-motors",
    type: "vitrine" as const,
    title: "REDK Motors",
    imageBg: "gray" as const,
    tags: ["Site vitrine", "Automobile", "Design"],
    description:
      "Site pour garage et carrosserie : rendez-vous en ligne, services clairement listés, style automobile premium.",
    techs: ["React", "Framer Motion", "Auto-Focus"],
    lighthouseScore: 95,
    result: "Lighthouse 95%",
    image: "/images/logos/redk-motors.png",
    mockupImage: "/images/mockups/redk-motors.png",
    href: "https://redk-motors.me/",
    details: {
      enjeu: "Site vitrine haut de gamme pour véhicules de prestige.",
      solution: "React + Framer Motion + images optimisées.",
      gain: "Lighthouse 95% · Animations fluides.",
    },
  },
  {
    id: "kraken-metals",
    type: "vitrine" as const,
    title: "Kraken Metals",
    imageBg: "gray" as const,
    tags: ["Site vitrine", "Industrie", "SEO"],
    description:
      "Site pour un atelier de soudure en Île-de-France : prestations, zone d’intervention et contact rapide mis en avant.",
    techs: ["Site vitrine", "SEO", "Responsive"],
    lighthouseScore: 95,
    result: "Lighthouse 95%",
    image: "/images/logos/kraken-metals.png",
    mockupImage: "/images/mockups/kraken-metals.png",
    href: "https://www.kraken-metals.fr/",
    details: {
      enjeu: "Site vitrine pour atelier de soudage de précision, Paris & Val-de-Marne.",
      solution: "Design industriel, mise en avant des services et de la zone d'intervention.",
      gain: "Présence digitale · Intervention sous 24h.",
    },
  },
  {
    id: "moove-city",
    type: "application" as const,
    title: "Moove City",
    imageBg: "white" as const,
    tags: ["Application", "Mobilité", "Conversion"],
    description:
      "Réservation et devis pour transport avec chauffeur à Paris : formulaire simple, informations visibles d’un coup d’œil.",
    techs: ["Next.js", "UX/UI", "Mobile-First"],
    lighthouseScore: 97,
    result: "Conversion +25%",
    image: "/images/logos/moove-city.png",
    mockupImage: "/images/mockups/moove-city.png",
    href: "https://www.moovecity.fr/",
    details: {
      enjeu: "Interface de mobilité urbaine claire et convertissante.",
      solution: "Next.js + UX Mobile-First + parcours optimisé.",
      gain: "Conversion +25% · Lighthouse 97%.",
    },
  },
  {
    id: "oriental-beauty",
    type: "vitrine" as const,
    title: "Oriental Beauty",
    imageBg: "white" as const,
    tags: ["Site vitrine", "Institut", "Réservation"],
    description:
      "Site pour institut de beauté à Créteil : soins expliqués clairement et prise de rendez-vous en ligne.",
    techs: ["Site vitrine", "SEO", "Responsive"],
    lighthouseScore: 95,
    result: "Lighthouse 95%",
    image: "/images/logos/oriental-beauty.png",
    mockupImage: "/images/mockups/oriental-beauty.png",
    href: "https://www.orientalbeauty.fr/",
    details: {
      enjeu: "Site vitrine pour institut de beauté, Browlift et cire orientale à Créteil (94).",
      solution: "Design élégant, mise en avant des services et prise de rendez-vous en ligne.",
      gain: "Présence digitale · Calendrier intégré.",
    },
  },
] as const;

export const creativeWorkSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Réalisations PhantomDev",
  description: "Projets web réalisés par PhantomDev : sites vitrines, e-commerce, applications sur-mesure. International.",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      url: p.href,
      author: {
        "@type": "Organization",
        name: "PhantomDev",
        url: "https://phantomdev.fr",
      },
      keywords: [...p.techs, ...p.tags].join(", "),
    },
  })),
};
