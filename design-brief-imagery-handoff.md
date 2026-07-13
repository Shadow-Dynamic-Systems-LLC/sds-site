# Design Brief — Forged Restraint Imagery Handoff

**Date:** 2026-07-06
**For:** Next agent/designer continuing the v2 design system migration
**Priority:** Medium — no external deadline, but the navbar logo (P0 below) is the single most visible remaining off-doctrine element on the site
**Branch:** `feature/restrained-forge` (tracking `Gitlab/feature/restrained-forge`; GitLab isn't reachable from sandboxed agent environments over port 22 — a human pushes/opens the MR)

---

## Context

sds-site is mid-migration from a v1 "dark-forge" visual register (near-black surfaces, glowing gold-on-black, Inter/Roboto Mono, dark 3D-render/meme header images) to **v2 "Forged Restraint / Naturalist Metallurgy"** — a warm-paper register with ink/graphite linework, restrained color, and a naturalist-specimen illustration language.

**The authoritative doctrine is `CLAUDE.md`** in the "SDS Design System" reference folder (mounted read-only alongside this repo). Read it before touching anything visual. Key constraints worth internalizing up front:

- Paper register: `--paper #FBFAF7` / `--paper-2 #F4F2EC`, ink `#141414`, hairline `#d9d3c7`.
- Typography: Squada One for display/wordmark **only** (never body text), IBM Plex Sans for body/UI, IBM Plex Mono for labels/IDs.
- Hard corners everywhere except pill-radius status chips/toggles.
- Blur restricted to glass-over-imagery and the modal scrim only.
- "One heat per view-state" — `--forge-magma #ff9900` is reserved for a single live accent per view; don't sprinkle it.
- Hex numbering (`§ 0x01`), decimal dot-dates (`2026·07·06`, U+00B7 middle dot).
- Naturalist glyph hand: `--graphite #423f39` stroke, `stroke-linecap/linejoin: round` is the literal "hand" signal (not jitter).
- Brand voice: operationalize/verify/audit/attest; no emoji, no launch/disrupt/unlock/revolutionary.

A prior agent session completed tokens/typography, structural chrome (flat navbar, hard corners, seven-signal status set), copy conventions (hex numbering, decimal dates), a first pass of 5 hand-drawn naturalist glyph icons (`src/components/GlyphIcons.tsx`), a categorical-color fix (the ZTG cross-section's pastel layer coding → `color-mix()` tints), and a pass making sure body/label text always rides a panel or paper-halo instead of sitting raw on the background. All of that is done and verified (`tsc -b` clean).

**This session's work (imagery):**

1. `constable.webp` was simply wrong — a generic glowing-lighthouse render that was never the real Constable mark. Replaced with the user-supplied `constable-logo.svg` (flat black abstracted-ring + plug mark, no gradients — already on-doctrine as-is) across all 4 places it's referenced in `src/data/artifacts.ts`/`research.ts`.
2. Reviewed every publication/research header image (`artifacts.ts`/`research.ts` `image:` fields). Found `ai-sys-fail.webp` already on-doctrine (paper, ink crack illustration, graph-paper grid, serif type, dark notation bar) — used it as the reference point. The other 6 (`assembly-hall`, `monolith-terminal`, `industrial-integrity`, `filing-cabinet`, `neutral-orchestration`, `phoenix-logo`) were v1-era dark 3D renders, a meme, and a glowing gold wireframe — all replaced with new naturalist "specimen plate" illustrations. See `design/plates/` in this repo for the generation system and design philosophy used.

---

## Priority queue

### P0 — Navbar logo mark (`public/assets/sds-dark-trans-shadow.png`)

This is rendered in `src/components/Navbar.tsx` on **every page**, right next to a wordmark that's already correctly Squada One + brass accent dots. The image itself is a glowing gold-on-black "SDS" mark with a neon-tube outline effect — pure v1 dark-forge, and now the single most visible on-doctrine violation left on the site (higher visibility than any of the publication thumbnails, since it's in the fixed header). This should be the next thing addressed.

Recommend treating it the same way `constable-logo.svg` was handled: a flat, single-color graphite or ink linework mark, no glow/gradient, small enough to read at ~40px tall (`.navbar-logo img { height: 40px }` in `src/index.css`). Consider whether the icon is even needed alongside the text wordmark, or whether it should be dropped in favor of the text mark alone — that's a legitimate option, not just a redraw.

### P1 — Remaining glyph icons

`src/components/GlyphIcons.tsx` has 5 hand-drawn naturalist icons (Boundary, Policy, Authority, Evidence, Surface) wired into `Services.tsx`. The 6th service card (Containment) still uses its plain Unicode glyph from `data/glyphs.ts`. The user has not yet decided whether to bring in a specialist illustrator for this and the rest of the glyph notation system (`data/glyphs.ts`'s ~25 Unicode symbols used elsewhere as dense formal notation — those are intentionally staying as Unicode, not being converted). Don't do more glyph work without checking in on that decision first.

### P1 — Real visual/browser QA

No sandbox in this environment has been able to render and screenshot the live site (Playwright's browser can't reach the sandbox's localhost across environments tried so far, and installing a browser binary is blocked by network allowlisting). `tsc -b` passing is necessary but not sufficient — someone needs to actually run `npm run dev` locally and look at: the new specimen-plate images in card contexts, the paper-halo/panel treatments added for text legibility, and the phoenix/field-mark seal at actual render size (it was designed and reviewed at 1024×1024; verify it still reads clearly scaled down inside a card).

### P2 — Dead asset cleanup

These files in `public/assets/` are not referenced anywhere in `src/` as of this writing — confirmed via `grep -rn` across `src/`:

`globe-web.webp`, `glyph-communication.webp`, `glyph-reason.webp`, `glyph-recursion.webp`, `last-game-show-logo.webp`, `lighthouse.webp`, `memory-mesh-1.webp`, `memory-mesh-2-4x3.webp`, `memory-mesh-3-4x3.webp`, `shield-ui.webp`, `spellbook.webp`, `sds-dark-trans.png` (note: `sds-dark-trans-shadow.png` **is** used — see P0 — don't confuse the two), `sds-logo-bright-trans.png`.

One caveat: `PLAN.md` (repo root, dated March 2026) once earmarked `lighthouse.webp` for the NIST RFI response artifact. That plan has since been executed — `SDS.RX.003` exists in `artifacts.ts` now and uses `constable-logo.svg`, not `lighthouse.webp` — so the file does appear to be genuinely orphaned rather than pending. Worth a final `grep` before deleting, since `PLAN.md`/`site_update_handoff.md` are historical planning docs, not live state.

### P2 — Gold-accent hover-glow token hygiene

Site-wide, `rgba(255, 215, 0, N)` is used raw (not via a token) for generic hover/focus/active glow on buttons, links, and form fields — dozens of occurrences across `index.css`, `ContactForm.css`, `ArchitecturalSystem.css`. This is v1-era styling that was deliberately left alone in every prior pass because it wasn't the specific thing flagged each time, but it's still not using the `--brass`/`--forge-*` tokens properly. Low urgency, but worth a dedicated sweep at some point — probably a `find/replace` to `color-mix(in srgb, var(--brass) N%, transparent)` to match the pattern already used for the categorical layer colors.

---

## The specimen-plate system (`design/plates/`)

If more naturalist illustrations are needed (additional publication headers, the navbar mark, anything else), don't start from scratch:

- `design/plates/design-philosophy-naturalist-metallurgy.md` — the design philosophy the plates were built from (paper ground, engraved crosshatch/stipple shading, exactly one magma "beat" accent per plate, generous negative space, Squada One title + IBM Plex Mono classification/subtitle).
- `design/plates/plate_common.py` — shared frame scaffolding: paper background, hairline corner-tick border, crosshatch/stipple SVG patterns, the `beat()` helper for the single live accent, `path()`/`circle()`/`line()`/`rect()` primitives.
- `design/plates/build_plates.py` — the 6 motif builders (`assembly_hall()`, `monolith_terminal()`, `industrial_integrity()`, `filing_cabinet()`, `neutral_orchestration()`, `field_seal()`) plus the `PLATES` registry that drives generation. Add a new `dict(...)` entry + builder function to add a plate.

To regenerate/extend, in a shell with Python 3 + `cairosvg` + `fonttools` installed:

```bash
pip install cairosvg fonttools brotli --break-system-packages
# Convert the project's vendored woff2 fonts to ttf and register with fontconfig —
# cairosvg needs real font files, not woff2.
python3 -c "
from fontTools.ttLib import TTFont
for src, dst in [
    ('public/assets/fonts/SquadaOne.woff2', 'SquadaOne.ttf'),
    ('public/assets/fonts/IBMPlexMono-400.woff2', 'IBMPlexMono-400.ttf'),
]:
    f = TTFont(src); f.flavor = None; f.save(dst)
"
mkdir -p ~/.fonts && cp *.ttf ~/.fonts/ && fc-cache -f ~/.fonts
cd design/plates && python3 build_plates.py
# then rasterize each generated .svg to .png via cairosvg (see build_plates.py's PLATES list for filenames)
```

Each plate is 1024×1024, generic to a *category* rather than one specific article — the site data reuses the same image across multiple different publication entries (e.g. `monolith-terminal.png` backs two different DIAGNOSIS entries), so keep new plates thematic/generic rather than tied to one article's exact title.

---

## Environment gotcha worth knowing about

If you're working in a sandboxed agent environment with the repo mounted rather than a native checkout: writes made through an editing tool can occasionally desync from what a freshly-spawned process (bash, or a language runtime importing/reading the same file) sees immediately after — you'll get stale content with no error, not a crash. This hit both `.tsx`/`.css` files in this repo and a Python build script in an unrelated scratch directory during this work. If a file you just edited behaves as though the edit didn't happen (missing function, unterminated string, wrong line count), don't assume the edit failed — verify the file's true content with a direct read, then rewrite it through the same tool you're about to execute it with (e.g., rewrite via a shell heredoc immediately before running it with that shell) to force a consistent view before trusting `tsc`/`python`/etc. output.

---

## Verification checklist for whatever you change

1. `npx tsc -b` — must be clean.
2. Brace balance on any hand-edited CSS: `grep -o "{" file | wc -l` should equal the `}` count.
3. Cross-check the real repo state against your intent — if GitKraken MCP tools are available, `git_status` reads the actual disk state and isn't subject to the desync issue above.
4. No raw pastel/saturated hex tied to categorical or status coloring — everything should route through `color-mix()` against a doctrine token.
5. No body copy or labels sitting directly on `.drafting-grid-bg`/`MemoryGraph` without a panel or paper-halo behind them.
