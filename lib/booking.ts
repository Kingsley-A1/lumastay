import type { BookingStatus, RoomAvailability } from "@/lib/types";

export const bookingLifecycle: BookingStatus[] = [
  "draft",
  "pending_payment",
  "confirmed",
  "checked_in",
  "checked_out",
  "completed",
];

export const exceptionStatuses: BookingStatus[] = ["cancelled", "refunded", "expired"];

export function getStatusMeta(status: BookingStatus): {
  label: string;
  tone: "default" | "success" | "warning" | "destructive" | "muted";
  description: string;
} {
  const map: Record<BookingStatus, { label: string; tone: "default" | "success" | "warning" | "destructive" | "muted"; description: string }> = {
    draft: { label: "Draft", tone: "muted", description: "Reservation started but not submitted." },
    pending_payment: { label: "Pending payment", tone: "warning", description: "Guest details saved. Payment is still required." },
    confirmed: { label: "Confirmed", tone: "success", description: "Reservation is confirmed and ready for check-in." },
    checked_in: { label: "Checked in", tone: "default", description: "Guest has checked in." },
    checked_out: { label: "Checked out", tone: "default", description: "Guest has checked out. Final review pending." },
    completed: { label: "Completed", tone: "success", description: "Stay has been completed." },
    cancelled: { label: "Cancelled", tone: "destructive", description: "Reservation was cancelled." },
    refunded: { label: "Refunded", tone: "muted", description: "Payment has been refunded." },
    expired: { label: "Expired", tone: "destructive", description: "Reservation expired before payment." },
  };

  return map[status];
}

export function getAvailabilityMeta(availability: RoomAvailability, roomsLeft: number) {
  if (availability === "sold_out") {
    return { label: "Sold out", tone: "destructive" as const };
  }

  if (availability === "few_left") {
    return { label: `${roomsLeft} rooms left`, tone: "warning" as const };
  }

  return { label: "Available", tone: "success" as const };
}

export function createBookingReference() {
  return `LMS-${Math.floor(10000 + Math.random() * 89999)}`;
}
