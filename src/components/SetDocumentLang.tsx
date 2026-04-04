type LangCode = "en-GB" | "en-US";

const INLINE: Record<LangCode, string> = {
  "en-GB": "document.documentElement.setAttribute('lang','en-GB');",
  "en-US": "document.documentElement.setAttribute('lang','en-US');",
};

/** Pour export statique : exécuté tôt, avant hydratation (meilleur que lang=fr figé pour les pages EN). */
export function SetDocumentLang({ lang }: { lang: LangCode }) {
  return <script dangerouslySetInnerHTML={{ __html: INLINE[lang] }} />;
}
