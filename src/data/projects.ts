export const projects = [
  {
    id: "phantom-art",
    title: "Phantom Art",
    description:
      "Art Handling & Private Brokerage. Gestion d'œuvres d'art et courtage privé pour collectionneurs et institutions.",
    techs: ["Next.js", "Art Handling", "Tailwind"],
    image: "/images/logos/phantom-art.png",
    href: "https://www.phantomart.fr/",
  },
  {
    id: "redk-motors",
    title: "REDK Motors",
    description:
      "Plateforme vitrine pour spécialiste automobile. Design agressif et élégant pour véhicules de prestige.",
    techs: ["React", "Framer Motion", "Auto-Focus"],
    image: "/images/logos/redk-motors.png",
    href: "https://redk-motors.me/",
  },
  {
    id: "moove-city",
    title: "Moove City",
    description:
      "Solution de mobilité urbaine. Interface dynamique axée sur la conversion et la clarté des services.",
    techs: ["UX/UI", "Next.js", "Mobile-First"],
    image: "/images/logos/moove-city.png",
    href: "https://www.moovecity.fr/",
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
