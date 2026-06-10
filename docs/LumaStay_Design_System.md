# LumaStay Design System

**Project:** LumaStay Hotel Reservation Website  
**Primary build:** Next.js + TypeScript + Tailwind CSS + shadcn/ui + mock JSON first + Vercel deployment  
**Version:** 1.0  
**Owner:** Bespoke Technologies  
**Purpose:** Give every design, product, and engineering agent one controlled guide for building LumaStay without hallucinating, drifting, over-designing, or creating inconsistent UI.

---

## 1. Product Direction

LumaStay is a premium, welcoming, lively hotel reservation website prototype. It should feel like a real hospitality product: clean, fast, trustworthy, warm, and easy to book from.

The website must demonstrate that Bespoke Technologies can build a complete digital system, not just a landing page. The final prototype should support the full user and booking lifecycle using mock JSON data first.

### Product promise

> Premium hotel reservations, made effortless.

### Core user outcome

A guest should be able to discover the hotel, explore rooms, choose dates, reserve a room, enter guest details, complete a mock payment, receive a booking confirmation, and view/manage bookings from a user dashboard.

### Business showcase outcome

The project must showcase Bespoke Technologies' ability to deliver:

- Premium frontend UI
- Real booking flow logic
- Clean component architecture
- Hospitality-grade visual design
- User dashboard experience
- Reservation lifecycle thinking
- Admin-ready system structure
- AI/business expansion potential later

---

## 2. Brand Personality

LumaStay must feel:

- Welcoming
- Premium
- Calm
- Bright
- Lively
- Professional
- Fast
- Trustworthy
- Human
- Clean
- Modern

### What LumaStay is not

LumaStay is not loud, childish, luxury-for-luxury-sake, overdecorated, dark-heavy, gimmicky, generic, or cluttered.

### Design sentence

> LumaStay should feel like morning light entering a premium hotel lobby: warm, clean, organized, elegant, and easy to trust.

---

## 3. Visual Direction

### Preferred homepage hero direction

Use a clean hero section with:

- A premium elevated hotel building image
- Minimal welcoming copy
- A floating booking search card
- Clear primary CTA
- Soft warm background
- Strong spacing and alignment

The hero must communicate hospitality quickly. Do not use excessive paragraphs.

### Visual principles

1. **Whitespace before decoration**  
   Use spacing, clean typography, and visual hierarchy before adding effects.

2. **One dominant action per section**  
   Every section should make the next action obvious.

3. **Warmth + precision**  
   The design must feel human and comfortable, but the layout must remain disciplined.

4. **Premium does not mean dark everywhere**  
   LumaStay is bright, warm, and refined. Use navy for authority, not as the whole personality.

5. **Lively means controlled accent usage**  
   Coral should draw attention to key booking actions only.

---

## 4. Colour System

Use this palette exactly unless the product owner approves changes.

| Role | Name | Hex | Usage |
|---|---|---:|---|
| Primary | Deep Navy | `#0B1324` | Header, footer, premium panels, primary text moments |
| Accent | Sunset Coral | `#F9735B` | Primary CTAs, booking highlights, selected states |
| Secondary | Palm Green | `#2F7D6D` | Availability, confirmed states, trust signals |
| Background | Warm Ivory | `#FFF8EF` | Main page background, warm hospitality sections |
| Surface | Clean White | `#FFFFFF` | Cards, forms, sheets, room panels |
| Soft Surface | Sand Beige | `#F3E7D3` | Alternating sections, subtle panels, warm dividers |
| Text Primary | Charcoal Navy | `#111827` | Main text |
| Text Muted | Slate Gray | `#64748B` | Descriptions, metadata, helper text |
| Border | Mist Gray | `#E5E7EB` | Inputs, dividers, cards |
| Success | Fresh Green | `#16A34A` | Confirmed, available, completed |
| Warning | Amber | `#F59E0B` | Pending payment, few rooms left |
| Error | Red | `#DC2626` | Cancelled, failed, unavailable |

### Colour usage rules

- Use `#FFF8EF` as the main warm background.
- Use `#FFFFFF` for cards and major surfaces.
- Use `#0B1324` for authority: navbar text, footer, premium blocks, major headings when needed.
- Use `#F9735B` only for high-value actions: `Book Now`, `Reserve Room`, `Continue`, `Confirm Booking`.
- Use `#2F7D6D` for availability and trust moments.
- Do not place coral text on white for long body copy.
- Do not use more than one strong accent in a single CTA cluster.
- Avoid random gradients. If a gradient is needed, keep it subtle and warm.

