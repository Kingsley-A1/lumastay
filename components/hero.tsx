import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { BookingSearchCard } from "@/components/booking-search-card";
import { Button } from "@/components/ui/button";
import { getHotel, getStats } from "@/lib/data";

export function Hero() {
  const hotel = getHotel();
  const stats = getStats();

  return (
    <section className="hero-gradient overflow-hidden">
      <div className="container-shell relative grid min-h-[760px] items-center gap-12 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div className="absolute right-8 top-28 hidden h-72 w-72 rounded-full coral-glow lg:block" />
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-accent" /> Clean booking, calm arrival
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
              Find your perfect stay, beautifully.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Book warm rooms, relaxing spaces, and premium hotel experiences through a fast reservation flow that feels clear from search to check-in.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link href="/rooms">Reserve a room <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/booking">View booking flow</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-white/80 p-4 shadow-sm backdrop-blur">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold text-foreground">{stat.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-soft">
            <Image
              src={hotel.heroImage}
              alt="Elevated premium hotel building used as a prototype hospitality visual"
              width={1800}
              height={1200}
              priority
              className="h-[460px] w-full object-cover sm:h-[620px]"
            />
            <div className="absolute left-5 top-5 rounded-2xl bg-white/90 p-4 shadow-card backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary"><ShieldCheck className="h-4 w-4 text-[#2F7D6D]" /> Verified comfort</div>
              <p className="mt-1 text-xs text-muted-foreground">Clear rates. Fast confirmation.</p>
            </div>
          </div>
          <div className="mt-[-72px] px-3 sm:px-8">
            <BookingSearchCard />
          </div>
        </div>
      </div>
    </section>
  );
}
