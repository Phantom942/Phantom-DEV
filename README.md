# PhantomDev

Site vitrine [phantomdev.fr](https://phantomdev.fr) — Next.js, export statique, déployé sur GitHub Pages.

## Prérequis

- Node.js 20+
- npm

## Installation

```bash
npm install
```

## Variables d'environnement

Copiez `.env.example` vers `.env` et renseignez :

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp avec indicatif pays (ex: `33612345678`), sans `+` ni espaces. Utilisé pour les liens et le bouton de contact. |

## Scripts

```bash
npm run dev      # Serveur de développement (localhost:3000)
npm run build    # Build statique → dossier out/
npm run start    # Serveur de production (après build)
npm run lint     # Vérification ESLint
```

## Structure du projet

```
├── src/
│   ├── app/              # Routes App Router (/, /services, /contact, /en-gb, /en-us…)
│   ├── components/       # Composants React (Navbar, Footer, Sections…)
│   ├── data/             # Données (traductions, FAQ, projets)
│   ├── hooks/            # useTranslations
│   └── lib/              # Utilitaires (hreflang)
├── public/               # Assets statiques (images, favicon, vérification Google)
├── docs/                 # Documentation (DNS, images projets)
└── .github/workflows/    # CI/CD GitHub Actions
```

## Internationalisation

- **Locales** : FR (défaut), EN-GB, EN-US
- **Routes** : `/` (FR), `/en-gb`, `/en-us` + sous-pages (services, contact, mentions-legales)

## Déploiement

Le site est déployé automatiquement sur GitHub Pages via GitHub Actions :

1. **Settings → Pages** : source = GitHub Actions
2. À chaque push sur `main`, le workflow build et déploie dans `out/`
3. Domaine personnalisé : configurer le CNAME (`phantomdev.fr`) et le DNS (voir `docs/CONFIG_DNS_GITHUB_PAGES.md`)

## Licence

Projet privé — PhantomDev. Tous droits réservés.
