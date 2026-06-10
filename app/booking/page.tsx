"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getRoomBySlug } from "@/lib/data";
import { BookingSummary } from "@/components/BookingSummary";
import Link from "next/link";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomSlug = searchParams.get("room") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = parseInt(searchParams.get("guests") || "1");

  const room = getRoomBySlug(roomSlug);

  const handleContinue = () => {
    const params = new URLSearchParams({
      room: roomSlug,
      checkIn,
      checkOut,
      guests: guests.toString(),
    });
    router.push(`/booking/checkout?${params.toString()}`);
  };

  if (!room || !checkIn || !checkOut) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#0B1324] mb-4">No booking details found</p>
          <p className="text-[#64748B] mb-6">Please select a room to begin your reservation.</p>
          <Link
            href="/rooms"
            className="bg-[#F9735B] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e85e47] transition-colors"
          >
            Browse Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      {/* Progress Stepper */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2">
            {["Details", "Payment", "Confirmation"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${i === 0 ? "text-[#F9735B]" : "text-[#64748B]"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    i === 0 ? "bg-[#F9735B] text-white" : "bg-[#E5E7EB] text-[#64748B]"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${i === 0 ? "text-[#F9735B]" : "text-[#64748B]"}`}>
                    {step}
                  </span>
                </div>
                {i < 2 && (
                  <div className="w-16 h-0.5 bg-[#E5E7EB]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Panel */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-[#0B1324] mb-2">Your Booking Details</h1>
            <p className="text-[#64748B] mb-8">Review your selection before proceeding to payment.</p>

            {/* Room Summary Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h2 className="text-lg font-bold text-[#0B1324] mb-4">Selected Room</h2>
              <div className="flex gap-4">
                <div className="rounded-xl overflow-hidden w-28 h-24 shrink-0">
                  <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-[#0B1324]">{room.name}</p>
                  <p className="text-[#64748B] text-sm capitalize">{room.type} · {room.bedType}</p>
                  <p className="text-[#64748B] text-sm">{room.size} sqft · Floor {room.floor}</p>
                  <p className="text-[#F9735B] font-semibold mt-1">
                    ${room.pricePerNight}/night
                  </p>
                </div>
              </div>
            </div>

            {/* Guest Info Note */}
            <div className="bg-[#F3E7D3] rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#F9735B] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-[#0B1324] mb-1">Next: Guest Details & Payment</p>
                  <p className="text-[#64748B] text-sm">
                    On the next step you will enter your guest information and payment details to secure your reservation.
                  </p>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
              <h2 className="text-lg font-bold text-[#0B1324] mb-3">Booking Policies</h2>
              <ul className="space-y-2">
                {[
                  "Check-in from 3:00 PM, check-out by 12:00 PM",
                  "Free cancellation up to 48 hours before check-in",
                  "12% taxes and fees will be added to the room rate",
                  "A valid ID and credit card required at check-in",
                ].map((policy) => (
                  <li key={policy} className="flex items-center gap-2 text-sm text-[#64748B]">
                    <svg className="w-4 h-4 text-[#2F7D6D] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {policy}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleContinue}
              className="w-full bg-[#F9735B] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#e85e47] transition-colors flex items-center justify-center gap-2"
            >
              Continue to Checkout
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <BookingSummary room={room} checkIn={checkIn} checkOut={checkOut} guests={guests} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center"><p className="text-[#64748B]">Loading...</p></div>}>
      <BookingContent />
    </Suspense>
  );
}
