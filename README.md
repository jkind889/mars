# Mars portfolio

A local React + TypeScript portfolio with an introduction, a Projects archive, and project detail pages over a shared ASCII ocean. Text is near-white on blue in light mode and white on a deeper blue in dark mode. The compact navbar and Projects list/grid arrangement follow the user’s poster portfolio at https://www.goneoffmars.com/archive, adapted to the existing MonaS12 typography and ASCII identity.

The navbar contains Projects and Posters, with the Mars wordmark returning home and the theme control alongside. Posters opens the internal gallery described below. The homepage introduction and contact region remain in place; About and Contacts are not navbar items. The compact lowercase `github/linkedin/resume` line remains 18px with no visible heading. GitHub links to the verified `jkind889` profile. LinkedIn links to the profile URL supplied by the user. Both social links use normal same-tab navigation. Resume opens the user-supplied, unchanged PDF at `/jova-kind-resume.pdf` in a new tab, with an accessible PDF/new-tab label and `noopener noreferrer`. The introduction is editable in `src/App.tsx`.

The home introduction uses the user's supplied greeting, Howard University / expected 2028 detail, and incoming DFA internship wording. Its compact, left-aligned block sits low against the responsive left page gutter, with a maximum width of 768px and contacts directly below. The compact composition was inspired by https://www.daoho.dev/, with placement updated at the user's request. It retains MonaS12, the existing shared header/footer and fish background; no reference-site assets or code are copied. On narrow or short screens it keeps page gutters and natural document flow so the content remains reachable.

## Projects and navigation

- `#/projects`: numbered list with an adjacent visual preview, plus a grid option. Hover or keyboard focus selects the desktop preview; narrow screens show each visual with its project. Selecting a project opens its detail page.
- `#/projects/rescened`, `#/projects/fantasybball-analysis`, `#/projects/wayoffmars`, `#/projects/inventory-management`, `#/projects/goneoffmars`: overview, features, tools, and a cover, with “all projects” links at the top and bottom. Individual entries also include contribution, technical decisions, and source-linked engineering results when available.
- `#introduction` and `#contacts-heading`: existing home destinations. Unknown routes show a recovery link.

Native hash links support refresh, direct links, new tabs, and browser back/forward without hosting rewrites or a routing dependency. Page changes update the document title, focus the main content, and return to the top (or the contact region); poster preview transitions preserve gallery scroll and use dialog focus instead. The selected preview and list/grid choice survive in-app navigation. `App` owns the shared header, theme control, footer, pause state, and one `AsciiOcean` instance; page changes never remount the ocean or restart its engine.

Edit all project copy, ordering, tools, and covers in `src/projectData.ts`. Optional contribution, decisions, results, links, and note fields extend an individual detail page without changing the others. Descriptions were checked against the local `rescened`, `repos/FantasyBball-Analysis`, and `wayoffmars` READMEs and relevant package manifests. Wayoffmars is described as its current local design library, including font previews. No project URLs are guessed.

ReScened's case study was expanded on October 29, 2026 using its local README, AGENTS.md, package manifests, and public merged PRs [#27](https://github.com/jkind889/rescened/pull/27) and [#28](https://github.com/jkind889/rescened/pull/28). GitHub confirms the public source repository and its homepage; https://www.rescened.com/ was opened anonymously to verify the live destination. Contribution wording is grounded in those authored PRs and local commit history, without claiming sole ownership. The 614 unit / 241 integration counts come from the supplied work-session record of combined validation for those PRs on October 28; the earlier PR bodies contain different intermediate counts. They are labeled historical validation, not current coverage, and were not rerun for this portfolio edit. Keep engineering changes in `results.changes` linked to merged PRs and update `results.validation` only with a dated, revision-specific validation record. The current catalog is provider-neutral with MusicBrainz enrichment; Spotify is not a catalog dependency.

The short Last.fm feature describes the automatic diary implementation on public `main`, verified against `lib/listening/publication.js`, `frontend/src/features/home/ListeningLog.jsx`, and the implemented increments in `docs/AUTOMATIC_ALBUM_LISTENS.md`. It supports qualifying album listens after owner opt-in, reviewed mappings/tracklists, and feature/pilot eligibility checks. Some documentation opening summaries still call counting/publication future work, but the implementation and later documented increments contain that functionality. Production flags were not inspected. This shipped implementation is separate from the isolated experimental shadow trial, whose automatic mapping acceptance and publication remain off; the trial is not advertised as a released capability.

