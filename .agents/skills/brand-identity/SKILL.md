---
name: brand-identity
description: >-
  Provides the single source of truth for GitTracker brand guidelines, design
  tokens, technology choices, and voice/tone. Use this skill whenever generating
  UI components, styling applications, writing copy, or creating user-facing
  assets to ensure GitTracker brand consistency. Triggered by phrases like
  "brand guidelines", "design tokens", "UI styling", "component generation",
  "copywriting", "brand voice", "color palette", "tech stack", or "GitTracker
  branding".
---

# Brand Identity & Guidelines — GitTracker

**Brand Name:** GitTracker
**Tagline:** Developer Intelligence with Forensic Precision
**Spec Version:** System Spec 2.0
**Sites:** `gittracker.dev` · `api.gittracker.dev`

This skill defines the core constraints for visual design and technical
implementation. Adhere to these guidelines strictly to maintain consistency
across every deliverable.

---

## Workflow

- [ ] Identify the task type (visual design / coding / copywriting)
- [ ] Read **only** the resource file for that task type — do not guess brand values
- [ ] Apply all constraints from that file
- [ ] Validate: check the validation checklist inside the resource file before delivering

---

## Reference Documentation

### Visual Design & UI Styling

Exact colors, fonts, themes (dark / light), border radii, card patterns, tier colors:

👉 [`resources/design-tokens.json`](resources/design-tokens.json)

**Key values at a glance:**
- Primary accent: `#BFF549` (Lime Green)
- Dark background: `#04060F`
- Light background: `#F5F5F7`
- Logo: Geometric G mark — no gradients, no drop shadows

### Coding & Component Implementation

Framework rules, Tailwind component patterns, dual-theme implementation, forbidden patterns:

🔧 [`resources/tech-stack.md`](resources/tech-stack.md)

**Key rules at a glance:**
- Stack: React (TS) + Tailwind CSS + shadcn/ui + Lucide React
- Dark hero theme vs. light content theme — always use the correct one
- No gradients, no drop shadows, no Bootstrap, no jQuery

### Copywriting & Content Generation

Brand persona, canonical taglines, terminology guide (Codequiry, 5-Factor Score, etc.), overline patterns, error message format:

👉 [`resources/voice-tone.md`](resources/voice-tone.md)

**Key rules at a glance:**
- Tone: forensic precision + technical authority + transparent
- Overlines: `ALL CAPS`, e.g. `PLATFORM OVERVIEW`
- No exclamation points in standard UI copy
- Use exact brand terms: "Codequiry", "5-Factor Vector Score", "Telemetry"

---

## Validation

Before delivering any output, confirm:

- [ ] Colors come from `design-tokens.json` — no hardcoded guesses
- [ ] Correct theme applied: dark for hero/marketing, light for dashboard/content
- [ ] Stack is React + Tailwind + shadcn/ui + Lucide React only
- [ ] No gradients, drop shadows, jQuery, Bootstrap, or new CSS files
- [ ] Copy uses canonical GitTracker terminology (not substitutions)
- [ ] Section overlines are ALL CAPS and letter-spaced
- [ ] No exclamation points in interface copy
