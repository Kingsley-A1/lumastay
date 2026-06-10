"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getTodayString, getTomorrowString } from "@/lib/utils";

export function BookingSearchCard() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(getTodayString());
  const [checkOut, setCheckOut] = useState(getTomorrowString());
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("all");

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests,
      type: roomType,
    });
    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Check In */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
            Check In
          </label>
          <input
            type="date"
            value={checkIn}
            min={getTodayString()}
            onChange={(e) => setCheckIn(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-[#0B1324] text-sm focus:outline-none focus:ring-2 focus:ring-[#F9735B] focus:border-transparent"
          />
        </div>

        {/* Check Out */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
            Check Out
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-[#0B1324] text-sm focus:outline-none focus:ring-2 focus:ring-[#F9735B] focus:border-transparent"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-[#0B1324] text-sm focus:outline-none focus:ring-2 focus:ring-[#F9735B] focus:border-transparent appearance-none bg-white"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Room Type */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
            Room Type
          </label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-[#0B1324] text-sm focus:outline-none focus:ring-2 focus:ring-[#F9735B] focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Types</option>
            <option value="standard">Standard</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
            <option value="penthouse">Penthouse</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSearch}
          className="w-full bg-[#F9735B] text-white py-3 rounded-xl font-semibold text-base hover:bg-[#e85e47] transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search Rooms
        </button>
      </div>
    </div>
  );
}
