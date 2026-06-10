import Link from "next/link";
import { CheckCircle2, Download, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBookingViewModels } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

type ConfirmationPageProps = {
  searchParams?: Promise<{ reference?: string }>;
};

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const params = await searchParams;
  const demoBooking = getBookingViewModels()[0];
  const reference = params?.reference ?? demoBooking.reference;

  return (
    <section className="section-padding bg-background">
      <div className="container-shell max-w-4xl">
        <Card className="overflow-hidden">
          <div className="navy-gradient p-8 text-white sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <CheckCircle2 className="h-7 w-7 text-[#2F7D6D]" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">Booking confirmed</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Your stay is reserved.</h1>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-sm">
                <p className="text-white/55">Reference</p>
                <p className="mt-1 text-xl font-bold">{reference}</p>
              </div>
            </div>
          </div>
          <CardContent className="grid gap-6 p-8 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <Info label="Room" value={demoBooking.room?.name ?? "Palm View Deluxe"} />
              <Info label="Guest" value={demoBooking.guest?.name ?? "Demo Guest"} />
              <Info label="Check-in" value={formatDate(demoBooking.checkIn)} />
              <Info label="Check-out" value={formatDate(demoBooking.checkOut)} />
              <Info label="Guests" value={`${demoBooking.guests} guest(s)`} />
              <Info label="Total" value={formatCurrency(demoBooking.total, demoBooking.currency)} />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent">
                <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Open dashboard</Link>
              </Button>
              <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download receipt</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
