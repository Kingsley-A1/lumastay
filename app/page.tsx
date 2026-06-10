import Link from "next/link";
import { getRooms, getTestimonials, getHotelInfo, getStats } from "@/lib/data";
import { RoomCard } from "@/components/RoomCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BookingSearchCard } from "@/components/BookingSearchCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LumaStay — Where Luxury Meets Serenity",
  description: "Experience world-class hospitality at LumaStay, Sunset Bay.",
};

export default function HomePage() {
  const rooms = getRooms().slice(0, 3);
  const testimonials = getTestimonials();
  const hotel = getHotelInfo();
  const stats = getStats();

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0B1324]/65" />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mb-16">
          <p className="text-[#F9735B] font-semibold text-sm uppercase tracking-widest mb-4">
            {hotel.tagline}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Your Perfect Stay
            <br />
            <span className="text-[#F9735B]">Awaits</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover unparalleled luxury at LumaStay. From oceanfront suites to
            penthouse retreats, every room is crafted for an extraordinary experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="bg-[#F9735B] text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-[#e85e47] transition-colors"
            >
              Explore Rooms
            </Link>
            <Link
              href="#experiences"
              className="border-2 border-white text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#0B1324] transition-colors"
            >
              Our Experiences
            </Link>
          </div>
        </div>

        {/* Booking Search Card */}
        <div className="relative z-10 w-full max-w-4xl px-4 pb-12">
          <BookingSearchCard />
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-[#0B1324] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Happy Guests", icon: "👥" },
              { value: `${stats.totalRooms}`, label: "Luxury Rooms", icon: "🏨" },
              { value: `${hotel.rating}★`, label: "Guest Rating", icon: "⭐" },
              { value: `Est. ${hotel.yearEstablished}`, label: "Year Founded", icon: "🏆" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{stat.icon}</span>
                <p className="text-[#F9735B] font-bold text-3xl">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-[#FFF8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#F9735B] font-semibold text-sm uppercase tracking-widest mb-2">
              Accommodations
            </p>
            <h2 className="text-4xl font-bold text-[#0B1324] mb-4">Our Rooms</h2>
            <p className="text-[#64748B] max-w-xl mx-auto">
              From cozy ocean-view standards to the opulent Penthouse Horizon — every room
              tells a story of comfort and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 border-2 border-[#0B1324] text-[#0B1324] px-8 py-3 rounded-xl font-semibold hover:bg-[#0B1324] hover:text-white transition-colors"
            >
              View All Rooms
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="py-20 bg-[#F3E7D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#F9735B] font-semibold text-sm uppercase tracking-widest mb-2">
              Beyond the Room
            </p>
            <h2 className="text-4xl font-bold text-[#0B1324] mb-4">Our Experiences</h2>
            <p className="text-[#64748B] max-w-xl mx-auto">
              Indulge in a curated collection of world-class amenities and services designed to
              elevate every moment of your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧖",
                title: "Spa & Wellness",
                description:
                  "Rejuvenate your body and mind in our award-winning spa. Enjoy a full menu of treatments, from hot stone massages to aromatherapy rituals.",
                color: "bg-[#2F7D6D]/10",
                accent: "#2F7D6D",
              },
              {
                icon: "🍽️",
                title: "Fine Dining",
                description:
                  "Savour exquisite cuisine crafted by our Michelin-starred chef. Our rooftop restaurant offers panoramic ocean views paired with locally-sourced ingredients.",
                color: "bg-[#F9735B]/10",
                accent: "#F9735B",
              },
              {
                icon: "🛎️",
                title: "Concierge Service",
                description:
                  "Our dedicated concierge team is available 24/7 to arrange everything from private yacht charters to exclusive restaurant reservations.",
                color: "bg-[#0B1324]/10",
                accent: "#0B1324",
              },
            ].map((exp) => (
              <div key={exp.title} className={`${exp.color} rounded-2xl p-8 text-center`}>
                <div className="text-5xl mb-5">{exp.icon}</div>
                <h3 className="text-xl font-bold text-[#0B1324] mb-3">{exp.title}</h3>
                <p className="text-[#64748B] leading-relaxed text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#FFF8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#F9735B] font-semibold text-sm uppercase tracking-widest mb-2">
              Guest Stories
            </p>
            <h2 className="text-4xl font-bold text-[#0B1324] mb-4">What Our Guests Say</h2>
            <p className="text-[#64748B] max-w-xl mx-auto">
              Hear from those who have experienced the LumaStay difference firsthand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#F9735B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Experience LumaStay?
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
            From the moment you arrive to the morning of your departure, every detail
            is handled with care. Your perfect stay awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="bg-white text-[#F9735B] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#FFF8EF] transition-colors shadow-lg"
            >
              Book Your Stay
            </Link>
            <Link
              href="/dashboard"
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
