# GitTracker Documentation 📚

Welcome to the **GitTracker** project documentation. GitTracker is a developer contribution intelligence platform that tracks, scores, and visualizes developer GitHub activity transparently with built-in Anti-Cheat and Hackathon Management capabilities.

---

## 📑 Table of Contents
1. [System Architecture](#system-architecture)
2. [Core Features](#core-features)
   - [Anti-Cheat & Code Integrity Engine](#1-anti-cheat--code-integrity-engine)
   - [Hackathon Manager](#2-hackathon-manager)
   - [Transparent Scoring Formula](#3-transparent-scoring-formula)
   - [Interactive Dashboard & Leaderboard](#4-interactive-dashboard--leaderboard)
   - [Offline Demo Authentication & Admin Panel](#5-offline-demo-authentication--admin-panel)
3. [Project Directory Structure](#project-directory-structure)
4. [Getting Started & Local Development](#getting-started--local-development)
5. [Configuration & Environment Variables](#configuration--environment-variables)

---

## System Architecture

```
                 ┌────────────────────────────────────────┐
                 │       GitTracker Client (React + Vite) │
                 │      - Cosmic Dark Glassmorphism UI    │
                 │      - Offline Mock / Demo Mode        │
                 └──────────────┬─────────────────────────┘
                                │
        ┌───────────────────────┼────────────────────────┐
        ▼                       ▼                        ▼
┌──────────────┐      ┌────────────────────┐    ┌─────────────────┐
│ Codequiry    │      │  GitHub REST API   │    │ GitTracker API  │
│ API Engine   │      │ (Contents, Trees,  │    │ (Node + Express)│
│ (AST & AI)   │      │  Commit History)   │    │                 │
└──────────────┘      └────────────────────┘    └────────┬────────┘
                                                         │
                                        ┌────────────────┴────────┐
                                        ▼                         ▼
                                ┌──────────────┐          ┌──────────────┐
                                │ MongoDB      │          │ Redis Store  │
                                │ (Persistence)│          │ (Queues/TTL) │
                                └──────────────┘          └──────────────┘
```

---

## Core Features

### 1. Anti-Cheat & Code Integrity Engine
- **Live GitHub Repository Scanner**: Accepts repository URLs (e.g. `https://github.com/owner/repo.git`), queries the GitHub API, downloads source files, and measures actual lines of code (LOC).
- **Codequiry API Integration**: Evaluates abstract syntax trees (AST) and token entropy to compute:
  - **AI-Generated Probability (%)**: Detects code authored via ChatGPT, Claude, and GitHub Copilot.
  - **Plagiarism Rate (%)**: Cross-references against open-source public repositories.
  - **Organic Human Score (%)**: Measures genuine human developer iterations.
- **Annotated Code Inspector**: Interactive modal inspecting file lines with colored diagnostic banners.

### 2. Hackathon Manager
A centralized 9-module control grid for running hackathons:
1. **Customize Your Event**: Rules, themes, branding, schedule.
2. **Gather Registration**: Custom registration and team intake forms.
3. **Gather Ideas**: Idea submissions, upvoting, and curation.
4. **Form Teams**: Squad matching and open invitations.
5. **Enable Communication**: Announcements and mentor channels.
6. **Gather Feedback**: Post-event feedback and NPS collection.
7. **Involve Mentors**: Office hours and mentor allocations.
8. **Publish Results**: Winners, certificates, and highlights.
9. **Enable Leaderboard**: Live scoring and ranking during the event.

### 3. Transparent Scoring Formula
Tracks multi-factor productivity with time decay weighting:
- **PAS** (Productivity & Activity Score): Commits, streak consistency, 30-day activity.
- **OCS** (Open Source Collaboration Score): PRs merged, issue resolutions, code reviews.
- **PIS** (Project Impact Score): Star count, forks, repository adoption.
- **CIS** (Code Integrity Score): Code cleanliness, automated lint checks, anti-cheat validation.
- **SDS** (Skill Diversity Score): Multi-language proficiency and stack breadth.

### 4. Interactive Dashboard & Leaderboard
- Real-time tier badges: **Bronze**, **Silver**, **Gold**, **Platinum**, **Elite**.
- Dynamic tier filters, branch switching, and rank delta indicators.

### 5. Offline Demo Authentication & Admin Panel
- **Instant Demo Mode**: Fully functional client-side mock store that enables zero-backend presentations.
- **Default Credentials**: `admin@gmail.com` / `1211`
- **Admin Management Tabs**:
  - User Management (view, promote, edit, delete users).
  - Activity Audit Logs (real-time timestamped event stream).
  - Authority & Permissions Matrix.

---

## Project Directory Structure

```
Git-tracker/
├── frontend/                     # React + Vite application
│   ├── src/
│   │   ├── components/           # UI primitives (Sidebar, CosmicBackground, Avatar, etc.)
│   │   ├── context/              # AuthContext (offline demo state, user store)
│   │   ├── pages/
│   │   │   ├── AntiCheatPage.jsx # Codequiry AI & Plagiarism scanner
│   │   │   ├── DashboardPage.jsx # Contribution stats & charts
│   │   │   ├── HackathonPage.jsx # 9-module hackathon manager
│   │   │   ├── LandingPage.jsx   # Public SaaS startup landing page
│   │   │   ├── LeaderboardPage.jsx # Live ranked participant list
│   │   │   ├── LoginPage.jsx     # Email/password authentication
│   │   │   ├── ProfilePage.jsx   # Score explanation & details
│   │   │   └── SettingsPage.jsx  # Profile editing & Admin portal
│   │   ├── services/             # API client & backend integration
│   │   ├── App.jsx               # Route definitions
│   │   └── main.jsx              # Entry point
│   └── package.json
├── backend/                      # Node.js + Express backend service
│   ├── config/                   # Database & Redis configuration
│   ├── middleware/               # Auth & rate-limiting middleware
│   ├── models/                   # Mongoose data schemas
│   ├── queues/                   # BullMQ / In-memory sync queue
│   ├── routes/                   # REST API routes
│   └── server.js                 # Server entry point
├── documentation/                # Central documentation portal
└── implimentation,SRS,workflow/  # Initial requirements, checklists, and specs
```

---

## Getting Started & Local Development

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Frontend Setup (Demo / Offline Mode)
```bash
cd frontend
npm install
npm run dev
```
The application will launch at `http://localhost:5175/` (or `http://localhost:5173/`).

### Backend Setup (Optional Full-Stack Mode)
```bash
cd backend
npm install
npm run dev
```

---

## Configuration & Environment Variables

Create a `.env` file in `backend/` for live database and OAuth integration:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gittracker
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret_here
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
CODEQUIRY_API_KEY=your_codequiry_api_key
```

