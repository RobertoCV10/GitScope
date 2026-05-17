# AGENTS.md — GitHub Analytics Dashboard

> Context for AI coding agents working on this repo. **Updated 2026-05-16**.

## ⚠️ Security — Read First

- **`.env` contains LIVE tokens** — Both a GitHub PAT (`ghp_en4EJL8P...`) and a Gemini API key (`AIzaSyD7bOuFEW...`) are present. **Rotate them immediately** at https://github.com/settings/tokens and https://aistudio.google.com/apikey. Both are in `.gitignore`.
- Never commit `.env` or any file containing tokens.
- The app has `src/utils/security.js` with `sanitizeSearchInput`, `escapeHtml`, `normalizeUrl` — use these for any new user-input handling.

## Quick Start

```bash
npm install
npm run dev          # Vite dev server → http://localhost:5173
npm run build        # outputs to dist/
npm run preview      # serve dist/ locally
npm run lint         # ESLint — zero warnings enforced (exit code 1 on any warning)
npm run lint:fix     # auto-fix
```

## Architecture Summary

React 18.2 + Vite 5 SPA. Internal page routing (no React Router). All visualizations use **Recharts**. HTTP client is **Axios** (configured in `src/services/githubApi.js`). Icons via **@iconify/react** (Material Design Icons).

```
src/
├── App.jsx                             # Main orchestrator: mode (single/vs), page routing, theme, search
├── main.jsx                             # Entry point (React 18 StrictMode)
├── index.css                            # Global styles, Tailwind base, MD3 CSS variables, custom animations
├── pages/                               # Internal page routing (no React Router)
│   ├── HomePage.jsx                     # Landing page with search bar + example users
│   ├── OverviewPage.jsx                 # Profile summary, key metrics, export buttons
│   ├── ReposPage.jsx                    # Languages chart + Top repos
│   ├── ActivityPage.jsx                 # Heatmap, weekday activity, timeline
│   ├── LanguagesPage.jsx                # Global language stats + user position
│   ├── AIPage.jsx                       # AI-powered insights (Gemini)
│   ├── VsPage.jsx                       # VS comparison mode (head-to-head)
│   ├── AboutPage.jsx                    # App info (shown in Dialog modal)
│   └── ContactPage.jsx                  # Contact channels (shown in Dialog modal)
├── components/                          # Organized by feature, NOT flat
│   ├── common/                          # Shared: SearchBar, LoadingSpinner, LanguageSelector, Dialog
│   ├── user/                            # UserCard
│   ├── layout/                          # AppLayout, Sidebar (collapsible), TopBar
│   ├── charts/                          # LanguagesChart, GlobalLanguagesChart, TopReposChart,
│   │                                      WeekdayActivity, ContributionsHeatmap
│   ├── stats/                           # ActivityTimeline, LanguagesStatsContainer,
│   │                                      LanguageCard, LanguageComparison, LanguageGrowthChart,
│   │                                      TrendingLanguages, UserLanguagePosition
│   ├── comparison/                      # VsContainer, VsSearchBar, VsUserCard, VsRadarChart,
│   │                                      VsHead2Head, VsMetricsTable
│   ├── ai/                              # AIInsightsPanel, ProfileAnalysisCard, JobMarketCard,
│   │                                      AILoadingState, AIErrorState
│   ├── export/                          # ExportPanel, ExportButton, ExportProgress
│   └── rateLimit/                       # RateLimitTracker + Status/Gauge/Chart/Countdown/Alert
├── hooks/                               # All custom hooks (useXxx.js or useXxx.jsx)
├── services/
│   ├── githubApi.js                     # Axios client, all GitHub API calls, localStorage cache
│   ├── geminiService.js                 # Google Gemini client, all prompts, JSON parsing
│   ├── languagesStatsService.js         # Global language stats — uses MOCK data, not real API
│   └── rateLimitService.js              # /rate_limit endpoint client
└── utils/
    ├── translations.js                  # ES/EN i18n strings (535+ entries, add new languages here)
    ├── icons.js                         # Icon catalog using @iconify/react (Material Design Icons)
    ├── security.js                      # Input validation, XSS prevention, URL sanitization
    ├── csvExport.js / jsonExport.js / pdfExport.js
    ├── exportUtils.js                   # Shared export helpers
    ├── analytics.js / comparisonUtils.js / heatmapUtils.js / timelineUtils.js
    ├── languagesStatsUtils.js           # Color map + formatters for language stats
    ├── aiUtils.js                       # Formatting helpers, score levels, color mapping
    └── rateLimitUtils.js
```

## Key Gotchas an Agent Will Likely Miss

