"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRooms, getBookings, getRoomBySlug, getStats } from "@/lib/data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/Badge";

export default function AdminPage() {
  const router = useRouter();
  const rooms = getRooms();
  const bookings = getBookings();
  const stats = getStats();

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const upcomingCheckIns = bookings.filter((b) => {
    const checkIn = new Date(b.checkIn);
    return checkIn >= today && checkIn <= nextWeek && b.status !== "cancelled";
  });

  const totalRevenue = bookings
    .filter((b) => b.status !== "cancelled" && b.status !== "draft")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const occupiedCount = rooms.filter((r) => r.status === "occupied").length;

  const adminStats = [
    { label: "Total Rooms", value: stats.totalRooms, icon: "🏨", color: "text-[#0B1324]", bg: "bg-white" },
    { label: "Available", value: stats.availableRooms, icon: "✅", color: "text-[#16A34A]", bg: "bg-green-50" },
    { label: "Occupied", value: occupiedCount, icon: "🔴", color: "text-[#F59E0B]", bg: "bg-amber-50" },
    { label: "Total Revenue", value: formatCurrency(totalRevenue), icon: "💰", color: "text-[#2F7D6D]", bg: "bg-teal-50" },
    { label: "Total Bookings", value: stats.totalBookings, icon: "📋", color: "text-[#0B1324]", bg: "bg-white" },
    { label: "Occupancy Rate", value: `${stats.occupancyRate}%`, icon: "📊", color: "text-[#F9735B]", bg: "bg-[#F9735B]/10" },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      {/* Header */}
      <div className="bg-[#0B1324] py-10 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[#F9735B] font-semibold text-sm uppercase tracking-widest mb-1">
              Administration
            </p>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/60 mt-1">
              {today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-xl">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium">Admin Access</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {adminStats.map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 shadow-sm text-center`}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p className={`${stat.color} font-bold text-xl`}>{stat.value}</p>
              <p className="text-[#64748B] text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Upcoming Check-ins */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1324]">
              Upcoming Check-ins
              <span className="ml-2 text-sm font-normal text-[#64748B]">(next 7 days)</span>
            </h2>
            <span className="bg-[#F9735B]/10 text-[#F9735B] text-sm font-semibold px-3 py-1 rounded-full">
              {upcomingCheckIns.length} arriving
            </span>
          </div>
          {upcomingCheckIns.length === 0 ? (
            <div className="p-10 text-center text-[#64748B]">
              <p className="text-lg">No upcoming check-ins in the next 7 days</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FFF8EF]">
                  <tr>
                    {["Ref", "Guest", "Room", "Check-In", "Nights", "Amount", "Status"].map((col) => (
                      <th key={col} className="text-left px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {upcomingCheckIns.map((b) => {
                    const room = getRoomBySlug(b.roomSlug);
                    return (
                      <tr key={b.bookingRef} className="hover:bg-[#FFF8EF] cursor-pointer" onClick={() => router.push(`/booking/confirmation?ref=${b.bookingRef}`)}>
                        <td className="px-4 py-3 font-mono text-sm text-[#F9735B] font-semibold">{b.bookingRef}</td>
                        <td className="px-4 py-3 text-sm text-[#0B1324]">{b.guestName}</td>
                        <td className="px-4 py-3 text-sm text-[#64748B]">{room?.name ?? b.roomSlug}</td>
                        <td className="px-4 py-3 text-sm text-[#64748B] whitespace-nowrap">{formatDate(b.checkIn)}</td>
                        <td className="px-4 py-3 text-sm text-[#64748B]">{b.nights}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#0B1324]">{formatCurrency(b.totalAmount)}</td>
                        <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* All Reservations */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="p-5 border-b border-[#E5E7EB]">
            <h2 className="text-lg font-bold text-[#0B1324]">All Reservations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8EF]">
                <tr>
                  {["Ref", "Guest", "Room", "Check-In", "Check-Out", "Amount", "Status", "Actions"].map((col) => (
                    <th key={col} className="text-left px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {bookings.map((b) => {
                  const room = getRoomBySlug(b.roomSlug);
                  return (
                    <tr key={b.bookingRef} className="hover:bg-[#FFF8EF] transition-colors">
                      <td className="px-4 py-3 font-mono text-sm text-[#F9735B] font-semibold">{b.bookingRef}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-[#0B1324]">{b.guestName}</p>
                          <p className="text-xs text-[#64748B]">{b.guestEmail}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#64748B]">{room?.name ?? b.roomSlug}</td>
                      <td className="px-4 py-3 text-sm text-[#64748B] whitespace-nowrap">{formatDate(b.checkIn)}</td>
                      <td className="px-4 py-3 text-sm text-[#64748B] whitespace-nowrap">{formatDate(b.checkOut)}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#0B1324]">{formatCurrency(b.totalAmount)}</td>
                      <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => router.push(`/booking/confirmation?ref=${b.bookingRef}`)}
                          className="text-[#F9735B] text-sm font-medium hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Room Status Grid */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-5 border-b border-[#E5E7EB]">
            <h2 className="text-lg font-bold text-[#0B1324]">Room Status Overview</h2>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rooms.map((room) => (
              <div key={room.id} className="border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-28 overflow-hidden">
                  <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-[#0B1324] text-sm truncate">{room.name}</p>
                  <p className="text-[#64748B] text-xs capitalize mb-2">{room.type} · Floor {room.floor}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={room.status === "available" ? "success" : room.status === "occupied" ? "warning" : "neutral"}
                    >
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </Badge>
                    <span className="text-xs text-[#64748B]">${room.pricePerNight}/n</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
