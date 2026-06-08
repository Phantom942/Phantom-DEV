# AGENTS.md — PhantomDev

Guide pour les agents Cursor travaillant sur ce dépôt.

## Projet

Site vitrine **phantomdev.fr** — agence sites web & automatisation pour **TPE, PME, artisans, garages**.

| | |
|---|---|
| **Stack** | Next.js 16 · React 19 · Tailwind 4 · Framer Motion · TypeScript |
| **Build** | `output: "export"` (statique) |
| **Hébergement** | GitHub Pages |
| **Langues** | FR (défaut), EN-GB, EN-US |

## Structure clé

```
src/
├── app/              # Pages App Router (+ en-gb/, en-us/)
├── components/       # UI (HeroSection, Footer, Sections…)
├── data/
│   ├── translations/ # fr.ts, en-gb.ts, en-us.ts
│   ├── projects.ts   # Études de cas clients
│   └── services.ts   # Config services
├── lib/              # JSON-LD, SEO, hreflang, metadata
└── hooks/            # useTranslations, WhatsApp…
public/
├── llms.txt          # Indexation IA / citation
└── images/           # Logos, mockups WebP
.cursor/rules/        # Règles Cursor (lire en priorité)
```

## Positionnement copy (FR)

- **Oui** : plus de clients, RDV en ligne, gain de temps, CRM PME, visibilité Google
- **Non** (texte visible / indexé FR) : Next.js, Lighthouse, Headless, jargon dev

## Commandes

```bash
npm run dev      # Dev local
npm run build    # Vérifier avant commit
npm run lint     # ESLint
```

## Tâches fréquentes

| Tâche | Où agir |
|-------|---------|
| Texte hero / FAQ / services FR | `src/data/translations/fr.ts` |
| Meta SEO page | `src/app/<route>/page.tsx` + `layout.tsx` |
| Nouveau projet client | `src/data/projects.ts` |
| Schema.org | `src/lib/json-ld.ts` |
| Style global | `src/app/globals.css` + composants existants |

## MCP utiles

- **Vercel** — déploiement, env, perf (si migration future)
- **GitLab / GitHub** — push, CI, PR
- **Figma** — design-to-code maquettes client

## Interdits

- Commit/push sans demande explicite
- Modifier `design/`, assets non liés à la tâche
- Réintroduire thème « luxury gold » — design actuel = **stealth dark + cyan**
- API routes ou features incompatible export statique

## Règles Cursor

Les règles détaillées sont dans `.cursor/rules/` :

- `phantomdev-core.mdc` — toujours actif
- `copy-seo-fr.mdc` — copy & SEO FR
- `ui-design.mdc` — composants & CSS
- `workflows.mdc` — i18n, git, déploiement
