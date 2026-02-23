# 🔬 AUDIT CoVe — phantomdev.fr

**Méthodologie : Chain of Verification**  
**Date :** 2026-02-23  
**Agents :** Lead Systems Architect | Security Red Teamer | UX/SEO Strategist

---

# PHASE 1 : SYSTEMIC DEEP DIVE

## 1.1 Analyse du Tech Stack

| Élément | Version | Verdict | Notes |
|---------|---------|---------|-------|
| Next.js | 16.1.6 | ✅ À jour | Turbopack, App Router |
| React | 19.2.3 | ✅ À jour | RSC capable |
| Tailwind | 4.x | ✅ Moderne | PostCSS 4 |
| Framer Motion | 12.34.2 | ✅ OK | ~160KB min gzipped |
| Lucide React | 0.575.0 | ✅ Léger | Tree-shakeable |

**Problèmes détectés :**
- `.cursorrules` indique Next.js 15 → obsolète (projet en 16)
- Pas de `@next/bundle-analyzer` pour profiler le bundle en dev

---

## 1.2 Bundle Size & Hydration

### Taille des chunks (estimée)
```
220K  aee6c772 (framer-motion + runtime)
160K  81bf6345 (framework)
128K  d702a24e (page/app)
112K  a6dad97d (vendors)
 28K  CSS
```

**Total JS estimé (avant gzip) :** ~620KB  
**Après gzip :** ~180–220KB (estimé)

### Stratégie d'hydratation : ⚠️ CRITIQUE

| Composant | `"use client"` | Impact |
|-----------|----------------|--------|
| `page.tsx` | Non | Server Component (bon) |
| `Navbar` | Oui | Nécessaire (état mobile menu) |
| `HeroSection` | Oui | Peut être Server + client island |
| `MouseGlow` | Oui | Nécessaire |
| `CustomCursor` | Oui | Nécessaire |
| `Sections` | Oui | **Inutile** — wrapper statique |
| `ScrollReveal` | Oui | Nécessaire |
| `SelectedWorks` | Oui | Peut être partiellement Server |
| `ExpertiseCards` | Oui | Peut être partiellement Server |

**Constat :** 100% des sections sont en Client Components. Aucun bénéfice RSC (streaming, zero-JS pour contenu statique). L'ensemble de l'app hydrate côté client.

**Fichiers concernés :**
- `src/app/page.tsx` — importe uniquement des Client Components
- `src/components/Sections.tsx` — wrapper statique marqué `"use client"`

---

## 1.3 Core Web Vitals — Audit au niveau code

### LCP (Largest Contentful Paint)
| Facteur | État | Fichier / Ligne |
|---------|------|-----------------|
| Images LCP | ⚠️ | `SelectedWorks.tsx:76-87` — `priority={index === 0}` OK pour 1ère image, mais Hero n'a pas d'image LCP |
| Polices | ❌ | `layout.tsx:54-56` — **Double chargement** : Geist (next/font) + Google Fonts (Cormorant, Source Sans) via `<link>` |
| Layout shift | ⚠️ | Hero utilise `clamp()` — bon, mais pas de `aspect-ratio` réservé pour images |
| JavaScript bloquant | ⚠️ | Framer Motion ~160KB chargé avant FCP |

### CLS (Cumulative Layout Shift)
| Facteur | État | Détail |
|---------|------|--------|
| Images | ⚠️ | `SelectedWorks.tsx:77` — `fill` sans `sizes` optimal pour toutes breakpoints |
| CustomCursor | ❌ | **Hydration mismatch** — `CustomCursor.tsx:61-66` : `typeof window` dans le render → rend différent SSR vs client (touch) |
| MouseGlow | ⚠️ | `isTouch` initialisé à `true` puis corrigé en client → possible flash |

### INP (Interaction to Next Paint)
| Facteur | État | Détail |
|---------|------|--------|
| CustomCursor | ⚠️ | `requestAnimationFrame` en boucle continue — même sans mouvement |
| MouseGlow | ⚠️ | `mousemove` déclenche `setState` à chaque frame — pas de throttle |
| Navbar | ✅ | AnimatePresence léger |

---

## 1.4 Code Smells & Dette architecturale

### Fichiers / Lignes critiques

| Fichier | Ligne(s) | Problème |
|---------|----------|-----------|
| `layout.tsx` | 47-56 | Double chargement polices : Geist + Google Fonts (Cormorant, Source Sans 3) |
| `CustomCursor.tsx` | 61-66 | Hydration mismatch : `typeof window` en render |
| `SelectedWorks.tsx` | 79 | `alt=""` — images décoratives non accessibles |
| `Navbar.tsx` | 10 | Lien "Projets" → `#selected-works` mais section `#projets` existe aussi |
| `Sections.tsx` | 33-49, 51-69 | Redondance : "Selected Works" + "Projets" (vide) |
| `page.tsx` | 10 | `style={{ overflowX: "hidden" }}` redondant avec `className="overflow-x-hidden"` |
| `next.config.ts` | 16-20 | `Cache-Control` identique pour tout `/:path*` — pas de nuance static vs dynamic |

### Dette architecturale
1. **Pas de séparation Server/Client** — Tout est client, aucun island architecture
2. **Pas de lazy loading** — `CustomCursor`, `MouseGlow` chargés upfront (inutiles sur mobile)
3. **Données en dur** — `projects`, `cards`, `navLinks` dans les composants (pas de CMS/config centralisée)
4. **Pas de middleware** — Pas de redirects, pas de headers dynamiques, pas de geo

---

## 1.5 Sécurité & Bonnes pratiques

