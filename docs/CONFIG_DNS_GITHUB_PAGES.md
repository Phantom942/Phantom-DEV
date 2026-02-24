# Configuration DNS phantomdev.fr pour GitHub Pages

Ce fichier décrit les changements à faire chez ton fournisseur DNS (où est géré phantomdev.fr) pour pointer le site vers **GitHub Pages** au lieu de Vercel.

---

## Modifications à faire

### 1. Domaine principal **phantomdev.fr** (apex)

**Avant (Vercel) :** 1 enregistrement A → `216.198.79.1`

**Après (GitHub Pages) :** 4 enregistrements **A** (remplacer ou supprimer l’ancien, puis ajouter) :

| Type | Nom (host) | TTL | Valeur |
|------|------------|-----|--------|
| A | `@` ou `phantomdev.fr` | 900 | `185.199.108.153` |
| A | `@` ou `phantomdev.fr` | 900 | `185.199.109.153` |
| A | `@` ou `phantomdev.fr` | 900 | `185.199.110.153` |
| A | `@` ou `phantomdev.fr` | 900 | `185.199.111.153` |

---

### 2. Sous-domaine **www.phantomdev.fr**

**Avant (Vercel) :** CNAME → `cname.vercel-dns.com`

**Après (GitHub Pages) :** modifier le CNAME pour qu’il pointe vers :

| Type | Nom (host) | TTL | Valeur |
|------|------------|-----|--------|
| CNAME | `www` | 900 | `phantom942.github.io` |

(Remplace `phantom942` par ton identifiant GitHub si ce n’est pas le bon.)

---

### 3. Ne pas toucher aux enregistrements email / autres

Conserver tels quels (même TTL si tu veux) :

- **MX** pour `phantomdev.fr` → `mail-fr.securemail.pro`
- **TXT** SPF pour `phantomdev.fr`
- **CNAME** : `smtp`, `webmail`, `mail`, `ftp`, `pim`, `autoconfig`
- **SRV** : `_autodiscover._tcp`

---

## Ordre conseillé

1. Sur **GitHub** : repo **Phantom-DEV** → **Settings** → **Pages** → **Custom domain** : ajoute `phantomdev.fr` et `www.phantomdev.fr` (ou seulement celui que tu utilises en principal).
2. Chez ton **DNS** : appliquer les changements ci‑dessus (A pour apex, CNAME pour www).
3. Attendre la propagation (quelques minutes à 24 h).
4. Sur GitHub, vérifier que le domaine est validé et cocher **Enforce HTTPS** si proposé.

---

## Fichier CSV

Le fichier `Liste_des_zones_phantomdev.fr_GITHUB_PAGES.csv` dans ce dossier contient une zone complète type (phantomdev.fr + www + mail, etc.) prête à importer ou à recopier, selon ce que ton hébergeur DNS accepte.

Si ton hébergeur n’accepte qu’un seul enregistrement A pour l’apex, ajoute au moins les 4 IP une par une (même nom, 4 lignes A).

---

## Dépannage : « DNS check unsuccessful » / « Both improperly configured »

Si GitHub affiche que **phantomdev.fr** et son nom alternatif ne sont pas correctement configurés :

1. **Vérifier les 4 A pour l’apex**  
   Chez ton hébergeur DNS, pour **phantomdev.fr** (ou `@`) il doit y avoir **exactement 4 enregistrements A** avec les valeurs :
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`  
   S’il reste un ancien A (ex. `216.198.79.1` pour Vercel), **le supprimer**.

2. **Vérifier le CNAME pour www**  
   Pour **www.phantomdev.fr** (ou host `www`) : un seul **CNAME** vers **phantom942.github.io** (sans `https://`, sans slash).  
   S’il pointe encore vers `cname.vercel-dns.com`, **le modifier**.

3. **Propagation**  
   Après toute modification DNS, attendre **5 à 30 minutes** (parfois jusqu’à 24 h). Puis sur GitHub : **Custom domain** → **Check again**.

4. **Tester la résolution**  
   - [whatsmydns.net](https://www.whatsmydns.net) : vérifier que `phantomdev.fr` renvoie bien les 4 IP GitHub et que `www.phantomdev.fr` renvoie vers `phantom942.github.io`.
   - En ligne de commande : `nslookup phantomdev.fr` et `nslookup www.phantomdev.fr`.

5. **Un seul domaine dans GitHub**  
   Dans **Custom domain**, ne saisir **que** `phantomdev.fr` (sans www). GitHub gère automatiquement le « nom alternatif » (www) si les deux sont bien configurés en DNS.
