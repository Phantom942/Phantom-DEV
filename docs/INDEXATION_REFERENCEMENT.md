# Indexation et référencement phantomdev.fr

## Ce qui est déjà en place

- **robots.txt** : https://phantomdev.fr/robots.txt (autorise tout, référence le sitemap)
- **Sitemap** : https://phantomdev.fr/sitemap.xml (pages indexées)
- **Meta** : title, description, keywords, canonical
- **Open Graph** : partage réseaux sociaux
- **JSON-LD** : schema.org ProfessionalService pour Google

---

## 1. Google Search Console

1. Va sur [search.google.com/search-console](https://search.google.com/search-console)
2. **Ajouter une propriété** → choisis **Préfixe d’URL**
3. Saisis : `https://phantomdev.fr`
4. **Vérifier la propriété** :
   - **Méthode recommandée** : balise HTML dans le site (on peut l’ajouter si besoin)
   - **Alternative** : fichier HTML à déposer à la racine
   - **Alternative** : enregistrement DNS (meta tag chez ton hébergeur DNS)
5. Une fois vérifiée → **Sitemaps** → **Ajouter un sitemap** → `https://phantomdev.fr/sitemap.xml`
6. **Demander une indexation** de l’URL : `https://phantomdev.fr`

Google indexera le site sous 1 à 7 jours en général.

---

## 2. Bing Webmaster Tools

1. Va sur [bing.com/webmasters](https://www.bing.com/webmasters)
2. Connecte-toi avec un compte Microsoft
3. **Ajouter un site** → `https://phantomdev.fr`
4. **Importer depuis Google** si tu as déjà configuré Search Console (simple et rapide)
5. Sinon, vérifie le site (HTML, fichier XML ou DNS)
6. Ajoute le sitemap : `https://phantomdev.fr/sitemap.xml`

---

## 3. Vérifier que le site est bien indexable

- `https://phantomdev.fr/robots.txt` doit afficher `Sitemap: https://phantomdev.fr/sitemap.xml`
- `https://phantomdev.fr/sitemap.xml` doit lister les 4 pages (/, /services, /contact, /mentions-legales)

---

## 4. Après soumission

- Vérifie régulièrement Search Console (mobiles, erreurs, performances)
- Le positionnement peut prendre 2 à 4 semaines
- Mise à jour du contenu → le sitemap est régénéré à chaque déploiement
