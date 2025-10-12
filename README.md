# Coinwise (Alpha)

Coinwise is a modern, lightweight personal finance tracker built with React, TypeScript, Vite, Tailwind CSS, Chart.js, and Supabase. This alpha release focuses on the core experience: viewing balances, adding transactions, and basic insights.

Status: Alpha — features and UI are still evolving. Expect frequent changes and occasional breaking updates.

## Highlights

- Auth with Supabase (email/password)
- Dashboard with total, income, expenses, savings cards
- Add transactions (income, expense) and savings operations (deposit/withdraw)
- Quick transfer between main and savings
- Basic charts (account trend, income vs expense)
- Responsive layout with a sidebar navigation

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Supabase (Auth + Postgres)
- Chart.js + react-chartjs-2

## Getting Started

Prerequisites:
- Node.js 18+ and npm
- A Supabase project (URL + anon key)

1) Clone and install

```
git clone <your-fork-or-repo-url>
cd Coinwise
npm install
```

2) Configure environment

Currently, Supabase URL and anon key are referenced in `src/client.ts`. For alpha, they may be inlined. For your own project, set environment variables and load them in `client.ts` (recommended):

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Example `src/client.ts` usage (recommended approach):

```
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
export const supabase = createClient(supabaseUrl, supabaseKey)
```

3) Run locally

```
npm run dev
```

App runs with Vite (hot reload). Open the printed URL (usually http://localhost:5173).

## Scripts

- dev: start Vite dev server
- build: type-check then build for production
- preview: locally preview the production build
- lint: run ESLint

## Routing

- /home — Landing page
- /login — Sign in
- /signup — Create account
- /dashboard — Main overview + charts
- /transactions — Transactions list + add popup
- /settings — Account settings

## Data Model (Alpha)

Tables used (names may evolve):
- users: { id, username, is_deleted, deleted_at }
- Balances: { user_id, total, income, expenses }
- Transactions: { user_id, name, amount, type, date, note, created_at }

Minimal seed/checks are performed at runtime. Some flows upsert Balances per user.

## Deployment

Vercel recommended for hosting:
- Vite build output in `dist/`
- Set env vars (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- Optional: configure SPA fallback (Vercel handles React Router by default)

## Known Limitations (Alpha)

- Some UI is still being standardized (colors/gradients) during alpha.
- No comprehensive input validation yet.
- Errors are displayed via alerts in some places.
- Real-time updates are simulated via polling in Transactions.
- Supabase keys may be inlined in `src/client.ts` — replace with env vars for production.

## Contributing (Alpha)

Open an issue or PR with clear reproduction steps. Keep changes small and focused. For new features, please include a brief proposal.

## License

MIT
