# AI_ASSISTED.md

This project is built collaboratively across **multiple AI tools and accounts**
(ChatGPT, Claude, Gemini, etc.) by one developer (Rohan). This file exists so any AI
assistant picking this up mid-project can get oriented fast, without the developer
having to re-explain everything from scratch every session.

## If you're an AI reading this for the first time:

1. **Read `README.md`** for the tech stack and feature status table.
2. **Read `PROJECT_RULES.md`** for coding conventions and known bugs — some of these
   bugs recur (the folder-casing one especially) because different sessions/tools
   don't always know the previous session's fixes. Check `PROJECT_RULES.md`'s
   "Known Bugs" section before assuming something is new.
3. **Don't assume the codebase matches what you remember from a past session** — if
   you (or another AI) worked on this before, always re-read the actual current files
   before editing. The developer switches between AI tools/accounts specifically
   *because* no single session has persistent memory of this repo — the repo itself,
   not chat history, is the source of truth.
4. **Check for empty stub files before "fixing" them** — `services/`, `layouts/`, and
   `ThemeContext.jsx` are intentionally empty placeholders for later, not broken files.
   Only fill them in if the developer explicitly asks for that feature.

## Working Style / Preferences (from prior sessions)

- Developer prefers **one change at a time explained clearly**, or **exact file paths
  + full file content** when the change is small — not always a full zip/download.
- Prefers **compact, tight UI** (small font sizes, small paddings) over spacious
  default Tailwind sizing — see `PROJECT_RULES.md` styling section for exact values.
- New features should work with **local mock/demo data first** (no backend dependency)
  so the UI can be reviewed before backend work starts, unless explicitly asked to
  wire up the backend.
- Prefers real interactivity over decorative UI where reasonable — e.g. the Trips page
  budget calculator, packing checklist, and trip planner all actually update state,
  not just render static numbers.

## Changelog (high-level, update this when you make significant changes)

> Add a dated entry here each session so the next AI (or the next you) can see what
> changed without diffing the whole repo.

- **Home page** built: Navbar, Sidebar, Hero, Quick Actions, Popular Destinations,
  Top Categories, Why YatraSphere, right sidebar (Budget Calculator, Scam Alerts,
  Community feed preview).
- **Community page** (`/community`) built: location-based follow system — feed only
  shows posts/stories from followed locations by default; "Explore" tab requires a
  search to view non-followed locations' posts; Create Post requires selecting a
  location before posting.
- **Trips page** (`/trips`) built: My Trips with live Upcoming/Past status (computed
  from dates, not manually set), Wishlist, working Trip Planner form, working Budget
  Calculator that feeds into a donut-chart Budget Overview widget, interactive Packing
  Progress checklist, mini Calendar View.
- **Auth system**: `AuthContext` + `AuthProvider` + `useAuth` hook, guest-mode support,
  `RequireAuth` route guard (see known bug about duplicate `/` route in
  `PROJECT_RULES.md`).
- **Backend**: signup/login working with hashed passwords, Pydantic validation,
  `.env`-based DB config.

## Open TODOs (things the developer has mentioned wanting, not yet done)

- Wire Community and Trips pages to real backend endpoints (currently local state only,
  resets on refresh).
- Resolve the duplicate `/` route in `AppRoutes.jsx`.
- Clean up `AuthContext.js` vs `AuthContext.jsx` duplicate.
- Rename `pages/home/` → `pages/Home/` for casing consistency.
- Fill in `layouts/MainLayout.jsx` / `DashboardLayout.jsx` if/when the page shell gets
  formalized into a shared layout instead of being repeated per page.