### Approved gradients

Use only these subtle gradients:

```css
/* Hero warmth */
background: linear-gradient(135deg, #FFF8EF 0%, #FFFFFF 52%, #F3E7D3 100%);

/* Premium navy panel */
background: linear-gradient(135deg, #0B1324 0%, #111827 100%);

/* Soft coral glow, decorative only */
background: radial-gradient(circle, rgba(249, 115, 91, 0.18) 0%, rgba(249, 115, 91, 0) 62%);
```

Do not use loud multi-colour gradients.

---

## 5. shadcn/ui Theme Tokens

Use semantic tokens so components stay consistent.

```css
:root {
  --background: 34 100% 97%;        /* #FFF8EF */
  --foreground: 221 39% 11%;        /* #111827 */

  --card: 0 0% 100%;                /* #FFFFFF */
  --card-foreground: 221 39% 11%;   /* #111827 */

  --popover: 0 0% 100%;
  --popover-foreground: 221 39% 11%;

  --primary: 221 53% 9%;            /* #0B1324 */
  --primary-foreground: 0 0% 100%;

  --secondary: 38 57% 89%;          /* #F3E7D3 */
  --secondary-foreground: 221 39% 11%;

  --muted: 38 57% 89%;              /* #F3E7D3 */
  --muted-foreground: 215 16% 47%;  /* #64748B */

  --accent: 9 93% 67%;              /* #F9735B */
  --accent-foreground: 0 0% 100%;

  --destructive: 0 72% 51%;         /* #DC2626 */
  --destructive-foreground: 0 0% 100%;

  --border: 220 13% 91%;            /* #E5E7EB */
  --input: 220 13% 91%;
  --ring: 9 93% 67%;                /* #F9735B */

  --radius: 1rem;
}
```

### Agent rule

Do not create new arbitrary colours in components. Use existing semantic tokens and approved hex values only.

---

## 6. Typography

### Primary font

Use **Inter** as the default product font.

Fallback:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Typography style

- Headings: confident, clean, premium.
- Body: readable, calm, direct.
- Labels: short and clear.
- Buttons: action-driven, not clever.

### Type scale

| Token | Size | Usage |
|---|---:|---|
| `text-xs` | 12px | Tags, metadata, micro labels |
| `text-sm` | 14px | Form labels, helper text, nav items |
| `text-base` | 16px | Body copy, inputs |
| `text-lg` | 18px | Section intro text, cards |
| `text-xl` | 20px | Card titles |
| `text-2xl` | 24px | Small section headings |
| `text-3xl` | 30px | Section headings |
| `text-4xl` | 36px | Hero mobile heading |
| `text-5xl` | 48px | Hero desktop heading |
| `text-6xl` | 60px | Maximum hero heading, only if spacious |

### Weight rules

- Hero heading: `font-semibold` or `font-bold`
- Section heading: `font-semibold`
- Card title: `font-semibold`
- Body: `font-normal`
- Button: `font-medium`
- Avoid `font-extrabold` unless the layout clearly needs it.

### Copy length rules

- Hero heading: max 8 words.
- Hero paragraph: max 24 words.
- Card descriptions: max 18 words.
- Buttons: 1–3 words.

---

## 7. Spacing, Radius, Shadow, and Layout Tokens

### Spacing scale

Use Tailwind spacing only. Do not invent inconsistent pixel values.

| Token | Value | Usage |
|---|---:|---|
| `px-4` | 16px | Mobile horizontal padding |
| `px-6` | 24px | Tablet padding |
| `px-8` | 32px | Desktop section inner padding |
| `py-12` | 48px | Small sections |
| `py-16` | 64px | Standard sections |
| `py-24` | 96px | Hero/major sections |
| `gap-4` | 16px | Small component groups |
| `gap-6` | 24px | Card grids |
| `gap-8` | 32px | Section layouts |
| `gap-12` | 48px | Hero split layouts |

### Radius

| Token | Usage |
|---|---|
| `rounded-lg` | Small controls, badges |
| `rounded-xl` | Inputs, mini cards |
| `rounded-2xl` | Standard cards |
| `rounded-3xl` | Hero cards, major panels |
| `rounded-full` | Pills, avatars, icon buttons |

