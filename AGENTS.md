# LumaStay — Agent Instructions

## Project Overview
LumaStay is a Next.js 14 App Router hotel reservation website. All data is mock JSON (no backend/database).

## Tech Stack
- Next.js 16 + TypeScript + Tailwind CSS v4
- No external UI library — custom shadcn-style components
- Mock data in `data/lumastay.json`

## Key Directories
- `app/` — All routes (App Router)
- `components/` — Shared UI components
- `components/ui/` — Base UI primitives (Button, Badge, Card, Input, Select)
- `lib/` — Types, utilities, data accessors, booking logic
- `data/` — lumastay.json mock data

## Routes
- `/` — Homepage
- `/rooms` — Room listing
- `/rooms/[slug]` — Room detail
- `/booking` — Booking details step
- `/booking/checkout` — Payment form
- `/booking/confirmation` — Confirmation receipt
- `/dashboard` — User dashboard (hardcoded "John Smith")
- `/admin` — Admin dashboard

## Style Rules
Use only the approved palette hex values (Navy #0B1324, Coral #F9735B, Palm #2F7D6D, Ivory #FFF8EF, Beige #F3E7D3). See `docs/LumaStay_Design_System.md`.

## Running Locally
```bash
npm run dev
npm run build
```
