# Preferred Tech Stack & Implementation Rules — GitTracker

When generating code or UI components for GitTracker, **strictly** adhere to
the following. No exceptions unless the user explicitly overrides a rule.

---

## Core Stack

| Layer | Choice | Notes |
|---|---|---|
| **Framework** | React (TypeScript preferred) | TSX files by default |
| **Styling Engine** | Tailwind CSS | Mandatory — no plain CSS or CSS-in-JS |
| **Component Library** | shadcn/ui | Base primitive for every new component |
| **Icons** | Lucide React | Only icon library permitted |

---

## GitTracker Visual System

GitTracker runs **two distinct themes** — always check which theme applies before coding.

### Dark Theme (Hero / Marketing pages)
- Background: `#04060F` (near-black) — map to `bg-[#04060F]`
- Foreground text: white — `text-white`
- Accent: Lime Green `#BFF549` — `text-[#BFF549]`, `border-[#BFF549]`
- Cards: slightly lighter dark surface `bg-[#0F1117]` with `border border-[#1F2937]`
- **No gradients, no drop shadows, no decorative clutter.**

### Light Theme (Content / Dashboard pages)
- Background: `#F5F5F7` — `bg-[#F5F5F7]`
- Foreground text: `#04060F` — `text-[#04060F]`
- Cards: white `bg-white` with `border border-[#E5E7EB] rounded-xl`
- Active/selected card border: `border-2 border-[#BFF549]`

---

## Component Patterns

### Overline Labels
Section labels appear as uppercase, letter-spaced, lime green text above headings:
```tsx
<p className="text-xs font-semibold tracking-widest uppercase text-[#BFF549]">
  PLATFORM OVERVIEW
</p>
```

### Hero Headings
Large, heavy-weight headings in black/900 weight:
```tsx
<h1 className="text-5xl font-black leading-tight text-white">
  Developer Intelligence with Forensic Precision
</h1>
```

### Feature Cards (3-column grid)
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
    {/* icon, title, description */}
  </div>
</div>
```

### Active / Highlighted Card (Elite / selected tier)
```tsx
<div className="bg-[#04060F] border-2 border-[#BFF549] rounded-xl p-6 text-white">
  {/* content */}
</div>
```

### Score / Metric Badge (pill label)
```tsx
<span className="text-xs font-mono tracking-widest uppercase px-3 py-1
                 bg-[#04060F] border border-[#BFF549] text-[#BFF549] rounded-md">
  SYSTEM SPEC 2.0
</span>
```

### Pillar / Factor Label Tags
Small colored label chips above card titles:
```tsx
<span className="text-xs font-semibold tracking-widest uppercase text-[#A78BFA]">
  PILLAR 01
</span>
```

### Code / Terminal Snippet Block
```tsx
<div className="bg-[#0F1117] border border-[#1F2937] rounded-lg px-4 py-3
                font-mono text-sm text-[#BFF549]">
  Composite Rank Formula = PAS(0.3) + OCS(0.25) + PIS(0.2) + CIS(0.15) + SDS(0.1)
</div>
```

### Buttons
- **Primary CTA:** `border border-[#BFF549] text-[#BFF549] bg-transparent hover:bg-[#BFF549] hover:text-[#04060F]`
- **Solid dark:** `bg-[#04060F] text-white border border-[#1F2937]`
- **Destructive / negative checkmark:** red `text-[#EF4444]`
- **Positive checkmark:** lime `text-[#BFF549]`

---

## Layout Rules

- Feature grids: 3-column (`grid-cols-3`)
- Tier ladders: 5-column (`grid-cols-5`) on desktop
- Phase roadmaps: 4-column (`grid-cols-4`) on desktop
- Use `gap-6` between cards, `gap-4` between form items
- Labels always above inputs — never floating or inline

---

## Forbidden Patterns

- ❌ Do **not** use gradients or decorative background textures
- ❌ Do **not** add drop shadows (`shadow-*`) to cards — use border instead
- ❌ Do **not** use jQuery, Bootstrap, or styled-components
- ❌ Do **not** create new `.css` files — all styles stay in component Tailwind classes
- ❌ Do **not** use exclamation marks in UI copy (see voice-tone.md)
- ❌ Do **not** use any color other than `#BFF549` for the brand accent

---

## Validation Checklist

- [ ] Correct theme applied (dark for hero/marketing, light for content/dashboard)
- [ ] Overline labels are uppercase + letter-spaced + `#BFF549`
- [ ] No gradients or drop shadows on any card or surface
- [ ] Active cards use `border-2 border-[#BFF549]`
- [ ] No jQuery, Bootstrap, or new CSS files
- [ ] Font weight is `font-black` (900) for hero titles
