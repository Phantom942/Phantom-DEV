import {
  buildProfessionalServiceSchema,
  buildWebsiteSchema,
} from "@/lib/json-ld";

/**
 * Données structurées Schema.org (layout global).
 * ProfessionalService : SEO + signaux pour crawlers IA (GEO/LLM).
 */
export default function JsonLd() {
  const professionalService = buildProfessionalServiceSchema();
  const website = buildWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalService),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website),
        }}
      />
    </>
  );
}
