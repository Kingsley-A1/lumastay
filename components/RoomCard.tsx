import Link from "next/link";
import { Room } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { AmenityIcon } from "@/components/AmenityIcon";

interface RoomCardProps {
  room: Room;
}

function statusBadge(status: Room["status"]) {
  switch (status) {
    case "available":
      return <Badge variant="success">Available</Badge>;
    case "occupied":
      return <Badge variant="warning">Occupied</Badge>;
    case "maintenance":
      return <Badge variant="neutral">Maintenance</Badge>;
  }
}

const typeLabel: Record<Room["type"], string> = {
  standard: "Standard",
  deluxe: "Deluxe",
  suite: "Suite",
  penthouse: "Penthouse",
};

export function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#E5E7EB]">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">{statusBadge(room.status)}</div>
        <div className="absolute top-3 right-3">
          <Badge variant="default" className="text-xs">
            {typeLabel[room.type]}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#0B1324] text-lg mb-1">{room.name}</h3>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-[#64748B] mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {room.maxGuests} guests
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M7 6h.01M17 6h.01M7 18h.01M17 18h.01" />
            </svg>
            {room.bedType}
          </span>
          <span>{room.size} sqft</span>
        </div>

        {/* Amenities */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {room.amenities.slice(0, 3).map((amenity) => (
            <AmenityIcon key={amenity} amenity={amenity} showLabel={false} />
          ))}
          {room.amenities.length > 3 && (
            <span className="text-xs text-[#64748B]">+{room.amenities.length - 3} more</span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
          <div>
            <span className="text-[#0B1324] font-bold text-xl">
              {formatCurrency(room.pricePerNight)}
            </span>
            <span className="text-[#64748B] text-sm"> / night</span>
          </div>
          <Link
            href={`/rooms/${room.slug}`}
            className="inline-flex items-center gap-1 bg-[#F9735B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#e85e47] transition-colors"
          >
            View Room
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
