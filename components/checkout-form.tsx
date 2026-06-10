"use client";

import { useRouter } from "next/navigation";
import { CreditCard, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBookingReference } from "@/lib/booking";

export function CheckoutForm() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reference = createBookingReference();

    if (typeof window !== "undefined") {
      window.localStorage.setItem("lumastay:lastBooking", reference);
    }

    router.push(`/booking/confirmation?reference=${reference}`);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>Guest details</CardTitle>
          <p className="text-sm text-muted-foreground">This mock checkout creates a demo confirmation reference.</p>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" placeholder="Amara Cole" required />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="amara@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" placeholder="+234 801 000 1100" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Arrival notes</Label>
            <Input id="notes" name="notes" placeholder="Late check-in, breakfast preference, or airport pickup request" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mock payment</CardTitle>
          <p className="text-sm text-muted-foreground">No real card is charged in this prototype.</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-3xl bg-primary p-5 text-white">
            <div className="flex items-center justify-between">
              <CreditCard className="h-6 w-6" />
              <span className="text-xs text-white/55">LumaStay Demo</span>
            </div>
            <p className="mt-10 text-lg font-semibold tracking-[0.25em]">4242 4242 4242 4242</p>
            <p className="mt-3 text-xs text-white/55">MOCK CARD · 12/30</p>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#2F7D6D]" />
            <p>This step simulates the move from pending payment to confirmed booking.</p>
          </div>
          <Button type="submit" variant="accent" size="lg" className="w-full">Confirm booking</Button>
        </CardContent>
      </Card>
    </form>
  );
}
