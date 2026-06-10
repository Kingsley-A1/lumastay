# LumaStay Mock Data Contract

The prototype uses `data/lumastay.json` as the mock data source.

## Required top-level keys

```ts
{
  hotel: Hotel;
  rooms: Room[];
  bookings: Booking[];
  guests: Guest[];
  stats: DashboardStat[];
  experiences: Experience[];
  testimonials: Testimonial[];
}
```

## Booking status values

Use only:

- `draft`
- `pending_payment`
- `confirmed`
- `checked_in`
- `checked_out`
- `completed`
- `cancelled`
- `refunded`
- `expired`

## Room availability values

Use only:

- `available`
- `few_left`
- `sold_out`

## Money

Store prices as numbers and display them using `Intl.NumberFormat` through `formatCurrency` in `lib/utils.ts`.

## Images

Image URLs may use external royalty-free stock sources for prototype purposes. Do not claim these are real LumaStay-owned hotel properties.

## Rule

Do not add new data fields casually. If a field is needed by more than one page, update this contract and `lib/types.ts` first.
