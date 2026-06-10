import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RoomCard } from "@/components/room-card";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { getFeaturedRooms } from "@/lib/data";

export function FeaturedRooms() {
  const rooms = getFeaturedRooms();

  return (
    <section className="section-padding bg-white">
      <div className="container-shell space-y-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Featured rooms"
            title="Choose a stay that fits your rhythm."
            description="Each room is presented with clear pricing, capacity, availability, and the details guests need before reserving."
          />
          <Button asChild variant="outline">
            <Link href="/rooms">See all rooms <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
        </div>
      </div>
    </section>
  );
}