Default product radius: **soft but controlled**. Avoid sharp enterprise-only corners and avoid bubble-like childish corners.

### Shadows

Use shadows sparingly.

Approved:

```ts
shadow-sm
shadow-md
shadow-lg
shadow-xl
```

For premium cards, prefer:

```css
box-shadow: 0 24px 70px rgba(11, 19, 36, 0.08);
```

Do not use heavy black shadows, neon glow, or floating effects everywhere.

### Max widths

| Container | Class |
|---|---|
| Standard site container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Text-only section | `max-w-3xl mx-auto` |
| Form page | `max-w-2xl mx-auto` |
| Booking layout | `max-w-6xl mx-auto` |
| Admin dashboard | `max-w-screen-2xl mx-auto` |

---

## 8. Iconography

Use **lucide-react** icons only.

Approved icon style:

- Stroke-based
- 1.5px to 2px weight
- Rounded
- Minimal
- Consistent size

Common sizes:

- `h-4 w-4` for inline metadata
- `h-5 w-5` for buttons and nav
- `h-6 w-6` for card icons
- `h-8 w-8` for feature icons

Do not mix icon libraries unless explicitly approved.

---

## 9. Imagery Rules

Images are central to LumaStay. They must feel premium, warm, natural, and realistic.

### Approved image sources

Use public/free-to-use hotel, interior, travel, restaurant, spa, pool, and lifestyle images from trusted image libraries such as:

- Unsplash
- Pexels
- Pixabay

### Image ethics rule

Do not present a real hotel image as the actual LumaStay property if the image clearly identifies a real-world hotel brand. Avoid logos, signage, watermarks, exact branded buildings, and recognizable real hotel names.

### Image style

Use images that are:

- Bright but not overexposed
- Clean and premium
- Warm-toned
- Calm and realistic
- Spacious
- Hospitality-related
- High resolution

Avoid images that are:

- Dark and moody everywhere
- Overly corporate
- Cheap stock-photo looking
- Crowded
- Low resolution
- Watermarked
- Visibly AI-distorted
- Full of unrelated tourists
- Inconsistent in colour temperature

### Required image categories

Use mock data images for:

- Hotel exterior/elevated building
- Deluxe room
- Executive suite
- Family room
- Pool area
- Restaurant/dining
- Lobby/lounge
- Spa/wellness
- City/travel experience

### Image treatment

- Use `object-cover`.
- Use consistent aspect ratios.
- Use rounded corners on cards.
- Use subtle overlays only when text sits on images.
- Never place long text directly on busy images.

Approved aspect ratios:

| Context | Ratio/Class |
|---|---|
| Hero image | `aspect-[4/3]` or `aspect-[16/10]` |
| Room card | `aspect-[4/3]` |
| Gallery image | `aspect-[16/10]` |
| Avatar/testimonial | `aspect-square` |
| Dashboard thumbnail | `aspect-[4/3]` |

---

## 10. Core Components

Build with shadcn/ui primitives. Customize through variants and tokens, not one-off styling.

### Required shadcn/ui components

- Button
- Card
- Input
- Label
- Select
- Calendar
- Popover
- Dialog
- Sheet
- Tabs
- Badge
- Separator
- DropdownMenu
- Avatar
- Skeleton
- Toast/Sonner
- Table
- Checkbox
- RadioGroup
- Textarea

### Button system

Primary CTA:

- Background: `#F9735B`
- Text: white
- Radius: `rounded-xl` or `rounded-full`
- Used for booking actions only

Examples:

- `Book Now`
- `Reserve Room`
- `Continue`
- `Confirm Booking`

Secondary CTA:

- White or transparent background
- Navy text
- Border: `#E5E7EB`

Examples:

- `Explore Rooms`
- `View Details`
- `Modify Booking`

Destructive CTA:

- Red only for cancellation or destructive actions

Examples:

- `Cancel Booking`
- `Remove Guest`

### Button rules

- Do not use more than two CTAs beside each other.
- Primary action must be visually dominant.
- Avoid vague button labels like `Submit` where a more specific action exists.
- Use loading states for mock async actions.

### Cards

Cards should be clean, spacious, and structured.

Standard card structure:

