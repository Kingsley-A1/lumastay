"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getRoomBySlug } from "@/lib/data";
import { useBooking, useHydrated } from "@/lib/useBookings";
import { formatDate, formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import { BookingStatus } from "@/lib/types";
import Link from "next/link";

const CHECK_ICON = "M5 13l4 4L19 7";
const CLOCK_ICON = "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z";
const X_ICON = "M6 18L18 6M6 6l12 12";

function getBanner(status: BookingStatus | string): {
  bg: string;
  icon: string;
  title: string;
  subtitle: string;
} {
  switch (status) {
    case BookingStatus.PendingPayment:
      return {
        bg: "#F59E0B",
        icon: CLOCK_ICON,
        title: "Payment Pending",
        subtitle: "Your reservation is held. Complete payment to confirm your stay.",
      };
    case BookingStatus.CheckedIn:
      return {
        bg: "#2F7D6D",
        icon: CHECK_ICON,
        title: "You're Checked In",
        subtitle: "Welcome to LumaStay. Enjoy your stay with us.",
      };
    case BookingStatus.CheckedOut:
    case BookingStatus.Completed:
      return {
        bg: "#0B1324",
        icon: CHECK_ICON,
        title: "Stay Completed",
        subtitle: "Thank you for staying at LumaStay. We hope to welcome you again soon.",
      };
    case BookingStatus.Cancelled:
      return {
        bg: "#DC2626",
        icon: X_ICON,
        title: "Booking Cancelled",
        subtitle: "This reservation has been cancelled. No further action is needed.",
      };
    case BookingStatus.Refunded:
      return {
        bg: "#64748B",
        icon: CHECK_ICON,
        title: "Booking Refunded",
        subtitle: "This reservation was cancelled and the amount has been refunded.",
      };
    case BookingStatus.Expired:
      return {
        bg: "#64748B",
        icon: X_ICON,
        title: "Booking Expired",
        subtitle: "This reservation expired before payment was completed.",
      };
    case BookingStatus.Confirmed:
    default:
      return {
        bg: "#16A34A",
        icon: CHECK_ICON,
        title: "Booking Confirmed!",
        subtitle: "Your reservation has been successfully placed. A confirmation email has been sent.",
      };
  }
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "";

  // Resolve the booking through the store so localStorage-backed reservations
  // (created at checkout) are included alongside the seed data.
  const booking = useBooking(ref);
  const loaded = useHydrated();

  const room = booking ? getRoomBySlug(booking.roomSlug) : null;
  const guestName = booking?.guestName ?? "Guest";
  const checkIn = booking?.checkIn ?? "";
  const checkOut = booking?.checkOut ?? "";
  const nights = booking?.nights ?? 0;
  const status = booking?.status ?? "confirmed";
  const totalAmount = booking?.totalAmount;

  if (!ref) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#0B1324] mb-4">No booking reference found</p>
          <Link href="/rooms" className="bg-[#F9735B] text-white px-6 py-3 rounded-xl font-semibold">
            Browse Rooms
          </Link>
        </div>
      </div>
    );
  }

  if (loaded && !booking) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-2xl font-bold text-[#0B1324] mb-2">
            We couldn&apos;t find booking {ref}
          </p>
          <p className="text-[#64748B] mb-6">
            The reference may be incorrect or the booking was made on another device.
          </p>
          <Link href="/dashboard" className="bg-[#F9735B] text-white px-6 py-3 rounded-xl font-semibold">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const banner = getBanner(status);

  return (
    <div className="min-h-screen bg-[#FFF8EF] py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Status Banner */}
        <div
          className="rounded-2xl p-8 text-center text-white mb-8 shadow-lg"
          style={{ backgroundColor: banner.bg }}
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" style={{ color: banner.bg }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={banner.icon} />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">{banner.title}</h1>
          <p className="text-white/85 text-lg">{banner.subtitle}</p>
        </div>

        {/* Booking Reference */}
        <div className="bg-[#0B1324] rounded-2xl p-6 text-center mb-6">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Booking Reference</p>
          <p className="text-[#F9735B] font-bold text-4xl tracking-wider">{ref}</p>
          <p className="text-white/50 text-xs mt-2">Please save this reference number for your records</p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-[#0B1324] mb-4 flex items-center justify-between">
            Booking Receipt
            <StatusBadge status={status} />
          </h2>

          {room && (
            <div className="flex gap-4 mb-4 pb-4 border-b border-[#E5E7EB]">
              <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0">
                <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-[#0B1324]">{room.name}</p>
                <p className="text-[#64748B] text-sm capitalize">{room.type} · {room.bedType}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: "Guest", value: guestName },
              { label: "Check-In", value: checkIn ? formatDate(checkIn) : "—" },
              { label: "Check-Out", value: checkOut ? formatDate(checkOut) : "—" },
              { label: "Duration", value: `${nights} ${nights === 1 ? "night" : "nights"}` },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide">{item.label}</p>
                <p className="font-semibold text-[#0B1324] text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#FFF8EF] rounded-xl p-4 flex justify-between items-center">
            <span className="text-[#64748B] font-medium">
              {status === BookingStatus.PendingPayment
                ? "Amount Due"
                : status === BookingStatus.Refunded
                ? "Amount Refunded"
                : "Total Paid"}
            </span>
            <span className="text-[#F9735B] font-bold text-2xl">
              {totalAmount ? formatCurrency(totalAmount) : "—"}
            </span>
          </div>
        </div>

        {/* Next Steps — only relevant for live, upcoming reservations */}
        {(status === BookingStatus.Confirmed || status === BookingStatus.CheckedIn) && (
          <div className="bg-[#F3E7D3] rounded-2xl p-6 mb-6">
            <h2 className="font-bold text-[#0B1324] mb-3">What Happens Next?</h2>
            <ul className="space-y-2">
              {[
                "You will receive a confirmation email shortly",
                "Check-in is available from 3:00 PM on your arrival date",
                "Present your booking reference at reception",
                "Contact us for any special arrangements",
              ].map((step, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[#64748B]">
                  <span className="w-5 h-5 rounded-full bg-[#F9735B] text-white text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="flex-1 bg-[#0B1324] text-white py-3.5 rounded-xl font-semibold text-center hover:bg-[#1a2640] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View in Dashboard
          </Link>
          <Link
            href="/rooms"
            className="flex-1 border-2 border-[#F9735B] text-[#F9735B] py-3.5 rounded-xl font-semibold text-center hover:bg-[#F9735B] hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Book Another Room
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center"><p>Loading confirmation...</p></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
