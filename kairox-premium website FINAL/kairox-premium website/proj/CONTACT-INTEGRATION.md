# Contact Integrations

The enquiry interface sends real submissions through the server-side `/api/contact` route. It returns a successful confirmation only after the configured email provider has accepted the message. Until the environment variables below are supplied, the route deliberately returns a configuration error; the website does not pretend an enquiry was delivered. The route does not persist form submissions in a database.

## Email Notifications (Resend-compatible)

Set these server-only environment variables in the managed Webdev project settings:

- `RESEND_API_KEY` — secret API key for the email provider.
- `CONTACT_TO_EMAIL` — the agency inbox that should receive enquiries (e.g., `kairoxtechnologies1112@gmail.com`).
- `CONTACT_FROM_EMAIL` — a sender address authorized by the provider (typically on a verified sending domain).

Restart/redeploy the server after adding credentials. Keep the API key in the protected environment settings; do not put it in source control or a `NEXT_PUBLIC_` variable. The repository's `.env.example` contains names only.

The API sends two emails on successful submission:
1. **Enquiry notification** — HTML formatted email to `CONTACT_TO_EMAIL` with all enquiry details.
2. **Confirmation email** — HTML formatted email to the enquirer acknowledging receipt.

Both emails use branded templates matching the website design. The confirmation email is sent as a best effort; failure to send it does not block the main enquiry flow.

## WhatsApp

Two phone numbers are configured in `src/lib/site.ts`:

- Primary: `+91 79723 57578` (digits: `917972357578`)
- Secondary: `+91 90218 50826` (digits: `919021850826`)

Each number has a `whatsappEnabled` flag (default: `false`). Set to `true` only when you have confirmed the number has an active WhatsApp account. When enabled, WhatsApp buttons appear on the Contact page and in the Restaurant demo.

The website uses `https://wa.me/{digitsOnly}` links. No `NEXT_PUBLIC_WHATSAPP_PHONE` is required; configuration is centralized in `src/lib/site.ts`.

## Production Rate Limiting

The contact endpoint uses a hybrid rate limiting approach:

1. **Upstash Redis** (primary) — when `REDIS_URL` and `REDIS_TOKEN` are configured, a sliding window rate limiter (5 requests per 10 minutes per IP) is used. This works across multiple server instances.

2. **In-memory fallback** — when Redis is unavailable, an in-memory Map is used. This is local to each server process and suitable for development or single-instance deployments.

The implementation gracefully degrades: if Redis is configured but fails, it falls back to in-memory without silently allowing unlimited requests.

### Configuration

```bash
# Upstash Redis (recommended for production)
REDIS_URL=https://xxx.upstash.io
REDIS_TOKEN=xxx
```

### Rate Limit Parameters

Configurable via constants in `src/app/api/contact/route.ts`:
- `MAX_REQUESTS_PER_WINDOW = 5`
- `WINDOW_MS = 10 * 60 * 1000` (10 minutes)

### Alternative Production Options

**Vercel Edge Middleware**
Use Vercel's built-in rate limiting via `vercel.json` or Edge Config.

**Cloudflare/NGINX Upstream**
Configure rate limiting at the proxy layer before requests reach the application.

## Database for Enquiry Management (Future)

Currently, enquiries are only emailed — not stored in a database. For production scale, consider adding:

- **PostgreSQL** (Vercel Postgres, Neon, Supabase) or **PlanetScale** for enquiry persistence.
- **Admin dashboard** to view, filter, and respond to enquiries.
- **CRM integration** (HubSpot, Pipedrive) via webhook or API.

Do not add this infrastructure until needed; the current email-only flow is sufficient for launch.

## Remaining Setup

Before expecting real enquiry delivery or public contact links, ensure the following are configured in your hosting environment:

- `RESEND_API_KEY` — Resend API key (server-only)
- `CONTACT_TO_EMAIL` — `kairoxtechnologies1112@gmail.com`
- `CONTACT_FROM_EMAIL` — verified sender address on your domain (e.g., `enquiries@yourdomain.com`)
- `NEXT_PUBLIC_SITE_URL` — public HTTPS origin (e.g., `https://kairoxtechnologies.com`) for canonical URLs, sitemap, and social metadata
- `REDIS_URL` + `REDIS_TOKEN` — Upstash Redis for multi-instance rate limiting (optional but recommended)
- WhatsApp: update `whatsappEnabled` to `true` in `src/lib/site.ts` for each number confirmed active
- Founder details: update `founders` array in `src/lib/site.ts` with approved names, roles, bios, and photos
- Legal pages: complete all placeholders in `/privacy` and `/terms` (see Legal Placeholders Report below)

No company name, founder details, or public domain was provided in the website brief. Add the actual values before launch.