1. Image or icon
2. Title
3. Short description or metadata
4. Key value or price
5. Action

Room card must include:

- Room image
- Room name
- Short room description
- Guest capacity
- Bed type
- Price per night
- Availability badge
- `View Room` or `Book Now`

### Forms

Forms must be calm and easy to complete.

Rules:

- Labels always visible.
- Placeholder text must not replace labels.
- Show helper text only when useful.
- Show inline errors close to the field.
- Group related fields logically.
- Use generous vertical spacing.
- Use mobile-friendly input sizes.

Minimum input height:

```css
h-11 or h-12
```

### Badges

Approved badge statuses:

| Status | Colour intent |
|---|---|
| Available | Green |
| Few rooms left | Amber |
| Unavailable | Red/Muted |
| Confirmed | Green |
| Pending Payment | Amber |
| Checked In | Navy |
| Completed | Green/Muted |
| Cancelled | Red |
| Refunded | Slate/Muted |

Do not invent random badge colours.

---

## 11. Page Architecture

### Public pages

1. `/` — Homepage
2. `/rooms` — Room listing/search results
3. `/rooms/[slug]` — Room detail page
4. `/booking` — Booking flow start/summary
5. `/booking/guest-details` — Guest information
6. `/booking/payment` — Mock payment
7. `/booking/confirmation/[bookingId]` — Confirmation page
8. `/about` — About the hotel/platform
9. `/contact` — Contact/support page

### User pages

1. `/account` — User dashboard overview
2. `/account/bookings` — My bookings
3. `/account/bookings/[bookingId]` — Booking detail
4. `/account/profile` — Guest profile

### Admin prototype pages

1. `/admin` — Admin dashboard
2. `/admin/reservations` — Reservation management
3. `/admin/rooms` — Room management
4. `/admin/guests` — Guest/customer list
5. `/admin/reports` — Booking/sales reports

### Agent rule

Build public booking flow first. Admin pages can be lower fidelity but must look consistent.

---

## 12. Homepage Requirements

The homepage must be the cleanest and most premium part of the prototype.

### Required sections

1. Navbar
2. Hero section with booking search card
3. Featured rooms
4. Why choose LumaStay
5. Hotel experiences/amenities
6. Guest testimonials
7. Location or nearby experiences
8. Final CTA
9. Footer

### Hero section

Hero headline:

> Find your perfect stay, beautifully.

Hero supporting text:

> Book premium rooms, relaxing spaces, and memorable hotel experiences with a fast, simple reservation flow.

Primary CTA:

> Reserve a Room

Secondary CTA:

> Explore Rooms

Hero booking card fields:

- Destination/Hotel
- Check-in date
- Check-out date
- Guests
- Rooms
- Search button

### Navbar

Required nav items:

- Rooms
- Experiences
- About
- Contact
- Sign in
- `Book Now` button

Navbar rules:

- Use sticky navbar only if it stays clean.
- On scroll, use white/blurred surface with soft border.
- Mobile nav should use Sheet component.
- Do not overcrowd navigation.

### Footer

Footer must include:

- LumaStay brand name
- Short tagline
- Quick links
- Contact placeholder
- Social placeholder
- Bespoke Technologies showcase note optional

Do not make footer visually heavier than the homepage.

---

## 13. Room Listing Page

The room listing page must feel fast and useful.

### Required features

- Search/filter bar
- Date range selector
- Guest selector
- Sort dropdown
- Room cards grid
- Active filter chips
- Empty state
- Loading skeletons

### Filters

Mock filters:

- Price range
- Room type
- Guest capacity
- Bed type
- Amenities
- Availability

### Sort options

Use these exact values:

```ts
recommended
price_low_high
price_high_low
most_spacious
highest_rated
```

### Empty state copy

> No rooms match your search.

Supporting text:

> Try adjusting your dates, guest count, or filters to see more available rooms.

CTA:

> Reset Filters

---

## 14. Room Detail Page

### Required sections

1. Room gallery
2. Room title and rating
3. Price per night
4. Short description
5. Amenities
6. Capacity and bed details
7. Booking card
8. Policies
9. Similar rooms

### Booking card fields

- Check-in
- Check-out
- Guests
- Nights count
- Room price
- Taxes/fees mock value
- Total price
- Reserve button

### Important rule

The booking card must remain clear and sticky on desktop, but not intrusive on mobile.