FantasyBball-Analysis's case study uses the verified October 29 content draft and accompanying evidence notes. Its source and offline replay links target the public `predictive-engine` branch at verification revision `0017e9e`; local revision `1fe0e8f` was two commits ahead. The copy excludes the proposed contextual draft-report MVP and does not present those local-only improvements as released. Projected gains describe computed estimates, not measured outcomes; no hosted demo or passing-test metrics are claimed. Optional Claude review is constrained plan comparison, not autonomous roster execution.

Inventory Management and goneoffmars use the separately verified October 29 drafts and evidence notes, grounded in read-only inspection of `~/inventory-management` at `84c0c68` and `~/mars2026` at `5318040`. Inventory has a source link but no verified hosted demo. Goneoffmars is the poster storefront, separate from this CS portfolio and Wayoffmars. Its Stripe/checkout text describes implemented code, not validated live payments or revenue; unfinished admin/recovery work is excluded. PR #2's merge date explicitly uses UTC.

All five projects now use approved 1200px square WebP covers, with light and dark variants selected by the site's resolved theme. `cover.image`, `cover.darkImage`, `cover.alt`, and `cover.provenance` live together in `src/projectData.ts`. CSS displays only the matching image; both variants retain explicit dimensions and lazy loading. Images use full width and automatic height so the provenance labels are never cropped. The exact supplied bytes were checked against their SHA-256 hashes; `public/projects/provenance.json` records capture context, source revisions, limitations, hashes, and license references.

ReScened and goneoffmars show signed-out public homepages. Wayoffmars shows an isolated demo library; Inventory shows real UI with synthetic mocked data. Fantasy is a designed terminal composition of a verified synthetic offline replay, not a GUI screenshot or measured performance. The Source Serif fixture license is bundled alongside provenance; Mona and ASCII fish notices remain in their existing public locations. Authenticated ReScened walkthroughs, further project walkthroughs, and fuller Wayoffmars copy and verified links remain pending.

Detail pages place the introduction before the cover on narrow screens. The text column has an opaque theme-colored reading surface; the ocean remains visible at lower opacity around project content. Static feature labels are not underlined, while links remain underlined. The header exposes one shared pause/resume control beside the theme picker. The skip link targets the focusable `#main-content` element and preserves the current route when activated.

## Posters gallery

`#/posters` is an internal gallery following the supplied `portf.png` sketch: three horizontal positions on the left and four vertical positions in two columns on the right. Seven artworks are populated. The third horizontal position is Grimmjow, a display-only piece marked “Not for sale” in its caption and full preview. Mobile places the landscape positions above the two-column portrait collection. Frames and full previews use `object-fit: contain` without cropping artwork.

The gallery is centered with a 1100px maximum width and 16px desktop gaps, using the rendered width of Dao Ho’s gallery as a scale reference. A visible goneoffmars.com link sits above the artwork and opens the poster site in a new tab. Mobile retains the existing responsive arrangement and page gutters.

Edit `src/posterData.ts` and `posterSlots` to change the selection; set `productUrl` to `null` for display-only artwork. Thumbnail and full-resolution WebP files are local in `public/posters/`; `provenance.json` records original image dimensions, source hashes and the public product/image URLs verified October 29, 2026, plus the user-selected Grimmjow storage asset verified October 30. Catalog titles retain their source spelling.

Each artwork has a direct `#/posters/<slug>` preview URL. A native modal dialog provides a close button, Escape, Tab/Shift+Tab cycling and focus return. Opening and closing from the gallery preserve its scroll; browser back closes and forward reopens. Closing a directly loaded preview returns to the internal gallery. Available product links open the matching goneoffmars page in a new tab. Display-only work has a static “Not for sale” label instead of a product link; the general storefront link remains above the gallery. The shared ocean, pause state, theme controls and existing pages remain in the app shell.

## Run locally

