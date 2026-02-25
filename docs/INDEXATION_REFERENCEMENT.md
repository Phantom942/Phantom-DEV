# Indexation et référencement phantomdev.fr

## Ce qui est en place

- **robots.txt** : https://phantomdev.fr/robots.txt — allow /, disallow /api/, sitemap référencé
- **Sitemap** : https://phantomdev.fr/sitemap.xml — 12 pages avec alternates hreflang (FR, en-GB, en-US)
- **Meta** : title, description, keywords, canonical — optimisés conversion (devis gratuit, délais)
- **Hreflang** : balises alternate dans metadata + sitemap pour SEO multilingue
- **Open Graph / Twitter** : partage réseaux sociaux
- **JSON-LD** :
  - ProfessionalService + LocalBusiness (image, priceRange, areaServed, slogan)
  - FAQPage pour Google
  - BreadcrumbList sur Services et Contact
- **Optimisation IA** : FAQ schema, Organisation enrichie — aide ChatGPT, Perplexity, Google AI

---

## 1. Google Search Console

1. Va sur [search.google.com/search-console](https://search.google.com/search-console)
2. **Ajouter une propriété** → **Préfixe d'URL** → `https://phantomdev.fr`
3. **Vérifier** : balise meta (layout) ou fichier `google83313aa168802dd4.html`
4. **Sitemaps** → **Ajouter** → `https://phantomdev.fr/sitemap.xml`
5. **Demander une indexation** de l'URL d'accueil

Indexation typique : 1 à 7 jours.

---

## 2. Bing Webmaster Tools

1. [bing.com/webmasters](https://www.bing.com/webmasters)
2. **Ajouter un site** → `https://phantomdev.fr`
3. **Importer depuis Google** si Search Console déjà configuré
4. Sinon : vérifier par meta tag ou fichier HTML
5. **Sitemaps** → `https://phantomdev.fr/sitemap.xml`

---

## 3. Vérifications

- https://phantomdev.fr/robots.txt → doit afficher le sitemap
- https://phantomdev.fr/sitemap.xml → doit lister les 12 pages
- Test meta : [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Test schema : [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## 4. Après soumission

- Surveiller Search Console (mobiles, erreurs, performances)
- Positionnement : 2 à 4 semaines en général
- Mise à jour du contenu → sitemap régénéré à chaque déploiement
