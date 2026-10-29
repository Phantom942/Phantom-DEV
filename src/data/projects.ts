export type ProjectType = "vitrine" | "application";

export type ProjectCaseStudy = {
  defi: string;
  solution: string;
  result: string;
};

export const projects = [
  {
    id: "phantom-art",
    type: "vitrine" as const,
    title: "Phantom Art",
    imageBg: "white" as const,
    tags: ["Site vitrine", "Design", "Art & culture"],
    description:
      "Galerie en ligne pour collectionneurs — image premium, navigation simple, chargement instantané.",
    techs: ["Site vitrine", "Galerie en ligne", "Mobile"],
    lighthouseScore: 98,
    result: "Image pro, chargement instantané",
    image: "/images/mockups/phantom-art.png",
    mockupImage: "/images/mockups/phantom-art.png",
    href: "https://www.phantomart.fr/",
    caseStudy: {
      defi: "Peu visible en ligne et catalogue illisible sur téléphone — les collectionneurs partaient ailleurs.",
      solution:
        "Vitrine type galerie, navigation claire et site ultra-rapide sur mobile comme sur desktop.",
      result:
        "Image renforcée, parcours simplifié et site qui s'affiche en moins d'une seconde.",
    },
  },
  {
    id: "redk-motors",
    type: "vitrine" as const,
    title: "REDK Motors",
    imageBg: "gray" as const,
    tags: ["Site vitrine", "Automobile", "Réservation"],
    description:
      "Garage automobile — prise de rendez-vous en 3 clics, moins d'appels à gérer au comptoir.",
    techs: ["Site vitrine", "Réservation en ligne", "Mobile"],
    lighthouseScore: 95,
    result: "Plus de RDV, moins d'appels",
    image: "/images/mockups/redk-motors.png",
    mockupImage: "/images/mockups/redk-motors.png",
    href: "https://redk-motors.me/",
    caseStudy: {
      defi: "Trop d'appels pour des créneaux simples, réservations perdues et équipe saturée au téléphone.",
      solution:
        "Tunnel de réservation en ligne fluide : le client choisit son créneau en 3 clics, sans passer par le standard.",
      result:
        "Plus de rendez-vous confirmés automatiquement, moins de temps au téléphone, agenda du garage mieux rempli.",
    },
  },
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
    href: "https://www.kraken-metals.fr/",
    caseStudy: {
      defi: "Les prospects ne trouvaient ni les prestations ni la zone d'intervention — appels manqués et devis perdus.",
      solution:
        "Site structuré par services, visible sur Google, avec bouton contact et devis immédiat.",
      result:
        "Plus de demandes entrantes qualifiées sur les recherches métier — moins de temps perdu au téléphone.",
    },
  },
  {
    id: "moove-city",
    type: "application" as const,
    title: "Moove City",
    imageBg: "white" as const,
    tags: ["Application", "Mobilité", "Conversion"],
    description:
      "Transport avec chauffeur — réservation simplifiée, +25% de conversion.",
    techs: ["Réservation en ligne", "Mobile", "Conversion"],
    lighthouseScore: 97,
    result: "Conversion +25%",
    image: "/images/mockups/moove-city.png",
    mockupImage: "/images/mockups/moove-city.png",
    href: "https://www.moovecity.fr/",
    caseStudy: {
      defi: "Réservation trop compliquée : les clients abandonnaient avant de confirmer.",
      solution:
        "Parcours de réservation simplifié, pensé mobile en priorité — 3 étapes, pas de friction.",
      result:
        "Conversion en hausse de +25 % et réservations validées plus vite.",
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
