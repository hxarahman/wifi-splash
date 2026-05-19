# wifi-splash

Captive portal login page for BLK CAB Coffee, served by a Go server running on a GL.iNet router.

## How it works

When a guest connects to the WiFi, the router redirects them to this splash page. The page communicates with the Go server via two endpoints:

- `GET /status` — checks if the device already has an active session (`{ status: "authenticated" | "unauthenticated", expires_at? }`)
- `POST /login` — submits the session form and returns a session duration in nanoseconds (`{ duration }`)

On successful login the browser is redirected to `/success?duration=<minutes>`. If the daily limit is exceeded the server returns `403` and the browser is redirected to `/limit-reached`.

## Pages

| Route | Description |
|---|---|
| `/` | Login form (new user) or Welcome Back screen (returning session) |
| `/success` | Connected confirmation with session duration |
| `/limit-reached` | Daily limit exceeded |
| `*` | 404 |

## Form fields

| Field | Required | Description |
|---|---|---|
| `phone` | Yes | UAE phone number, validated with libphonenumber-js |
| `reason` | Yes | Breakfast / Lunch / Dinner / Work & Other |
| `order_code` | No | Order ID — unlocks 6 hours instead of standard 60 minutes |

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Axios (relative base URL — no external API)
- libphonenumber-js (UAE phone validation)
- lucide-react (icons)
- react-router-dom v7

## Development

```bash
npm install
npm run dev       # starts on 0.0.0.0 for local network testing
npm run build     # outputs to dist/
```

The built `dist/` folder is served as static files by the Go server on the router.
