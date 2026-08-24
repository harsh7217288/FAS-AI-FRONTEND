# FasAI — Smart Crop & Farm AI Monitoring (Frontend)

A responsive Next.js frontend for FasAI, an AI-powered crop health & farm monitoring platform built for SIH. Farmers can track field health, satellite/NDVI signals, weather, pest risk, and alerts from one dashboard.

This repo is **frontend only** and currently runs on mock data (see [Demo data & auth](#demo-data--auth)). It's built so a FastAPI/Node backend can be dropped in later — see `BACKEND_INTEGRATION.md`.

---

## 1. Prerequisites

Make sure your teammate has these installed before doing anything else:

| Tool | Version | Check with |
|---|---|---|
| Node.js | 18.18+ (20 or 22 recommended) | `node -v` |
| npm | 9+ (comes with Node) | `npm -v` |
| Git | any recent version | `git -v` |

> If Node is missing or too old, install it from [nodejs.org](https://nodejs.org) or via `nvm install 22`.

---

## 2. Getting the code

```bash
git clone <this-repo-url>
cd fasai-frontend
```

(If you received this as a zip instead of a git URL, just unzip it and `cd` into the `fasai-frontend` folder.)

## 3. Install dependencies

```bash
npm install
```

## 4. Run it locally

```bash
npm run dev
```

Then open **http://localhost:3000** in your browser.

- Hot reload is on — edit any file in `app/` or `components/` and the browser updates automatically.
- To run on a different port: `npm run dev -- -p 3210`

## 5. Other useful scripts

```bash
npm run build   # production build (also catches type/compile errors — run this before pushing)
npm run start   # serve the production build locally (run `build` first)
npm run lint    # lint check
```

---

## Tech stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS** for styling
- **Leaflet** + **Leaflet Draw** for interactive field maps and boundary drawing
- **Lucide React** for icons
- Mock data (`/mocks`) standing in for a real backend for now

## Project structure

```
app/            → pages (Next.js App Router — one folder per route)
components/     → UI building blocks, grouped by feature (dashboard, fields, auth, maps, ui, ...)
hooks/          → data-fetching hooks (currently backed by mocks — see hooks/use*.js)
lib/            → constants, formatters, shared utils
mocks/          → placeholder data (fields, weather, alerts, pest risk, soil, crop health)
providers/      → React context providers (Auth, Language, React Query)
services/       → API client stubs — this is where real backend calls will go
public/images/  → static images/icons
```

## Main routes

| Route | Description |
|---|---|
| `/` | Home / marketing landing page |
| `/about`, `/how-it-works`, `/contact` | Static info pages |
| `/login`, `/register` | Mobile number + OTP auth flow (demo) |
| `/dashboard` | Main farmer dashboard |
| `/fields`, `/fields/new`, `/fields/[fieldId]` | Field list, create, and detail |
| `/satellite` | Interactive satellite/NDVI monitoring map |
| `/weather` | Weather + 5-day forecast |
| `/crop-health` | Crop health score & trend |
| `/soil` | Soil moisture & type |
| `/pest-risk` | Pest & disease risk |
| `/alerts` | Alert feed |
| `/diagnose` | AI assistant (image upload) demo |
| `/analytics`, `/reports` | Reports & downloadable summaries |
| `/settings` | Account settings |

## Demo data & auth

Everything currently runs on mock data in `/mocks` and hooks in `/hooks` — there's no real backend wired up yet.

- **Login/Register OTP:** enter any 10-digit mobile number, then use OTP **`123456`** to get in. Auth state is kept in `localStorage` via `AuthProvider`.
- **Satellite Monitor:** NDVI / True Color / Moisture layers are simulated — see `components/maps/FieldVisual.jsx` (dashboard preview) and `components/maps/FieldMap.jsx` (the full interactive Leaflet map on `/satellite`). True Color uses real Esri satellite tiles; NDVI/Moisture overlay a generated color grid. Swapping in real Sentinel-2/NDVI data is the next integration step — see `BACKEND_INTEGRATION.md`.
- **Weather, pest risk, soil, crop health:** static numbers from `/mocks/*.js`, ready to be replaced by real API calls in `/services/*.js`.

## Internationalization

The app supports English/Hindi via `LanguageProvider` + `hooks/useLanguage.js`. The toggle is available in the navbar (desktop) and the mobile menu drawer.

## Responsive design

The whole app (public pages, dashboard, auth pages) is responsive from small phones up through large desktops:
- Below `lg` (1024px): a left-side slide-out menu drawer (hamburger icon)
- `lg` and above: a fixed left sidebar (dashboard) or full top nav (public pages)

If you're adding a new page, wrap it the same way existing dashboard pages do:

```jsx
<Navbar dashboard />
<Sidebar />
<main className="lg:ml-64">
  <div className="container-fasai py-5">
    {/* your page content */}
  </div>
</main>
```

## Known limitations / next steps for the backend team

See `BACKEND_INTEGRATION.md` and `SOURCE_REQUIREMENTS.md` for the full list, but in short:
- Swap `/mocks` + `/hooks/use*.js` for real API calls via `/services/*.js`
- Real OTP/SMS auth instead of the `123456` demo code
- Real satellite/NDVI tile source instead of the generated demo grid
- Leaflet map tiles need the *end user's* browser to have internet access (they're fetched client-side, not through this server)

## Contributing (for teammates)

```bash
git checkout -b your-feature-name
# make changes
npm run build     # make sure it still builds cleanly
git add .
git commit -m "short description of the change"
git push origin your-feature-name
```

Then open a pull request into `main` so the team can review before merging.
