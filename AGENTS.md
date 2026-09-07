# BMW APIs — API Playground

## Stack
- **Frontend:** React 18 + Vite 5 + Tailwind CSS 3 (port 3000)
- **Backend:** Node 22 + Express 4 (port 8000, internal `api` service)
- **Font:** JetBrains Mono (Google Fonts)

## Dev setup
```bash
docker compose -f docker-compose.base44.yml up -d
```
- Frontend on **port 3000** (Vite dev server with HMR)
- Backend on **port 8000** (Express with `node --watch` for hot reload)
- Vite proxies `/api/*` → `http://api:8000` (single-origin, no CORS issues)

## Architecture
- `src/App.jsx` — root component, state for theme/category/search/toast
- `src/components/` — Header, SubHeader, Hero, FilterTabs, SearchBar, EndpointCard, BottomNav, Toast
- `src/data/endpoints.js` — endpoint definitions (method, path, params, options)
- `backend/server.js` — Express server with routes matching frontend paths
- `backend/scraper/` — one file per scraper: youtube, youtube-vip, instagram, tiktok, downr
- Theme uses CSS variables (`:root` dark, `:root.light` light) toggled via class on `<html>`

## Endpoint status
| Endpoint | Scraper source | Status |
|---|---|---|
| YouTube VIP | SaveTube (cdn403.savetube.vip) — AES-128-CBC decryption | ✅ Working |
| Instagram | Direct page HTML extraction (og:image/og:video) | ✅ Working |
| TikTok | Direct page HTML extraction (downloadAddr/playAddr) | ✅ Working |
| YouTube | content-service.opa-shan.workers.dev | ⚠️ Worker returns 500 (server-side issue) |
| Downr | downr.org/.netlify/functions/bbc | ⚠️ 403 Cloudflare bot protection |
| Spotify | — | Not yet implemented (no scraper provided) |
| Threads | — | Not yet implemented (no scraper provided) |

## Key notes
- YouTube VIP uses obfuscated AES key `C5D58EF67A7584E4A29F6C35BBC4EB12` extracted from savetube scraper
- Instagram scraper switched from sssinstagram.com (needs browser tokens) to direct page parsing
- TikTok scraper switched from ikdownloader.io (domain doesn't resolve) to direct page parsing
- Downr endpoint changed from `download`/`nyt` to `bbc` (site restructured), but Cloudflare blocks server requests
- Endpoint cards are multi-expand accordions (multiple can be open at once)
- Mobile-first design; bottom nav hidden on desktop (lg breakpoint)

## Verify
- `curl http://localhost:3000/` returns the HTML shell
- `curl http://localhost:8000/health` returns `{"status":"ok"}`
- `curl http://localhost:3000/api/v1/download/tiktok?url=<tiktok_url>` returns JSON with download URLs
