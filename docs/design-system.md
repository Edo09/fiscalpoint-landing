# FiscalPoint — Warm / Navy theme

Visual style of the landing page (2026-10), written so it can be merged into the
main FiscalPoint / Fiscalo design system. The source of truth for every value
below is the `:root` block in `src/styles.css`.

## Principles

1. **Warm neutrals, not white.** Pages sit on "paper", alternate sections on
   "sand", and only cards are pure white. White is a surface, never a page.
2. **Navy is structure.** The brand navy (from the logo) anchors the page: hero,
   one mid-page band, and the closing CTA. Never more than three navy bands per page.
3. **Every color has one job.** If an element isn't clickable, it isn't blue.

| Color | Job | Examples |
|---|---|---|
| Blue `--accent` | Actions and links only | Buttons, nav active state, links, focus ring, progress bar, featured-plan border |
| Navy `--navy` | Structure and emphasis | Dark bands, requirement numbers, API mark |
| Green `--success` | Compliance and success | Trust icons, check lists, "e-CF aceptado", final step, "Nuevo" tag, DGII seal |
| Gold `--gold-*` | Highlights and section labels | Eyebrows, "Más popular" flag, Instagram tile |
| Amber `--warning` | Warnings | "¿Vas a migrar datos?" note |

## Tokens

```css
:root {
  /* Accent (blue) — actions only */
  --accent: #2a6fdb;
  --accent-hover: #2462c2;
  --accent-active: #1f56ac;
  --accent-soft: #eaf1fc;
  --accent-soft-2: #dbe8fa;
  --accent-text: #1f56ac;   /* use for blue text < 18px */
  --on-accent: #ffffff;

  /* Warm neutrals: paper (base) → sand (bands) → white (cards) */
  --bg: #f7f5f1;
  --bg-sand: #ede8e0;
  --surface: #ffffff;
  --surface-2: #fbfaf7;
  --surface-hover: #f4f2ed;
  --surface-active: #efece6;
  --border: #e5e0d7;
  --border-strong: #d3cdc2;
  --ring: rgba(42, 111, 219, 0.32);

  --text: #1a1d23;
  --text-2: #525a66;
  --text-3: #5f6671;

  /* Brand navy */
  --navy: #16244a;
  --navy-grad: linear-gradient(150deg, #121e3d 0%, #1b2d5c 55%, #133752 100%);
  --on-navy: #ffffff;
  --on-navy-2: #c4c9d3;      /* body text on navy */
  --on-navy-accent: #9cc0ff; /* icons / numbers on navy */

  /* Warm accent */
  --gold: #c08a2e;
  --gold-text: #8a5a0b;      /* gold text on light surfaces */
  --gold-soft: #f7ead2;
  --gold-bright: #f0c46e;    /* gold on navy, flag backgrounds */

  /* Semantic */
  --success: #1f8a5b;
  --success-soft: #e6f4ec;
  --success-bright: #4fd69c; /* green on navy */
  --warning: #c47f12;
  --warning-soft: #fbf1dd;
  --danger: #d14343;
  --danger-soft: #fce8e8;
  --neutral-soft: #efebe4;

  /* Radii */
  --r-xs: 5px; --r-sm: 7px; --r-md: 9px; --r-lg: 13px; --r-xl: 18px; --r-full: 999px;

  /* Shadows (navy-tinted) */
  --sh-xs: 0 1px 2px rgba(22, 36, 74, 0.05);
  --sh-sm: 0 1px 3px rgba(22, 36, 74, 0.07), 0 1px 2px rgba(22, 36, 74, 0.04);
  --sh-md: 0 4px 12px rgba(22, 36, 74, 0.09), 0 2px 4px rgba(22, 36, 74, 0.04);
  --sh-lg: 0 12px 32px rgba(22, 36, 74, 0.13), 0 4px 8px rgba(22, 36, 74, 0.05);

  /* Motion */
  --ease-out: cubic-bezier(.2, .7, .2, 1);
  --ease-spring: cubic-bezier(.34, 1.56, .64, 1);

  /* Type */
  --font-sans: "Helvetica Neue", Helvetica, "Segoe UI", Arial, system-ui, sans-serif;
  --font-mono: "SF Mono", ui-monospace, "DejaVu Sans Mono", Menlo, Consolas, monospace;
}
```

### What changed vs. the original Fiscalo light theme

