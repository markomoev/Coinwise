# Coinwise — Alpha 1.0

Coinwise is a modern, lightweight personal finance tracker built with React, TypeScript, Vite, Tailwind CSS, Chart.js, and Supabase.

Status: Alpha 1.0 — active development; features and UI are evolving. Expect frequent changes and occasional breaking updates.

## What’s new in Alpha 1.0

- Authentication with Supabase (email/password)
- Dashboard overview with cards: Total, Income, Expenses, Savings
- Add transactions (income/expense) and savings operations (deposit/withdraw)
- Quick transfer between main account and savings
- Charts: Account Trend, Income vs Expense, and breakdown visuals
- Responsive UI with a sidebar, mobile overlay, and route-aware highlighting
- Basic account settings

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

```powershell
git clone <your-fork-or-repo-url>
cd Coinwise
npm install
```

2) Configure environment

For Alpha, `src/client.ts` may include inlined Supabase credentials. For your own deployments, use environment variables via Vite.

Create a `.env.local` file at the project root (not committed):

```dotenv
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Then in `src/client.ts` reference them (recommended):

```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
export const supabase = createClient(supabaseUrl, supabaseKey)
```

3) Run locally

```powershell
npm run dev
```

Vite will print a local URL (usually http://localhost:5173).

## Scripts

- dev: start Vite dev server
- build: type-check then build for production
- preview: preview the production build locally
- lint: run ESLint

## Routing

- /home — Landing page
- /login — Sign in
- /signup — Create account
- /dashboard — Overview + charts
- /transactions — Transactions list + add popup
- /settings — Account settings

## Data Model (Alpha)

Tables used (names may evolve):
- users: { id, username, is_deleted, deleted_at }
- Balances: { user_id, total, income, expenses }
- Transactions: { user_id, name, amount, type, date, note, created_at }

Minimal seed/checks may occur at runtime (e.g., upserting balances per user).

## Deployment

Vercel is recommended:
- Build output in `dist/`
- Set env vars (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- SPA routing: Vercel handles React Router fallback by default

## Security Notes

- Do not expose service (admin) keys in the client. Only use the public anon key in browser apps.
- Prefer environment variables over inlined keys for production.

## Known Issues (Alpha)

- Some UI is still being standardized (colors/gradients).
- Limited input validation.
- Errors may be surfaced via simple alerts.
- Real-time updates are limited; some lists rely on re-fetch/polling.
- Inlined Supabase keys in `src/client.ts` (alpha convenience) — replace with env vars for production.

## Roadmap (Next)

- Transaction editing and categorization
- More robust validation and error handling
- Improved charts and filtering
- Tests and accessibility improvements

## Contributing

Open an issue or PR with clear reproduction steps. Keep changes small and focused. For new features, include a brief proposal.

## License

MIT
