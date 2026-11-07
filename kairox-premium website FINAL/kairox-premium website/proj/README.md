# KAIROX Technologies

**We don't just build digital products. We solve business problems through technology.**

A Next.js App Router website for KAIROX Technologies. The site uses React 19, TypeScript, server-rendered routes, a contact API with Resend email integration, production-ready rate limiting (Upstash Redis), and a responsive React Three Fiber hero loading the supplied Digital Core GLB model.

## Development

- Node.js 20.9 or newer
- pnpm 11.25.0 (pinned in `package.json`)
- `pnpm install`
- `pnpm dev` (listens on `0.0.0.0:3000`)
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts      # Contact form API with Resend + rate limiting
│   ├── about/page.tsx            # About page with founder details
│   ├── contact/page.tsx          # Contact page with form
│   ├── privacy/page.tsx          # Privacy Policy (DPDP Act 2023 compliant)
│   ├── terms/page.tsx            # Terms & Conditions
│   ├── services/page.tsx         # Services listing
│   ├── services/[slug]/page.tsx  # Service detail pages
│   ├── work/page.tsx             # Portfolio/demo projects
│   ├── work/[slug]/page.tsx      # Project detail with interactive demos
│   ├── process/page.tsx          # Process page
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout with metadata
│   └── globals.css               # Global styles with CSS variables
├── components/
│   ├── HeroOrb.tsx               # 3D hero model with fallback
│   ├── OrbCanvas.tsx             # Three.js canvas implementation
│   ├── ContactForm.tsx           # Client-side contact form
│   ├── ServiceCard.tsx           # Service card component
│   ├── ProjectCard.tsx           # Project card component
│   ├── DemoPlayground.tsx        # Interactive demo components
│   ├── Footer.tsx                # Footer with contact info
│   ├── Header.tsx                # Navigation header
│   └── ...                       # Other UI components
├── lib/
│   ├── site.ts                   # Centralized config (company, contacts, founders)
│   ├── services.ts               # Service definitions
│   ├── projects.ts               # Demo project definitions
│   ├── contact-options.ts        # Form select options
│   └── metadata.ts               # SEO metadata helper
└── ...
```

## Configuration

### Required Environment Variables

Create `.env.local` with:

```bash
# Resend email delivery (required for contact form)
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=kairoxtechnologies1112@gmail.com
CONTACT_FROM_EMAIL=enquiries@yourdomain.com

# Production rate limiting (Upstash Redis - optional but recommended for multi-instance)
REDIS_URL=https://xxx.upstash.io
REDIS_TOKEN=xxx

# Public origin for SEO/sitemap (required for production)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Founder Details

Edit `src/lib/site.ts` to update founder names, roles, bios, responsibilities, and photo paths.

### WhatsApp

Two numbers are configured in `src/lib/site.ts`. Set `whatsappEnabled: true` for each number when confirmed active on WhatsApp.

### Services

Six services are defined in `src/lib/services.ts`:
1. Lead Management Systems
2. WhatsApp Business Automation
3. Business Process Automation
4. Conversion-Focused Websites
5. Custom Business Software
6. Business Content & Creative Systems

## Legal Pages

- **Privacy Policy** (`/privacy`) — DPDP Act 2023 compliant draft
- **Terms & Conditions** (`/terms`) — Indian contract law aligned draft

Both contain `BEFORE GO-LIVE` callouts marking placeholders requiring legal review.

## Deployment

### Vercel (Recommended)

1. Push to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker

```bash
# Build
docker build -t kairox-website .

# Run
docker run -p 3000:3000 --env-file .env.local kairox-website
```

### Production Checklist

- [ ] Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (verified domain)
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Configure Upstash Redis for rate limiting (`REDIS_URL`, `REDIS_TOKEN`)
- [ ] Set `whatsappEnabled: true` in `src/lib/site.ts` for confirmed numbers
- [ ] Add founder photos to `public/images/` and update paths in `site.ts`
- [ ] Review and approve Privacy Policy with legal counsel
- [ ] Review and approve Terms & Conditions with legal counsel
- [ ] Run `pnpm build` and verify no errors
- [ ] Test contact form end-to-end (form → API → Resend → inbox + confirmation)

## Hero Model

`public/models/kairox-digital-core.glb` loads on supported desktop devices. Mobile, reduced-motion, and unsupported WebGL states show an animated CSS fallback.

## License

Private — all rights reserved.