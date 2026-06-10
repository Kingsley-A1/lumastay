import rawData from "@/data/lumastay.json";
import type { Room, Booking, Testimonial, HotelInfo, HotelStats } from "./types";

const data = rawData as {
  rooms: Room[];
  bookings: Booking[];
  testimonials: Testimonial[];
  hotelInfo: HotelInfo;
  stats: HotelStats;
};

export function getRooms(): Room[] {
  return data.rooms;
}

export function getRoomBySlug(slug: string): Room | undefined {
  return data.rooms.find((r) => r.slug === slug);
}

export function getBookings(): Booking[] {
  return data.bookings;
}

export function getBookingByRef(ref: string): Booking | undefined {
  return data.bookings.find((b) => b.bookingRef === ref);
}

export function getTestimonials(): Testimonial[] {
  return data.testimonials;
}

export function getHotelInfo(): HotelInfo {
  return data.hotelInfo;
}

export function getStats(): HotelStats {
  return data.stats;
}
