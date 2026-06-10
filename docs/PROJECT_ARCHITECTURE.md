# LumaStay Project Architecture

## Architecture goal

Create a clean prototype that feels like a real hotel reservation system while staying simple enough to ship, review, and extend.

## Layers

```txt
app/                 Route-level pages and layouts
components/ui/       shadcn-style primitive UI components
components/          Product-level LumaStay components
lib/                 Utilities, mock data access, booking lifecycle helpers, types
data/                Mock JSON source of truth
docs/                Design, architecture, QA, deployment guidance
prompts/             Agent prompts and execution instructions
public/              Static local assets if needed
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage, hero, booking search, featured rooms, trust blocks |
| `/rooms` | Room discovery and selection |
| `/rooms/[slug]` | Room details and reservation CTA |
| `/booking` | Booking lifecycle and current reservation summary |
| `/booking/checkout` | Guest form and mock payment |
| `/booking/confirmation` | Confirmation receipt |
| `/dashboard` | Guest booking dashboard |
| `/admin` | Admin reservation lifecycle dashboard |

## Data strategy

The first version uses `data/lumastay.json` as the source of truth. All pages should read through `lib/data.ts`, not import the JSON directly everywhere.

This keeps the prototype ready to replace JSON with Supabase, Prisma, PostgreSQL, or an API later.

## State strategy

Use URL params and simple localStorage only where helpful for demo flow. Avoid global state libraries.

Future production migration:

- Auth: Clerk, Auth.js, or custom auth
- Database: PostgreSQL/Supabase
- Payments: Paystack/Stripe depending on market
- Storage: Cloudinary/S3
- Email: Resend
- Booking engine: server-side inventory lock + payment timeout

## UI strategy

Every UI surface must be built from reusable primitives and product components. Route files should compose components and pass data.

## Performance strategy

- Prefer server components where no interactivity is needed.
- Keep client components small and explicit.
- Avoid large animation libraries.
- Use responsive images carefully.
- Keep first paint clean and fast.

## Production upgrade path

1. Replace mock JSON with database models.
2. Add auth and user sessions.
3. Add real availability search.
4. Add payment provider.
5. Add email/SMS/WhatsApp notifications.
6. Add admin CRUD.
7. Add audit logs and cancellation/refund rules.
