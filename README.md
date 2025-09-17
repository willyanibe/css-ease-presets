# css-ease-presets

A tiny, MIT-licensed library of **CSS easing presets**: ready-to-use `cubic-bezier(...)` variables, utility classes, and a JSON/JS export for build tools.

## Contents

- `ease-vars.css` — `:root` CSS variables, e.g. `--ease-quad-out`
- `ease-classes.css` — utility classes:
  - `.ease-quad-out` → `animation-timing-function: var(--ease-quad-out)`
  - `.transition-ease-quad-out` → `transition-timing-function: var(--ease-quad-out)`
- `animations.css` — optional keyframe helpers (`.anim-bounce-out`, `.anim-elastic-out`)
- `eases.json` — raw preset data
- `index.mjs` — ESM export `{ eases }`

## Install

```bash
npm i css-ease-presets
```

## Usage

```css
@import "css-ease-presets/ease-vars.css";
.button { transition: transform .3s var(--ease-quart-out); }
```
