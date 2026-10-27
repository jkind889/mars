# ASCII fish prototype

A local, frontend-only React + TypeScript demo: a full-page ASCII ocean with schooling fish and four sharks. This first version stops at the animation.

## Run locally

Use Node.js 22.16+ (22.x) or 24+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173. Stop the server with Ctrl+C. Vite 6 is used to support the existing Node 22.16 installation.

Move the pointer to make nearby fish scatter; click or tap to splash. With the operating system's reduced-motion preference enabled, the ocean displays a still frame and disables splashes. The canvas resizes with the viewport, caps pixel density at 2, pauses offscreen, and releases its animation/listeners when unmounted. System monospace fonts keep the demo self-contained.

## Checks

```sh
npm run typecheck
npm run build
npm run preview
```

The production preview normally opens at http://127.0.0.1:4173. There is no separate lint configuration in this minimal project.

## Animation source and license

`src/vendor/ascii-sharks/` contains the unmodified source from [stackedlol/ascii-sharks](https://github.com/stackedlol/ascii-sharks), pinned to revision [`a0074c16a106f0abc665fe9712ca445f8f98ad8e`](https://github.com/stackedlol/ascii-sharks/tree/a0074c16a106f0abc665fe9712ca445f8f98ad8e). It is vendored source, not an installed npm package.

Copyright (c) 2026 drewdi. The full MIT notice is retained in `src/vendor/ascii-sharks/LICENSE` and `public/ascii-sharks-LICENSE.txt` (also included in production builds). The React wrapper, simulation, renderer, pointer handling, and accessibility/performance defaults are preserved. No source or artwork from Dao-Ho/portfolio is included.
