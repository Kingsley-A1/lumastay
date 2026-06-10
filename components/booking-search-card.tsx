"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BookingSearchCard() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("2026-07-18");
  const [checkOut, setCheckOut] = useState("2026-07-21");
  const [guests, setGuests] = useState("2");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ checkIn, checkOut, guests });
    router.push(`/rooms?${params.toString()}`);
  }

  return (
    <Card className="relative z-10 p-4 shadow-soft sm:p-5">
      <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Destination</Label>
          <Input id="location" value="LumaStay, Lagos" readOnly />
        </div>
        <div className="space-y-2">
          <Label htmlFor="checkIn" className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-accent" /> Check-in</Label>
          <Input id="checkIn" type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="checkOut" className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-accent" /> Check-out</Label>
          <Input id="checkOut" type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] lg:grid-cols-[140px_auto]">
          <div className="space-y-2">
            <Label htmlFor="guests" className="flex items-center gap-2"><Users className="h-4 w-4 text-accent" /> Guests</Label>
            <Input id="guests" type="number" min="1" max="8" value={guests} onChange={(event) => setGuests(event.target.value)} />
          </div>
          <Button type="submit" variant="accent" size="lg" className="self-end">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </form>
    </Card>
  );
}
