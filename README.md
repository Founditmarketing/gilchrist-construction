# Gilchrist Construction Company

Marketing and recruiting site for **Gilchrist Construction Company**, a Central Louisiana heavy-civil / Louisiana DOTD prime highway and bridge contractor (Alexandria, LA, established 1981).

Built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS v4**, **Motion**, and **Lenis**. Design system: "Centerline" (asphalt-black canvas, a single brand-green accent, surveyor station markers threading the page).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Notes before launch

- **Imagery is illustrative** (AI-generated / placeholder). Replace with real Gilchrist photography and footage before going live.
- **Bid form delivery:** the request form posts to a server action. To deliver leads by email, set in the environment: `RESEND_API_KEY`, `BID_NOTIFY_EMAIL`, and `BID_FROM_EMAIL` (on a Resend-verified domain). Without them, submissions are still recorded server-side and the user is given the office phone, so nothing is silently dropped.
- **Facts are verified-only.** Stats, projects, and credentials are sourced; EMR and bonding figures are intentionally "on request." Keep it that way (a DOTD/owner audience punishes fabrication).
