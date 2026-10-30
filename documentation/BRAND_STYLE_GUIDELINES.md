# GitTracker Brand Style Guidelines & Design System
**Version 2.0 • Aether Glass Edition**  
*The Developer Contribution Intelligence Platform*

---

## 1. Brand Overview & Essence

### 1.1 Brand Mission & Vision
**GitTracker** empowers developers, open-source maintainers, hackathon organizers, and engineering teams with transparent, merit-driven contribution intelligence. By transforming raw GitHub commits, pull requests, and code into explainable multi-dimensional metrics—bolstered by automated anti-cheat forensics—GitTracker provides a definitive, un-gameable benchmark for engineering talent.

### 1.2 Brand Positioning
- **Target Audience:** Software engineers, student builders, tech startups, dev-community managers, and hackathon organizers.
- **Core Value Proposition:** Real-time GitHub contribution telemetry, explainable decay scoring (PAS, OCS, PIS, CIS, SDS), integrated Codequiry anti-cheat code analysis, and streamlined hackathon event management.
- **Brand Personality Attributes:**
  - **Precise & Forensic:** Scientific, mathematical, data-backed, zero black-box obscurity.
  - **Cosmic & High-Tech:** Deep-space dark aesthetics, glowing plasma accents, fluid glass surfaces.
  - **Developer-Centric:** Rooted in Git idioms, code ergonomics, and terminal-level speed.
  - **Transparent & Meritocratic:** Celebrating genuine craftsmanship; identifying AI synthesis and plagiarism without ambiguity.

---

## 2. Logo & Brand Mark System

```
     ┌─────────────┐
     │  ┌───────┐  │
     │  │   G   │  │   GitTracker  [HOME]
     │  └───────┘  │
     └─────────────┘
      36px Icon Mark     Primary Wordmark
```

### 2.1 The Icon Mark
The GitTracker brand mark consists of an ultra-bold uppercase **"G"** centered inside a squircle tile (10px–16px border-radius) with an energetic cyan-to-violet linear gradient (`#81ecff` $\to$ `#d674ff`).
- **Foreground Glyphs:** Dark Teal `#003840` or Pure White `#ffffff` depending on background contrast.
- **Container Fill / Border:** `linear-gradient(135deg, #81ecff, #d674ff)` with subtle cyan ambient glow: `box-shadow: 0 0 28px rgba(129, 236, 255, 0.35)`.

### 2.2 Wordmark Construction
- **Font:** `Plus Jakarta Sans`
- **Weight:** 800 (ExtraBold) or 900 (Black)
- **Tracking:** `-0.02em` to `-0.03em`
- **Gradient Fill:** `linear-gradient(135deg, #81ecff 30%, #d674ff 100%)` with `-webkit-background-clip: text` and `-webkit-text-fill-color: transparent`.

### 2.3 Clear Space & Minimum Sizes
- **Clear Space:** Equal to half the width of the "G" icon on all sides ($0.5X$).
- **Minimum Digital Sizes:**
  - Icon Only: `24px × 24px` (Favicon / Avatar)
  - Full Wordmark + Icon: `140px` wide
  - Header Navigation: `34px – 36px` icon height, `18px – 20px` wordmark size.

### 2.4 Logo Rules
> **Do's and Don'ts**
> - Never stretch, skew, or rotate the icon mark or wordmark.
> - Never place the logo on busy photographic backgrounds without a glass backdrop filter.
> - Never substitute brand gradient colors with unapproved neon shades.
> - Do not enclose the logo in circular borders unless rendered as an avatar placeholder.

---

## 3. Color Palette & Design Tokens

GitTracker utilizes the **Aether Glass Color Hierarchy**, structured to minimize visual fatigue while maximizing data clarity and depth.

### 3.1 Primary Accent Palette
| Token | Hex Code | RGB | Purpose |
| :--- | :--- | :--- | :--- |
| `--primary` | `#81ecff` | `129, 236, 255` | Electric Cyan: Primary brand anchor, active tabs, buttons, key metrics. |
| `--primary-dim` | `#00d4ec` | `0, 212, 236` | Vivid Cyan: Hover transitions, gradient endpoints, charts. |
| `--primary-container` | `#00e3fd` | `0, 227, 253` | Highlights, active borders, progress bar heads. |
| `--on-primary-fixed` | `#003840` | `0, 56, 64` | Deep Teal: High-contrast text on bright cyan buttons. |

