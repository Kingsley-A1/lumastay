# LumaStay QA Checklist

## Visual QA

- [ ] Warm ivory background is used as the main page background.
- [ ] White cards are used for forms, room cards, and panels.
- [ ] Coral is used only for primary actions and active booking moments.
- [ ] Palm green is used only for availability, confirmed states, and trust signals.
- [ ] Typography is clean, readable, and not oversized without purpose.
- [ ] Sections have generous whitespace.
- [ ] Mobile layouts are not cramped.
- [ ] No random colors or gradients were introduced.

## UX QA

- [ ] Homepage has a clear booking search card.
- [ ] Users can reach rooms from the homepage.
- [ ] Room cards clearly show price, capacity, status, and CTA.
- [ ] Room details page has enough information to book.
- [ ] Checkout form is simple and understandable.
- [ ] Confirmation page looks like a real receipt.
- [ ] Dashboard shows current and past bookings.
- [ ] Admin page shows reservation status and operational metrics.

## Engineering QA

- [ ] TypeScript types compile.
- [ ] Mock data is imported through `lib/data.ts`.
- [ ] Repeated UI patterns are components.
- [ ] No dead routes are linked.
- [ ] No backend secrets or API keys exist.
- [ ] Project is Vercel-ready.

## Booking lifecycle QA

- [ ] Statuses use the approved lifecycle values.
- [ ] Pending payment and confirmed states are visually distinct.
- [ ] Cancelled/refunded/expired are treated as exception states.
- [ ] User dashboard and admin dashboard use the same status language.
