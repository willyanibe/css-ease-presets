

```markdown
# css-ease-presets

A tiny, MIT-licensed library of **CSS easing presets**: ready-to-use `cubic-bezier(...)` variables, utility classes, optional keyframe animations (for bounce/elastic effects), and a JSON/ESM export for build tools.

- **CSS-first**: import variables or utility classes
- **Framework-friendly**: Tailwind, CSS-in-JS, plain CSS
- **Batteries included**: curated curves + demo page
- **Zero deps**: build script is plain Node; dist is static

---

## Contents

```

css-ease-presets/
├─ dist/
│  ├─ ease-vars.css         # \:root { --ease-*: cubic-bezier(...) }
│  ├─ ease-classes.css      # .ease-*, .transition-ease-\* utilities
│  ├─ animations.css        # keyframes: bounce/elastic (in/out/in-out)
│  ├─ eases.json            # name -> \[x1,y1,x2,y2]
│  └─ index.mjs             # ESM export { eases }
├─ src/
│  ├─ eases.json            # source of truth for curves
│  ├─ animations.css        # source keyframes
│  └─ build.js              # generates dist/\*
├─ demo.html                # interactive preview
├─ package.json
├─ LICENSE (MIT)
└─ README.md

````

---

## Install

```bash
# from npm
npm i css-ease-presets
# or
pnpm add css-ease-presets
# or
yarn add css-ease-presets
````

Using from a git clone? You can consume `dist/` directly without building.

---

## Quick Start

### 1) CSS Variables (recommended)

```css
/* in your global stylesheet */
@import "css-ease-presets/ease-vars.css";

.button {
  transition: transform .3s var(--ease-quart-out);
}
```

### 2) Utility Classes (drop-in)

```css
@import "css-ease-presets/ease-vars.css";
@import "css-ease-presets/ease-classes.css";
```

```html
<button class="transition-ease-quint-out">Hover me</button>
<div class="ease-expo-out">Animated element</div>
```

### 3) Keyframe Helpers (bounce/elastic)

> True spring/bounce can’t be expressed by a single cubic-bezier, so we ship **keyframes** instead.

```css
@import "css-ease-presets/animations.css";

.card.pop {
  animation: ease-elastic-out .7s both;
}

.toast {
  animation: ease-bounce-in .8s both;
}
```

### 4) JavaScript / Build-time (ESM)

```js
import eases from "css-ease-presets";
console.log(eases["expo-out"]); // [0.19, 1, 0.22, 1]

// Example: map to Tailwind theme (see full config below)
const timing = Object.fromEntries(
  Object.entries(eases).map(([k, p]) => [k, `cubic-bezier(${p.join(",")})`])
);
```

---

## Presets (curated)

* **CSS defaults**: `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`
* **Penner-ish families**: `sine-*`, `quad-*`, `cubic-*`, `quart-*`, `quint-*`, `expo-*`, `circ-*`, `back-*` (each with `-in`, `-out`, `-in-out`)
* **Design system favorites**: `fast-out-slow-in`, `decelerate`, `accelerate`, `swift-out`, `smooth-out`, `sharp-in-out`

> Need more? Edit `src/eases.json` and rebuild.

## Demo
<img width="1147" height="937" alt="image" src="https://github.com/user-attachments/assets/09a55805-1d1d-4b3a-a138-118e1d37acef" />

https://youtu.be/_sdrk_6b0D0

---

## Using the Demo

`demo.html` previews all curves with a moving thumb, lets you toggle **Transition** vs **Animation** mode, **Play all**, and copy the **CSS variable** or **cubic-bezier string**.

### Serve locally (recommended; avoids file:// CORS)

From the project root:

```bash
# Python (any OS)
python -m http.server 5173
# then open:
http://localhost:5173/demo.html
```

```bash
# Node
npx http-server -p 5173
# then open:
http://localhost:5173/demo.html
```

**PowerShell (Windows):**

```powershell
python -m http.server 5173
start http://localhost:5173/demo.html
```

> If you double-click `demo.html` (file://), `fetch('./dist/eases.json')` will be blocked by CORS and the page won’t load presets. Use a local server as shown above.

---

## Framework Integrations

### Tailwind CSS

```js
// tailwind.config.js (or .cjs with require syntax)
import eases from "css-ease-presets";

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      transitionTimingFunction: Object.fromEntries(
        Object.entries(eases).map(([k, p]) => [k, `cubic-bezier(${p.join(",")})`])
      ),
      // Optional: animationTimingFunction if you're using a plugin that supports it
    }
  }
};
```

Usage:

```html
<button class="transition ease-quart-out duration-300">Hello</button>
```

### CSS-in-JS (styled-components / Emotion)

```js
import eases from "css-ease-presets";
import styled from "styled-components";

const Panel = styled.div`
  transition: transform 320ms cubic-bezier(${eases["quint-out"].join(",")});
`;
```

### Plain HTML (no bundler)

```html
<link rel="stylesheet" href="./node_modules/css-ease-presets/ease-vars.css">
<link rel="stylesheet" href="./node_modules/css-ease-presets/ease-classes.css">
```

---

## Advanced

### Add / Edit Presets

1. Edit `src/eases.json` (format: `"name": [x1,y1,x2,y2]`).
2. Rebuild:

   ```bash
   npm install
   npm run build
   ```
3. Consume new `dist/*`.

### Ship a Custom Subset

* Copy only the variables you need into your own `:root` block.
* Or prune `src/eases.json` before building for a leaner payload.

### Create Named Motion Tokens

* Wrap variables in your design system (e.g., `--motion-entrance: var(--ease-quart-out);`).
* Reference tokens in components for consistent motion across the app.

---

## Troubleshooting

* **Demo fails with “origin 'null' / CORS”**
  You opened `demo.html` via `file://`. Start a local server (see **Using the Demo**).

* **Utility classes not applying**
  Ensure both files are loaded:
  `ease-vars.css` (defines `--ease-*`) **and** `ease-classes.css` (uses those vars).

* **Animations feel “too snappy” or “too sluggish”**
  The *curve* is just half the story—tune your **duration** as well. Try `.2s`–`.35s` for micro-interactions; longer for large positional moves.

* **Want bounce/elastic via cubic-bezier?**
  You can’t do true physical bounce with a single cubic-bezier. Use `animations.css` keyframes (`ease-bounce-*`, `ease-elastic-*`).

---

## PowerShell Notes (Windows)

* `start demo.html` may fail to load presets due to CORS (see above). Prefer:

  ```powershell
  python -m http.server 5173
  start http://localhost:5173/demo.html
  ```
* Quote paths with spaces:

  ```powershell
  @import "css-ease-presets/ease-vars.css";
  ```

---

## Versioning & Publishing

* Update `version` in `package.json`.
* `npm run build`
* `npm publish --access public`

(Consider adding a CI workflow to run `node ./src/build.js` on tag and publish automatically.)

---

## License

MIT © Wilson Anibe

---
