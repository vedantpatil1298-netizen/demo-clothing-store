# Ferro

A multi-page Next.js (App Router) storefront for a premium clothing brand: a cinematic
scroll-driven homepage over a live WebGL "FaultyTerminal" background, collection pages with
filter/sort, product pages, and a slide-out cart — all functional.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's here

- **Homepage** (`app/page.tsx` → `components/CategoryScroller.tsx`) — scroll-snap between
  Bottom Wear / Upper Wear / Accessories. Click a category to go to its collection page, scroll
  to move between them. `components/FaultyTerminal.tsx` (WebGL via `ogl`) sits fixed behind all
  three as the shared hero background, in `lightMode` so it reads as a subtle ink texture on the
  brand's light background rather than a literal green terminal.
- **Collections** (`app/collections/[category]/page.tsx`) — filter by subcategory, sort by price.
- **Product page** (`app/product/[slug]/page.tsx`) — gallery, size selector, quantity, add to cart.
- **Cart** (`context/CartContext.tsx` + `components/CartDrawer.tsx`) — slide-out drawer, persisted
  to `localStorage`, no page reload.
- **About / Search / Account** — minimal supporting pages so header links resolve.

## Swapping in real content

- Brand name "Ferro" is a placeholder — rename throughout (`app/layout.tsx` metadata,
  `components/Header.tsx` logo).
- Product data and copy is in `lib/products.ts` — replace the placeholder Picsum image URLs with
  real product photography (same shape: `images: [url, url]`).
- Colors and type live in `tailwind.config.ts`; headline font is Archivo, body is Inter, both
  loaded via `next/font/google`.

## Notes

- `ogl` is a small WebGL wrapper — it's the only non-trivial runtime dependency beyond Next/React.
- Reduced-motion is respected for the marquee and smooth-scroll; the WebGL background itself is
  decorative/`aria-hidden`.
- This was written without a live build step in this environment — run `npm run build` locally
  to catch anything before deploying.