---

## 15. Booking Lifecycle

Use this lifecycle exactly for mock data and UI states.

### Primary lifecycle

```ts
draft -> pending_payment -> confirmed -> checked_in -> checked_out -> completed
```

### Exception lifecycle

```ts
cancelled -> refunded -> expired
```

### Status definitions

| Status | Meaning | UI treatment |
|---|---|---|
| `draft` | User started booking but has not submitted details | Muted |
| `pending_payment` | Guest details submitted, payment not completed | Amber |
| `confirmed` | Booking completed successfully | Green |
| `checked_in` | Guest has arrived | Navy |
| `checked_out` | Guest has left, stay not fully closed | Slate |
| `completed` | Stay fully completed | Green muted |
| `cancelled` | Booking cancelled | Red |
| `refunded` | Payment refunded | Slate |
| `expired` | Booking held but not paid in time | Amber/Muted |

### Mock booking actions

Allowed user actions:

- Create booking
- Continue to payment
- Confirm mock payment
- View confirmation
- View booking detail
- Modify dates before check-in
- Cancel booking before check-in
- Download mock invoice/receipt

Allowed admin actions:

- View reservation
- Change reservation status
- Mark as checked in
- Mark as checked out
- Cancel booking
- Update room availability

---

## 16. Mock JSON Data Model

Use mock JSON first. Do not wire real backend until the prototype experience is clean.

### Room model

```ts
export type Room = {
  id: string;
  slug: string;
  name: string;
  type: "standard" | "deluxe" | "executive" | "suite" | "family";
  description: string;
  longDescription: string;
  pricePerNight: number;
  currency: "NGN" | "USD";
  capacity: number;
  bedType: string;
  sizeSqm: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  availability: "available" | "few_left" | "unavailable";
  featured: boolean;
};
```

### Booking model

```ts
export type BookingStatus =
  | "draft"
  | "pending_payment"
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "completed"
  | "cancelled"
  | "refunded"
  | "expired";

export type Booking = {
  id: string;
  bookingCode: string;
  roomId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  rooms: number;
  subtotal: number;
  taxesAndFees: number;
  total: number;
  currency: "NGN" | "USD";
  status: BookingStatus;
  paymentStatus: "unpaid" | "paid" | "failed" | "refunded";
  createdAt: string;
};
```

### Guest model

```ts
export type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality?: string;
  specialRequests?: string;
};
```

### Admin analytics model

```ts
export type HotelAnalytics = {
  totalBookings: number;
  confirmedBookings: number;
  occupancyRate: number;
  revenueThisMonth: number;
  averageNightlyRate: number;
  cancellationRate: number;
};
```

### Agent rule

Mock data must be realistic, structured, and reusable. Do not scatter fake data directly inside UI components. Put mock data in `/lib/mock-data` or `/data`.

---

## 17. Recommended Folder Structure

```txt
/src
  /app
    /(public)
      /page.tsx
      /rooms/page.tsx
      /rooms/[slug]/page.tsx
      /booking/page.tsx
      /booking/guest-details/page.tsx
      /booking/payment/page.tsx
      /booking/confirmation/[bookingId]/page.tsx
    /account
      /page.tsx
      /bookings/page.tsx
      /bookings/[bookingId]/page.tsx
      /profile/page.tsx
    /admin
      /page.tsx
      /reservations/page.tsx
      /rooms/page.tsx
      /guests/page.tsx
      /reports/page.tsx
  /components
    /layout
    /home
    /rooms
    /booking
    /account
    /admin
    /shared
    /ui
  /data
    rooms.ts
    bookings.ts
    guests.ts
    testimonials.ts
    amenities.ts
  /lib
    utils.ts
    booking.ts
    pricing.ts
    formatters.ts
  /types
    room.ts
    booking.ts
    guest.ts
```

### Component naming

Use clear component names:

- `SiteHeader`
- `SiteFooter`
- `HeroBookingCard`
- `RoomCard`
- `RoomGallery`
- `BookingSummaryCard`
- `GuestDetailsForm`
- `PaymentMockCard`
- `BookingStatusBadge`
- `AdminStatsCard`

Avoid vague names like `CardOne`, `MainBox`, `NewSection`, `Thing`, or `Content`.

---

## 18. Interaction and Motion

Motion should feel premium and light.

### Approved motion