### 1. Duplicate entry point removed
The old `src/index.js` (identical to `main.jsx`) has been **deleted**. Only `src/main.jsx` is the entry point now.

### 2. localStorage caching — three different TTLs
- **API cache** (`githubApi.js`): **5 minutes** (`CACHE_DURATION`), keys prefixed `user_`, `repos_`, `events_`, max 50 entries per prefix.
- **Language stats cache** (`languagesStatsService.js`): **24 hours**, keys prefixed `langstats_`, max 20 entries.
- **AI cache** (`useGeminiAI.js`): **24 hours**, keys prefixed `ai_`, max 30 entries. Key format: `ai_profile_{username}_{language}` and `ai_jobmarket_{username}_{language}`.
- Cache **is shared across browser tabs** (both use `localStorage`).

### 3. Language stats are MOCK data
`languagesStatsService.js` does NOT call the GitHub API for global language stats. It returns hardcoded `GLOBAL_LANGUAGES_DATA` with simulated growth rates. It has `fetchLanguageSearchData()` that does hit `/search/repositories`, but this is optional enrichment. An agent trying to "fix" the data source should know this is intentional.

### 4. Username validation
`githubApi.js` enforces GitHub's username rules via regex: starts with alphanumeric, hyphens allowed mid-name, max 39 chars. Do not relax this.

### 5. Auto-pagination
`getAllUserRepos()` in `githubApi.js` loops fetching 100 repos/page until exhausted. This is correct behavior — do not "simplify" it to a single page fetch.

### 6. Theme defaults to dark
`localStorage('darkMode')` defaults to `true` (dark mode). The `dark` class strategy is set in `tailwind.config.js`. Toggled via `document.documentElement.classList.add/remove('dark')`.

### 7. URL params for VS mode
`?mode=vs` on page load activates comparison mode. Also supports `?u1=user1&u2=user2&mode=vs` for pre-loading a comparison. The URL is kept in sync via `window.history.replaceState` (not `pushState` — back button should not stack modes).

### 8. Code splitting chunks
`vite.config.js` manually defines 3 chunks:
- `vendor` → `['react', 'react-dom']`
- `charts` → `['recharts']`
- `export` → `['jspdf', 'jspdf-autotable']`

Do not remove `manualChunks` — it is intentional for load optimization.

### 9. Source maps disabled in production
`vite.config.js` has `sourcemap: false`. This is intentional for the public build.

### 10. No test framework
There are **zero test files**. No Vitest, Jest, Cypress, or Playwright. `npm run lint` is the only quality gate. If adding tests, Vitest + Testing Library is the recommended stack (noted in README).

### 11. `process.env` shim
`vite.config.js` defines `'process.env': {}` to prevent runtime errors if any code references `process.env` (Vite replaces `import.meta.env.VITE_*` at build time).

### 12. New components added in refactor
These did NOT exist before and are now integral:
- `GlobalLanguagesChart`, `TrendingLanguages`, `UserLanguagePosition`, `LanguageGrowthChart`, `LanguageComparison`, `LanguageCard`
- `ExportButton`, `ExportProgress`
- `VsSearchBar`

### 13. Sidebar + TopBar layout (page routing)
The app does NOT use React Router. Instead it uses an `activePage` state in `App.jsx` that controls which page component renders. Layout structure:

```
TopBar (sticky header)
  ├── Logo (dark/light variant)
  ├── Mode toggle (Single / VS)
  ├── LanguageSelector
  ├── Dark mode toggle
  └── About / Contact buttons (open Dialog modals)

Sidebar (collapsible, left side)
  ├── Collapsible width: 56px (collapsed) / 224px (expanded)
  ├── State persisted in localStorage('sidebarCollapsed')
  ├── Navigation items: Overview, Repos, Activity, Languages, AI
  └── "Clear Search" button at bottom

Page content (renders one of the 9 pages)
```

The old `contentView` state (`'dashboard'` | `'ai'`) mentioned in earlier versions was **replaced** by this full page routing system with sidebar navigation.

### 14. `@iconify/react` icon system
All icons use `@iconify/react` with Material Design Icons. The catalog is in `src/utils/icons.js` which exports:
- `Icon` component: `<Icon icon={I.overview} size="1.5em" />`
- `I` object: Named icon constants (`I.overview = "mdi:chart-bar"`, `I.repos = "mdi:folder"`, etc.)

There are **67 icon definitions** covering: nav items, export formats, AI features, social links, alerts, and UI controls. Always use this system — never embed raw SVG or emoji icons.

