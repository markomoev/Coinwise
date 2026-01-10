# Coinwise — Alpha 1.3

Coinwise is a modern, lightweight personal finance tracker built with React, TypeScript, Vite, Tailwind CSS, Chart.js, and Supabase.

Status: Alpha 1.3 — active development; features and UI are evolving. 

## What's new in Alpha 1.3

### Currency Conversion
- **Euro Display**: The dashboard now automatically displays all financial data in Euros (€).
- **Auto-Conversion**: Transactions and balances in BGN are automatically converted to EUR using live rates (or fixed peg).
- **Unified UI**: Updated all cards and transaction lists to use the Euro symbol and formatting.

## What's new in Alpha 1.2

### Monthly Chart Views
- **Focused Data**: Dashboard charts (Account Trend, Income vs Expense, Breakdown) now filter data to show only the current month.
- **Better Performance**: improved relevance for daily tracking.

### Bug Fixes
- **Transfer Popup**: Fixed a critical issue where the transfer form would reload the page before saving, preventing transfers from being recorded.

## Core Features (Alpha 1.1)

- Authentication with Supabase (email/password)
- Dashboard overview with cards: Total, Income, Expenses, Pocket Money, Savings
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

## Release: Alpha v1.2 — Chart Improvements & Bug Fixes

This release focuses on refining the dashboard charts for better usability and fixing a critical bug in the transfer functionality.

What's new
- **Monthly Chart View**: All dashboard charts (Account Trend, Income vs Expense, Breakdown) now default to showing data for the current month only, providing a more relevant day-to-day view.
- **Transfer Fix**: Resolved an issue where the transfer popup would reload the page immediately upon submission, failing to save the transaction.

How to test
1. **Charts**: Check the dashboard charts and verify they only display data points for the current month.
2. **Transfers**: Try making a transfer to savings. The popup should close normally, and the transaction should appear in the list without a page reload.

## Release: Alpha v1.1 — Pocket Money Card & Transaction Modify Button

This release introduces the Pocket Money card to help users understand their available spending funds and adds a Modify button for future transaction editing capabilities.

What's new

**Pocket Money Card:**
- **New dashboard card**: Shows available spending money calculated as Total - Savings
- **Educational design**: Info box explaining the calculation logic to users
- **Custom hook**: `usePocketMoney` hook for fetching and calculating pocket money balance
- **Responsive layout**: Dashboard grid updated to accommodate 4 cards (Income, Expenses, Pocket Money, Savings)
- **Amber theme**: Distinct amber/yellow color scheme to differentiate from other financial cards

**Transaction Modify Button:**
- **Modify button**: Added in transaction extended view alongside Delete button
- **Location**: Appears in Transactions page when expanding any transaction and clicking "Edit"
- **Purpose**: Prepares UI groundwork for upcoming transaction editing functionality
- **Consistent styling**: Matches existing button design patterns in the app

UI improvements
- **Consistent card styling**: Pocket Money card matches the design pattern of Income, Expense, and Savings cards
- **Auto-refresh**: 1-second interval refresh to keep data synchronized
- **Clear messaging**: "Money ready to use" with formula explanation (Total - Savings = Pocket Money)
- **Professional layout**: Glass-morphism design with gradient backgrounds
- **Enhanced transaction controls**: Modify and Delete buttons now appear together in transaction edit mode
- **Button consistency**: Modify button styling matches existing UI patterns

Technical improvements
- **TypeScript hook**: `pocketMon.ts` hook in `components/dashboard/hooks/`
- **Database integration**: Fetches from Balances table and calculates pocket money
- **User authentication**: Properly retrieves user ID from Supabase Auth
- **Error handling**: Console logging for debugging fetch operations
- **Transaction UI structure**: Prepared groundwork for transaction editing functionality

How to test the new features
1. Start the dev server:
```powershell
npm run dev
```

2. Test the Pocket Money card:
- Navigate to the Dashboard
- The Pocket Money card appears between Expenses and Savings (3rd position)
- Shows your available spending money (Total balance minus Savings)
- Displays educational info: "Money ready to use" with calculation formula
- Observe auto-refresh updates every second

