# Mars portfolio — front page

A local, frontend-only React + TypeScript portfolio front page, based on the supplied `porf.png` mockup: red pixel typography, a pale-pink navigation frame, a short introduction, and contacts over a subtle ASCII ocean. Other pages and their content are not implemented. The three navigation labels are disabled until their destinations exist; GitHub links to the verified `jkind889` profile. LinkedIn is plain text marked “link pending” until a verified URL is supplied. Edit the draft introduction in `src/App.tsx`.

## Run locally

Use Node.js 22.16+ (22.x) or 24+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173. Stop the server with Ctrl+C. Vite 6 is used to support the existing Node 22.16 installation.

Move the pointer to make nearby fish scatter; click or tap the page background to splash. The footer's pause/resume control stops and restarts the same simulation. Controls and links do not trigger splashes. With the operating system's reduced-motion preference enabled, the ocean displays a still frame and disables splashes, and a still-ocean status replaces the pause control. The canvas resizes with the viewport, caps pixel density at 2, pauses offscreen, and releases its animation/listeners when unmounted.

The layout stacks on narrow screens and includes a keyboard skip link and visible focus indicators. MonaS12 Regular (400), Version 1.0, is self-hosted from the supplied `MonaS_20260525/web/01_Main/MonaS12.woff2`. The original WOFF2 is copied unchanged; no conversion, subsetting, or system installation is used. Its family/weight match the supplied TTF metadata and upstream web CSS. The fish canvas and small utility footer keep their separate system monospace font. The Mona copyright/OFL and all bundled upstream notices are retained under `public/fonts/mona/LICENSE/` and included in production builds. No external font request is needed. Small text uses a darker red for readability. The animated background and footer controls are intentional additions to the static mockup; the initial mockup supplies the layout character, with the introduction and contacts updated at the user’s request.

## Checks

```sh
npm run typecheck
npm run build
npm run preview
```

The production preview normally opens at http://127.0.0.1:4173. There is no separate lint configuration in this minimal project.

## Animation source and license

`src/vendor/ascii-sharks/` contains source from [stackedlol/ascii-sharks](https://github.com/stackedlol/ascii-sharks), based on revision [`a0074c16a106f0abc665fe9712ca445f8f98ad8e`](https://github.com/stackedlol/ascii-sharks/tree/a0074c16a106f0abc665fe9712ca445f8f98ad8e). It is vendored source, not an installed npm package. Local changes add a manual pause API, wire its React prop, suppress splashes on UI controls, and remove the unused framework-specific `use client` directive. The simulation and renderer remain unchanged; CSS presents the canvas softly against white.

Copyright (c) 2026 drewdi. The full MIT notice is retained in `src/vendor/ascii-sharks/LICENSE` and `public/ascii-sharks-LICENSE.txt` (also included in production builds). Upstream accessibility/performance defaults are preserved. No source or artwork from Dao-Ho/portfolio is included.

## Page font provenance

- Upstream: https://github.com/MonadABXY/mona-font (web family declaration: `web/monas.css`).
- Selected family: `MonaS12`; style: `Regular`; CSS weight: `400`. The regular rounded pixel glyphs match the supplied front-page mockup.
- Source: user-supplied `MonaS_20260525` release folder; original filename `MonaS12.woff2`.
- SHA-256: `1535ca64ffaf12d0032f4b964aa017027d641998ce8e3b82cf9367f26ec4bd9e`.
- Copyright (c) 2025, Monad ABXY; reserved font name “Mona”; SIL Open Font License 1.1. Bundled notices also credit Ark Pixel, M+ Fonts, and Noto Emoji.
- The previous Handjet package and notice have been removed.
