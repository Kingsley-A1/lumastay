import { Suspense } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { RoomCard } from "@/components/room-card";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getRooms } from "@/lib/data";

type RoomsPageProps = {
  searchParams?: Promise<{ checkIn?: string; checkOut?: string; guests?: string }>;
};

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
  const params = await searchParams;
  const rooms = getRooms();

  return (
    <section className="section-padding bg-background">
      <div className="container-shell space-y-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <SectionHeader
            eyebrow="Rooms"
            title="Premium rooms with clear choices."
            description="Compare spaces by price, capacity, availability, and amenities before moving into the reservation flow."
          />
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-semibold">Search context</p>
                <p className="text-xs text-muted-foreground">
                  {params?.checkIn ?? "2026-07-18"} → {params?.checkOut ?? "2026-07-21"} · {params?.guests ?? "2"} guest(s)
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary"><Filter className="mr-2 h-3.5 w-3.5" /> All rooms</Badge>
          <Badge variant="muted">Breakfast option</Badge>
          <Badge variant="muted">Work-friendly</Badge>
          <Badge variant="muted">Family stays</Badge>
          <Badge variant="muted">Suites</Badge>
        </div>

        <Suspense>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
          </div>
        </Suspense>
      </div>
    </section>
  );
}