| Token | Before | Now |
|---|---|---|
| `--bg` | `#eceef3` (cool grey) | `#f7f5f1` (paper) |
| `--surface-2` / `-hover` / `-active` | cool greys | warm `#fbfaf7` / `#f4f2ed` / `#efece6` |
| `--border` / `--border-strong` | `#e7e9ee` / `#d6dae1` | `#e5e0d7` / `#d3cdc2` |
| `--text-2` / `--text-3` | `#5a626e` / `#899099` | `#525a66` / `#5f6671` (AA fix) |
| `--neutral-soft` | `#eef0f3` | `#efebe4` |
| Shadows | `rgba(16,24,40,…)` | `rgba(22,36,74,…)` (navy-tinted) |
| New | — | `--bg-sand`, `--navy*`, `--on-navy*`, `--gold*`, `--success-bright`, `--ease-*` |

Blue accent, radii and fonts are unchanged.

## Contrast (WCAG 2.2)

| Foreground | White | Paper | Sand | Navy (darkest stop) |
|---|---|---|---|---|
| `--text` | 16.9 | 15.5 | 13.8 | — |
| `--text-2` | 7.0 | 6.4 | 5.7 | — |
| `--text-3` | 5.8 | 5.3 | 4.7 | — |
| `--accent-text` | 7.0 | 6.5 | 5.8 | — |
| `--gold-text` | 5.9 | 5.4 | 4.9 | — |
| `--accent` (as text) | 4.8 | 4.4 ⚠ | 3.9 ⚠ | — |
| `--on-navy` / `--on-navy-2` | — | — | — | 15.2 / 9.1 |
| `--on-navy-accent` / `--success-bright` / `--gold-bright` | — | — | — | 8.2 / 8.3 / 9.3 |

Rule: blue text under 18px uses `--accent-text`, not `--accent`.

## Surfaces and page rhythm

Three band classes, alternated strictly so no two neighbors share a color:

```css
.band-paper { background: var(--bg); }
.band-sand  { background: var(--bg-sand); }
.band-navy  { background: var(--navy-grad); color: var(--on-navy); }
```

Landing order: **navy** (hero) → paper → sand → **navy** (process) → paper →
sand → paper → sand → **navy** (CTA) → paper (footer).

- Cards are always `--surface` (white) with `--border` and `--sh-sm`; they read
  best on sand.
- On navy: titles `--on-navy`, body `--on-navy-2`, eyebrows `--gold-bright`,
  icons `--on-navy-accent`, success `--success-bright`. Inner tiles use
  `rgba(255,255,255,.08)` fills with a `rgba(255,255,255,.16)` hairline.
- The navy hero gets a faint dot grid (`rgba(255,255,255,.07)`, 26px) masked
  toward the bottom, plus a blue glow top-right and a green glow bottom-left.

## Component recipes

- **Eyebrow** — 12px / 700 / `0.14em` uppercase, `--gold-text` (on navy:
  `--gold-bright`), with a 22px rule before it outside centered headers.
- **Primary button** — blue vertical gradient (`#3a7ee6 → --accent →
  --accent-active`), inset top highlight; on navy add
  `0 10px 28px rgba(42,111,219,.45)` glow.
- **Secondary button** — light: white + `--border-strong`, hover border `--accent`.
  On navy: `.btn-outline-light` (`rgba(255,255,255,.1)` + `.28` border).
- **Announcement pill** (on navy) — translucent white pill containing a
  `--success-bright` "NUEVO" tag with navy text and a trailing arrow. It's a link.
- **Highlight flag** ("Más popular") — `--gold-bright` background, `--navy` text.
- **Numbered markers** — light sections: navy circle, white number. Navy
  sections: translucent tile with `--on-navy-accent` number; the final/done step
  is `--success-bright` with a check icon and spans the full row.
- **Hero hierarchy** — max two CTAs (primary + secondary); secondary links move
  into the pill or the nav.

## Motion

Implemented in `src/motion.ts` + the "Motion & micro-interactions" block of
`src/styles.css`. No dependencies.

- **Scroll reveal**: opacity 0 → 1 and `translate: 0 24px → none`, 0.7s
  `--ease-out`, siblings staggered 80ms (capped at 5).
- **Entrances** use the individual `translate` / `scale` properties so they never
  fight hover transforms.
- **Hover**: cards lift 3–4px with `--sh-lg`; icon tiles scale 1.1 and rotate −6°
  with `--ease-spring`; trailing arrows nudge 4px; primary buttons get a light
  sweep.
- **Hover effects only on hover-capable devices** (`@media (hover: none)` resets
  them). Pointer tilt only for `(hover: hover) and (pointer: fine)`.
- **Reduced motion**: `prefers-reduced-motion: reduce` disables all of it, and
  content is never hidden without JS.
