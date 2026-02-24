# Phantom-DEV — Site vitrine PhantomDev

Site Next.js (export statique) pour PhantomDev. Déploiement sur **GitHub Pages** uniquement.

## Développement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build (export statique)

```bash
npm run build
```

Génère le dossier `out/` (HTML, CSS, JS statiques). Ces fichiers peuvent être hébergés sur n’importe quel serveur web ou CDN.

## Déploiement sur GitHub Pages

1. **Activer GitHub Pages**  
   Sur le dépôt : **Settings → Pages** → **Build and deployment** → **Source** : **GitHub Actions**.

2. **Pousser sur `main`**  
   À chaque push sur `main`, le workflow `.github/workflows/deploy-pages.yml` :
   - installe les dépendances,
   - lance `npm run build`,
   - déploie le contenu de `out/` sur GitHub Pages.

3. **URL du site (après déploiement)**  
   - **Avec domaine personnalisé (phantomdev.fr) :** https://phantomdev.fr/  
   - **Sans domaine (GitHub) :** https://phantom942.github.io/Phantom-DEV/  
   Avec le domaine personnalisé, le site est à la **racine** (phantomdev.fr/), pas dans /Phantom-DEV/.

4. **Domaine personnalisé**  
   Si tu utilises phantomdev.fr : **Settings → Pages** → **Custom domain** → saisir `phantomdev.fr` et configurer le DNS selon `docs/CONFIG_DNS_GITHUB_PAGES.md`.

### En cas de 404

- Vérifier que **Settings → Pages → Source** = **GitHub Actions** (pas « Deploy from a branch »).
- Ouvrir exactement : **https://phantomdev.fr/** (avec le domaine perso) ou **https://phantom942.github.io/Phantom-DEV/** (avec le slash final).
- Si tu vois « DEPLOYMENT_NOT_FOUND » : la requête part encore vers **Vercel**. Utiliser l’URL GitHub ci-dessus, ou corriger le DNS pour phantomdev.fr (voir `docs/CONFIG_DNS_GITHUB_PAGES.md`).
- Vider le cache / tester en **navigation privée** ou sur un autre réseau.

## Variables d’environnement

- **`NEXT_PUBLIC_WHATSAPP_NUMBER`** : numéro WhatsApp (indicatif + numéro sans espaces, ex. `13436662018`). Par défaut le numéro PhantomDev est déjà défini dans le code.

## Structure

- Contact : **WhatsApp uniquement** (tous les boutons mènent à un lien `wa.me`).
- Le formulaire email et l’API `/api/contact` (Resend) restent dans le projet pour un usage futur sur un hébergement avec serveur (pas utilisé sur GitHub Pages).