### 3.2 Secondary & Tertiary Accents
| Token | Hex Code | RGB | Purpose |
| :--- | :--- | :--- | :--- |
| `--secondary` | `#d674ff` | `214, 116, 255` | Neon Violet: Secondary brand pillar, AI detection flags, Elite tier gradients. |
| `--secondary-dim` | `#bb00fc` | `187, 0, 252` | Deep Violet: Hover states, secondary button backgrounds. |
| `--tertiary` | `#ff6b98` | `255, 107, 152` | Cosmic Rose / Pink: Hot signals, warning metrics, third orb color. |

### 3.3 Neutral & Surface Architecture (Dark Theme)
| Token | Hex Code | Visual Role |
| :--- | :--- | :--- |
| `--surface` | `#090e1c` | Base window canvas and background. |
| `--surface-container-lowest` | `#04060f` | Deepest backdrop and hero gradient base. |
| `--surface-container-low` | `#0d1323` | Secondary section background, scrollbar track. |
| `--surface-container` | `#13192b` | Standard card glass foundation. |
| `--surface-container-high` | `#181f33` | Elevated card surfaces, hovered panels. |
| `--surface-container-highest` | `#1e253b` | Floating dropdowns, tooltip panels, active chips. |
| `--on-surface` | `#e1e4fa` | Primary text: 92% opacity crisp readability. |
| `--on-surface-variant` | `#a6aabf` | Secondary text, captions, labels, metadata. |
| `--outline` | `#707588` | Active borders and dividers. |
| `--outline-variant` | `#434759` | Subtle grid lines, disabled borders. |

### 3.4 Semantic & Status Tokens
| State | Hex Code | Background Tint | Meaning in GitTracker |
| :--- | :--- | :--- | :--- |
| **Success / Clean** | `#34d399` | `rgba(52, 211, 153, 0.12)` | Verified human code, rank increases (▲), engine healthy. |
| **Warning / Review** | `#fbbf24` | `rgba(251, 191, 36, 0.12)` | Code needs peer inspection, boilerplate warning, pending. |
| **Error / High Risk** | `#ff716c` | `rgba(255, 113, 108, 0.12)` | Plagiarized matches, rank drops (▼), authentication failure. |
| **Information** | `#81ecff` | `rgba(129, 236, 255, 0.10)` | Feature badges, system telemetry, status notices. |

### 3.5 5-Tier Gamification System
| Tier Level | Accent Color | Hex Code | Visual Expression |
| :--- | :--- | :--- | :--- |
| **Bronze** | Aged Bronze | `#cd7f32` | `rgba(205, 127, 50, 0.15)` with `1px solid rgba(205, 127, 50, 0.25)` |
| **Silver** | Polished Chrome | `#c0c0c0` | `rgba(192, 192, 192, 0.12)` with `1px solid rgba(192, 192, 192, 0.2)` |
| **Gold** | Solar Gold | `#ffd700` | `rgba(255, 215, 0, 0.12)` with `box-shadow: 0 0 20px rgba(255, 215, 0, 0.15)` |
| **Platinum** | Liquid Platinum | `#e5e4e2` | `rgba(229, 228, 226, 0.12)` with `box-shadow: 0 0 24px rgba(129, 236, 255, 0.12)` |
| **Elite** | Cosmic Prismatic | Multi-gradient | `linear-gradient(135deg, #81ecff, #d674ff, #ff6b98)` + `@keyframes elitePulse` |

---

## 4. Typography System

GitTracker pairs four distinct typefaces, each assigned a precise cognitive function.

```
┌────────────────────────────────────────────────────────┐
│  Plus Jakarta Sans  ── Display, Titles & Hero Text     │
│  Manrope            ── Body, Longform Reading, UI Copy │
│  Space Grotesk      ── Overlines, Badges, Tab Labels   │
│  JetBrains Mono     ── Scores, Code, Metrics, Hashes   │
└────────────────────────────────────────────────────────┘
```

### 4.1 Typeface Allocation
1. **`--font-display` (`'Plus Jakarta Sans'`, sans-serif)**
   - Used for: Brand headers, hero titles, modal headings, page greetings.
   - Character: Geometric yet friendly, tight aperture, confident curves.
2. **`--font-body` (`'Manrope'`, sans-serif)**
   - Used for: Explanations, cards, tooltips, list items, general button copy.
   - Character: Exceptional legibility at small sizes (12px–15px) on dark backgrounds.
