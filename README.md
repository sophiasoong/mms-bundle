# Handoff: Bundle Setting Page (MMS)

## Overview
Recreation of the merchant-facing "Bundle Setting" screen for MMS (Merchant Management System, HKTVmall's seller back-office tool). Lets merchants browse/filter product bundles, view details via an Audit panel, create/edit a bundle (with a nested SKU picker), and batch-create/edit bundles via CSV upload. Built to match the reference prototype at `mms-prototype-nu.vercel.app/Prototype/BundleSetting.html`.

## About the Design Files
The files in this bundle (`Bundle Setting.dc.html` and the `app/public/design-system/` folder) are **design references built in HTML** — a working prototype showing intended look, layout, and interaction, not production code to copy directly. The task is to **recreate this design in your codebase's existing environment** (React, Vue, native, etc.), using its established component/state patterns — or, if no environment/component library exists yet, to build one modeled on the structure in `app/public/design-system/`.

> **Single source of truth:** `app/public/design-system/` is the only copy of the design-system bundle — it's what Vite serves at `/design-system/*` for the live app (`app/index.html`, `app/src/main.jsx`, `app/src/OverviewPage.jsx`). Edit CSS/tokens/assets only there; there is no root-level copy to keep in sync.

`Bundle Setting.dc.html` is a single streaming "Design Component" file (template + a small React-like logic class, both readable directly). Open it in a browser to see/click through the live prototype.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and component chrome all come from the bound design-system tokens/components (see `app/public/design-system/tokens/*.css` for exact values) — this is not a rough wireframe. Copy text and status vocabulary are final; table content is representative mock data (real data should come from your bundle API).

## Screens / Views

### Bundle Setting (main list)
**Purpose:** Browse, filter, and manage product bundles.
**Layout:** Classic back-office shell — fixed 220px deep-indigo sidebar (nav) + fixed white topbar (breadcrumb left, avatar right) + scrollable content column with a page title, filter row, results count, data table, pagination, and a sticky bottom bulk-action bar.

**Components, top to bottom:**
- Breadcrumb text: "Home / Product and Inventory / Bundle Setting" (12px, caption gray, `var(--text-caption-primary)`)
- Page title "Bundle Setting" (H, `var(--text-heading-primary-neutral)`) with two actions top-right: **Single Create** (primary-outline button) and **Batch Create/Edit** (primary-solid button)
- Filter row (two interchangeable styles — see Tweaks below): Storefront Code / Product Ready Method / Status selects (or filter chips), plus a **Clear All** ghost button
- Results count text: "1–10 of 265 results" (14px, secondary neutral)
- Data table (or card-grid view — see Tweaks) with columns: row-select checkbox, Parent SKU ID, Storefront Code, Bundle Name (Traditional Chinese), Bundle Name (English), Product Ready Method, Available QTY, Pre-Set QTY, Status (Tag: green=Online, gray=Offline), Update Time (ISO date), Action (row "…" dropdown → Edit / Audit)
- Page-size select (10/20/50 per page) + Pagination control
- Sticky footer bar: left = "Action" dropdown (Edit History / Export / Export All); right = "0 Bundles Selected" label + Export / Export Selected buttons (disabled when nothing selected)

### Audit panel (Modal, size sm)
Read-only metadata: Create By, Create Time, Last Updated By, Last Updated Time (all em-dash placeholders — wire to real audit data). Single "Done" button closes it.

### Edit/Create Bundle Set (ActionPanel, right-side drawer)
Read-only summary rows (Parent SKU ID, Storefront Code, Product Ready Method, Available QTY — all em-dash until a bundle is selected/created) + editable Input fields for Bundle Name (Traditional Chinese) and Bundle Name (English) + NumberInput for Pre-Set QTY. A dashed "+ Add SKU to bundle" row opens the SKU picker. Footer: Cancel / Save.

### Bundle Set — SKU picker (ActionPanel, opens on top of Edit Bundle Set)
Two search inputs (SKU ID, SKU Name) + Clear All, a table (Image thumbnail, SKU ID, SKU Name CH/EN, Product Ready Method, QTY per Bundle) with sortable column headers, "0 results" empty state, and a Done button.

### Batch Upload Option (Modal, size md)
Radio choice: Batch Create vs Batch Edit. Then Select Store* and Select Product Ready Method* (required selects). Cancel / Next — Next routes to the matching batch modal below based on the radio choice.

### Batch Create Bundle / Batch Edit Bundle (Modal, size md)
Three numbered steps: (1) Download Template button, (2) instructional copy + a red reminder not to modify template title fields, (3) a Dropzone ("Click or drag file to this area to upload", "File only allow CSV"). Cancel / Submit.

## Interactions & Behavior
- Row "…" dropdown → **Edit** opens the Edit Bundle Set panel pre-titled with that row's Parent SKU ID; **Audit** opens the read-only Audit modal.
- **Single Create** opens the same Edit Bundle Set panel in "Create Bundle Set" mode (no row context).
- **Batch Create/Edit** → Batch Upload Option modal → **Next** routes to Batch Create Bundle or Batch Edit Bundle modal depending on the radio selection.
- Filters (Select or Chip variant) are independent single-value pickers per field; **Clear All** resets all three.
- Export / Export Selected buttons are disabled while the selection count is 0 (bulk row-selection logic is not wired in the prototype — hook up to real checkbox state).
- No loading/error states are modeled in the prototype; add per your API's real latency/failure behavior.

## Tweaks (already-declared props — see bottom of the `.dc.html` file)
Exposed as toggle props so this prototype can preview alternate UI treatments; pick one final value per prop for production, or keep them as real feature flags:
- `filterStyle`: `"dropdown"` (Select components) | `"chips"` (Chip filter row) — currently defaults to `"chips"`
- `density`: `"comfortable"` | `"compact"` — scales page padding/section gaps/footer padding (24/16/12px vs 14/10/8px)
- `resultsView`: `"table"` (Table component) | `"cards"` (responsive Card grid, `minmax(280px,1fr)`)

## State Management
Prototype state (component-local, not persisted):
- `page`, `pageSize` — pagination
- `storefront`, `readyMethod`, `status` — active filter values (nullable)
- `modal` — which overlay is open: `null | 'audit' | 'editBundle' | 'bundleSet' | 'batchOption' | 'batchCreate' | 'batchEdit'`
- `editingRow` — the bundle row currently open in the Edit panel (`null` for create mode)
- `batchMethod` — `'create' | 'edit'`, drives Batch Upload Option's radio and the Next routing

In production, back this with real bundle-list fetch/filter/paginate calls, a selection set for bulk actions, and form state + validation for the Edit/Batch flows.

## Design Tokens
All values come from `app/public/design-system/tokens/*.css` — use these files as the source of truth rather than the hex/px values below (reproduced here for convenience):
- **Color:** brand indigo `#5244ee` (scale `#f7f6ff`→`#110964`), secondary amber `#ffa000` scale, neutral gray `#ffffff`→`#1e1e1e`; feedback green/red/blue/amber via semantic tokens only. Sidebar background `#110964`; page background `#f5f5f5`; card/surface `#ffffff` with `#f4f4f4` hairline border.
- **Type:** Roboto (Noto Sans for Traditional Chinese), scale 10/12/14/16/20/24/34/48/60px, line-heights ~1.2–1.4×.
- **Spacing:** 4/8/12/16/24/32/40/48/56/80/104/120px named tokens (not a strict 4/8 grid past mid-sizes).
- **Radius:** 2/4/8/12/16px (xs→xl) + full pill for chips/badges/toggles.
- **Borders/shadows:** 1px `#d9d9d9` hairlines are the primary separator; shadows reserved for true elevation (modals/dropdowns/tooltips), soft neutral gray only. Focus ring: 3px soft indigo at 20% opacity.
- **Motion:** 100/200/300ms, standard ease-in-out; no bounce/spring.

## Assets
- `app/public/design-system/assets/logo/mark-white.svg` — MMS product logomark (sidebar header), extracted from the source Figma file.
- No photography/illustration is used anywhere in this design — flat color and type only, per the design system.

## Files
- `Bundle Setting.dc.html` — the full prototype (template + logic class in one file; open directly in a browser).
- `app/public/design-system/` — the bound design-system bundle this prototype composes with: `_ds_bundle.js` (compiled components), `tokens/*.css` (all design tokens), `components/*/*.css` (per-group component styles), `assets/` (logomark). Reference `app/public/design-system/readme.md` for the full component inventory and rationale. This is the single copy used by the live app (served by Vite from `app/public/`) — do not recreate a copy elsewhere.
