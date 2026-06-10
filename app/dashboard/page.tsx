import Link from "next/link";
import { CalendarCheck, CircleDollarSign, Hotel, Plus } from "lucide-react";
import { BookingSummary } from "@/components/booking-summary";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBookingViewModels } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const bookings = getBookingViewModels();
  const totalSpend = bookings.reduce((sum, booking) => sum + booking.total, 0);

  return (
    <section className="section-padding bg-background">
      <div className="container-shell space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Guest dashboard"
            title="Your stays, organized clearly."
            description="A simple dashboard for upcoming reservations, payment states, booking references, and completed stays."
          />
          <Button asChild variant="accent">
            <Link href="/rooms"><Plus className="mr-2 h-4 w-4" /> New reservation</Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Metric icon={<Hotel className="h-5 w-5" />} label="Total bookings" value={`${bookings.length}`} />
          <Metric icon={<CalendarCheck className="h-5 w-5" />} label="Upcoming stays" value="2" />
          <Metric icon={<CircleDollarSign className="h-5 w-5" />} label="Total booked" value={formatCurrency(totalSpend)} />
        </div>

        <div className="grid gap-6">
          {bookings.map((booking) => <BookingSummary key={booking.id} booking={booking} room={booking.room} guest={booking.guest} />)}
        </div>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
