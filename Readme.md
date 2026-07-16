# YatraSphere 🧭

**Travel Smart. Travel Safe.**

A full-stack travel companion web app — trip planning, budget calculator, community
feed with location-based following, scam alerts, packages, and more.

## Tech Stack

**Frontend:** React 19 + Vite + Tailwind CSS + React Router v7 + react-icons + axios
**Backend:** FastAPI + SQLAlchemy + PostgreSQL + Pydantic + passlib (password hashing)

## Project Structure

```
YatraSphere/
├── frontend/
│   ├── src/
│   │   ├── pages/            → one folder per route (PascalCase!)
│   │   ├── components/       → grouped by feature (navbar/, sidebar/, trips/, community/, ...)
│   │   ├── context/          → React Context providers (Auth, Sidebar, Theme)
│   │   ├── hooks/            → custom hooks (useAuth, useSidebar)
│   │   ├── layouts/          → shared page shells (currently stubs — see PROJECT_RULES.md)
│   │   ├── routes/           → AppRoutes.jsx (route table) + RequireAuth.jsx (auth gate)
│   │   ├── services/         → API call wrappers (currently stubs)
│   │   └── utils/            → pure helper functions (tripHelpers, budgetHelpers, ...)
│   └── package.json
└── backend/
    ├── app/
    │   ├── database/          → connection.py (env-based), base.py
    │   ├── models/            → SQLAlchemy models
    │   ├── routes/            → FastAPI routers
    │   ├── schemas/           → Pydantic request/response schemas
    │   └── utils/security.py  → password hashing (passlib)
    ├── main.py
    └── requirements.txt
```


## Local Setup

### Frontend
```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
# Create a .env file in backend/ with:
# DATABASE_URL=postgresql://<user>:<password>@localhost:5432/yatrasphere_db
uvicorn app.main:app --reload   # http://127.0.0.1:8000
```

## Current Feature Status

| Feature | Status |
|---|---|
| Home page (hero, quick actions, popular destinations, categories) | ✅ Working, static/mock data |
| Login / Signup + Guest mode | ✅ Working, wired to backend |
| Community (posts, stories, location-based follow, explore/search) | ✅ Working, frontend-only mock data (no backend yet) |
| Trips (My Trips, planner, budget calculator, packing checklist) | ✅ Working, frontend-only mock data (no backend yet) |
| Explore / Experiences / Guides / Blogs & Guides | 🟡 Built, needs review |
| Packages / Offers & Deals / Alerts | 🟡 Built, needs review |
| Share Experience | 🟡 Built, needs review |
| Backend: Auth (signup/login) | ✅ Working — hashed passwords, Pydantic validation |
| Backend: Trips / Posts / Community / Alerts / Packages | ❌ Not built yet — frontend uses local mock data only |

See `PROJECT_RULES.md` for coding conventions and `AI_ASSISTED.md` if you're an AI
assistant picking this project up mid-way.