- Button hover: subtle lift or shade change
- Card hover: image scale from `1` to `1.03`
- Dialog/sheet transitions from shadcn default
- Skeleton loading states
- Smooth scroll only where helpful

### Timing

```css
transition-all duration-200 ease-out
```

For larger page transitions:

```css
duration-300 ease-out
```

### Do not use

- Bouncy animations
- Spinning elements except loading indicators
- Constant moving backgrounds
- Excessive parallax
- Random reveal animations on every section

---

## 19. Accessibility Rules

Accessibility is part of product quality.

Minimum requirements:

- Semantic HTML
- Keyboard navigable forms and dialogs
- Visible focus states
- Alt text for all meaningful images
- Empty alt text for purely decorative images
- Labels for all inputs
- Clear error messages
- Sufficient colour contrast
- Buttons must not be divs
- Links must not be fake buttons unless semantically correct
- Date pickers must be usable with keyboard as much as the component allows

### Focus style

Use coral ring consistently:

```css
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9735B] focus-visible:ring-offset-2
```

Do not remove focus styles without replacing them.

---

## 20. Responsive Design

Design mobile-first, then enhance for desktop.

### Breakpoints

Use Tailwind defaults:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile rules

- Booking card must be easy to use with thumbs.
- Inputs should be full width.
- Avoid horizontal scroll.
- Room cards become single-column.
- Sticky desktop panels should become normal blocks.
- Mobile nav uses Sheet.

### Desktop rules

- Use two-column hero layout where appropriate.
- Room detail can use image gallery + sticky booking card.
- Admin dashboard can use multi-column grid.
- Keep max-width controlled.

---

## 21. Copywriting System

LumaStay copy must be short, warm, premium, and useful.

### Voice

- Clear
- Calm
- Welcoming
- Helpful
- Confident
- Not salesy

### Do use

- “Reserve your stay”
- “Premium rooms for restful nights”
- “Your booking is confirmed”
- “Choose your dates”
- “Few rooms left”
- “Relax. Your room is ready.”

### Do not use

- “Book now!!!”
- “Luxury like never before”
- “World-class unforgettable paradise experience”
- “Click here”
- “Submit” when a more specific action exists

### Microcopy examples

Booking confirmation:

> Your stay is confirmed. We’ve saved your booking details and prepared your reservation summary.

Pending payment:

> Complete your mock payment to confirm this reservation.

Cancellation warning:

> Cancelling this booking will release your selected room and dates.

Empty bookings:

> You have no bookings yet. Explore available rooms and reserve your next stay.

---

## 22. Pricing and Currency Rules

Default prototype currency: **NGN**.

Format prices like:

```txt
₦85,000 / night
```

Use helper functions for formatting. Do not manually concatenate prices across components.

Example helper:

```ts
export function formatCurrency(amount: number, currency: "NGN" | "USD" = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
```

### Mock pricing rules

- Standard Room: ₦45,000 – ₦65,000/night
- Deluxe Room: ₦70,000 – ₦95,000/night
- Executive Room: ₦100,000 – ₦145,000/night
- Suite: ₦160,000 – ₦280,000/night
- Family Room: ₦120,000 – ₦180,000/night

Keep pricing realistic and internally consistent.

---

## 23. Admin Dashboard Design

The admin side should feel operational, not decorative.

### Admin visual style

- More white surfaces
- More tables
- Clear statuses
- Less marketing imagery
- Strong hierarchy
- Clean filters

### Required admin metrics

- Total bookings
- Confirmed bookings
- Occupancy rate
- Monthly revenue
- Pending payments
- Cancellations

### Admin reservation table columns

- Booking code
- Guest
- Room
- Check-in
- Check-out
- Total
- Status
- Action

### Admin rule

Admin pages should reuse the same tokens, buttons, badges, and layout discipline. Do not create a different brand inside admin.

---

## 24. Loading, Empty, Error, and Success States

Every major page must have states.

### Loading

Use skeletons for:

- Room cards
- Booking summary
- Dashboard stats
- Tables

### Empty states

Empty states must include:

- Short title
- Helpful explanation
- One action

### Error states

Error states must be calm and useful.

Example:

> We couldn’t load this booking.

Supporting text:

> Please check the booking code or return to your bookings.

CTA:

> Back to My Bookings

### Success states

Use green confirmation and clear next steps.

