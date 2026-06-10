import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0B1324] text-[#FFF8EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#F9735B] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">L</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Luma<span className="text-[#F9735B]">Stay</span>
              </span>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Where Luxury Meets Serenity. Experience world-class hospitality in the heart of Sunset Bay.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/rooms", label: "Our Rooms" },
                { href: "/booking", label: "Booking" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/admin", label: "Admin" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#64748B] text-sm hover:text-[#F9735B] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-white font-semibold mb-4">Experiences</h4>
            <ul className="space-y-2">
              {["Spa & Wellness", "Fine Dining", "Concierge Service", "Beach Access", "Pool & Lounge"].map((item) => (
                <li key={item}>
                  <span className="text-[#64748B] text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#F9735B] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[#64748B] text-sm">1 Coastal Boulevard, Sunset Bay, CA 90210</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#F9735B] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+18005862782" className="text-[#64748B] text-sm hover:text-[#F9735B] transition-colors">
                  +1 (800) 586-2782
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#F9735B] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@lumastay.com" className="text-[#64748B] text-sm hover:text-[#F9735B] transition-colors">
                  hello@lumastay.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-sm">
            &copy; {new Date().getFullYear()} LumaStay. All rights reserved.
          </p>
          <p className="text-[#64748B] text-sm">
            Crafted with care in Sunset Bay, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
