export enum BookingStatus {
  // Normal lifecycle
  Draft = "draft",
  PendingPayment = "pending_payment",
  Confirmed = "confirmed",
  CheckedIn = "checked_in",
  CheckedOut = "checked_out",
  Completed = "completed",
  // Exception states
  Cancelled = "cancelled",
  Refunded = "refunded",
  Expired = "expired",
}

export type RoomType = "standard" | "deluxe" | "suite" | "penthouse";
export type RoomStatus = "available" | "occupied" | "maintenance";

export interface Room {
  id: string;
  slug: string;
  name: string;
  type: RoomType;
  description: string;
  amenities: string[];
  images: string[];
  pricePerNight: number;
  maxGuests: number;
  bedType: string;
  size: number;
  floor: number;
  status: RoomStatus;
}

export interface Booking {
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalAmount: number;
  status: BookingStatus | string;
  /** Optional free-text guest requests captured at checkout. */
  specialRequests?: string;
  /** Number of guests on the reservation. */
  guests?: number;
  /** ISO timestamp of when the booking was created (user bookings only). */
  createdAt?: string;
  /** True for reservations created by the guest in this browser session. */
  isUserCreated?: boolean;
}

export interface PriceBreakdown {
  subtotal: number;
  taxes: number;
  total: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface HotelInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  yearEstablished: number;
}

export interface HotelStats {
  totalRooms: number;
  availableRooms: number;
  totalBookings: number;
  occupancyRate: number;
}
