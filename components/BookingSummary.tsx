import { Room } from "@/lib/types";
import { formatCurrency, formatDate, calculateNights, calculateTotal } from "@/lib/utils";

interface BookingSummaryProps {
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export function BookingSummary({ room, checkIn, checkOut, guests }: BookingSummaryProps) {
  const nights = calculateNights(checkIn, checkOut);
  const subtotal = calculateTotal(room.pricePerNight, nights);
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
      <h3 className="font-bold text-[#0B1324] text-lg mb-4">Booking Summary</h3>

      {/* Room image */}
      <div className="rounded-xl overflow-hidden mb-4 h-40">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h4 className="font-semibold text-[#0B1324]">{room.name}</h4>
      <p className="text-[#64748B] text-sm mb-4">{room.bedType} · {room.size} sqft</p>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-[#FFF8EF] rounded-xl">
        <div>
          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide">Check In</p>
          <p className="text-sm font-semibold text-[#0B1324]">{formatDate(checkIn)}</p>
        </div>
        <div>
          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide">Check Out</p>
          <p className="text-sm font-semibold text-[#0B1324]">{formatDate(checkOut)}</p>
        </div>
        <div>
          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide">Duration</p>
          <p className="text-sm font-semibold text-[#0B1324]">{nights} {nights === 1 ? "night" : "nights"}</p>
        </div>
        <div>
          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide">Guests</p>
          <p className="text-sm font-semibold text-[#0B1324]">{guests}</p>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="space-y-2 pt-3 border-t border-[#E5E7EB]">
        <div className="flex justify-between text-sm">
          <span className="text-[#64748B]">
            {formatCurrency(room.pricePerNight)} × {nights} nights
          </span>
          <span className="text-[#0B1324]">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#64748B]">Taxes &amp; fees (12%)</span>
          <span className="text-[#0B1324]">{formatCurrency(taxes)}</span>
        </div>
        <div className="flex justify-between font-bold text-base pt-2 border-t border-[#E5E7EB]">
          <span className="text-[#0B1324]">Total</span>
          <span className="text-[#F9735B]">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
