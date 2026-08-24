# FasAI Frontend ↔ Backend Integration Notes

## Source-of-truth constraints from the provided backend README

The backend documentation specifies:
- FastAPI
- PostgreSQL/PostGIS
- OAuth2 + JWT
- Argon2id password hashing
- `/auth/register` with `{email,password}`
- `/auth/login` using OAuth2 password form data
- Bearer JWT for protected routes
- Sentinel-2 Band 4 + Band 8 for NDVI
- Rasterio + NumPy for raster processing
- OpenWeather for meteorological data
- Random Forest for health/stress prediction

## Requested frontend behavior

The requested UI uses mobile-number OTP for login/register. The provided backend README does **not** document an OTP endpoint. Therefore the frontend includes the complete OTP interaction as a **demo flow**:
- user enters 10-digit mobile number
- register also asks for name
- user proceeds to OTP screen
- demo OTP: `123456`
- successful verification stores a demo token/user in localStorage
- user is redirected to `/dashboard`

To make authentication real, add a backend OTP endpoint and update `services/authService.js` / `components/auth/OtpForm.jsx`.

## Weather

The UI currently uses `mocks/weather.js`. The project README specifies OpenWeather at the field centroid. When the backend exposes a weather endpoint, replace the mock call with `weatherService.list()`.

## Satellite / NDVI

The `/satellite` page and `/fields` map are ready for a backend-provided GeoJSON/NDVI layer. The field creation screen uses Leaflet Draw to capture a polygon as GeoJSON EPSG:4326. Send that geometry to the backend when the real field creation endpoint is wired.

## AI Assistant

`components/image-analysis/Assistant.jsx` provides the responsive chat/upload UI. Connect the send/upload handlers to the real AI service when the endpoint is available.

## Important

Do not put Sentinel Hub/Copernicus, OpenWeather, database passwords, JWT secrets or AI provider keys in the Next.js client. Keep those credentials on the FastAPI backend.