Example:

> Booking confirmed.

Supporting text:

> Your reservation is ready. You can view your booking details or download your receipt.

---

## 25. Implementation Rules for Agents

### Must do

- Use TypeScript strictly.
- Use reusable components.
- Use mock JSON data first.
- Use semantic design tokens.
- Keep pages fast and clean.
- Use Next.js image optimization where possible.
- Keep components small and readable.
- Extract pricing/date logic into helpers.
- Use URL params for room search/filter state where practical.
- Use loading and empty states.
- Keep UI consistent across public, user, and admin areas.

### Must not do

- Do not hardcode repeated business logic inside JSX.
- Do not invent unapproved colours.
- Do not use random fonts.
- Do not create messy mega components.
- Do not add real payment logic yet.
- Do not pretend mock payment is real.
- Do not use real hotel logos or copyrighted brand assets.
- Do not make the homepage text-heavy.
- Do not add features that break the prototype timeline.

### Mock payment rule

Payment is a simulation only.

Use labels like:

- `Mock Payment`
- `Demo Card`
- `Simulate Successful Payment`

Do not present the prototype as processing real money.

---

## 26. Quality Bar

Before any agent marks work as done, it must pass this checklist.

### Visual quality checklist

- UI feels premium, clean, and consistent.
- Colours follow the design system.
- Buttons have clear hierarchy.
- Cards are aligned and evenly spaced.
- Homepage feels welcoming and not cluttered.
- Mobile layout is clean.
- Images are high quality and consistent.
- No random design patterns appear.

### Product quality checklist

- User can complete booking lifecycle from homepage to confirmation.
- Room detail page calculates nights and totals correctly.
- Booking statuses are consistent.
- Mock data is structured.
- Empty/loading/error states exist.
- User dashboard shows bookings.
- Admin dashboard shows reservations.

### Code quality checklist

- TypeScript types exist for rooms, bookings, and guests.
- Components are named clearly.
- Business logic is extracted into utilities.
- No unused code or dead components.
- No console errors.
- No broken routes.
- No inaccessible buttons/inputs.

---

## 27. Initial Build Phases

### Phase 1 — Design foundation

- Set up Next.js project
- Install Tailwind CSS and shadcn/ui
- Configure theme tokens
- Create layout shell
- Create mock data models
- Build header/footer

### Phase 2 — Public booking experience

- Homepage
- Rooms listing
- Room detail
- Booking summary
- Guest details form
- Mock payment
- Confirmation page

### Phase 3 — User lifecycle

- Account dashboard
- My bookings
- Booking detail
- Cancel/modify mock actions
- Receipt/summary view

### Phase 4 — Admin lifecycle

- Admin dashboard
- Reservations table
- Room management UI
- Guest list
- Reports cards

### Phase 5 — Polish and deployment

- Responsive cleanup
- Loading/empty/error states
- Image optimization
- SEO metadata
- Performance pass
- Vercel deployment
- Bespoke project case study page

---

## 28. Future Elevora Hotel Note

Elevora Hotel will be the more luxury, architectural sibling brand. Do not mix Elevora colours into LumaStay.

Elevora future palette:

| Role | Hex |
|---|---:|
| Midnight Blue | `#08111F` |
| Champagne Gold | `#C9A45C` |
| Deep Teal | `#145C63` |
| Soft Cream | `#FAF4EA` |
| White | `#FFFFFF` |
| Near Black | `#111827` |
| Cool Gray | `#6B7280` |
| Warm Border | `#E7DED2` |

### Separation rule

- LumaStay = bright, lively, warm, product-friendly.
- Elevora Hotel = calmer, more luxurious, architectural, boutique hotel identity.

Build LumaStay first. Do not dilute it with Elevora’s champagne luxury direction.

---

## 29. Final Agent Instruction

When building LumaStay, optimize for this result:

> A fast, premium, warm, and complete hotel reservation prototype that makes Bespoke Technologies look capable of building real business systems, not just beautiful landing pages.

If an agent is unsure, choose the simpler, cleaner, more consistent option. If a design feels noisy, reduce it. If a component feels inconsistent, return to the tokens. If a feature is not required for the booking lifecycle, postpone it.

**Standard:** clean enough for a premium hospitality brand, structured enough for a SaaS product, and polished enough for the Bespoke Technologies project showcase.