3. **`--font-label` (`'Space Grotesk'`, sans-serif)**
   - Used for: Uppercase section tags, table headers, category chips, navigation badges.
   - Character: Technical, retro-futuristic, high aperture, stylized terminals.
4. **`--font-mono` (`'JetBrains Mono'`, monospace)**
   - Used for: LOC counters, score numbers, code snippets, git branches, AST statistics.
   - Character: Distinctive character recognition (`0` with dot, `1` with serif), perfectly tabular.

### 4.2 Type Scale & Hierarchy

| Style Level | Typeface | Size | Weight | Line Height | Letter Spacing | Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Plus Jakarta Sans | 56px–88px | 900 | 1.05 | `-0.03em` | Mixed |
| **H1 Page Title** | Plus Jakarta Sans | 26px–32px | 800 | 1.2 | `-0.02em` | Mixed |
| **H2 Section Title**| Plus Jakarta Sans | 20px–24px | 700 | 1.3 | `-0.01em` | Mixed |
| **H3 Card Header** | Plus Jakarta Sans | 16px–18px | 700 | 1.4 | `0` | Mixed |
| **Score Metric (Hero)**| JetBrains Mono | 44px–48px | 800 | 1.0 | `-0.02em` | Monospace |
| **Score Metric (Mid)** | JetBrains Mono | 24px–28px | 700 | 1.1 | `0` | Monospace |
| **Overline / Label**| Space Grotesk | 11px–12px | 700 | 1.0 | `+0.06em to +0.1em`| UPPERCASE |
| **Body (Default)** | Manrope | 14px–15px | 400/500 | 1.6 | `0` | Sentence |
| **Body (Secondary)**| Manrope | 12px–13px | 400 | 1.5 | `0` | Sentence |
| **Code / Syntax** | JetBrains Mono | 12px–13px | 500 | 1.65 | `0` | Exact |

---

## 5. The Aether Glass Design System

The visual language of GitTracker is defined by **Liquid Glassmorphism**, balancing deep contrast with translucent lighting.

### 5.1 Glassmorphism Specifications
```css
/* Standard Glass Surface Token */
--glass-bg: rgba(19, 25, 43, 0.55);
--glass-bg-light: rgba(30, 37, 59, 0.45);
--glass-border: rgba(129, 236, 255, 0.12);
--glass-blur: 16px;
--glass-saturate: 150%;
--glass-radius: 16px;
--glass-radius-lg: 24px;
```

#### Application Rules
- **Layer 0 (Canvas):** Dark gradient void `#04060f` to `#0d1323`.
- **Layer 1 (Atmosphere):** Three floating, blurred radial orbs (`orbFloat`, 20s animation):
  - Cyan Orb: `width: 600px; background: #81ecff; filter: blur(120px); opacity: 0.35`
  - Purple Orb: `width: 500px; background: #d674ff; filter: blur(120px); opacity: 0.35`
  - Pink Orb: `width: 400px; background: #ff6b98; filter: blur(120px); opacity: 0.25`
- **Layer 2 (Containers):** Cards use `backdrop-filter: blur(16px) saturate(150%)`, with a linear top-down gradient surface wash `linear-gradient(180deg, rgba(129,236,255,0.03) 0%, transparent 100%)`.
- **Layer 3 (Borders):** Never use solid white borders. Use `1px solid rgba(129, 236, 255, 0.12)` on resting state; intensify to `rgba(129, 236, 255, 0.35)` on hover.

---

## 6. Component Guidelines

### 6.1 Buttons & Interactive Controls

#### 1. Primary Action Button
- **Background:** `linear-gradient(135deg, #81ecff, #00d4ec)`
- **Color:** `#003840` (Bold Teal)
- **Font:** `Space Grotesk`, 14px, Weight: 700/800
- **Border-radius:** `12px`
- **Glow:** `box-shadow: 0 0 24px rgba(129, 236, 255, 0.3)`
- **Hover:** `transform: translateY(-1px) scale(1.02); box-shadow: 0 0 32px rgba(129, 236, 255, 0.45)`

#### 2. Ghost / Secondary Button
- **Background:** `rgba(255, 255, 255, 0.04)`
- **Border:** `1px solid rgba(129, 236, 255, 0.2)`
- **Color:** `#81ecff`
- **Hover:** `background: rgba(129, 236, 255, 0.08); border-color: rgba(129, 236, 255, 0.4)`

