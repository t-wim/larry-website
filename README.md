# \$LARRY — Meme Chaos Protocol

An unapologetically evil, mobile-first meme site.
This repo contains a small static app built with **HTML/CSS/JS** only.
Focus: **void-style gallery**, **album accordion**, **classic top/bottom meme set**, **overlay rituals**, and **clean a11y**.

---

## ✨ Features

* **Void Gallery (Albums/Accordion)**
  Curated albums rendered with `<details>/<summary>`; lazy-mounted tiles; no framework required.

* **Classic Meme Set (Top/Bottom ready)**
  A dedicated album with images ideal for Impact-style captions. Optional phrase presets.

* **Overlay System**
  Reusable modal with blur backdrop for copy confirmations, rituals, and image zoom.

* **Wisdom Tabs**
  Three themed tab sets (Degenerate Wisdom, Bullish Lore, Pump Psychology).

* **Contract Copy (Clipboard with fallback)**
  Writes the contract address to the clipboard (secure-context preferred).

* **Ticker + Identity Glitch**
  A bottom news ticker and an occasional page “glitch” effect for flavor (respects reduced motion).

* **Mobile-first & Accessible**
  Sticky focus outlines, tab semantics, `prefers-reduced-motion`, high-contrast tweaks.

---

## 🧱 Tech Stack

* Vanilla **HTML5**, **CSS3**, **JavaScript (ES6+)**
* No bundler/build step required
* External: Google Fonts, Dexscreener embed (iframe)

---

## 📁 Project Structure

```
/
├─ index.html
├─ styles.css
├─ script.js
├─ /images
│   ├─ placeholder.jpg
│   ├─ glitch-nebel.png
│   ├─ cursor-shake.gif
│   └─ larry-*.{jpg,png,webp}
└─ /fav-icon
    ├─ favicon.ico
    ├─ favicon-16x16.png
    ├─ favicon-32x32.png
    ├─ android-chrome-192x192.png
    ├─ android-chrome-512x512.png
    └─ site.webmanifest
```

---

## 🚀 Getting Started

1. **Clone** the repo and ensure the **images** and **fav-icon** folders are present.
2. Serve the folder with any static server:

```bash
# Option A: Python
python -m http.server 8000

# Option B: Node (http-server)
npx http-server -p 8000

# Option C: Serve (vercel/serve)
npx serve -l 8000
```

3. Open `http://localhost:8000` in your browser.

> ℹ️ **Clipboard API** requires a **secure context** (HTTPS).
> Locally, most browsers allow it; in production, use HTTPS. Fallback copy is implemented.

---

## 🔧 Configuration (where to look)

All behavior is configured in **`script.js`**:

* **Albums**: `albumManifest` — defines albums and their image basenames.
* **Classic phrases**: `classicPhrases` — optional Top/Bottom captions per image.
* **Image extension fallback**: `EXT_ORDER` — tried in order; falls back to `/images/placeholder.jpg`.
* **Overlay defaults**: `showOverlay(title, message, imageSrc)`.
* **Wisdom content**: `const wisdoms = [...]`.
* **Ticker content**: `initializeTicker()` data array.

---

## 🖼️ Adding Images

1. Drop your files into `/images/` using **kebab-case basenames** (e.g., `larry-evil-red-bg.jpg`).
2. If you ship multiple formats, keep the **same basename** and different extensions:

   * `larry-evil-red-bg.jpg`, `larry-evil-red-bg.webp`, `larry-evil-red-bg.png`
3. Ensure `EXT_ORDER` in `script.js` includes the extensions you use.

---

## 🗂️ Adding or Editing Albums

Open **`script.js`** and edit `albumManifest`:

```js
{
  id: 'shadow',
  title: 'Shadow Realm',
  phrase: 'Follow the wick; meet the abyss.',
  images: [
    'a-larry-dark-silou',
    'a-silou-dark',
    'larry-shadow',
    // ...
  ],
}
```

**Rules:**

* No cross-listing across non-classic albums (enforced via dedupe).
* The “classic” album may overlap if you want, but you can keep it exclusive by design.

---

## 🗨️ Classic Meme Phrases (Top/Bottom)

Optional caption presets for the **Classic** album in `classicPhrases`:

```js
const classicPhrases = {
  'larry-evil-red-bg': { top: 'Market bleeding?', bottom: 'Ritual feeding.' },
  'larry-dracula-red-bg': { top: 'Bulls pray', bottom: 'Predators dine.' },
  // ...
};
```

If a classic image has a phrase, the overlay title shows `TOP / BOTTOM`.

---

## 📱 Accessibility & UX

* **Keyboard**: Tabs, overlay close button focus, ESC to close modal.
* **Motion**: Animations reduce under `prefers-reduced-motion`.
* **Contrast**: High-contrast tweaks via `prefers-contrast: high`.
* **ARIA**: Landmarks and states (`role="tab"`, `aria-selected`, `aria-modal`, etc.) maintained.

---

## ⚡ Performance Notes

* Lazy images (`loading="lazy"`, `decoding="async"`).
* Intersection-based fade-ins and album lazy-mounting.
* Simple, static assets — no framework overhead.
* Keep images **square or near 1:1** for the cleanest grid.

---

## 🔐 Security / CSP (optional but recommended)

If you use a Content Security Policy, allow:

* `frame-src https://dexscreener.com`
* `style-src 'self' 'unsafe-inline'` (or hash-based for inline styles you add)
* `font-src https://fonts.gstatic.com`
* `img-src 'self' data:`
* `script-src 'self'`

Tune as needed for your deployment.

---

## 🌐 SEO & Social (optional)

Add Open Graph / Twitter meta in `index.html`:

```html
<meta property="og:title" content="$LARRY – Meme Chaos Protocol" />
<meta property="og:description" content="Pure chaos on-chain. Enter the void." />
<meta property="og:image" content="https://your.domain/images/larry-share.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 🧪 Browser Support

Modern evergreen browsers (Chromium, Firefox, Safari).
The site avoids bleeding-edge APIs and includes sensible fallbacks.

---

## 🛠️ Troubleshooting

* **Clipboard doesn’t copy**: Serve over **HTTPS** in production. Fallback copy is active, but iOS/Safari quirks may require a user gesture.
* **Images not showing**: Check filenames (basename + one of `EXT_ORDER`), confirm `/images/placeholder.jpg` exists.
* **Dexscreener not loading**: Verify network/CSP; iframe allowed?
* **Motion feels heavy on mobile**: Test with `prefers-reduced-motion: reduce` and keep the gallery visible area small.

---

## 🤝 Contributing

* Keep changes **mobile-first** and **a11y-safe**.
* Avoid large dependencies; stick to vanilla HTML/CSS/JS.
* Use **kebab-case** for image basenames.

---

## 📄 License

MIT (or your preferred license). Add a `LICENSE` file at the repo root.

---

## 🙏 Credits

* Fonts: Google Fonts (Creepster, Orbitron)
* Market embed: Dexscreener
* All `$LARRY` images & text: project authors/owners

---

## ✅ Release Checklist

* [ ] All images present & optimized
* [ ] Clipboard works under HTTPS
* [ ] Overlay focus/ESC OK
* [ ] Albums mount lazily; no console errors
* [ ] Ticker visible; not overlapping important CTAs
* [ ] Fallback `placeholder.jpg` confirmed
* [ ] Basic CSP tested (if enabled)

Happy shipping. May Larry judge kindly.
