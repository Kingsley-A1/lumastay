import { BedDouble, CalendarClock, CircleDollarSign, Users } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { getBookingViewModels, getRooms } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminPage() {
  const bookings = getBookingViewModels();
  const rooms = getRooms();
  const revenue = bookings.reduce((sum, booking) => sum + booking.total, 0);

  return (
    <section className="section-padding bg-background">
      <div className="container-shell space-y-10">
        <SectionHeader
          eyebrow="Admin operations"
          title="Reservation visibility for hotel teams."
          description="A clean admin-facing prototype view for booking status, revenue, upcoming stays, and room availability."
        />

        <div className="grid gap-5 md:grid-cols-4">
          <Metric icon={<CalendarClock className="h-5 w-5" />} label="Reservations" value={`${bookings.length}`} />
          <Metric icon={<Users className="h-5 w-5" />} label="Guests booked" value={`${bookings.reduce((sum, booking) => sum + booking.guests, 0)}`} />
          <Metric icon={<BedDouble className="h-5 w-5" />} label="Room types" value={`${rooms.length}`} />
          <Metric icon={<CircleDollarSign className="h-5 w-5" />} label="Mock revenue" value={formatCurrency(revenue)} />
        </div>

        <Card>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Guest</th>
                  <th className="px-6 py-4">Room</th>
                  <th className="px-6 py-4">Dates</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-5 font-semibold text-primary">{booking.reference}</td>
                    <td className="px-6 py-5">{booking.guest?.name}</td>
                    <td className="px-6 py-5">{booking.room?.name}</td>
                    <td className="px-6 py-5 text-muted-foreground">{formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}</td>
                    <td className="px-6 py-5 font-semibold">{formatCurrency(booking.total, booking.currency)}</td>
                    <td className="px-6 py-5"><StatusBadge type="booking" status={booking.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
