# GitHub Analytics Dashboard

Interactive dashboard for analyzing GitHub profiles with detailed metrics, activity charts, user comparison, and AI-powered insights using Google Gemini.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Usage](#usage)
- [API and Rate Limiting](#api-and-rate-limiting)
- [Data Export](#data-export)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

---

## Features

### User Search and Profile
- **Real-time search**: Find any GitHub user by username with instant validation
- **Detailed profile**: View complete user information including name, bio, location, company, website, registration date, and more
- **User card**: Attractive visual component with avatar, key statistics, and GitHub profile link

### Metrics and Statistics
- **Core metrics**: Followers, following, public repositories, and total stars displayed in intuitive cards
- **Top repositories**: Ranking of user's most-starred repositories in bar chart format
- **Language distribution**: Programming language usage percentage in interactive donut/pie chart
- **Advanced statistics**: Expanded container with language statistics, global user position, and trends
- **Trending languages**: Global ranking of most popular languages with updated data
- **Global language chart**: Visual comparison of language distribution across GitHub worldwide
- **Language growth chart**: Timeline showing user's language usage evolution
- **Global user position**: Comparative ranking against global averages

### Visualizations and Charts
- **Language chart**: Percentage distribution of programming languages used by user (donut chart)
- **Top repositories**: Visual list of most popular repositories with star bars
- **Weekday activity**: Statistical analysis of user activity organized by day of week
- **Contribution heatmap**: Annual GitHub-style heat map of user contributions
- **Activity timeline**: Interactive timeline with recent events (pushes, PRs, issues, releases) and milestones
- **Language growth chart**: Timeline showing language usage evolution
- **Global language chart**: Comparison of most-used languages on GitHub worldwide

### Comparison Mode (VS)
- **Side-by-side comparison**: Compare two GitHub users simultaneously in split view
- **Radar chart**: Comparative visualization of key metrics between two users
- **Head-to-head table**: Comparative table with statistics side-by-side for quick analysis
- **Winner/loser cards**: Visually identify which user performs better in each metric
- **Share comparison**: Generate direct link with `?u1=user1&u2=user2&mode=vs` for sharing
- **Common and unique languages**: Display languages shared and exclusive to each user
- **URL navigation**: Activate VS mode directly with `?mode=vs` in URL

### AI-Powered Insights
- **Profile analysis with Gemini**: Automatically generates GitHub profile analysis using Google Gemini 2.5 Flash
- **Strength analysis**: Identifies coding patterns, dominant technologies, and development style
- **Improvement areas**: Intelligent suggestions for professional growth based on profile
- **Unique value**: Highlights what makes the developer special in the ecosystem
- **Personalized recommendations**: Concrete actions to improve profile
- **Job market perspectives**: Evaluates developer employability based on public profile
- **Salary estimations**: Estimated salary ranges for Entry, Mid, and Senior levels in US market
- **In-demand skills**: Identifies sought-after technologies matching the profile
- **Skills gap detection**: Flags missing skills that could increase developer value
- **Employability gauge**: Circular visual indicator with 0-100 score and color-coded levels
- **24-hour cache**: AI results stored in `localStorage` to avoid redundant calls
- **Bilingual support**: Analysis generated in selected language (ES/EN)

### User Experience
- **Dark/Light mode**: Dual theme with full support and persistence in `localStorage`
- **Multilingual**: Integrated support for Spanish and English with language selector
- **Responsive design**: Fluidly adapts to desktop, tablet, and mobile devices
- **Navigation sidebar**: Collapsible sidebar with navigation between sections (Overview, Repos, Activity, Languages, AI)
- **Material Design 3 animations**: Smooth transitions with MD3 design and blur effects
- **Modal dialogs**: Dialog interface for About and Contact sections
- **Glassmorphism UI**: Modern design with translucent glass effects and gradients

### Data Export
- **Export to PDF**: Generate professional reports in PDF with tables and charts
- **Export to CSV**: Export tabular data in CSV format compatible with Excel/Google Sheets
- **Export to JSON**: Export complete data in JSON format for further processing
- **Export buttons**: Quick access from Overview view for each format
- **Export progress**: Visual indicator of file generation progress

### Rate Limit Tracking
- **Real-time monitoring**: Floating widget in bottom-right corner showing current GitHub API status
- **Limit alerts**: Notifications when approaching request limit (warning, critical, danger)
- **Countdown timer**: Timer for request limit reset
- **Usage history**: Graph of API consumption over 24 hours
- **Circular gauge**: Visual indicator of remaining usage percentage
- **No token required**: Works even without GitHub token (reads `/rate_limit` endpoint)

---

## Installation

### Prerequisites

Before starting, ensure you have installed:

- **Node.js** version 18 or higher ([Download](https://nodejs.org/))
- **npm** version 9 or higher (included with Node.js) or **pnpm/yarn**

### Installation Steps

#### 1. Clone the repository

```bash
git clone https://github.com/RobertoCV10/GitScope.git
cd GitScope
```

#### 2. Install dependencies

```bash
npm install
```

Or if you prefer **pnpm** or **yarn**:
```bash
pnpm install
# or
yarn install
```

#### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# Personal GitHub token (optional but highly recommended)
# Get one at: https://github.com/settings/personal-access-tokens
VITE_GITHUB_TOKEN=ghp_your_personal_token_here

# GitHub API base URL (no need to change)
VITE_API_URL=https://api.github.com

# Google Gemini API Key (optional - for AI features)
# Get one at: https://aistudio.google.com/apikey
# VITE_GEMINI_API_KEY=AIza_your_api_key_here
```

**Important**: Without a personal token, GitHub API limits you to 60 requests/hour. With a token, the limit increases to 5,000 requests/hour.

#### 4. Start the development server

```bash
npm run dev
```

#### 5. Open in your browser

Navigate to [http://localhost:5173](http://localhost:5173) to see the application.

---

## Configuration

### Environment Variables

All environment variables start with `VITE_` and are defined in `.env`:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_GITHUB_TOKEN` | Personal GitHub API access token | _(empty - anonymous rate limit)_ | No (recommended) |
| `VITE_API_URL` | GitHub API base URL | `https://api.github.com` | No |
| `VITE_GEMINI_API_KEY` | Google Gemini API Key for AI Insights | _(empty - AI disabled)_ | No (recommended) |

**Security Note**: Never expose your tokens in public repositories. The `.env` file is already included in `.gitignore` by default.

### Customization

| Area | File | Description |
|------|------|-------------|
| **Theme/Tailwind** | `tailwind.config.js` | Change MD3 colors, fonts, breakpoints, and dark mode config |
| **Translations** | `src/utils/translations.js` | Add new languages or modify existing texts (ES/EN) |
| **Icons** | `src/utils/icons.js` | Icon catalog using `@iconify/react` with Material Design Icons |
| **CSS Styles** | `src/index.css` | Global styles, animations, MD3 variables, and Tailwind base config |
| **Build/Vite** | `vite.config.js` | Development server, build, and code splitting configuration |
| **Gemini Service** | `src/services/geminiService.js` | Adjust AI prompts, model, or analysis behavior |
| **AI Utilities** | `src/utils/aiUtils.js` | Configure employability levels, colors, and insight formatting |

### Material Design 3 (MD3) Theme

The application uses **Material Design 3** with `class` mode for dark mode. MD3 color system is defined through CSS variables with values for both light and dark themes:

```js
document.documentElement.classList.add('dark');   // Dark mode
document.documentElement.classList.remove('dark'); // Light mode
```

Main MD3 colors:
| Variable | Light | Dark |
|----------|-------|------|
| `--md-background` | `#FFFBFE` | `#1C1B1F` |
| `--md-primary` | `#6750A4` | `#D0BCFF` |
| `--md-surface-container` | `#F3EDF7` | `#2B2930` |
| `--md-error` | `#B3261E` | `#F2B8B5` |

---

## Project Structure

```
GitScope/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ai/
│   │   │   ├── AIInsightsPanel.jsx
│   │   │   ├── ProfileAnalysisCard.jsx
│   │   │   ├── JobMarketCard.jsx
│   │   │   ├── AILoadingState.jsx
│   │   │   └── AIErrorState.jsx
│   │   ├── charts/
│   │   │   ├── LanguagesChart.jsx
│   │   │   ├── GlobalLanguagesChart.jsx
│   │   │   ├── TopReposChart.jsx
│   │   │   ├── WeekdayActivity.jsx
│   │   │   └── ContributionsHeatmap.jsx
│   │   ├── common/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   └── Dialog.jsx
│   │   ├── comparison/
│   │   │   ├── VsContainer.jsx
│   │   │   ├── VsSearchBar.jsx
│   │   │   ├── VsUserCard.jsx
│   │   │   ├── VsRadarChart.jsx
│   │   │   ├── VsHead2Head.jsx
│   │   │   └── VsMetricsTable.jsx
│   │   ├── export/
│   │   │   ├── ExportPanel.jsx
│   │   │   ├── ExportButton.jsx
│   │   │   └── ExportProgress.jsx
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TopBar.jsx
│   │   ├── rateLimit/
│   │   │   ├── RateLimitTracker.jsx
│   │   │   ├── RateLimitStatus.jsx
│   │   │   ├── RateLimitGauge.jsx
│   │   │   ├── RateLimitChart.jsx
│   │   │   ├── RateLimitCountdown.jsx
│   │   │   └── RateLimitAlert.jsx
│   │   ├── stats/
│   │   │   ├── ActivityTimeline.jsx
│   │   │   ├── LanguagesStatsContainer.jsx
│   │   │   ├── LanguageCard.jsx
│   │   │   ├── LanguageComparison.jsx
│   │   │   ├── LanguageGrowthChart.jsx
│   │   │   ├── TrendingLanguages.jsx
│   │   │   └── UserLanguagePosition.jsx
│   │   └── user/
│   │       └── UserCard.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── OverviewPage.jsx
│   │   ├── ReposPage.jsx
│   │   ├── ActivityPage.jsx
│   │   ├── LanguagesPage.jsx
│   │   ├── AIPage.jsx
│   │   ├── VsPage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ContactPage.jsx
│   ├── hooks/
│   │   ├── useGitHubUser.js
│   │   ├── useGitHubRepos.js
│   │   ├── useAnalytics.js
│   │   ├── useRateLimit.js
│   │   ├── useRateLimitHistory.js
│   │   ├── useExport.js
│   │   ├── useLanguage.jsx
│   │   ├── useActivityTimeline.js
│   │   ├── useContributionsHeatmap.js
│   │   ├── useVsComparison.js
│   │   ├── useLanguageTrends.js
│   │   ├── useLanguagesStats.js
│   │   ├── useUserLanguagePosition.js
│   │   └── useGeminiAI.js
│   ├── services/
│   │   ├── githubApi.js
│   │   ├── geminiService.js
│   │   ├── languagesStatsService.js
│   │   └── rateLimitService.js
│   ├── utils/
│   │   ├── translations.js
│   │   ├── icons.js
│   │   ├── aiUtils.js
│   │   ├── csvExport.js
│   │   ├── jsonExport.js
│   │   ├── pdfExport.js
│   │   ├── exportUtils.js
│   │   ├── analytics.js
│   │   ├── comparisonUtils.js
│   │   ├── heatmapUtils.js
│   │   ├── timelineUtils.js
│   │   ├── languagesStatsUtils.js
│   │   ├── rateLimitUtils.js
│   │   └── security.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

## Technologies

### Frontend

| Technology | Version | Description |
|-----------|---------|-------------|
| React | 18.2 | JavaScript library for building user interfaces |
| Vite | 5.0 | Fast, modern build tool with HMR |
| Tailwind CSS | 3.4 | Utility-first CSS framework with Material Design 3 |

### Main Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| React | 18.2.0 | Main UI framework |
| React DOM | 18.2.0 | DOM rendering |
| Recharts | 2.10.3 | Declarative charting library |
| Axios | 1.16.0 | HTTP client for GitHub API |
| @google/generative-ai | 0.24.1 | Google Gemini SDK (AI Insights) |
| @iconify/react | 6.0.2 | Icon library (Material Design Icons) |
| jsPDF | 2.5.1 | PDF document generation |
| jsPDF-AutoTable | 3.8.1 | PDF table generation |
| PapaParse | 5.5.3 | CSV file parser |

### Development Tools

- **ESLint** 8.55.x — JavaScript/JSX linter with React, Hooks, and Refresh plugins
- **PostCSS** 8.4.x — CSS processing with Autoprefixer
- **Vite** 5.0.x — Development server and build tool
- **@vitejs/plugin-react** 4.2.x — React plugin for Vite with Fast Refresh

---

## Usage

### Basic Navigation

1. **Home**: When opening the app, you'll see the user search with quick examples (octocat, facebook, google)
2. **Search**: Enter any GitHub username and press Enter
3. **Sidebar**: Once a profile loads, use the sidebar to navigate sections:
   - Overview: Profile summary with key metrics and export buttons
   - Repos: Repositories, languages, and top repos
   - Activity: Contribution heatmap, weekly activity, and timeline
   - Languages: Global statistics, trends, and user position
   - AI Insights: Profile analysis and job market perspectives
4. **Export**: From Overview, use CSV, JSON, or PDF buttons to export data
5. **VS Mode**: Activate comparison mode from the toggle in the top bar

### Comparison Mode (VS)

1. Click the VS button in the top bar
2. Search for the first user in the left search bar
3. Search for the second user in the right search bar
4. Explore winner/loser cards, radar chart, common languages, and comparison table
5. Share the comparison using the link button (generates URL with `?u1=user1&u2=user2&mode=vs`)
6. Return to single mode by clicking the Single button

### AI-Powered Insights

1. Navigate to AI Insights section from the sidebar
2. Profile Analysis will load automatically with strengths, improvement areas, and recommendations
3. Switch to Job Market tab to see salary estimations and market demand
4. If no API Key is configured, you'll see a pending configuration message
5. Results are cached for 24 hours in `localStorage`

### Tips and Shortcuts

- **Suggested users**: On the home screen, try octocat, facebook, or google
- **Theme toggle**: Use the sun/moon button in the top bar
- **Language selector**: Use the language selector (ES/EN) next to VS toggle
- **Direct VS URL**: Add `?mode=vs` to URL to open directly in comparison mode
- **Pre-loaded comparison**: Use `?u1=user1&u2=user2&mode=vs` to preload comparison
- **Collapsible sidebar**: Click the sidebar arrows to expand/collapse
- **About/Contact**: Access from buttons in top bar (opens as modal dialog)

---

## API and Rate Limiting

### Authentication

The application connects directly to the [GitHub REST API](https://docs.github.com/en/rest).

| Mode | Rate Limit | Requires Token |
|------|-----------|----------------|
| Without token | 60 requests/hour | No |
| With token | 5,000 requests/hour | Yes |

**Recommendation**: Generate a [Personal Access Token](https://github.com/settings/personal-access-tokens) (with `public_repo` permissions) and configure it in `.env` to avoid the 60 request/hour limit.

### Rate Limit Widget

A floating widget in the bottom-right corner shows:

- **Current status**: Current request limit (Healthy, Warning, Critical, Danger)
- **Usage**: Requests consumed from total available
- **Reset**: Countdown timer for limit reset
- **History**: Graph of recent API consumption (24h)
- **Circular gauge**: Visual indicator of remaining percentage

### Used Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /users/{username}` | User profile |
| `GET /users/{username}/repos` | List of public repositories (auto-paginated, 100/page) |
| `GET /repos/{owner}/{repo}/events` | Repository events |
| `GET /rate_limit` | Current rate limit status |

### localStorage Cache

| Type | Duration | Prefix | Max Entries |
|------|----------|--------|-------------|
| API cache (users, repos, events) | 5 minutes | `user_`, `repos_`, `events_` | 50 per prefix |
| Language stats | 24 hours | `langstats_` | 20 entries |
| AI Insights (Gemini) | 24 hours | `ai_` | 30 entries |

---

## Data Export

Export buttons are available in the **Overview** view to download analyzed user data in three formats:

| Format | Description | Library |
|--------|-------------|---------|
| PDF | Complete report with tables, charts, and professional design | jsPDF + AutoTable |
| CSV | Tabular data of repositories and metrics | PapaParse |
| JSON | Complete data structure in JSON format | Native |

### Included in Export

- User profile information (name, bio, followers, etc.)
- Repository list with stars, forks, and language
- Activity statistics
- Language distribution
- Last export record with type and size

---

## Testing

Currently the project does not have a test suite configured. Future improvements should include:
- **Vitest** or **Jest** for unit tests
- **Testing Library** for React component tests
- **Cypress** or **Playwright** for E2E tests

To check code quality, run the linter:

```bash
npm run lint
```

To auto-fix linting errors:

```bash
npm run lint:fix
```

**Zero warnings policy**: `npm run lint` fails with exit code 1 if there are any ESLint warnings.

---

## Contributing

Contributions are welcome!

### How to Contribute

1. **Fork** the repository
2. **Create a branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/new-feature
   # or
   git checkout -b fix/reported-bug
   ```
3. **Make changes** with descriptive commits:
   ```bash
   git commit -m 'feat: add new language metrics'
   # or
   git commit -m 'fix: correct weekly activity calculation'
   ```
4. **Push your branch**:
   ```bash
   git push origin feature/new-feature
   ```
5. **Open a Pull Request** with a clear description of the change

### Guidelines and Conventions

- Use **ESLint** to keep code clean and consistent (`npm run lint`)
- Follow [React Hooks conventions](https://react.dev/reference/rules/rules-of-hooks)
- Write **descriptive commits** following [Conventional Commits](https://www.conventionalcommits.org/)
- UI text is in Spanish and English (managed by `translations.js`)
- Ensure `npm run lint` shows no errors before opening PR
- New features should include at least basic error validation
- Components follow subcategory structure (`ai/`, `charts/`, `common/`, `comparison/`, `export/`, `layout/`, `rateLimit/`, `stats/`, `user/`)
- Use `sanitizeSearchInput`, `escapeHtml`, and `normalizeUrl` from `src/utils/security.js` for user input handling
- For new AI features, use `useGeminiAI` hook and add translation keys with `ai` prefix

### Issues and Suggestions

- Use [GitHub Issues](https://github.com/RobertoCV10/GitScope/issues) to report bugs or suggest improvements
- Before implementing a large feature, open an issue to discuss the design

---

## Security

### Credentials

- The `.env` file contains **sensitive access tokens** (GitHub PAT and Gemini API Key). **Never share or upload them to public repositories**
- The `.gitignore` already excludes `.env`, but verify before pushing:

```bash
git status --short | grep .env
```

If you accidentally committed a token:
1. **Immediately rotate the token** from [GitHub Settings → Tokens](https://github.com/settings/tokens) or [Google AI Studio](https://aistudio.google.com/apikey)
2. Consider using [git filter-branch](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) or [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to remove it from history

### Dependencies

Keep dependencies updated and periodically review [GitHub Security Advisories](https://github.com/advisories).

### XSS Protection

The `src/utils/security.js` module includes sanitization utilities:

- **sanitizeSearchInput**: Validates and cleans user search input (regex: alphanumeric + hyphens, max 39 characters)
- **escapeHtml**: Escapes HTML characters to prevent XSS injection
- **normalizeUrl**: Normalizes external URLs and rejects dangerous protocols (javascript:, data:, vbscript:)
- **isSafeUrl**: Validates that a URL only uses http or https protocols

### AI Insights Privacy

- When using AI Insights, GitHub profile data is sent to Google Gemini for processing
- The application displays a privacy notice in the AI Insights panel
- No user data is stored on external servers (only local cache in browser)
- AI results are cached locally for 24 hours

---

## License

This project is under the **MIT** license. This means you can use, modify, and distribute it freely for both personal and commercial purposes.

See the complete license file at: [LICENSE](LICENSE)

---

## Acknowledgments

- [GitHub REST API](https://docs.github.com/en/rest) — For providing a robust and well-documented API
- [Google Gemini](https://deepmind.google/technologies/gemini/) — For the generative AI API powering insights
- [React](https://react.dev/) — For the exceptional ecosystem and documentation
- [Vite](https://vitejs.dev/) — For excellent development experience and ultra-fast builds
- [Tailwind CSS](https://tailwindcss.com/) — For the utility-first approach that accelerates development
- [Recharts](https://recharts.org/) — For beautiful and easy-to-integrate charts
- [Iconify](https://iconify.design/) — For the icon library with Material Design Icons
- [jsPDF](https://parall.ax/products/jspdf) + [AutoTable](https://github.com/simonbengtsson/jspdf-autotable) — For browser PDF generation
- [PapaParse](https://www.papaparse.com/) — For efficient CSV parsing

---

## Roadmap

### Coming Soon

- Tests with Vitest + Testing Library
- E2E tests with Playwright/Cypress
- Search results pagination
- Organization support (in addition to users)
- Multi-user comparison (VS mode for 3+ users)
- GitHub GraphQL API support (richer data)

### Future Improvements

- Detailed contribution view per repository
- User-customizable themes (dynamic MD3 colors)
- Markdown export format
- Complete internationalization (more languages)
- Progressive Web App (PWA) with service worker
- Local search history
- Offline mode with Service Workers
- Continuous integration with GitHub Actions
- Cache management dashboard
- More AI visualization modes (profile comparison with AI)

---

## Contact

Questions, suggestions, or want to collaborate?

- GitHub: [@RobertoCV10](https://github.com/RobertoCV10)
- LinkedIn: [Roberto Coria Vargas](https://www.linkedin.com/in/roberto-coria-vargas-088231309/)
- Portfolio: [portfolio-rcv.vercel.app](https://portfolio-rcv.vercel.app/)
- Email: [roberto21.coria02@gmail.com](mailto:roberto21.coria02@gmail.com)
- Issues: [GitScope/issues](https://github.com/RobertoCV10/GitScope/issues)

---

Made with care for the developer community.

[Star](https://github.com/RobertoCV10/GitScope/stargazers) · [Fork](https://github.com/RobertoCV10/GitScope/forking) · [Report Issue](https://github.com/RobertoCV10/GitScope/issues)

---

**Note**: This README is kept up to date with the current project structure. If you find discrepancies, please open an issue.