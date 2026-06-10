# LumaStay

**Premium hotel reservations, made effortless.**

LumaStay is a complete hotel reservation prototype built as a Bespoke Technologies showcase project. It demonstrates a clean hospitality-grade landing page, room discovery, booking flow, mock payment, confirmation, user dashboard, admin reservation view, and booking lifecycle management using mock JSON first.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- Mock JSON data first
- Vercel-ready deployment

## Core screens

- `/` — premium homepage with hotel-building hero and booking search
- `/rooms` — room listing with filters and booking-ready room cards
- `/rooms/[slug]` — room details, amenities, pricing, policies, CTA
- `/booking` — reservation summary and lifecycle explanation
- `/booking/checkout` — guest details + mock payment
- `/booking/confirmation` — booking confirmation state
- `/dashboard` — guest dashboard and booking management
- `/admin` — admin reservation operations overview

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Output: default Next.js output.

## Agent rules

Before changing the code, read:

1. `AGENTS.md`
2. `docs/LumaStay_Design_System.md`
3. `prompts/00_MASTER_AGENT_PROMPT.md`
4. `docs/QA_CHECKLIST.md`

Do not invent new colors, page patterns, business logic, or booking statuses without updating the design system first.

## Bespoke Technologies

Built as a premium project showcase for **Bespoke Technologies**.

Motto: _Engineering the solutions for this, and The Next Generations__
