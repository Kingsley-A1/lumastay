# LumaStay Design System

## Brand Identity

LumaStay is a premium, warm, and welcoming hospitality brand. The visual language is clean, modern, and trustworthy — never dark-luxury, never over-decorated.

**Brand values:** Premium · Warm · Welcoming · Clean · Professional

---

## Color Palette

| Name | Hex | Usage |
|---|---|---|
| Deep Navy | `#0B1324` | Page headers, primary text, nav backgrounds |
| Sunset Coral | `#F9735B` | Primary CTAs, highlights, accents |
| Palm Green | `#2F7D6D` | Supporting accent, success states |
| Warm Ivory | `#FFF8EF` | Page background |
| Sand Beige | `#F3E7D3` | Section backgrounds, subtle fills |
| Clean White | `#FFFFFF` | Cards, modals |
| Charcoal Navy | `#111827` | Body text |
| Slate Gray | `#64748B` | Secondary/muted text |
| Mist Gray | `#E5E7EB` | Borders, dividers |
| Fresh Green | `#16A34A` | Confirmed/success status |
| Amber | `#F59E0B` | Warning/pending status |
| Red | `#DC2626` | Error/cancelled status |

**Rules:**
- Do not use colors outside this palette
- Do not overuse coral — reserve it for primary CTAs and key highlights
- Navy is the dominant color; coral is the accent

---

## Typography

- **Font family:** `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Page headings (h1):** `text-5xl font-bold` (48px+)
- **Section headings (h2):** `text-4xl font-bold` (36px)
- **Card headings (h3):** `text-lg font-bold` (18px)
- **Body text:** `text-base` (16px), `leading-relaxed`
- **Caption/meta:** `text-sm text-slate` (14px)
- **Labels/uppercase:** `text-xs font-semibold uppercase tracking-widest`

---

## Spacing

- Section padding: `py-20` (80px top/bottom)
- Card padding: `p-6` (24px)
- Container max-width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Grid gaps: `gap-8` (32px) between cards
- Component gaps: `gap-4` (16px) for smaller internal spacing

---

## Components

### Button

| Variant | Style |
|---|---|
| primary | Coral background, white text — for primary CTAs |
| secondary | Navy border, navy text — for secondary actions |
| ghost | Transparent, navy text — for tertiary actions |
| destructive | Red background — for dangerous/cancel actions |

Sizes: `sm` (14px), `md` (16px), `lg` (18px)

### Badge

| Variant | Color | Use case |
|---|---|---|
| success | Green | Available, Confirmed, Completed |
| warning | Amber | Pending Payment, Occupied |
| error | Red | Cancelled, Maintenance |
| info | Teal | Checked In |
| neutral | Slate | Draft, Checked Out |

### Card

- Background: white
- Border radius: `rounded-2xl`
- Shadow: `shadow-md` default, `shadow-xl` on hover
- Hover effect: `-translate-y-1` lift

---

## Booking Status Lifecycle

```
draft → pending_payment → confirmed → checked_in → checked_out → completed
```

Exception states: `cancelled`, `refunded`, `expired`

| Status | Badge Variant | Meaning |
|---|---|---|
| draft | neutral | Started but not submitted |
| pending_payment | warning | Awaiting payment |
| confirmed | success | Payment received |
| checked_in | info | Guest is on property |
| checked_out | neutral | Guest has left |
| completed | success | Stay fully completed |
| cancelled | error | Booking was cancelled |

---

## Page Layouts

### Homepage
1. Hero (min-h-screen) with background image, dark overlay, booking search card
2. Trust stats bar (dark navy bg)
3. Featured rooms grid (3 columns)
4. Experiences cards (3 columns, beige bg)
5. Testimonials (3 columns, ivory bg)
6. Final CTA (coral bg)

### Room Detail
- Full-width hero image (60vh)
- 2/3 content + 1/3 sticky pricing sidebar
- Gallery grid below hero
- Sections: Description, Room Details, Amenities, Policies

### Booking Flow
- Step indicator (Details → Payment → Confirmation)
- 2/3 main content + 1/3 booking summary sidebar
