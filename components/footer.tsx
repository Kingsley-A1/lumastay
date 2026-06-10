import Link from "next/link";
import { Hotel, Mail, MapPin, Phone } from "lucide-react";
import { getHotel } from "@/lib/data";

export function Footer() {
  const hotel = getHotel();

  return (
    <footer className="navy-gradient text-white">
      <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <Hotel className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold">LumaStay</p>
              <p className="text-sm text-white/65">{hotel.tagline}</p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/70">
            A premium hotel reservation prototype by Bespoke Technologies, built to demonstrate clean booking lifecycle design and hospitality-grade software execution.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/45">Explore</p>
          <div className="grid gap-3 text-sm text-white/75">
            <Link href="/rooms" className="hover:text-white">Rooms</Link>
            <Link href="/booking" className="hover:text-white">Booking flow</Link>
            <Link href="/dashboard" className="hover:text-white">Guest dashboard</Link>
            <Link href="/admin" className="hover:text-white">Admin view</Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/45">Contact</p>
          <div className="grid gap-3 text-sm text-white/75">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {hotel.location}</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> {hotel.phone}</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> {hotel.email}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-shell flex flex-col gap-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LumaStay prototype.</p>
          <p>Built by Bespoke Technologies.</p>
        </div>
      </div>
    </footer>
  );
}
