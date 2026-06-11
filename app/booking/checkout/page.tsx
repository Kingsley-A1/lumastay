"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getRoomBySlug } from "@/lib/data";
import { BookingSummary } from "@/components/BookingSummary";
import { generateBookingRef, calculateNights, calculatePricing } from "@/lib/utils";
import { saveBooking } from "@/lib/store";
import { BookingStatus } from "@/lib/types";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomSlug = searchParams.get("room") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = parseInt(searchParams.get("guests") || "1");

  const room = getRoomBySlug(roomSlug);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 2) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  const handleChange = (field: string, value: string) => {
    let processed = value;
    if (field === "cardNumber") processed = formatCardNumber(value);
    if (field === "expiry") processed = formatExpiry(value);
    if (field === "cvv") processed = value.replace(/\D/g, "").slice(0, 4);
    setForm((prev) => ({ ...prev, [field]: processed }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim() || !form.email.includes("@")) newErrors.email = "Valid email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (form.cardNumber.replace(/\s/g, "").length !== 16) newErrors.cardNumber = "Enter a valid 16-digit card number";
    if (form.expiry.length !== 5) newErrors.expiry = "Enter a valid expiry (MM/YY)";
    if (form.cvv.length < 3) newErrors.cvv = "Enter a valid CVV";
    if (!form.cardName.trim()) newErrors.cardName = "Cardholder name is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate payment processing
    await new Promise((res) => setTimeout(res, 1500));

    const ref = generateBookingRef();
    const nights = calculateNights(checkIn, checkOut);
    const { total } = calculatePricing(room?.pricePerNight ?? 0, nights);

    // Persist the reservation through the shared booking store so it shows up
    // in the confirmation, the guest dashboard, and the admin operations view.
    saveBooking({
      bookingRef: ref,
      guestName: `${form.firstName} ${form.lastName}`.trim(),
      guestEmail: form.email,
      guestPhone: form.phone,
      roomSlug,
      checkIn,
      checkOut,
      nights,
      totalAmount: total,
      status: BookingStatus.Confirmed,
      specialRequests: form.specialRequests || undefined,
      guests,
      createdAt: new Date().toISOString(),
    });

    router.push(`/booking/confirmation?ref=${ref}`);
  };

  if (!room) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center">
        <p className="text-[#64748B]">Room not found. <Link href="/rooms" className="text-[#F9735B] underline">Browse rooms</Link></p>
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
                <div className={`flex items-center gap-2`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    i === 0 ? "bg-[#16A34A] text-white" :
                    i === 1 ? "bg-[#F9735B] text-white" :
                    "bg-[#E5E7EB] text-[#64748B]"
                  }`}>
                    {i === 0 ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : i + 1}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${
                    i === 1 ? "text-[#F9735B]" : i === 0 ? "text-[#16A34A]" : "text-[#64748B]"
                  }`}>
                    {step}
                  </span>
                </div>
                {i < 2 && <div className={`w-16 h-0.5 ${i === 0 ? "bg-[#16A34A]" : "bg-[#E5E7EB]"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-[#0B1324] mb-2">Guest Details & Payment</h1>
            <p className="text-[#64748B] mb-8">Complete your reservation by entering your details below.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Guest Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#0B1324] mb-4 flex items-center gap-2">
                  <span>👤</span> Guest Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0B1324] block mb-1">First Name *</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      placeholder="John"
                      className={`w-full px-4 py-2.5 rounded-lg border text-[#0B1324] focus:outline-none focus:ring-2 focus:ring-[#F9735B] ${errors.firstName ? "border-red-500" : "border-[#E5E7EB]"}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0B1324] block mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      placeholder="Smith"
                      className={`w-full px-4 py-2.5 rounded-lg border text-[#0B1324] focus:outline-none focus:ring-2 focus:ring-[#F9735B] ${errors.lastName ? "border-red-500" : "border-[#E5E7EB]"}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0B1324] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-2.5 rounded-lg border text-[#0B1324] focus:outline-none focus:ring-2 focus:ring-[#F9735B] ${errors.email ? "border-red-500" : "border-[#E5E7EB]"}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0B1324] block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-4 py-2.5 rounded-lg border text-[#0B1324] focus:outline-none focus:ring-2 focus:ring-[#F9735B] ${errors.phone ? "border-red-500" : "border-[#E5E7EB]"}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-[#0B1324] block mb-1">Special Requests (optional)</label>
                    <textarea
                      value={form.specialRequests}
                      onChange={(e) => handleChange("specialRequests", e.target.value)}
                      placeholder="Early check-in, dietary requirements, accessibility needs..."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-[#0B1324] focus:outline-none focus:ring-2 focus:ring-[#F9735B] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#0B1324] mb-1 flex items-center gap-2">
                  <span>💳</span> Payment Details
                </h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                  <p className="text-amber-800 text-xs font-medium flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    This is a prototype. No real payment is processed. Use any test card details.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0B1324] block mb-1">Card Number *</label>
                    <input
                      type="text"
                      value={form.cardNumber}
                      onChange={(e) => handleChange("cardNumber", e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={`w-full px-4 py-2.5 rounded-lg border text-[#0B1324] font-mono focus:outline-none focus:ring-2 focus:ring-[#F9735B] ${errors.cardNumber ? "border-red-500" : "border-[#E5E7EB]"}`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#0B1324] block mb-1">Expiry (MM/YY) *</label>
                      <input
                        type="text"
                        value={form.expiry}
                        onChange={(e) => handleChange("expiry", e.target.value)}
                        placeholder="12/28"
                        maxLength={5}
                        className={`w-full px-4 py-2.5 rounded-lg border text-[#0B1324] font-mono focus:outline-none focus:ring-2 focus:ring-[#F9735B] ${errors.expiry ? "border-red-500" : "border-[#E5E7EB]"}`}
                      />
                      {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#0B1324] block mb-1">CVV *</label>
                      <input
                        type="text"
                        value={form.cvv}
                        onChange={(e) => handleChange("cvv", e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className={`w-full px-4 py-2.5 rounded-lg border text-[#0B1324] font-mono focus:outline-none focus:ring-2 focus:ring-[#F9735B] ${errors.cvv ? "border-red-500" : "border-[#E5E7EB]"}`}
                      />
                      {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0B1324] block mb-1">Cardholder Name *</label>
                    <input
                      type="text"
                      value={form.cardName}
                      onChange={(e) => handleChange("cardName", e.target.value)}
                      placeholder="John Smith"
                      className={`w-full px-4 py-2.5 rounded-lg border text-[#0B1324] focus:outline-none focus:ring-2 focus:ring-[#F9735B] ${errors.cardName ? "border-red-500" : "border-[#E5E7EB]"}`}
                    />
                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F9735B] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#e85e47] transition-colors disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Complete Booking
                  </>
                )}
              </button>
            </form>
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center"><p className="text-[#64748B]">Loading checkout...</p></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
