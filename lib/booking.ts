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
  };
  return colors[status] ?? "bg-gray-100 text-gray-700";
}

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

export function isBookingActive(status: BookingStatus | string): boolean {
  return [
    BookingStatus.Confirmed,
    BookingStatus.CheckedIn,
    BookingStatus.PendingPayment,
  ].includes(status as BookingStatus);
}
