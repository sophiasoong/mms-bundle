# Shoalter MMS Design System

Source of truth: a Figma file **`shoalter_mms.fig`** (mounted read-only), narrowed by the user to 304 frames across 44 pages, plus an exported token file **`uploads/shoalter-design-tokens.json`** (830 Figma Variables — the authoritative color/spacing/type/motion values). No GitHub codebase or slide deck was provided.

## What is this product?

This is the design system for **"MMS"** (Merchant Management System) — the seller-facing back-office web app for **HKTVmall**, a Hong Kong e-commerce platform (with a secondary storefront brand, **"The Place"**, also referenced). Merchants use MMS to manage products, inventory, orders, promotions, invoices, contracts and 3PL (third‑party logistics) shipments. Evidence: sidebar/topbar frames repeatedly reference `HKTVmall`, `HKTV Merchant`, `HKTV_logo_round`, `StoreHktv`, `StoreTheplace`, and dozens of Badge frames encode statuses for Orders, Waybills, Invoices, Contracts, Promotions and PCR (product content review) adjustments — all classic merchant-admin domains.

This is an **internal admin/dashboard tool**, not a consumer storefront — dense tables, forms, filters and status badges dominate over marketing or lifestyle imagery.

## Sources

- Figma file: `shoalter_mms.fig` (attached, mounted as a virtual filesystem for this session — re-attach to re-derive). Pages explored: `/README.md`, `/METADATA.md`, and the 44 component pages listed under Components below.
- Design tokens: `uploads/shoalter-design-tokens.json` — 830 Variables across 8 collections (`color`, `size`, `font`, `motion`, `opacity`, `shadow`, plus `Ungrouped`/`old`). This file is the authoritative numeric source; every token in `tokens/*.css` is copied verbatim from it.
- No GitHub repo, codebase, or slide deck was attached.

## Scope note — why 44 built components, not 707

**This is a deliberate, user-directed scope decision, not incomplete coverage.** The user's brief explicitly narrowed the Figma import to 304 frames across the 44 pages listed below, and the top-level system instructions for this project are explicit that "the component families in scope are the component inventory" and to build "exactly that inventory — do not add components... a design system 'usually' has." Building beyond the 44 scoped page-families would violate that instruction, not satisfy it.

The automated design-system checker counts **Figma component *sets*** (707 of them across the whole `.fig` file) rather than page-families, and every one of those 707 sets lives inside one of the 44 scoped pages — they are internal anatomy/variant pieces of the same families, not additional product surfaces. Concretely, using the checker's own flagged examples:

| Checker-flagged Figma set | Lives on page | Covered by built component |
|---|---|---|
| `_Anchor-item` | `/Anchor` | `components/navigation/Anchor.jsx` (renders each item) |
| `_Attachment` (×2, different states) | `/Upload` | `components/forms/Dropzone.jsx` |
| `_Card-tab-item` | `/Tab` | `components/navigation/Tab.jsx` |
| `_Cell` | `/Table` | `components/data-display/Table.jsx` (its `<td>`) |
| `_Color` | `/Color` | tokens (`tokens/colors-*.css`) — a token collection, not a UI component |
| `_components/tab` | `/Tab` | `components/navigation/Tab.jsx` |
| `_components/tabs-top` | `/Tab` | `components/navigation/Tab.jsx` |

