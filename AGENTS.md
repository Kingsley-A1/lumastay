# AGENTS.md — LumaStay Engineering Instructions

## Mission

Build and maintain **LumaStay**, a premium hotel reservation website prototype that demonstrates Bespoke Technologies' ability to ship clean hospitality software, not just a landing page.

## Non-negotiable standard

This project must remain:

- Clean
- Fast
- Consistent
- Controlled
- Premium
- Accessible
- Booking-lifecycle complete
- Mock-data-first
- Easy to hand over

## Required references before any work

Read these files before editing:

1. `docs/LumaStay_Design_System.md`
2. `docs/PROJECT_ARCHITECTURE.md`
3. `docs/MOCK_DATA_CONTRACT.md`
4. `docs/QA_CHECKLIST.md`
5. `prompts/00_MASTER_AGENT_PROMPT.md`

## Build constraints

- Framework: Next.js App Router
- Language: TypeScript only
- Styling: Tailwind CSS only
- Components: shadcn/ui-style reusable components
- Data: mock JSON first
- Deployment target: Vercel
- No backend implementation in this prototype
- No random color creation
- No overdecorated UI
- No fake production payment integration
- No claims that external hotel images belong to LumaStay

## Approved booking lifecycle

Primary flow:

`draft → pending_payment → confirmed → checked_in → checked_out → completed`

Exception flow:

`cancelled → refunded → expired`

Use these exact status values in mock data, labels, badges, and logic.

## Component discipline

Create reusable components when a UI pattern appears more than once.

Preferred component layers:

1. `components/ui/*` — primitive shadcn-style building blocks
2. `components/*` — product-specific components
3. `app/*` — route composition only
4. `lib/*` — data access, utilities, lifecycle helpers, types
5. `data/*` — mock data

## Copy rules

Use short, warm, premium copy. Avoid hype.

Allowed voice:

- Calm
- Clear
- Helpful
- Trustworthy
- Hospitality-aware

Avoid:

- “World-class”
- “Revolutionary”
- “Next-generation”
- “Best-in-class”
- Long marketing paragraphs
- Empty luxury language

## Quality gate before completion

Before returning final work, verify:

- The UI follows the LumaStay design system.
- Every core route loads without runtime errors.
- The booking lifecycle is visible and understandable.
- Mock data drives rooms, bookings, amenities, stats, and dashboard panels.
- Mobile layout is usable.
- CTA hierarchy is clear.
- Coral is reserved for high-value actions.
- The project can deploy on Vercel.
