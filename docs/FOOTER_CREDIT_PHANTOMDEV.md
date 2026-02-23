# Footer credit PhantomDev

Snippet à coller dans le footer des sites réalisés (Phantom Art, REDK Motors, Moove City, etc.).

## Version complète (avec police Source Sans 3)

Ajoute dans le `<head>` du site :

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400&display=swap" rel="stylesheet">
```

Puis dans le footer :

```html
<a
  href="https://phantomdev.fr"
  target="_blank"
  rel="noopener"
  style="display: inline-flex; align-items: center; gap: 0.5em; color: inherit; text-decoration: none; font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.8; transition: opacity 0.2s ease;"
>
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0" aria-hidden="true">
    <path d="M16 4c-6 0-10 5-10 10 0 1.8.6 3.5 1.5 4.8v4.2l2.5-2.5 2 2.5 2-2.5 2.5 2.5v-4.2c.9-1.3 1.5-3 1.5-4.8 0-5-4-10-10-10z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="11" cy="10.5" r="1.2" fill="currentColor"/>
    <circle cx="21" cy="10.5" r="1.2" fill="currentColor"/>
  </svg>
  Design by PhantomDev
</a>
```

## Version légère (sans Google Fonts)

Utilise la police système. Même snippet, la police sera `-apple-system, Helvetica, Arial` en fallback.

## React / Next.js

```tsx
<a
  href="https://phantomdev.fr"
  target="_blank"
  rel="noopener"
  className="inline-flex items-center gap-2 text-inherit no-underline opacity-80 hover:opacity-100 transition-opacity font-light text-sm tracking-[0.15em] uppercase"
  style={{ fontFamily: "var(--font-source-sans), 'Source Sans 3', sans-serif" }}
>
  <svg width={20} height={20} viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
    <path d="M16 4c-6 0-10 5-10 10 0 1.8.6 3.5 1.5 4.8v4.2l2.5-2.5 2 2.5 2-2.5 2.5 2.5v-4.2c.9-1.3 1.5-3 1.5-4.8 0-5-4-10-10-10z" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx={11} cy={10.5} r={1.2} fill="currentColor"/>
    <circle cx={21} cy={10.5} r={1.2} fill="currentColor"/>
  </svg>
  Design by PhantomDev
</a>
```

## Notes

- `color: inherit` : le lien prend la couleur du texte du footer (blanc sur fond sombre, noir sur fond clair).
- `currentColor` dans le SVG : l'icône suit la couleur du lien.
- Police : Source Sans 3 Light (300) pour coller au logo PhantomDev.
