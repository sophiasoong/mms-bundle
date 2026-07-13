# Project: MMS Web

## Design System
- Design language and rules: see `DESIGN.md`
- Token definitions: see `tokens.json`
- Figma source: https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/Claude-x-Design-System-Revamp?node-id=263-3033&t=IGVEBldFCFrmPmrK-1
- Design-system CSS/tokens/assets bundle: `app/public/design-system/` is the **only** copy — Vite serves it directly at `/design-system/*`. There is no root-level `design-system/` directory; do not recreate one. Any CSS/token/asset edit must be made in `app/public/design-system/`, or it will have no visible effect on the running app.

## When generating any UI component:
1. Read DESIGN.md for layout rules, spacing principles, component anatomy
2. Read tokens.json for all color, size, typography, and motion values
3. Never hardcode values — always resolve to a token
4. If no token can be applied, pause and ask
5. Use Material Symbols Rounded for icons
6. Primary: `#5244EE` (mapped to `color/brand/primary`)
7. Secondary: `#FFA000` (mapped to `color/brand/secondary`) 
8. Neutral: `#222222` (mapped to `color/brand/neutral/950`)
