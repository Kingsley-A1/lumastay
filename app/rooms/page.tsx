import { getRooms } from "@/lib/data";
import { RoomCard } from "@/components/RoomCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Rooms — LumaStay",
  description: "Browse our collection of luxury rooms, suites and penthouse accommodations.",
};

export default function RoomsPage() {
  const rooms = getRooms();
  const available = rooms.filter((r) => r.status === "available").length;

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      {/* Page Header */}
      <div className="bg-[#0B1324] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#F9735B] font-semibold text-sm uppercase tracking-widest mb-2">
            Accommodations
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Rooms</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Discover our curated collection of {rooms.length} exceptional rooms and suites.
            Currently{" "}
            <span className="text-[#F9735B] font-semibold">{available} rooms available</span>{" "}
            for your stay.
          </p>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 mb-10">
          <span className="text-[#64748B] text-sm font-medium">Room Status:</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#16A34A]"></span>
            <span className="text-sm text-[#64748B]">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
            <span className="text-sm text-[#64748B]">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#64748B]"></span>
            <span className="text-sm text-[#64748B]">Maintenance</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}
