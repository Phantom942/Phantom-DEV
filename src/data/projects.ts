export const projects = [
  {
    id: "phantom-art",
    title: "Phantom Art",
    imageBg: "white" as const,
    description:
      "Art Handling & Private Brokerage. Gestion d'œuvres d'art et courtage privé pour collectionneurs et institutions.",
    techs: ["Next.js", "Tailwind", "Vercel"],
    lighthouseScore: 98,
    result: "Lighthouse 98%",
    image: "/images/logos/phantom-art.png",
    href: "https://www.phantomart.fr/",
    details: {
      enjeu: "Plateforme premium pour collectionneurs, expérience luxe sans compromis.",
      solution: "Next.js App Router + Tailwind + Vercel Edge.",
      gain: "Lighthouse 98% · Chargement <1s.",
    },
  },
  {
    id: "redk-motors",
    title: "REDK Motors",
    imageBg: "gray" as const,
    description:
      "Plateforme vitrine pour spécialiste automobile. Design agressif et élégant pour véhicules de prestige.",
    techs: ["React", "Framer Motion", "Auto-Focus"],
    lighthouseScore: 95,
    result: "Lighthouse 95%",
    image: "/images/logos/redk-motors.png",
    href: "https://redk-motors.me/",
    details: {
      enjeu: "Site vitrine haut de gamme pour véhicules de prestige.",
      solution: "React + Framer Motion + images optimisées.",
      gain: "Lighthouse 95% · Animations fluides.",
    },
  },
  {
    id: "kraken-metals",
    title: "Kraken Metals",
    imageBg: "gray" as const,
    description:
      "Atelier de soudage de précision à Ivry-sur-Seine. Métallerie, ferronnerie d'art, tuyauterie industrielle. Intervention sous 24h.",
    techs: ["Site vitrine", "SEO", "Responsive"],
    lighthouseScore: 95,
    result: "Lighthouse 95%",
    image: "/images/logos/kraken-metals.png",
    href: "https://www.kraken-metals.fr/",
    details: {
      enjeu: "Site vitrine pour atelier de soudage de précision, Paris & Val-de-Marne.",
      solution: "Design industriel, mise en avant des services et de la zone d'intervention.",
      gain: "Présence digitale · Intervention sous 24h.",
    },
  },
  {
    id: "moove-city",
    title: "Moove City",
    imageBg: "white" as const,
    description:
      "Solution de mobilité urbaine. Interface dynamique axée sur la conversion et la clarté des services.",
    techs: ["Next.js", "UX/UI", "Mobile-First"],
    lighthouseScore: 97,
    result: "Conversion +25%",
    image: "/images/logos/moove-city.png",
    href: "https://www.moovecity.fr/",
    details: {
      enjeu: "Interface de mobilité urbaine claire et convertissante.",
      solution: "Next.js + UX Mobile-First + parcours optimisé.",
      gain: "Conversion +25% · Lighthouse 97%.",
    },
  },
] as const;

export const creativeWorkSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Réalisations PhantomDev",
  description: "Projets web réalisés par PhantomDev : sites vitrines, e-commerce, applications sur-mesure.",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      url: `https://phantomdev.fr#${p.id}`,
      author: {
        "@type": "Person",
        name: "PhantomDev",
        url: "https://phantomdev.fr",
      },
      keywords: p.techs.join(", "),
    },
  })),
};
