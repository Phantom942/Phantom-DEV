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
      "Vitrine premium pour collectionneurs — expérience galerie, performance Lighthouse 98%.",
    techs: ["Next.js", "Tailwind", "Vercel"],
    lighthouseScore: 98,
    result: "Lighthouse 98%",
    image: "/images/mockups/phantom-art.png",
    mockupImage: "/images/mockups/phantom-art.png",
    href: "https://www.phantomart.fr/",
    caseStudy: {
      defi: "Image de marque peu visible en ligne et parcours catalogue peu lisible sur mobile.",
      solution:
        "Site vitrine Next.js statique, mise en page type galerie et assets optimisés pour un rendu haut de gamme.",
      result:
        "Lighthouse 98+, chargement sous la seconde et navigation simplifiée pour les collectionneurs.",
    },
  },
  {
    id: "redk-motors",
    type: "vitrine" as const,
    title: "REDK Motors",
    imageBg: "gray" as const,
    tags: ["Site vitrine", "Automobile", "Design"],
    description:
      "Garage premium — tunnel de réservation en 3 clics et performance mobile renforcée.",
    techs: ["Next.js", "Tailwind", "SEO local"],
    lighthouseScore: 95,
    result: "Lighthouse 95+",
    image: "/images/mockups/redk-motors.png",
    mockupImage: "/images/mockups/redk-motors.png",
    href: "https://redk-motors.me/",
    caseStudy: {
      defi: "Système de réservation obsolète et perte de trafic mobile local.",
      solution:
        "Architecture Next.js statique, tunnel fluide en 3 clics et design carbone premium.",
      result:
        "Score Performance Lighthouse 95+, chargement instantané et hausse des prises de RDV.",
    },
  },
  {
    id: "kraken-metals",
    type: "vitrine" as const,
    title: "Kraken Metals",
    imageBg: "gray" as const,
    tags: ["Site vitrine", "Industrie", "SEO"],
    description:
      "Atelier de soudure — visibilité locale et demandes de devis mieux qualifiées.",
    techs: ["Site vitrine", "SEO", "Responsive"],
    lighthouseScore: 95,
    result: "Lighthouse 95+",
    image: "/images/mockups/kraken-metals.png",
    mockupImage: "/images/mockups/kraken-metals.png",
    href: "https://www.kraken-metals.fr/",
    caseStudy: {
      defi: "Faible visibilité locale : les prospects ne trouvaient ni les prestations ni la zone d’intervention.",
      solution:
        "Site vitrine orienté SEO local, pages services structurées et CTA contact immédiat.",
      result:
        "Lighthouse 95+, meilleure visibilité SEO et leads plus qualifiés sur les requêtes métier.",
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
    techs: ["Next.js", "UX/UI", "Mobile-First"],
    lighthouseScore: 97,
    result: "Conversion +25%",
    image: "/images/mockups/moove-city.png",
    mockupImage: "/images/mockups/moove-city.png",
    href: "https://www.moovecity.fr/",
    caseStudy: {
      defi: "Formulaire de réservation complexe réduisant les conversions.",
      solution:
        "Application sur-mesure ultra-rapide, UI minimaliste pensée mobile-first.",
      result:
        "Conversion en hausse de +25% et interface fluide sous la seconde.",
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
    result: "Lighthouse 95+",
    image: "/images/logos/oriental-beauty.png",
    mockupImage: "/images/mockups/oriental-beauty.png",
    href: "https://www.orientalbeauty.fr/",
    caseStudy: {
      defi: "Prise de rendez-vous fragmentée (appels uniquement) et faible conversion sur mobile.",
      solution:
        "Site vitrine responsive, fiches soins claires et réservation en ligne intégrée.",
      result:
        "Lighthouse 95+, calendrier en ligne actif et parcours RDV simplifié à Créteil.",
    },
  },
] as const;

function buildCaseStudySummary(caseStudy: ProjectCaseStudy): string {
  return `${caseStudy.defi} ${caseStudy.solution} ${caseStudy.result}`;
}

export const creativeWorkSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Réalisations PhantomDev",
  description:
    "Études de cas PhantomDev : sites vitrines, e-commerce et applications sur-mesure orientées conversion et performance.",
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
        name: "PhantomDev",
        url: "https://phantomdev.fr",
      },
      keywords: [...p.techs, ...p.tags].join(", "),
    },
  })),
};
