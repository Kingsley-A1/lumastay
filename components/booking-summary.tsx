import { CalendarDays, CreditCard, Users } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Booking, Guest, Room } from "@/lib/types";
import { calculateNights, formatCurrency, formatDate } from "@/lib/utils";

type BookingSummaryProps = {
  booking: Booking;
  room?: Room;
  guest?: Guest;
};

export function BookingSummary({ booking, room, guest }: BookingSummaryProps) {
  const nights = calculateNights(booking.checkIn, booking.checkOut);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>{booking.reference}</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">{room?.name ?? "Selected room"}</p>
          </div>
          <StatusBadge type="booking" status={booking.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-secondary p-4">
            <CalendarDays className="mb-3 h-5 w-5 text-primary" />
            <p className="text-xs text-muted-foreground">Stay dates</p>
            <p className="mt-1 text-sm font-semibold">{formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}</p>
          </div>
          <div className="rounded-2xl bg-secondary p-4">
            <Users className="mb-3 h-5 w-5 text-primary" />
            <p className="text-xs text-muted-foreground">Guests</p>
            <p className="mt-1 text-sm font-semibold">{booking.guests} guest{booking.guests > 1 ? "s" : ""}</p>
          </div>
          <div className="rounded-2xl bg-secondary p-4">
            <CreditCard className="mb-3 h-5 w-5 text-primary" />
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="mt-1 text-sm font-semibold">{formatCurrency(booking.total, booking.currency)}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border p-4 text-sm text-muted-foreground">
          <p><span className="font-semibold text-foreground">Guest:</span> {guest?.name ?? "Guest details pending"}</p>
          <p className="mt-1"><span className="font-semibold text-foreground">Duration:</span> {nights} night{nights > 1 ? "s" : ""}</p>
        </div>
      </CardContent>
    </Card>
  );
}
