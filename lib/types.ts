export type RoomAvailability = "available" | "few_left" | "sold_out";

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

export type Hotel = {
  name: string;
  tagline: string;
  location: string;
  description: string;
  phone: string;
  email: string;
  heroImage: string;
};

export type Room = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  pricePerNight: number;
  currency: string;
  capacity: number;
  beds: string;
  size: string;
  availability: RoomAvailability;
  roomsLeft: number;
  images: string[];
  amenities: string[];
  policies: string[];
  featured: boolean;
  rating: number;
};

export type Booking = {
  id: string;
  reference: string;
  guestId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: BookingStatus;
  total: number;
  currency: string;
  createdAt: string;
};

export type Guest = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  detail: string;
};

export type Experience = {
  title: string;
  description: string;
  image: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type LumaStayData = {
  hotel: Hotel;
  rooms: Room[];
  bookings: Booking[];
  guests: Guest[];
  stats: DashboardStat[];
  experiences: Experience[];
  testimonials: Testimonial[];
};