#### 3. Danger / Deletion Button
- **Background:** `rgba(255, 113, 108, 0.12)`
- **Border:** `1px solid rgba(255, 113, 108, 0.25)`
- **Color:** `#ff716c`
- **Hover:** `background: rgba(255, 113, 108, 0.22)`

### 6.2 Data Stat Pills & Metrics Cards
- Always pair a numeric value with a small uppercase label in `--font-label`.
- Big scores use `linear-gradient(135deg, #81ecff, #d674ff)` text-clip.
- Use `RankDelta` indicators (`▲` green, `▼` red, `—` neutral) for temporal changes.

### 6.3 Hackathon 9-Module Control Grid
Each module card in the Hackathon Manager features an icon in an illuminated rounded badge (`${module.color}18`), an uppercase status prompt (`CONFIGURE →`), and a glowing top hairline border on hover.
- Module Colors:
  - Customize Event: `#81ecff` (Cyan)
  - Gather Registration: `#d674ff` (Violet)
  - Gather Ideas: `#fbbf24` (Amber)
  - Form Teams: `#34d399` (Emerald)
  - Enable Communication: `#ff6b98` (Pink)
  - Gather Feedback: `#a78bfa` (Lavender)
  - Involve Mentors: `#f97316` (Orange)
  - Publish Results: `#eab308` (Gold)
  - Enable Leaderboard: `#06b6d4` (Teal)

---

## 7. Anti-Cheat & Codequiry Forensic UI Standards

When presenting code integrity data from the Codequiry engine:
1. **The Three Master Pillars:**
   - **AI-Generated Probability:** Purple `#d674ff` tone. Highlights syntax entropy and prompt hallmarks.
   - **Code Plagiarism Rate:** Red `#ff716c` tone. Identifies open-source repository and cohort collisions.
   - **Organic Human Code:** Green `#34d399` tone. Identifies natural commit cadences and bespoke architectural patterns.
2. **Code Inspector Window:**
   - Editor background: Deep Void `#040714`.
   - Font: `JetBrains Mono` at `12px` with `1.65` line height.
   - Code Annotation Pills: Fixed at the top-right of the modal displaying exact AI % and Plagiarism % tags.

---

## 8. Voice, Tone & Microcopy

### 8.1 Principles
- **Clarity over cleverness:** Never use vague corporate buzzwords. Say *"Real-Time GitHub Sync"* instead of *"Synergistic Cloud Aggregation"*.
- **Direct & Empowering:** Acknowledge developer effort with precision. Celebrate ranking climbs as achievements earned through code commits.
- **Explainable & Honest:** If code is flagged, state the exact signals observed (e.g. *"Predictable token entropy indicative of LLM synthesis"* or *"AST exact match to public repository"*).

### 8.2 Standard Microcopy Glossary
- `HOME`: Always capitalized in breadcrumbs and badges.
- `PAS`: Productivity & Activity Score (`commits × 1 + 30d_contrib × 2 + streak × 1`).
- `OCS`: Open-Source Collaboration Score (`PRs + reviews`).
- `PIS`: Project Impact Score (`stars + forks`).
- `CIS`: Code Integrity Score (`cleanliness + anti-cheat audit`).
- `SDS`: Skill Diversity Score (`languages + stack breadth`).
- `₹5,000`: Primary tier currency standard for Indian SaaS startup presentation.

---

## 9. Layout Grids & Spacing System

- **Base Unit:** 4px / 8px grid system (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`).
- **Sidebar Navigation:** Fixed `260px` width on desktop; collapses with full backdrop-filter blur on mobile.
- **Max Content Widths:**
  - Application Content: `1200px` (or full width minus sidebar).
  - Marketing Landing Hero: `960px` max reading column.
  - Modals & Dialogs: `500px` (Config) / `840px` (Code Inspector).

---

## 10. Design Checklist for Future Modules

Before releasing any new page or widget in GitTracker, ensure it passes this checklist:
- [ ] Is the page styled with the **Aether Glass** palette (`--surface`, `--primary`, `--glass-bg`)?
- [ ] Are numbers, metrics, and code formatted in **JetBrains Mono**?
- [ ] Are all badges, overlines, and table headers using **Space Grotesk** in uppercase?
- [ ] Are interactive elements equipped with smooth transitions (`--transition-normal` / 0.2s)?
- [ ] Does the screen look balanced and readable with the floating **Cosmic Background** enabled?
- [ ] Are all pricing notations displayed in **₹5,000** format where appropriate?
- [ ] Does any code scanning feature link seamlessly to the **Codequiry API** paradigm?
