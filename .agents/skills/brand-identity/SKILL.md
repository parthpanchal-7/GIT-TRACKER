---
name: brand-identity
description: Authoritative GitTracker v3.0 Brand Identity, Symmetric Bento Grid, Dual-Theme (Dark Void & Crisp White), and Lime Geometric G Logo Design System.
---

# GitTracker Brand & UI/UX Rulebook (v3.0 — Lime Geometric Edition)

## 1. Logo & Brand Mark (`gittrackerlogov2.png`)
- **Primary Mark:** Concentric Geometric "G" formed by broken circular Git commit tracks and a central node in solid **Lime Green (`#BFF549`)** on a **Pure Black (`#04060F`)** squircle tile.
- **Rules:** Flat vector geometry only. Never apply drop shadows to the glyph itself, never stretch, and never recolor the `#BFF549` glyph on dark containers.
- **Landing Hero Animation:** Fullscreen HTML5 Canvas intro where the Geometric G zooms out, sprouts `#BFF549` cubic Bézier Git branches across the viewport, pops the letters `G-I-T-T-R-A-CK-E-R` with commit hashes, and converges to drop the hero tagline onto the landing page.

## 2. Dual-Theme Color Architecture (CSS Custom Properties)
All components MUST use CSS variables (`var(--bg-canvas)`, `var(--bg-card)`, etc.) controlled by `data-theme="dark"` (default) and `data-theme="light"` on `document.documentElement`.

### Dark Theme (`[data-theme="dark"]` — Default)
- `--bg-canvas`: `#04060F` (Deep Void)
- `--bg-surface`: `#090E1C` (Secondary Section / Sidebar)
- `--bg-card`: `rgba(19, 25, 43, 0.72)` (Aether Glass Card)
- `--bg-card-hover`: `#181F33`
- `--text-primary`: `#F8FAFC`
- `--text-secondary`: `#94A3B8`
- `--brand-lime`: `#BFF549` (Primary Accent, Active States, Highlights)
- `--brand-lime-dim`: `#9ED130`
- `--brand-lime-text`: `#BFF549` (Text/Icons on dark backgrounds)
- `--border-subtle`: `rgba(255, 255, 255, 0.08)`
- `--border-accent`: `rgba(191, 245, 73, 0.25)`

### Light / White Theme (`[data-theme="light"]` — Forensic Clean Sample)
- `--bg-canvas`: `#F8FAFC` (Crisp Alabaster Canvas)
- `--bg-surface`: `#FFFFFF` (Pure White Sidebar & Header)
- `--bg-card`: `#FFFFFF` (Symmetric White Bento Card)
- `--bg-card-hover`: `#F1F5F9`
- `--text-primary`: `#0F172A` (Deep Slate Black)
- `--text-secondary`: `#475569` (Muted Slate)
- `--brand-lime`: `#BFF549` (Button fills, badges, icon accents)
- `--brand-lime-text`: `#365314` (Dark Olive/Forest text when placed directly on white for WCAG AAA contrast, or `#BFF549` inside `#04060F` dark pill containers)
- `--border-subtle`: `#E2E8F0` (1px crisp symmetric card border)
- `--border-accent`: `#84CC16`

### Semantic & Forensic Status Tokens (SRS §2 & §8 Compliant)
- **Verified / Clean:** `#22C55E` (Green — `Normal Activity` / `In-Window`)
- **Needs Review (Shadow Flag):** `#F59E0B` (Amber — NEVER use red for anomaly/integrity flags; always label as `▲ Needs Review` or `Unusual Pattern`, never "Cheater")
- **Critical / System Error:** `#EF4444` (Reserved strictly for failed syncs or destructive actions)

## 3. Typography System
- **Display / Headings (`--font-display`):** `'Plus Jakarta Sans'`, `'Inter Display'`, sans-serif (Weights: 700, 800, 900; Tracking: `-0.03em`)
- **UI & Body (`--font-body`):** `'Manrope'`, `'Inter'`, sans-serif (Weights: 400, 500, 600)
- **Labels & Badges (`--font-label`):** `'Space Grotesk'`, sans-serif (Uppercase, Weight: 700, Tracking: `+0.08em`, `11px–12px`)
- **Telemetry & Scores (`--font-mono`):** `'JetBrains Mono'`, monospace (All scores, PAS/OCS/PIS/CIS/SDS weights, commit hashes, ranks, and `₹5,000` pricing)

## 4. Symmetric Layout & Grid Rules
- Every dashboard and landing section must follow a strict **12-column CSS Grid** (`max-width: 1280px`, `gap: 24px`, `padding: 24px 32px`).
- **Card Symmetry:** Equal height cards (`h-full flex flex-col justify-between`), uniform `16px` border-radius, `24px` internal padding, and consistent header/footer alignment inside every Bento card.