import { BookingStatus } from "./types";

export function getStatusLabel(status: BookingStatus | string): string {
  const labels: Record<string, string> = {
    [BookingStatus.Draft]: "Draft",
    [BookingStatus.PendingPayment]: "Pending Payment",
    [BookingStatus.Confirmed]: "Confirmed",
    [BookingStatus.CheckedIn]: "Checked In",
    [BookingStatus.CheckedOut]: "Checked Out",
    [BookingStatus.Completed]: "Completed",
    [BookingStatus.Cancelled]: "Cancelled",
    [BookingStatus.Refunded]: "Refunded",
    [BookingStatus.Expired]: "Expired",
  };
  return labels[status] ?? status;
}

export function getStatusColor(status: BookingStatus | string): string {
  const colors: Record<string, string> = {
    [BookingStatus.Draft]: "bg-gray-100 text-gray-700",
    [BookingStatus.PendingPayment]: "bg-amber-100 text-amber-800",
    [BookingStatus.Confirmed]: "bg-green-100 text-green-800",
    [BookingStatus.CheckedIn]: "bg-blue-100 text-blue-800",
    [BookingStatus.CheckedOut]: "bg-purple-100 text-purple-800",
    [BookingStatus.Completed]: "bg-green-100 text-green-800",
    [BookingStatus.Cancelled]: "bg-red-100 text-red-800",
    [BookingStatus.Refunded]: "bg-slate-100 text-slate-700",
    [BookingStatus.Expired]: "bg-gray-100 text-gray-500",
  };
  return colors[status] ?? "bg-gray-100 text-gray-700";
}

/** The ordered, normal (non-exception) booking lifecycle. */
export const BOOKING_LIFECYCLE: BookingStatus[] = [
  BookingStatus.Draft,
  BookingStatus.PendingPayment,
  BookingStatus.Confirmed,
  BookingStatus.CheckedIn,
  BookingStatus.CheckedOut,
  BookingStatus.Completed,
];

export function getNextStatus(status: BookingStatus): BookingStatus | null {
  const flow: Partial<Record<BookingStatus, BookingStatus>> = {
    [BookingStatus.Draft]: BookingStatus.PendingPayment,
    [BookingStatus.PendingPayment]: BookingStatus.Confirmed,
    [BookingStatus.Confirmed]: BookingStatus.CheckedIn,
    [BookingStatus.CheckedIn]: BookingStatus.CheckedOut,
    [BookingStatus.CheckedOut]: BookingStatus.Completed,
  };
  return flow[status] ?? null;
}

/** Active = the reservation is live and upcoming/in-progress. */
export function isBookingActive(status: BookingStatus | string): boolean {
  return [
    BookingStatus.PendingPayment,
    BookingStatus.Confirmed,
    BookingStatus.CheckedIn,
  ].includes(status as BookingStatus);
}

/** A guest may cancel a reservation that has not yet started or finished. */
export function isCancellable(status: BookingStatus | string): boolean {
  return [
    BookingStatus.Draft,
    BookingStatus.PendingPayment,
    BookingStatus.Confirmed,
  ].includes(status as BookingStatus);
}

/** Terminal exception states the lifecycle cannot advance from. */
export function isExceptionStatus(status: BookingStatus | string): boolean {
  return [
    BookingStatus.Cancelled,
    BookingStatus.Refunded,
    BookingStatus.Expired,
  ].includes(status as BookingStatus);
}

/** Buckets used by the dashboard filter tabs. */
export function isUpcoming(status: BookingStatus | string): boolean {
  return [
    BookingStatus.PendingPayment,
    BookingStatus.Confirmed,
    BookingStatus.CheckedIn,
  ].includes(status as BookingStatus);
}

export function isCompleted(status: BookingStatus | string): boolean {
  return [BookingStatus.CheckedOut, BookingStatus.Completed].includes(
    status as BookingStatus
  );
}

export function isCancelled(status: BookingStatus | string): boolean {
  return [
    BookingStatus.Cancelled,
    BookingStatus.Refunded,
    BookingStatus.Expired,
  ].includes(status as BookingStatus);
}