### 15. Dialog modal system
`AboutPage` and `ContactPage` are rendered inside a `Dialog` component (`src/components/common/Dialog.jsx`) triggered from TopBar buttons. The Dialog:
- Closes on `Escape` key or backdrop click
- Locks body scroll when open
- Has a sticky header with close button
- Uses `fixed` positioning with backdrop blur

Do NOT confuse these with page-level navigation — they are overlay modals.

### 16. App.jsx page routing logic
The page rendering flow in `App.jsx`:
1. **No user** → renders `HomePage` with search bar + example users
2. **Loading** → renders `OverviewPage` in loading/skeleton state
3. **Error** → renders error banner + `HomePage`
4. **Has user data** → switches between pages based on `activePage`:
   - `"overview"` → `OverviewPage` (user card, key metrics, export)
   - `"repos"` → `ReposPage` (languages chart, top repos)
   - `"activity"` → `ActivityPage` (heatmap, weekday, timeline)
   - `"languages"` → `LanguagesPage` (global lang stats)
   - `"ai"` → `AIPage` (Gemini-powered insights)
5. **VS mode** → renders `VsPage` standalone (no sidebar)

### 17. New hooks not in original docs
These hooks were added and are essential:

| Hook | File | Purpose |
|------|------|---------|
| `useAnalytics` | `hooks/useAnalytics.js` | Transforms repos/events into chart-ready data (languages, topRepos, activityTimeline, weekdayActivity, insights) |
| `useExport` | `hooks/useExport.js` | Orchestrates CSV/JSON/PDF export with dynamic imports, progress tracking, and last-export caching |
| `useActivityTimeline` | `hooks/useActivityTimeline.js` | Processes event data for timeline visualization |
| `useContributionsHeatmap` | `hooks/useContributionsHeatmap.js` | Processes event data for heatmap visualization |
| `useLanguageTrends` | `hooks/useLanguageTrends.js` | Fetches trending languages and growth data by period (30d/90d/365d) |
| `useLanguagesStats` | `hooks/useLanguagesStats.js` | Loads global language stats and categories from languagesStatsService |
| `useUserLanguagePosition` | `hooks/useUserLanguagePosition.js` | Calculates user's position/rank/insights against global language data |
| `useRateLimit` | `hooks/useRateLimit.js` | Polls `/rate_limit` endpoint periodically |
| `useRateLimitHistory` | `hooks/useRateLimitHistory.js` | Persists rate limit history in localStorage, 288 points max, 5-min intervals, 24h window |

### 18. Express lazy imports for export
`useExport.js` uses dynamic `import()` for all export modules (`csvExport.js`, `jsonExport.js`, `pdfExport.js`). This means the export code is code-split and only loaded when the user clicks an export button. Do NOT change these to static imports — it would defeat the manual chunking in `vite.config.js`.

### 19. Papaparse dependency
CSV export uses `papaparse` (v5.5.3), NOT a manual CSV builder. The `csvExport.js` utility depends on it. Do not replace with a custom implementation unless explicitly asked.

### 20. Sidebar intersection observer
`Sidebar.jsx` uses an `IntersectionObserver` on a sentinel element (`data-sidebar-sentinel`) to detect when the TopBar is scrolled off-screen. When the TopBar is out of view, the sidebar shows a decorative GIF in the header area. This is intentional for the scrolling UX.

### 21. Rate limit service is separate
`rateLimitService.js` creates its OWN Axios instance (separate from `githubApi.js`). It has a 10-second timeout and its own auth header. This is because the rate limit endpoint needs to work even when other API calls are failing. Do not merge it with `githubApi.js`.

---

### 13. AI-Powered Insights (Gemini Integration)

An AI insights layer using Google Gemini 2.5 Flash was added:

**Architecture:**
```
src/
├── services/
│   └── geminiService.js          # Gemini API client, all prompts, JSON parsing (455 lines)
├── utils/
│   └── aiUtils.js                # Formatting helpers, score levels, color mapping
├── hooks/
│   └── useGeminiAI.js            # State management, localStorage cache (24h), auto-fetch
└── components/
    └── ai/
        ├── AIInsightsPanel.jsx    # Main container with tabs (profile/job market)
        ├── ProfileAnalysisCard.jsx # Coding strengths, growth areas, recommendations
        ├── JobMarketCard.jsx      # Employability gauge, salary ranges, demand analysis
        ├── AILoadingState.jsx     # Skeleton loading with shimmer effect
        └── AIErrorState.jsx       # Error display with retry button
```

**Key gotchas for agents:**

1. **Requires VITE_GEMINI_API_KEY** — The `.env` file has a **live key** that should be rotated. Without it, the panel shows a configuration error message. Do NOT hardcode an API key.

