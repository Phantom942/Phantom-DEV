export type ProjectType = "vitrine" | "application";

export type ProjectCaseStudy = {
  defi: string;
  solution: string;
  result: string;
};

export const projects = [
  {
    id: "kraken-metals",
    type: "vitrine" as const,
    title: "Kraken Metals",
    imageBg: "gray" as const,
    tags: ["Site vitrine", "Industrie", "SEO"],
    description:
      "Atelier de soudure — plus visible sur Google, demandes de devis mieux ciblées.",
    techs: ["Site vitrine", "SEO", "Responsive"],
    lighthouseScore: 95,
    result: "Plus de devis qualifiés via Google",
    image: "/images/mockups/kraken-metals.png",
    mockupImage: "/images/mockups/kraken-metals.png",
    href: "https://phantom942.github.io/KRAKEN-METALS/",
    caseStudy: {
      defi: "Les prospects ne trouvaient ni les prestations ni la zone d'intervention — appels manqués et devis perdus.",
      solution:
        "Site structuré par services, visible sur Google, avec bouton contact et devis immédiat.",
      result:
        "Plus de demandes entrantes qualifiées sur les recherches métier — moins de temps perdu au téléphone.",
    },
  },
  {
    id: "oriental-beauty",
    type: "vitrine" as const,
    title: "Oriental Beauty",
    imageBg: "white" as const,
    tags: ["Site vitrine", "Institut", "Réservation"],
    description:
      "Institut de beauté — prise de RDV en ligne et parcours mobile optimisé.",
    techs: ["Site vitrine", "SEO", "Responsive"],
    lighthouseScore: 95,
    result: "RDV en ligne sans passer par le téléphone",
    image: "/images/logos/oriental-beauty.png",
    mockupImage: "/images/mockups/oriental-beauty.png",
    href: "https://www.orientalbeauty.fr/",
    caseStudy: {
      defi: "Prise de rendez-vous fragmentée (appels uniquement) et faible conversion sur mobile.",
      solution:
        "Site vitrine responsive, fiches soins claires et réservation en ligne intégrée.",
      result:
        "Calendrier en ligne actif, parcours RDV simplifié et moins d'appels au standard à Créteil.",
    },
  },
] as const;

function buildCaseStudySummary(caseStudy: ProjectCaseStudy): string {
  return `${caseStudy.defi} ${caseStudy.solution} ${caseStudy.result}`;
}

export const creativeWorkSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Réalisations NADER DEV WEB",
  description:
    "Études de cas NADER DEV WEB : plus de clients, de RDV et de ventes grâce à des sites et outils sur-mesure.",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      abstract: buildCaseStudySummary(p.caseStudy),
      url: p.href,
      author: {
        "@type": "Organization",
        name: "NADER DEV WEB",
        url: "https://phantomdev.fr",
      },
      keywords: [...p.techs, ...p.tags].join(", "),
    },
  })),
};