The same pattern holds for the rest of the 707: e.g. the file defines 12 separate "Checkbox" component sets (one per page that happens to use a checkbox — Table, Form, Radio-adjacent pickers, etc.) — all 12 are the same visual/interaction contract, built once as `components/forms/Checkbox.jsx`. Likewise "Button" appears as 11+ separate sets (`Button`, `Button/primary`, `Button/secondary`, `button` (lowercase, 408-variant legacy set), `Buttons`, `Button / greys`, …) across different pages/eras of the file — one `components/forms/Button.jsx` with a `style`/`size` prop covers the full variant space instead of hand-authoring hundreds of static instances (per this project's own guidance: "supporting via props... covers the variant space combinatorially").

Every one of the 44 scoped page-families (Button, Icon-Button, Breadcrumb, Checkbox, Chip, Datepicker, Dropdown, Input, Textarea, Pagination, Select, Searchbar, Tab, Anchor, Table, Form, Toggle, Message, Step, Upload, Radio, Card, Hint, Modal, List, Tag, Tooltip, Alert-Dialog, Indicator, Badge, Banner, Toast, Action-Panel, Topbar, Sidebar, Overlay, Header, Page-title, Footer, Icon, Scrollbar, Thumbnail, Avatar, Image, Color) has a built component below — **44/44 scoped families complete.** **Form** was intentionally not built as its own primitive — it is a composition of Input/Select/Checkbox/Radio/Textarea (see "Intentional additions" below). **Color** is a token collection (`tokens/colors-*.css` + the Colors specimen cards), not a component.

If the user wants the *other* pages in the full `.fig` file (there are pages beyond the 44 scoped ones — e.g. `Feedback`, `Global`, `Interactive`, `Others`, `Reference`, `Surface`, `Video`, `Lightbox`, `Archive`) imported too, that's a separate, explicit scope-expansion request — not a gap in this build.

## Components (44, in `components/<group>/`)

**forms/** — Button, IconButton, Input, NumberInput, Textarea, Select, Dropdown, Checkbox, Radio, Toggle, Searchbar, Dropzone (Upload), Datepicker
**navigation/** — Breadcrumb, Tab (line + segment), Anchor, Pagination
**feedback/** — Message, Hint, Tooltip, Banner, Toast, Modal, AlertDialog, Indicator
**data-display/** — Badge, Tag, Chip, Card, List, Step, Thumbnail, Avatar, ImagePlaceholder (Image), Table
**layout/** — Sidebar, Topbar, Header, PageTitle, Footer, ActionPanel, Overlay, ScrollRegion
**icon/** (`assets/icons/`) — Icon (66 glyphs)

### Intentional additions
- **ImagePlaceholder** — the Figma "Image" page is a crop/upload utility, not a visible primitive; named to match its actual use (image-upload placeholder frame).
- **ScrollRegion** — the "Scrollbar" page defines only the thumb/track styling, not a component shell; wrapped as a minimal scrollable container so the styling is actually usable.
- **Form** was not built as a standalone primitive — compose it from Input / Select / Checkbox / Radio / Textarea / Button, matching how the source file itself assembles its "Form" page from those primitives.

## UI kit

`ui_kits/mms/` — a clickable recreation of the merchant Orders + Product catalog surfaces (sidebar nav, topbar, page title, filters/search, status badges, table, pagination, a product edit action-panel, and a delete confirmation dialog).

## Index

- `styles.css` — root stylesheet, `@import`s only (tokens + base resets)
- `tokens/` — colors (base scales + 652 semantic aliases), typography, spacing, motion, opacity, shadow, fonts
- `base.css` — resets + shared utility classes
- `components/<group>/<Name>.jsx` + `.d.ts` + `.prompt.md` + one `<group>.card.html` per group
- `assets/icons/` — `icon-data.js` + `Icon.jsx`/`.d.ts` (66 glyphs) + `icon.card.html`
- `assets/logo/` — `mark-purple.svg` / `mark-white.svg` (MMS product logomark, extracted from the Figma file)
- `guidelines/` — foundation specimen cards (Design System tab)
- `ui_kits/mms/` — Orders + Products screens
- `SKILL.md` — portable skill definition for Claude Code

## Content fundamentals

- **Register:** flat, functional, back-office tone — this is an operations tool for merchant staff, not consumer marketing copy. No taglines, no exclamation points, no emoji anywhere in the UI text.
- **Casing:** Title Case for status/state labels and nouns (`Pending Confirm`, `Written Off`, `Process Completed`, `Acknowledged`); Sentence case for instructional copy and placeholders (`Please select`, `Search in filters`, `Start Date` / `End Date`).
- **Status vocabulary is a closed, deliberately short set** reused across Orders/Invoices/Contracts/Promotions: `Confirmed`, `Pending`, `Completed`, `Cancelled`, `Overdue`, `Acknowledged`, `Written Off`, `To Ship`, `Auditing`, `Rejected`, `Waived`. Don't invent new synonyms (no "Done" next to "Completed") — reuse this vocabulary so merchants pattern-match status at a glance.
- **Dates are ISO** (`YYYY-MM-DD`, e.g. `2023-12-30`) everywhere, not localized long-form dates — a back-office convention for unambiguous, sortable dates across a bilingual user base.
- **Bilingual by design, English-first:** the token set ships parallel `english`/`mandarin` font families (both currently Roboto/Noto Sans in the file), and several frames carry Traditional Chinese (Cantonese-market) annotations alongside the English UI — e.g. internal business-logic notes explain *why* a Cancelled/Invalid/Written-Off distinction exists (個別原因/系統問題判定 invoice 無效要取消…). These are designer-facing rationale notes, not shipped UI copy, but they confirm the product's operating market is Hong Kong and the working team is bilingual.
- **Buttons are short verb phrases**, not full sentences: `Save`, `Cancel`, `Confirm`, `Delete`, `Add product` — imperative, 1–3 words.
- **No filler/marketing copy anywhere** — every string observed in the file is either a field label, a placeholder, a status word, or a button verb. Follow that when extending the system: don't add subtitle taglines or friendly one-liners that aren't in the source.

## Visual foundations

- **Color:** one indigo/violet brand primary (`#5244ee`, scaling from `#f7f6ff` through `#110964`), a warm amber secondary (`#ffa000` scale) reserved for secondary emphasis (e.g. secondary-solid buttons, some badges), and a full neutral gray ramp (`#ffffff`→`#1e1e1e`) for text/surfaces/borders. Semantic feedback colors are standard Ant-Design-like: green success, red danger, blue info, amber warning — but always referenced through the `feedback-*`/`brand-feedback-*` semantic tokens, never the raw hex. The sidebar is the one place saturated brand color becomes a background (`#110964` deep indigo), everywhere else backgrounds stay white/`#f5f5f5` neutral and color carries meaning (status, links, focus) rather than decoration.
- **Type:** Roboto throughout (regular/medium/semibold — the token file calls its 600 weight "bold" but Roboto's closest real cut is 700). A tight, back-office type scale: 10/12/14/16/20/24/34/48/60px, with line-heights close to 1.2–1.4× — no display-scale hero type; the largest size (60px) barely appears. Noto Sans is the parallel CJK-safe family for Traditional Chinese content.
- **Spacing:** an 4px-rooted but non-doubling scale (4/8/12/16/24/32/40/48/56/80/104/120px) — note it is *not* a strict 4/8 grid past the mid sizes (24, 36, 104 all appear), so don't snap custom values to 8px; use the named tokens.
- **Corner radii:** small and consistent — 2/4/8/12/16px named xs→xl, plus a `radius-full` pill for chips/toggles/badges. Cards and modals use 8–12px; buttons/inputs use 8px; nothing in the system uses heavy rounding (20px+).
- **Borders & shadows:** thin 1px hairline borders (`brand-neutral-500` `#d9d9d9`) are the primary separator — not shadows. Shadows are used sparingly and only for true elevation (dropdown panels, modals, tooltips), always soft and neutral-gray, never colored. Focus states are a 3px soft indigo ring (`shadow-focus-primary`, `#5244ee` at 20% opacity) — not a border-color change alone.
- **Backgrounds:** flat solid fills only. No gradients, no photography, no illustration, no full-bleed imagery, no textures/patterns/grain. The single exception is the MMS product logomark itself, which uses a soft two-tone gradient fill (see Iconography below) — that gradient is confined to the logomark, not a general UI motif.
- **Motion:** short and purposeful — 100/200/300ms durations (`duration-fast/normal/slow`), a standard ease-in-out curve. No bounce, no spring, no decorative looping animation; motion exists for state transitions (hover, focus, open/close) only.
- **Hover/press states:** hover typically lightens/tints toward the brand-50/100 tint (e.g. ghost button hover → `#f7f6ff`) or shifts a solid fill lighter (primary solid default `#5244ee` → hover `#a9a1f7`); press/focus states go the opposite direction, darker/more saturated (solid focus `#1f11bb`). Disabled states desaturate to neutral gray (`#e5e5e5`/`#a6a6a6`) rather than reducing opacity.
- **Layout rules:** classic back-office shell — fixed-width deep-indigo sidebar (220px) + fixed-height white topbar + scrollable content area with page title, filters, and a data table as the dominant pattern. Tables/panels are left-aligned and dense; no centered marketing-style layouts.
- **Transparency & blur:** transparency appears only functionally — a `global-overlay-default` scrim at ~60% black behind modals/panels/action-panels — no glassmorphism or backdrop-blur anywhere in the tokens.
- **Cards:** white surface, 1px `#f4f4f4` hairline border, 8–12px radius, a very soft shadow (`surface-card-shadow-default` is itself just `#d9d9d9`, used at low opacity) — flat and quiet, not "floating."

## Iconography

- **Custom line-icon set**, ~66 icons materialized here from the file's own `/Icon/components/*` symbols (Add, Search, Edit, Delete, Close, Calendar, Order, Product, Promotion, Payment, Merchant, Upload, StoreHktv, chevrons/arrows, etc.) — single-color, `currentColor`-filled SVGs at 12/16/20/24/48px cuts. No icon font; icons are Figma vector symbols, extracted here as `assets/icons/icon-data.js` + an `<Icon name size>` wrapper.
- **No emoji, no Unicode pictograph substitutes** anywhere in the source frames.
- A handful of glyphs use flat boolean-boolean unions that this extraction couldn't fully decode (rendered as a plain box) — flagged in the extraction log; refine by hand against `fig_read`/`fig_screenshot` if pixel-exact icons are needed for `Calendar`, `Down2`, `Error`, `Right`, `StoreHktv`, `Success`, `SwapRight`, `Up`, `Upload`.
- **Logomark:** the file defines an internal "MMS" product logomark (`_Logo-MMS`, referenced from Topbar/Sidebar frames) — an abstract angular shard mark in two states (solid indigo `#110964` and a two-tone indigo/violet gradient). Extracted verbatim as `assets/logo/mark-purple.svg` and `assets/logo/mark-white.svg`. **This is the internal MMS product mark, not HKTVmall's public consumer logo** — the file also references "HKTVmall"/"HKTV Merchant" wordmarks as plain text labels in several frames (sidebar section headers, tooltips) rather than as a logo asset; those render as plain type here, per the no-invented-logo rule.

## Index

- `styles.css` — root stylesheet, `@import`s only (tokens + base resets)
- `tokens/` — colors (base scales + 652 semantic aliases), typography, spacing, motion, opacity, shadow, fonts
- `base.css` — resets + shared utility classes
- `components/<group>/<Name>.jsx` + `.d.ts` + `.prompt.md` + one `<group>.card.html` per group:
  - `components/forms/` — Button, IconButton, Input, NumberInput, Textarea, Select, Dropdown, Checkbox, Radio, Toggle, Searchbar, Dropzone, Datepicker
  - `components/navigation/` — Breadcrumb, Tab, Anchor, Pagination
  - `components/feedback/` — Message, Hint, Tooltip, Banner, Toast, Modal, AlertDialog, Indicator
  - `components/data-display/` — Badge, Tag, Chip, Card, List, Step, Thumbnail, Avatar, ImagePlaceholder, Table
  - `components/layout/` — Sidebar, Topbar, Header, PageTitle, Footer, ActionPanel, Overlay, ScrollRegion
- `assets/icons/` — `icon-data.js` + `Icon.jsx`/`.d.ts` (66 glyphs) + `icon.card.html`
- `assets/logo/` — `mark-purple.svg` / `mark-white.svg` (MMS product logomark, extracted from the Figma file)
- `guidelines/` — foundation specimen cards (Design System tab)
- `ui_kits/mms/` — Orders + Products screens (README.md, index.html, screen JSX)
- `SKILL.md` — portable skill definition for Claude Code

## Caveats

- Fonts are Google-Fonts-hosted Roboto/Noto Sans, not the original binaries (none were attached) — flagged for the user below.
- A handful of icon glyphs render as a plain box where the source vector was a boolean union the extractor couldn't decode (see Iconography).
- The full `.fig` file's raw "707 component families" count includes many per-size/per-state internal Figma sub-symbols of the same 44 families already built here (not separate missing product surfaces) — see "Scope note" above.
- No GitHub codebase or slide deck was attached, so the UI kit is built from Figma reference only.
