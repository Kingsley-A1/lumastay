"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getRoomBySlug } from "@/lib/data";
import { cancelBooking, CURRENT_GUEST } from "@/lib/store";
import { useMyBookings, useHydrated } from "@/lib/useBookings";
import { formatDate, formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import { isUpcoming, isCompleted, isCancelled, isCancellable } from "@/lib/booking";

type Tab = "all" | "upcoming" | "completed" | "cancelled";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [pendingCancel, setPendingCancel] = useState<string | null>(null);

  // Live, hydration-safe read of the guest's bookings from the store.
  const bookings = useMyBookings();
  const ready = useHydrated();

  const handleCancel = (ref: string) => {
    cancelBooking(ref); // store emits → all views re-render automatically
    setPendingCancel(null);
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "all") return true;
    if (activeTab === "upcoming") return isUpcoming(b.status);
    if (activeTab === "completed") return isCompleted(b.status);
    if (activeTab === "cancelled") return isCancelled(b.status);
    return true;
  });

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter((b) => isUpcoming(b.status)).length,
    completed: bookings.filter((b) => isCompleted(b.status)).length,
    cancelled: bookings.filter((b) => isCancelled(b.status)).length,
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "All", count: stats.total },
    { key: "upcoming", label: "Upcoming", count: stats.upcoming },
    { key: "completed", label: "Completed", count: stats.completed },
    { key: "cancelled", label: "Cancelled", count: stats.cancelled },
  ];

  const initials = CURRENT_GUEST.split(" ").map((n) => n[0]).join("");

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      {/* Header */}
      <div className="bg-[#0B1324] py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#F9735B] font-semibold text-sm uppercase tracking-widest mb-1">
                Welcome back
              </p>
              <h1 className="text-3xl font-bold text-white">{CURRENT_GUEST}</h1>
              <p className="text-white/60 mt-1">Manage your reservations at LumaStay</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#F9735B] flex items-center justify-center">
                <span className="text-white font-bold text-xl">{initials}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: stats.total, color: "text-[#0B1324]", bg: "bg-white" },
            { label: "Upcoming", value: stats.upcoming, color: "text-[#2F7D6D]", bg: "bg-[#2F7D6D]/10" },
            { label: "Completed", value: stats.completed, color: "text-[#16A34A]", bg: "bg-green-50" },
            { label: "Cancelled", value: stats.cancelled, color: "text-[#DC2626]", bg: "bg-red-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 shadow-sm`}>
              <p className="text-[#64748B] text-sm mb-1">{stat.label}</p>
              <p className={`${stat.color} font-bold text-3xl`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 shadow-sm w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-[#F9735B] text-white shadow-sm"
                  : "text-[#64748B] hover:text-[#0B1324]"
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key ? "bg-white/25 text-white" : "bg-[#E5E7EB] text-[#64748B]"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Bookings Table */}
        {!ready ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm text-[#64748B]">
            Loading your reservations…
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-[#0B1324] mb-2">No bookings found</h3>
            <p className="text-[#64748B] mb-6">
              {activeTab === "all"
                ? "You have no bookings yet."
                : `You have no ${activeTab} bookings.`}
            </p>
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 bg-[#F9735B] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#e85e47] transition-colors"
            >
              Browse Rooms
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F3E7D3]">
                  <tr>
                    {["Ref", "Room", "Check-In", "Check-Out", "Nights", "Amount", "Status", ""].map((col) => (
                      <th key={col} className="text-left px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredBookings.map((booking) => {
                    const room = getRoomBySlug(booking.roomSlug);
                    const canCancel = isCancellable(booking.status);
                    return (
                      <tr
                        key={booking.bookingRef}
                        onClick={() => router.push(`/booking/confirmation?ref=${booking.bookingRef}`)}
                        className="hover:bg-[#FFF8EF] cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-4 font-mono text-sm font-semibold text-[#F9735B]">
                          {booking.bookingRef}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            {room && (
                              <div className="w-10 h-8 rounded-lg overflow-hidden shrink-0">
                                <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <span className="text-sm font-medium text-[#0B1324]">
                              {room?.name ?? booking.roomSlug}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-[#64748B] whitespace-nowrap">
                          {formatDate(booking.checkIn)}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#64748B] whitespace-nowrap">
                          {formatDate(booking.checkOut)}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#64748B]">{booking.nights}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-[#0B1324]">
                          {formatCurrency(booking.totalAmount)}
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          {canCancel ? (
                            pendingCancel === booking.bookingRef ? (
                              <div className="flex items-center gap-2 justify-end">
                                <button
                                  onClick={() => handleCancel(booking.bookingRef)}
                                  className="text-xs font-semibold text-white bg-[#DC2626] px-2.5 py-1 rounded-md hover:bg-[#b91c1c] transition-colors"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setPendingCancel(null)}
                                  className="text-xs font-medium text-[#64748B] px-2 py-1 rounded-md hover:text-[#0B1324]"
                                >
                                  Keep
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setPendingCancel(booking.bookingRef)}
                                className="text-xs font-semibold text-[#DC2626] hover:underline"
                              >
                                Cancel
                              </button>
                            )
                          ) : (
                            <span className="text-xs text-[#64748B]">View</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
