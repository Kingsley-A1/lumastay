import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getRooms, getRoomBySlug } from "@/lib/data";
import { formatCurrency, calculatePricing } from "@/lib/utils";
import { AmenityIcon } from "@/components/AmenityIcon";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const rooms = getRooms();
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return { title: "Room Not Found | LumaStay" };
  return {
    title: `${room.name} | LumaStay`,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) notFound();

  const statusConfig = {
    available: { label: "Available", classes: "bg-green-100 text-green-800" },
    occupied: { label: "Occupied", classes: "bg-amber-100 text-amber-800" },
    maintenance: { label: "Maintenance", classes: "bg-red-100 text-red-800" },
  };
  const statusInfo = statusConfig[room.status];

  const typeLabels: Record<string, string> = {
    standard: "Standard Room",
    deluxe: "Deluxe Room",
    suite: "Suite",
    penthouse: "Penthouse",
  };

  const todayDate = new Date();
  const today = todayDate.toISOString().split("T")[0];
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];

  // One-night estimate shown in the pricing sidebar.
  const estimate = calculatePricing(room.pricePerNight, 1);

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B1324]/40" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center gap-3 mb-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.classes}`}>
              {statusInfo.label}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur-sm">
              {typeLabels[room.type]}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{room.name}</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-[#64748B]">
          <Link href="/" className="hover:text-[#F9735B] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/rooms" className="hover:text-[#F9735B] transition-colors">Rooms</Link>
          <span>/</span>
          <span className="text-[#0B1324] font-medium">{room.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left — Room Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Image Gallery */}
            <div className="grid grid-cols-3 gap-3 h-52">
              {room.images.slice(1, 4).map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <img src={img} alt={`${room.name} photo ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-[#0B1324] mb-3">About This Room</h2>
              <p className="text-[#64748B] leading-relaxed text-lg">{room.description}</p>
            </div>

            {/* Room Specs */}
            <div>
              <h2 className="text-2xl font-bold text-[#0B1324] mb-4">Room Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: "📐", label: "Size", value: `${room.size} sqft` },
                  { icon: "🛏️", label: "Bed Type", value: room.bedType },
                  { icon: "👥", label: "Guests", value: `Up to ${room.maxGuests}` },
                  { icon: "🏢", label: "Floor", value: `Floor ${room.floor}` },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-2xl mb-1">{icon}</div>
                    <div className="text-xs text-[#64748B] font-medium uppercase tracking-wide mb-1">{label}</div>
                    <div className="text-sm font-semibold text-[#0B1324]">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-[#0B1324] mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-[#F3E7D3]">
                    <AmenityIcon amenity={amenity} showLabel={false} />
                    <span className="text-sm text-[#0B1324] font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h2 className="text-2xl font-bold text-[#0B1324] mb-4">Policies</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                {[
                  { icon: "🕒", label: "Check-in", value: "From 3:00 PM" },
                  { icon: "🕛", label: "Check-out", value: "Until 12:00 PM (Noon)" },
                  { icon: "🚭", label: "Smoking", value: "Non-smoking room" },
                  { icon: "🐾", label: "Pets", value: "Pets welcome (fee applies)" },
                  { icon: "💳", label: "Payment", value: "All major cards accepted" },
                  { icon: "🔄", label: "Cancellation", value: "Free cancellation within 48 hours of booking" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-xl">{icon}</span>
                    <div>
                      <span className="font-semibold text-[#0B1324] text-sm">{label}: </span>
                      <span className="text-[#64748B] text-sm">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Pricing Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#0B1324]">{formatCurrency(room.pricePerNight)}</span>
                <span className="text-[#64748B] text-sm"> / night</span>
              </div>

              {room.status !== "available" && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  This room is currently {room.status}. Check back soon.
                </div>
              )}

              {/* Date Inputs */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide block mb-1">
                    Check-In
                  </label>
                  <input
                    type="date"
                    defaultValue={today}
                    min={today}
                    id="room-checkin"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-[#0B1324] text-sm focus:outline-none focus:ring-2 focus:ring-[#F9735B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide block mb-1">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    defaultValue={tomorrow}
                    min={today}
                    id="room-checkout"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-[#0B1324] text-sm focus:outline-none focus:ring-2 focus:ring-[#F9735B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide block mb-1">
                    Guests
                  </label>
                  <select
                    id="room-guests"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-[#0B1324] text-sm focus:outline-none focus:ring-2 focus:ring-[#F9735B]"
                  >
                    {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Estimate (1 night) */}
              <div className="border-t border-[#E5E7EB] pt-4 mb-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">{formatCurrency(room.pricePerNight)} × 1 night</span>
                  <span className="text-[#0B1324]">{formatCurrency(estimate.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Taxes &amp; fees (12%)</span>
                  <span className="text-[#0B1324]">{formatCurrency(estimate.taxes)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#0B1324]">
                  <span>Est. Total</span>
                  <span className="text-[#F9735B]">{formatCurrency(estimate.total)}</span>
                </div>
              </div>

              <Link
                href={`/booking?room=${room.slug}&checkIn=${today}&checkOut=${tomorrow}&guests=2`}
                className={`block w-full text-center py-3.5 rounded-xl font-bold text-white transition-colors ${
                  room.status === "available"
                    ? "bg-[#F9735B] hover:bg-[#e85e47]"
                    : "bg-[#64748B] cursor-not-allowed pointer-events-none"
                }`}
              >
                {room.status === "available" ? "Reserve Now" : "Not Available"}
              </Link>

              <p className="text-xs text-[#64748B] text-center mt-3">
                Free cancellation within 48 hours. No charge until checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