| Point | État |
|-------|------|
| HSTS | ✅ `next.config.ts` |
| XSS | ✅ React escape par défaut |
| Dependencies | ⚠️ Pas de `npm audit` exécuté |
| CSP | ❌ Aucun Content-Security-Policy |
| External images | ✅ `images.unsplash.com` autorisé |

---

# PHASE 2 : ADVERSARIAL THINKING (THE JUDGE)

## Où Phase 1 a été trop clémente ?

1. **Bundle size** — On n'a pas mesuré le gzip réel ni le temps de parse/compile. Framer Motion seul peut ajouter 100–150ms sur mobile.
2. **CustomCursor** — On a noté le mismatch hydration, mais pas l'impact : **React va re-render ou afficher un warning** — risque de crash sur certaines configs.
3. **Google Fonts** — `display=swap` cause un FOIT (Flash of Invisible Text) possible — pas mentionné.
4. **Images Unsplash** — Pas de `loading="lazy"` explicite pour les images hors viewport (Next/Image le fait par défaut sauf `priority`) — OK mais à vérifier.

## Échecs silencieux potentiels

1. **`document.body.style.cursor = "none"`** (`CustomCursor.tsx:19`) — Si le composant unmount de manière inattendue, le cursor peut rester `none` (le cleanup restaure, mais un crash avant = cursor perdu).
2. **MouseGlow** — Sur des devices "pointer: fine" mais tactile (hybrides), le matchMedia peut être flou.
3. **Cache-Control** — `max-age=300` sur toutes les routes peut cacher des futurs contenus dynamiques sans s'en rendre compte.

## Hypothèses remises en question

- **"Le site est statique donc peu importe 100% client"** — Faux. Sur 3G, 600KB de JS = ~2–3s de parse. Le TTI (Time to Interactive) en souffre.
- **"Les animations Framer Motion sont légères"** — Framer Motion inclut toute la lib d'animation. Pour un scroll reveal, une alternative CSS `@starting-style` ou `IntersectionObserver` + CSS serait plus légère.

---

# PHASE 3 : EVOLUTIONARY ROADMAP

## Quick Wins (Impact élevé, effort faible)

| Action | Fichier | Ligne | Effort |
|--------|---------|-------|--------|
| Corriger hydration CustomCursor | `CustomCursor.tsx` | 61-66 | Utiliser `useState` + `useEffect` pour `isTouch` et ne pas rendre le curseur avant le mount client |
| Ajouter `alt` aux images | `SelectedWorks.tsx` | 79 | `alt={project.title}` |
| Supprimer style redondant | `page.tsx` | 10 | Retirer `style={{ overflowX: "hidden" }}` |
| Harmoniser nav | `Navbar.tsx` | 10 | Lien "Projets" → `#projets` ou fusionner sections |
| Lazy load CustomCursor + MouseGlow | `page.tsx` | 14-15 | `next/dynamic` avec `ssr: false` |
| Unifier polices | `layout.tsx` | 47-56 | Supprimer Google Fonts link, utiliser `next/font` pour Cormorant + Source Sans si possible |

## Structural Pivot (Refacto pour niveau world-class)

1. **Island Architecture** — Extraire en Server Components tout ce qui n'a pas d'interactivité : structure des sections, titres, textes. Garder `"use client"` uniquement pour ScrollReveal, Navbar, CustomCursor, MouseGlow.
2. **Supprimer / fusionner "Projets"** — La section Projets est vide et redondante avec Selected Works. Fusion ou suppression.
3. **Remplacer Framer Motion pour scroll reveal** — Utiliser `IntersectionObserver` + CSS `@starting-style` ou `view-transition-api` pour réduire le bundle de ~100KB.
4. **Optimiser images** — `sizes` plus précis, `fetchPriority="high"` sur LCP, considérer WebP/AVIF si Unsplash le supporte.
5. **Ajouter CSP** — Header `Content-Security-Policy` restrictif dans `next.config.ts`.

## Future-Proofing (IA, next-gen)

1. **Structured Data** — Ajouter JSON-LD `Person` / `CreativeWork` pour le portfolio (SEO + AI crawlers).
2. **View Transitions API** — Next.js 15+ supporte `experimental_viewTransitions` — préparer la migration.
3. **Partytown / gasification** — Si analytics ajoutés plus tard, isoler les scripts third-party.
4. **Edge middleware** — Préparez un `middleware.ts` pour redirects, A/B, geo (quand nécessaire).

---

# COMMANDES TERMINAL — PROFILING

```bash
# Bundle analysis (ajouter @next/bundle-analyzer d'abord)
npm install -D @next/bundle-analyzer
# Puis dans next.config : analyzer
ANALYZE=true npm run build

# Audit dépendances
npm audit

# Lighthouse CI (si installé)
npx lighthouse https://phantomdev.fr --output=html --output-path=./lighthouse-report.html

# Core Web Vitals en prod
npx vitals https://phantomdev.fr
```

---

# RÉSUMÉ EXÉCUTIF

| Dimension | Note | Priorité |
|-----------|------|----------|
| Tech Stack | 8/10 | — |
| Performance | 6/10 | Haute |
| Accessibilité | 5/10 | Haute |
| SEO | 6/10 | Moyenne |
| Sécurité | 7/10 | Moyenne |
| Maintenabilité | 7/10 | — |

**Top 3 actions immédiates :**
1. Corriger le hydration mismatch dans CustomCursor
2. Ajouter des `alt` aux images SelectedWorks
3. Lazy-load CustomCursor et MouseGlow sur mobile
