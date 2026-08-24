# FasAI Frontend

Responsive Next.js frontend for the FasAI AI Crop Health Monitoring project.

## Stack

- Next.js 14 App Router
- React 18
- Tailwind CSS
- Leaflet + Leaflet Draw for field boundaries
- Lucide React icons
- Mock data until FastAPI is connected

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Main routes

- `/` — Home
- `/about` — About FasAI
- `/how-it-works` — How FasAI works + demo link
- `/contact` — Contact
- `/login` — Mobile + demo OTP login
- `/register` — Mobile + demo OTP registration
- `/dashboard` — Farmer dashboard
- `/fields` — Field list
- `/fields/new` — Create field + draw boundary
- `/fields/[fieldId]` — Field details
- `/satellite` — Satellite/NDVI monitoring
- `/weather` — Weather
- `/crop-health` — Crop health
- `/soil` — Soil
- `/pest-risk` — Pest and disease risk
- `/alerts` — Alerts
- `/diagnose` — AI assistant demo
- `/analytics` and `/reports` — Reports

## Demo authentication

The frontend uses localStorage for the current demo. The OTP is:

`123456`

After successful verification, the user is sent to `/dashboard`.

## Notes

- The language switcher is global through `LanguageProvider` and is available from the shared header/auth shell.
- Dashboard section links live in the left sidebar; the dashboard top header intentionally does not repeat those section names.
- Leaflet map tiles require internet access in the browser.
- Real SMS OTP, weather, satellite imagery, AI diagnosis, and FastAPI authentication are integration points for the backend phase.
- `public/images/fasai-logo.svg` is the clean web version of the FasAI logo. The supplied logo reference is also retained as `fasai-logo-original.png`.