3. Test the Modify button:
- Navigate to the Transactions page
- Expand any transaction by clicking on it to view extended details
- Click the "Edit" button to reveal action buttons
- "Modify" button appears alongside "Delete" button
- Note: Button is a placeholder - editing functionality coming in future release

Known issues in this release
- Pocket money calculation depends on accurate Total and Savings values
- Real-time updates still rely on auto-refresh (1-second polling)
- No transaction history specific to pocket money (calculated value only)
- Modify button is placeholder only - edit functionality not yet implemented

Next up
- Implement transaction editing functionality for the Modify button
- Optimize refresh strategy to reduce unnecessary API calls
- Add pocket money trend visualization
- Improve calculation accuracy with transaction-level validation

## Release: Alpha v0.1.2 — Transaction Management Features

This release introduces transaction management capabilities and UI improvements.

What's new
- **Transaction deletion**: Users can now delete transactions with a confirmation dialog
- **Improved transaction flow**: Added transaction ID passing through component hierarchy (TransactionsList → TransactionLine → TransactionExtendedLine → EditSection)
- **Delete confirmation modal**: Elegant glass-morphism styled confirmation dialog with blur effects
- **Balance updates**: Automatic balance recalculation when transactions are deleted
- **Enhanced EditSection**: Prepared groundwork for future edit functionality
- **Better prop management**: Fixed prop passing between transaction components

UI improvements
- **Delete Alert styling**: Modern confirmation dialog with red warning theme
- **Subtle backdrop effects**: Minimal blur overlay without dark dimming
- **Consistent button styling**: Hover effects and transitions across delete/cancel buttons
- **Glass morphism design**: Semi-transparent backgrounds with backdrop blur

Technical improvements
- **Proper TypeScript types**: Added comprehensive prop types for transaction components
- **Database integrity**: Delete operations properly update both Transactions and Balances tables
- **Error handling**: Comprehensive error logging for delete operations
- **Component architecture**: Better separation of concerns between display and action components

How to test the new features
1. Start the dev server:
```powershell
npm run dev
```

2. Test transaction deletion:
- Go to Transactions page and expand any transaction
- Click the "Edit" button to show action buttons
- Click "Delete" - a confirmation dialog should appear with blur background
- Test both "Cancel" (closes dialog) and "Delete" (removes transaction and updates balances)

Known issues in this release
- Edit functionality is prepared but not yet implemented (Save button placeholder)
- Some transaction type case sensitivity issues may exist in balance calculations
- Real-time updates still rely on auto-refresh rather than optimistic updates

Next up
- Transaction editing functionality
- Real-time balance updates
- Transaction categorization
- Improved error handling and user feedback

## Release: Alpha v0.1.1 — Bug fixes

This is a small maintenance release addressing several user-reported issues discovered during early alpha testing.

What's fixed
- Funds popup: the Add Funds flow now uses a single form submit handler with native validation (checkValidity / reportValidity). This prevents silent failures when required fields (like Date) are empty and ensures the Supabase insert runs when the user clicks Add.
- Transaction popup: improved form handling so date is required and native validation is used; prevents invalid dates from reaching the chart-data pipeline.
- Transfer popup: cleaned up malformed JSX and replaced it with a single, validated form submit flow (mirrors Transaction popup behavior).

How to test the bug fixes locally
1. Start the dev server:

```powershell
npm run dev
```

2. Open the app and test these scenarios:
- Add Funds: open the Add Funds popup, leave the Date empty and click Add — browser validation should show the required hint and the insert should not run. Fill all required fields and click Add — the popup should close and the balances/transactions should be updated.
- Add Transaction: open Add Transaction, leave Date empty and try submitting — native validation prevents submission. Fill the date and submit; confirm the transaction is added.
- Transfer Money: open Transfer popup, ensure required fields block submission; fill and submit to confirm transfer insertion and balances update.

Known remaining issues
- Empty Supabase tables may still cause errors when code assumes a single-row result; code paths now use `maybeSingle()` in several places but an audit across the repo is recommended.
- Some debug logging remains in chart components; these can be removed or changed to gated debug flags later.

If you find anything else, open an issue with steps to reproduce and console logs/screenshots where helpful.

## Contributing

Open an issue or PR with clear reproduction steps. Keep changes small and focused. For new features, include a brief proposal.

## License

MIT
