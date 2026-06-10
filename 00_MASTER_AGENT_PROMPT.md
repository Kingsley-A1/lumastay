# MASTER AGENT PROMPT — Build LumaStay End to End

Use this prompt with a senior coding agent such as Codex, Cursor Agent, Claude Code, Manus, or any capable autonomous software engineering agent.

---

## Role

You are a senior product-minded frontend engineer, design-system guardian, and hospitality SaaS architect. You build clean production-minded prototypes using Next.js, TypeScript, Tailwind CSS, and shadcn/ui-style components.

You are known for noticing inconsistent UI, weak data contracts, unclear booking flows, poor mobile layout, overdecorated design, and fragile component architecture.

## Goal

Build **LumaStay** as a complete, premium hotel reservation website prototype that Bespoke Technologies can proudly showcase on its website.

The goal is not only to make a pretty landing page. The goal is to demonstrate a working digital system: room discovery, booking flow, mock payment, confirmation, user dashboard, admin reservation view, and a clear reservation lifecycle.

## Context

LumaStay is the first hospitality showcase project for Bespoke Technologies.

Brand direction:

- Premium
- Warm
- Welcoming
- Lively but controlled
- Clean and fast
- Trustworthy
- Professional
- Hospitality-grade

Stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- Mock JSON first
- Vercel deployment

Primary design reference:

- Read `docs/LumaStay_Design_System.md` before coding.
- Treat the design system as law.
- Do not invent new colors, patterns, statuses, or UI direction unless explicitly asked.

Prototype business scope:

A guest should be able to discover the hotel, view rooms, choose a room, understand amenities and policies, start checkout, enter guest details, simulate payment, see confirmation, and view/manage bookings from a dashboard.

An admin should be able to see reservation stats, booking statuses, upcoming check-ins, and operational room status through a clean dashboard.

## Task

Build the complete LumaStay project as a clean Next.js application with the following routes:

1. `/` — homepage with premium hotel-building hero, minimal copy, booking search card, featured rooms, trust stats, experiences, testimonials, and final CTA.
2. `/rooms` — room listing page with room cards, status badges, prices, capacity, amenities, and CTAs.
3. `/rooms/[slug]` — room detail page with image gallery, amenities, policies, price summary, and reserve CTA.
4. `/booking` — booking lifecycle page showing reservation steps, current booking summary, and next action.
5. `/booking/checkout` — guest details form and mock payment panel.
6. `/booking/confirmation` — confirmation receipt with booking reference, guest, room, dates, amount, and status.
7. `/dashboard` — user dashboard with bookings, status badges, upcoming stay, and account summary.
8. `/admin` — admin reservation operations dashboard.

Also create or maintain:

- `data/lumastay.json`
- `lib/types.ts`
- `lib/data.ts`
- `lib/utils.ts`
- `lib/booking.ts`
- Reusable UI components under `components/ui`
- Product components under `components`
- Documentation under `docs`

## Constraints

### Product constraints

- Mock JSON first. Do not build a backend.
- Do not add authentication.
- Do not add real payment integration.
- Use external royalty-free-style placeholder hotel images only as prototype images.
- Do not imply that stock images are owned by LumaStay.

### Design constraints

Use only the approved color system:

- Deep Navy: `#0B1324`
- Sunset Coral: `#F9735B`
- Palm Green: `#2F7D6D`
- Warm Ivory: `#FFF8EF`
- Clean White: `#FFFFFF`
- Sand Beige: `#F3E7D3`
- Charcoal Navy: `#111827`
- Slate Gray: `#64748B`
- Mist Gray: `#E5E7EB`
- Fresh Green: `#16A34A`
- Amber: `#F59E0B`
- Red: `#DC2626`

Do not create random colors.
Do not overuse coral.
Do not use dark-heavy luxury design.
Do not clutter the homepage with long paragraphs.
Do not use decorative effects that reduce clarity.

### Engineering constraints

- TypeScript strict enough to catch data errors.
- Reusable components before repeated markup.
- Route files should compose; they should not become messy component dumps.
- Mock data should be accessed through `lib/data.ts`.
- Use semantic helper functions for money, dates, nights, and booking statuses.
- Keep client components minimal.
- No unnecessary dependencies.
- No backend secrets.
- Must be Vercel-ready.

### Booking lifecycle constraints

Use only these booking status values:

`draft → pending_payment → confirmed → checked_in → checked_out → completed`

Exception states:

`cancelled → refunded → expired`

## Output format

Return the final work as a complete project folder with:

```txt
lumastay/
  app/
  components/
  components/ui/
  data/
  docs/
  lib/
  prompts/
  public/
  AGENTS.md
  README.md
  package.json
  tailwind.config.ts
  tsconfig.json
  next.config.mjs
```

## Implementation plan

Work in vertical slices:

### Slice 1 — Foundation

- Create Next.js app structure.
- Add Tailwind tokens and global CSS.
- Add base UI primitives: Button, Card, Badge, Input, Label.
- Add typed data contract.
- Add mock JSON.

### Slice 2 — Homepage

- Header and footer.
- Premium hotel-building hero.
- Floating booking search card.
- Featured rooms.
- Trust stats.
- Experiences.
- Testimonials.
- Final CTA.

### Slice 3 — Room discovery

- Rooms listing.
- Room card component.
- Room detail route.
- Amenity and policy blocks.
- Reserve CTA.

### Slice 4 — Booking lifecycle

- Booking summary.
- Checkout form.
- Mock payment panel.
- Confirmation receipt.
- Booking status helpers.

### Slice 5 — Dashboards

- User dashboard.
- Admin dashboard.
- Status cards.
- Reservation table.
- Upcoming check-ins.

### Slice 6 — QA and polish

- Mobile responsiveness.
- Consistent spacing.
- CTA hierarchy.
- Empty/error-ready states where useful.
- Build check.
- Documentation review.

## Evaluation criteria

The project is successful if and only if:

1. It looks premium, warm, clean, and hospitality-grade.
2. It follows the LumaStay design system exactly.
3. It demonstrates a complete booking lifecycle, not just a static landing page.
4. It uses mock JSON cleanly and can later be replaced by a real backend.
5. It has reusable components and understandable architecture.
6. It runs locally with `npm install` and `npm run dev`.
7. It is ready to deploy on Vercel.
8. It is credible enough to appear in the Bespoke Technologies project showcase.

## Iteration instruction

Before returning the final answer, self-review the work against the evaluation criteria above.

If any criterion fails:

- Fix the weakest area.
- Re-run the mental QA.
- Only return the final project after it passes.

Show only final deliverables and a concise summary of what was built. Do not dump unnecessary reasoning.
