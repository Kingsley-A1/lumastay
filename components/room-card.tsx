import Image from "next/image";
import Link from "next/link";
import { BedDouble, Star, Users } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Room } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type RoomCardProps = {
  room: Room;
};

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="group overflow-hidden transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={room.images[0]}
          alt={`${room.name} prototype room image`}
          width={1200}
          height={800}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <StatusBadge type="availability" status={room.availability} roomsLeft={room.roomsLeft} />
        </div>
      </div>
      <CardContent className="space-y-5 p-6">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-tight">{room.name}</h3>
            <span className="flex items-center gap-1 text-sm font-semibold text-primary"><Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" /> {room.rating}</span>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{room.shortDescription}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1"><Users className="h-3.5 w-3.5" /> {room.capacity} guests</span>
          <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1"><BedDouble className="h-3.5 w-3.5" /> {room.beds}</span>
          <span className="rounded-full bg-secondary px-3 py-1">{room.size}</span>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-xl font-bold text-primary">{formatCurrency(room.pricePerNight, room.currency)}</p>
            <p className="text-xs text-muted-foreground">per night</p>
          </div>
          <Button asChild variant="accent">
            <Link href={`/rooms/${room.slug}`}>View room</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