2. **`@google/generative-ai` SDK** — Added as dependency. Uses `gemini-2.5-flash` model. Do not change to a different SDK or model name.

3. **AI cache has 24h TTL** — `useGeminiAI.js` caches results with prefix `ai_`, separate from the 5-min API cache. Cache key format: `ai_profile_{username}_{language}` and `ai_jobmarket_{username}_{language}`. The language is part of the key so switching languages triggers a new request. Max 30 entries.

4. **Auto-fetches with 500ms delay** — The hook waits 500ms after user data loads before calling Gemini, so other components render first. Do not remove this delay. Language changes also trigger a re-fetch.

5. **JSON-only prompt design** — All Gemini prompts request JSON output with specific keys. The service falls back to rule-based parsing (`parseProfileAnalysis` / `parseJobMarketInsights`) if JSON parsing fails. Temperature is set to **0.4** for consistent JSON formatting.

6. **Employability score gauge** — `JobMarketCard.jsx` renders an SVG circle gauge. The gauge arc is calculated via `strokeDasharray` math (`(score/100) * 339.292`). Do not simplify to a numeric display.

7. **Deduplication via ref** — `useGeminiAI.js` uses `fetchedRef.current` to prevent duplicate API calls for the same username. The dedup key includes the language (`profile_{username}_{language}`), so changing languages correctly triggers new requests. Reset logic is built into the user change effect.

8. **i18n keys prefixed `ai`** — All AI-related translation keys start with `ai` prefix (e.g., `aiProfileTitle`, `aiJobMarketSubtitle`). Both ES and EN translations are in `translations.js`.

9. **Language-aware prompts** — All Gemini prompts include a `## LANGUAGE INSTRUCTION` block that tells the model to respond in the user's selected language (English or Spanish). The instruction block is generated by `buildLanguageInstruction(language)`. JSON keys stay in English for parsing reliability, but ALL string values respect the user's language.

10. **Bilingual fallback defaults** — `getDefaultProfileAnalysis(language)` and `getDefaultJobMarketInsights(language)` return Spanish or English fallback values. Used when API fails or response is unparseable. The `parseProfileAnalysis` and `parseJobMarketInsights` helpers also try language-appropriate keywords (e.g., "fortalezas" in addition to "strengths").

11. **Graceful degradation** — If the API is unavailable, rate-limited, or returns unparseable data, the UI shows an error card with a retry button using default fallback data in the correct language.

12. **`canShowAIInsights` guard** — Defined in `aiUtils.js`. `AIInsightsPanel.jsx` checks `canShowAIInsights(user, repos)` and returns `null` if no user/repos data, preventing rendering in empty states.

13. **AI page routing** — AI insights are accessible via the **AI** navigation item in the sidebar (not a topbar tab). This triggers `activePage = "ai"` which renders `AIPage` → `AIInsightsPanel`. The "NEW" badge pattern was removed when the sidebar navigation replaced the old topbar tabs.

## Commands Reference

| Command | What it does |
|---------|-------------|
| `npm run dev` | Vite dev server on `:5173` with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally for testing |
| `npm run lint` | ESLint — **fails on any warning** (zero-warnings policy) |
| `npm run lint:fix` | Auto-fix ESLint issues |

## i18n Pattern

- Hook: `useLanguage()` returns `{ t, language, setLanguage }`.
- `t(key)` looks up in `src/utils/translations.js`, falls back to `es` then raw key.
- `setLanguage(lang)` switches language and persists to `localStorage('language')`.
- To add a language: add translations object in `translations.js`, update `getLanguage`/`setLanguage` if needed.
- `document.documentElement.lang` is kept in sync with the current language.

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `VITE_GITHUB_TOKEN` | _(empty)_ | PAT for 5000 req/hr (60/hr without it) |
| `VITE_API_URL` | `https://api.github.com` | GitHub API base URL |
| `VITE_GEMINI_API_KEY` | _(empty)_ | Google Gemini API key for AI insights |

All are accessed via `import.meta.env.VITE_*` (Vite-native, not `process.env`).

## Page Navigation Map

| Page | activePage | Description |
|------|-----------|-------------|
| Home | _(no user)_ | Landing screen with search bar, example users |
| Overview | `overview` | Profile summary, key metrics cards, export buttons |
| Repos | `repos` | Languages donut chart, top repos bar chart |
| Activity | `activity` | Contribution heatmap, weekday chart, event timeline |
| Languages | `languages` | Global lang stats, trends, user position, growth |
| AI Insights | `ai` | Gemini-powered profile analysis + job market |
| VS Mode | _(mode=vs)_ | Head-to-head comparison (standalone layout) |
