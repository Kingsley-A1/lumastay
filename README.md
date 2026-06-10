# LumaStay

A premium hotel reservation website built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Data**: Mock JSON (no backend required)
- **Deployment**: Vercel-ready

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, search, rooms, experiences, testimonials |
| `/rooms` | All rooms listing with status badges |
| `/rooms/[slug]` | Room detail with gallery, amenities, booking sidebar |
| `/booking` | Booking review step (Details) |
| `/booking/checkout` | Guest form + mock payment panel |
| `/booking/confirmation` | Confirmation receipt with booking ref |
| `/dashboard` | User dashboard with bookings table |
| `/admin` | Admin operations dashboard |

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building

```bash
npm run build
npm start
```

## Design Tokens

| Token | Value | Use |
|-------|-------|-----|
| Navy | `#0B1324` | Brand dark |
| Coral | `#F9735B` | CTA accent |
| Palm | `#2F7D6D` | Supporting green |
| Ivory | `#FFF8EF` | Page background |
| Beige | `#F3E7D3` | Section background |

## Data

All mock data lives in `data/lumastay.json` with 8 rooms, 6 bookings, 4 testimonials, and hotel metadata.

## Notes

- No authentication — dashboard shows hardcoded user "John Smith"
- No real payment processing — uses localStorage to store booking refs
- Images sourced from Unsplash (no API key required)
