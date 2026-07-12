# SpendFreeli Website — Claude Context

## Repository
- Repo: github.com/walker-legacy-partners/spendfreeli-web
- Branch: main (Vercel auto-deploys on push)
- Live: https://spendfreeli-web.vercel.app
- Domain: spendfreeli.com (DNS not yet pointed to Vercel)

## Tech Stack
- Next.js 16.2, TypeScript strict
- Tailwind CSS v4
- Multi-tenant design token architecture
- Vercel Pro hosting

## Design Token Architecture
Single source of truth: src/tokens/tenants/spendfreeli.ts
Generator: scripts/generate-tokens-css.ts (runs on build)
To add white-label tenant: add file in src/tokens/tenants/
Change token: edit src/tokens/tenants/spendfreeli.ts only

## Environment Variables (Vercel — Production only)
- KIT_API_KEY — Kit V3 waitlist
- KIT_FORM_ID — SpendFreeli Launch List form
- RESEND_API_KEY — contact form emails
- CONTACT_EMAIL — info@spendfreeli.com

## Pages
- / — Home (hero, features, download, waitlist)
- /about — Founder story, mission, values
- /contact — Contact form via Resend
- /privacy — Privacy policy (ISR from GitHub Pages)
- /terms — Terms of service (ISR from GitHub Pages)
- /auth/confirm — Magic link interstitial (JS redirect)
- /auth/callback — Mobile deep link handler

## Magic Link Flow
Email → /auth/confirm (JS redirect, blocks bots) →
Supabase verify → /auth/callback (detects mobile) →
spendfreeli://auth-callback (opens app)

## Email Templates
Branded templates in: docs/email-templates/
- confirm-signup.html — paste into Supabase Auth settings

## Completed
- All pages built and deployed
- Kit waitlist working
- Resend contact form working
- Design token system working
- Auth confirm page built

## Pending
- Magic link end-to-end testing (in progress)
- Point spendfreeli.com DNS to Vercel
- Replace PLACEHOLDER_SHA256 in assetlinks.json
- Replace PLACEHOLDER_TEAM_ID in apple-app-site-association

## Working Principles
Same as mobile app — see SESSION_CONTEXT.md in
family-budget-fresh repo for full list.
