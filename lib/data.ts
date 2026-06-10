import rawData from "@/data/lumastay.json";
import type { Booking, Guest, LumaStayData, Room } from "@/lib/types";

const data = rawData as LumaStayData;

export function getHotel() {
  return data.hotel;
}

export function getStats() {
  return data.stats;
}

export function getRooms() {
  return data.rooms;
}

export function getFeaturedRooms() {
  return data.rooms.filter((room) => room.featured);
}

export function getRoomBySlug(slug: string): Room | undefined {
  return data.rooms.find((room) => room.slug === slug);
}

export function getRoomById(id: string): Room | undefined {
  return data.rooms.find((room) => room.id === id);
}

export function getBookings() {
  return data.bookings;
}

export function getBookingByReference(reference: string): Booking | undefined {
  return data.bookings.find((booking) => booking.reference === reference);
}

export function getGuestById(id: string): Guest | undefined {
  return data.guests.find((guest) => guest.id === id);
}

export function getExperiences() {
  return data.experiences;
}

export function getTestimonials() {
  return data.testimonials;
}

export function getBookingViewModels() {
  return data.bookings.map((booking) => ({
    ...booking,
    room: getRoomById(booking.roomId),
    guest: getGuestById(booking.guestId),
  }));
}
