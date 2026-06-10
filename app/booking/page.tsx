import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookingSteps } from "@/components/booking-steps";
import { BookingSummary } from "@/components/booking-summary";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { getBookingViewModels } from "@/lib/data";

export default function BookingPage() {
  const booking = getBookingViewModels()[0];

  return (
    <section className="section-padding bg-background">
      <div className="container-shell space-y-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Booking lifecycle"
            title="A reservation flow guests can trust."
            description="LumaStay demonstrates the full journey from draft reservation to completed stay using controlled mock data and clear status language."
          />
          <Button asChild variant="accent" size="lg">
            <Link href="/booking/checkout">Continue checkout <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <BookingSteps />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <BookingSummary booking={booking} room={booking.room} guest={booking.guest} />
          <div className="rounded-[1.5rem] border border-border bg-white p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">System thinking</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight">Built beyond the homepage.</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              This booking page shows how the prototype handles status clarity, guest confidence, and operational readiness before a real backend is introduced.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
