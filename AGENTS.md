# BMW APIs — API Playground

## Stack
- **Frontend:** React 18 + Vite 5 + Tailwind CSS 3
- **Runtime:** Node 22 (via Docker Compose)
- **Font:** JetBrains Mono (Google Fonts)

## Dev setup
```bash
docker compose -f docker-compose.base44.yml up -d
```
App runs on **port 3000** (mapped to Vite's 5173 inside the container).
Vite dev server with HMR — edits appear live without rebuild.

## Architecture
- `src/App.jsx` — root component, state for theme/category/search/toast
- `src/components/` — Header, SubHeader, Hero, FilterTabs, SearchBar, EndpointCard, BottomNav, Toast
- `src/data/endpoints.js` — endpoint definitions (method, path, params, options)
- Theme uses CSS variables (`:root` dark, `:root.light` light) toggled via class on `<html>`

## Key notes
- `VITE_API_BASE_URL` env var sets the API base for fetch() calls in Test/Run buttons. Default placeholder in `.env.base44-defaults`.
- Endpoint cards are multi-expand accordions (multiple can be open at once).
- Mobile-first design; bottom nav hidden on desktop (lg breakpoint).
- No backend/database — pure frontend playground that calls external API endpoints.

## Verify
- `curl http://localhost:3000/` returns the HTML shell
- Preview shows dark grid background, header with live uptime timer, filter tabs, endpoint cards
