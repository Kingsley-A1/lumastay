import Link from "next/link";
import { Hotel, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/rooms", label: "Rooms" },
  { href: "/booking", label: "Booking" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="LumaStay home">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-card">
            <Hotel className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">LumaStay</p>
            <p className="hidden text-xs text-muted-foreground sm:block">Premium stays made effortless</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> My stay</Link>
          </Button>
          <Button asChild variant="accent">
            <Link href="/rooms">Reserve now</Link>
          </Button>
        </div>
      </div>
      <nav className="container-shell flex gap-4 overflow-x-auto pb-4 text-sm md:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-full border border-border bg-white px-4 py-2 font-medium text-muted-foreground shadow-sm">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