Use Node.js 22.16+ (22.x) or 24+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173. Stop the server with Ctrl+C. Vite 6 is used to support the existing Node 22.16 installation.

Move the pointer to make nearby fish scatter; click or tap the page background to splash. The header's pause/resume control stops and restarts the same simulation. Controls and links do not trigger splashes. With the operating system's reduced-motion preference enabled, the ocean displays a still frame and disables splashes, and a still-ocean status replaces the pause control. The canvas resizes with the viewport, caps pixel density at 2, pauses offscreen, and releases its animation/listeners when unmounted.

The layout stacks on narrow screens and includes a keyboard skip link and visible focus indicators. MonaS12 Regular (400), Version 1.0, is self-hosted from the supplied `MonaS_20260525/web/01_Main/MonaS12.woff2`. The original WOFF2 is copied unchanged; no conversion, subsetting, or system installation is used. Its family/weight match the supplied TTF metadata and upstream web CSS. The fish canvas and small utility footer keep their separate system monospace font. The Mona copyright/OFL and all bundled upstream notices are retained under `public/fonts/mona/LICENSE/` and included in production builds. No external font request is needed. Text and focus indicators use the shared near-white/white theme token. The animated background and footer controls are intentional additions to the static mockup; the initial mockup supplies the layout character, with the introduction and contacts updated at the user’s request.

## Color theme

The navbar’s theme picker offers Light, Dark, and System. New visits follow the system preference, including live changes. An explicit light/dark choice is saved locally under `mars-theme-v1`; selecting System removes that override. Storage failures fall back gracefully for the current visit. A small head script applies the initial background and color scheme before React loads to avoid a bright flash. Light mode uses muted ocean blue (`#20495f`) with near-white type (`#fbfbfb`) across every route; dark mode uses deep muted blue (`#132c3a`) with white type. Fish use warm orange/gold shading over a transparent canvas, with lower opacity in dark mode to keep text readable. Covers and theme controls use coordinated blue surfaces. The same canvas instance, pause state, and reduced-motion preference are retained. Keep background values synchronized in `src/styles.css`, `src/theme.ts`, and `index.html`. The picker supports native radio-key navigation, Escape to close and restore focus, and outside click/focus dismissal. No additional dependencies are needed.

## Checks

```sh
npm run typecheck
npm run build
npm run preview
```

The production preview normally opens at http://127.0.0.1:4173. There is no separate lint configuration in this minimal project.

## Animation source and license

`src/vendor/ascii-sharks/` contains source from [stackedlol/ascii-sharks](https://github.com/stackedlol/ascii-sharks), based on revision [`a0074c16a106f0abc665fe9712ca445f8f98ad8e`](https://github.com/stackedlol/ascii-sharks/tree/a0074c16a106f0abc665fe9712ca445f8f98ad8e). It is vendored source, not an installed npm package. Local changes add a manual pause API, wire its React prop, suppress splashes on UI controls, and remove the unused framework-specific `use client` directive. The renderer adds an orange/gold palette, a subtle blue grid, and transparent frame clearing so both themes show through without restarting the animation. ASCII shapes, shading structure, simulation, pointer interactions, and cyan wakes are preserved.

Copyright (c) 2026 drewdi. The full MIT notice is retained in `src/vendor/ascii-sharks/LICENSE` and `public/ascii-sharks-LICENSE.txt` (also included in production builds). Upstream accessibility/performance defaults are preserved. No source or artwork from Dao-Ho/portfolio is included.

## Page font provenance

- Upstream: https://github.com/MonadABXY/mona-font (web family declaration: `web/monas.css`).
- Selected family: `MonaS12`; style: `Regular`; CSS weight: `400`. The regular rounded pixel glyphs match the supplied front-page mockup.
- Source: user-supplied `MonaS_20260525` release folder; original filename `MonaS12.woff2`.
- SHA-256: `1535ca64ffaf12d0032f4b964aa017027d641998ce8e3b82cf9367f26ec4bd9e`.
- Copyright (c) 2025, Monad ABXY; reserved font name “Mona”; SIL Open Font License 1.1. Bundled notices also credit Ark Pixel, M+ Fonts, and Noto Emoji.
- The previous Handjet package and notice have been removed.
