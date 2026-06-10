import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BedDouble, Check, ShieldCheck, Star, Users } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRoomBySlug, getRooms } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return getRooms().map((room) => ({ slug: room.slug }));
}

type RoomDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) notFound();

  return (
    <section className="section-padding bg-background">
      <div className="container-shell space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge type="availability" status={room.availability} roomsLeft={room.roomsLeft} />
              <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" /> {room.rating} guest rating
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">{room.name}</h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{room.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm"><Users className="mb-3 h-5 w-5 text-accent" /><p className="text-sm font-semibold">{room.capacity} guests</p></div>
              <div className="rounded-2xl bg-white p-4 shadow-sm"><BedDouble className="mb-3 h-5 w-5 text-accent" /><p className="text-sm font-semibold">{room.beds}</p></div>
              <div className="rounded-2xl bg-white p-4 shadow-sm"><ShieldCheck className="mb-3 h-5 w-5 text-[#2F7D6D]" /><p className="text-sm font-semibold">{room.size}</p></div>
            </div>
          </div>

          <Card className="h-fit lg:sticky lg:top-28">
            <CardHeader>
              <CardTitle>Reservation summary</CardTitle>
              <p className="text-sm text-muted-foreground">Clear pricing before checkout.</p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="text-3xl font-bold text-primary">{formatCurrency(room.pricePerNight, room.currency)}</p>
                <p className="text-sm text-muted-foreground">per night</p>
              </div>
              <div className="rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">
                Free cancellation within the approved reservation window. Mock payment only for prototype review.
              </div>
              <Button asChild variant="accent" size="lg" className="w-full">
                <Link href={`/booking/checkout?room=${room.slug}`}>Reserve this room <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {room.images.map((image, index) => (
              <div key={image} className={index === 0 ? "sm:col-span-2" : ""}>
                <Image src={image} alt={`${room.name} image ${index + 1}`} width={1400} height={900} className="h-80 w-full rounded-[1.5rem] object-cover shadow-card" />
              </div>
            ))}
          </div>
          <div className="grid gap-6">
            <Card>
              <CardHeader><CardTitle>Amenities</CardTitle></CardHeader>
              <CardContent className="grid gap-3">
                {room.amenities.map((amenity) => <p key={amenity} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-[#2F7D6D]" /> {amenity}</p>)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Policies</CardTitle></CardHeader>
              <CardContent className="grid gap-3">
                {room.policies.map((policy) => <p key={policy} className="flex items-center gap-3 text-sm text-muted-foreground"><Check className="h-4 w-4 text-[#2F7D6D]" /> {policy}</p>)}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
