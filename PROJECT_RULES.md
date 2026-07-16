# Project Rules — YatraSphere

This file exists because this project gets worked on across multiple AI tools/sessions
(ChatGPT, Claude, Gemini, different accounts). Follow these rules so the codebase stays
consistent no matter who — or which AI — touches it next.

## 🚨 Critical Rule #1: File & Folder Casing

**Always use PascalCase for page folders and component files** (`Home`, not `home`).
This project runs on Windows locally (case-insensitive filesystem) but deploys on
case-sensitive systems (Linux servers, most hosts). A mismatch like importing
`../pages/Home/Home` when the folder is actually named `home` will:
- Work fine on your Windows machine
- Silently double-mount components in dev (causes duplicate/ghost text rendering)
- **Break the production build entirely** on deploy

**Known current violation:** `frontend/src/pages/home/` is still lowercase while
`AppRoutes.jsx` imports it as `../pages/home/Home` (matches for now, but rename this
folder to `Home/` at the next opportunity and keep it consistent with every other page
folder, which are all PascalCase).

## 🚨 Critical Rule #2: Never leave two files that resolve the same import

`frontend/src/context/AuthContext.js` (has real code) and
`frontend/src/context/AuthContext.jsx` (empty, 0 bytes) currently both exist.
`useAuth.js` imports `"../context/AuthContext"` with no extension — which file wins
depends on Vite's resolution order and is **not guaranteed**. If it ever picks the
empty `.jsx` file, auth breaks silently with no error.
**Fix:** delete `AuthContext.jsx`, keep only `AuthContext.js`.

## Styling Conventions

- **Tailwind only**, no separate CSS files per component (global reset lives in `index.css`).
- Colors are hardcoded hex via Tailwind arbitrary values, not a custom theme config:
  - Primary blue: `#2563eb` (hover: `#1d4ed8`)
  - Text dark: `#111827` · Text muted: `#6b7280` / `#9ca3af`
  - Borders: `#ececec`
  - Success green: `#16a34a` · Danger red: `#dc2626` · Warning orange: `#d97706`
- Card pattern: `bg-white rounded-2xl border border-[#ececec] shadow-sm p-5`
- Font sizes are compact/tight by convention (13–15px body text, not Tailwind defaults)
  — this was a deliberate design pass, don't bump sizes back up without reason.
- Layout pattern for pages with a right sidebar:
  `flex flex-col xl:flex-row gap-4` (stacks below `xl` breakpoint instead of
  overflowing/hiding content — do NOT use `overflow-x: hidden` as a fix for layout
  overflow, it hides content instead of fixing the cause).

## Component Conventions

- Icons: `react-icons/fa` (primary), occasionally `react-icons/hi` / `react-icons/ri` / `react-icons/bs`
- Mock/demo data lives as a `const` at the top of the page file, or in a dedicated
  `xData.js` file next to the feature's components (see `explore/exploreData.js`,
  `packages/packagesData.js`, `offers/offersData.js`, `blogs/blogsData.js`) — follow
  this pattern for new features instead of inlining large arrays in JSX.
- Menu/nav items are data-driven (`.map()` over an array of `{ label, icon, path }`),
  not individually hand-written `<div>`s — keep new nav items in the same pattern.
- Pages that need the left `Sidebar` + right content column reuse the same
  `<Navbar /> <div className="flex"><Sidebar /><div className="flex-1 ...">` shell —
  don't invent a new page shell per page. (`layouts/MainLayout.jsx` and
  `layouts/DashboardLayout.jsx` are empty stubs — if you formalize this shell, put it
  there and refactor pages to use it, but that's a deliberate refactor, not a
  side-effect of an unrelated change.)

## Backend Conventions

- All secrets/config via `.env` + `python-dotenv` (`DATABASE_URL` etc.) — **never
  hardcode DB credentials in `connection.py`**, this was already fixed once, don't
  regress it.
- Passwords are hashed with `passlib` before storage — never store plaintext.
- Request bodies are validated with Pydantic schemas (`app/schemas/`) — don't accept
  raw `dict` in route handlers.
- One router per resource in `app/routes/`, registered in `app/main.py`.

## Known Stubs / Incomplete Files (don't be surprised, they're intentional placeholders)

- `frontend/src/layouts/MainLayout.jsx` — empty
- `frontend/src/layouts/DashboardLayout.jsx` — empty
- `frontend/src/services/api.js` — empty
- `frontend/src/services/authService.js` — empty
- `frontend/src/services/tripService.js` — empty
- `frontend/src/services/userService.js` — empty
- `frontend/src/context/ThemeContext.jsx` — empty

## Known Bugs To Fix

1. **Duplicate `/` route in `AppRoutes.jsx`** — `/` is registered twice: once as plain
   `<Home />` near the top, once wrapped in `<RequireAuth>` at the bottom. React Router
   uses the *first* match, so the `RequireAuth`-wrapped route is dead code and `/` is
   currently **not actually auth-protected**. Remove the duplicate and keep only the
   `RequireAuth`-wrapped version (if home should require login) or only the plain
   version (if it shouldn't).
2. See Critical Rules #1 and #2 above.

## Before You Commit / Hand Off To Another AI Session

- [ ] No new duplicate files with ambiguous extensions (`.js` + `.jsx` for the same name)
- [ ] No new lowercase page folders
- [ ] Run `npm run build` locally (or at minimum a JSX syntax check) before pushing
- [ ] Update `AI_ASSISTED.md`'s changelog section with what you added/changed