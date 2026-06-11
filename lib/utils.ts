export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function calculateTotal(pricePerNight: number, nights: number): number {
  return pricePerNight * nights;
}

/** Tax + service rate applied to every reservation across the app. */
export const TAX_RATE = 0.12;

/**
 * Single source of truth for reservation pricing. Every surface (room detail,
 * booking summary, checkout, confirmation, seed data) computes totals through
 * this helper so figures never drift apart.
 */
export function calculatePricing(
  pricePerNight: number,
  nights: number
): import("./types").PriceBreakdown {
  const subtotal = pricePerNight * Math.max(0, nights);
  const taxes = Math.round(subtotal * TAX_RATE);
  return { subtotal, taxes, total: subtotal + taxes };
}

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function generateBookingRef(): string {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `BK${digits}`;
}

export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

export function getTomorrowString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}
