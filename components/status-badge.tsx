import { Badge } from "@/components/ui/badge";
import { getAvailabilityMeta, getStatusMeta } from "@/lib/booking";
import type { BookingStatus, RoomAvailability } from "@/lib/types";

type StatusBadgeProps =
  | { type: "booking"; status: BookingStatus }
  | { type: "availability"; status: RoomAvailability; roomsLeft: number };

export function StatusBadge(props: StatusBadgeProps) {
  if (props.type === "booking") {
    const meta = getStatusMeta(props.status);
    return <Badge variant={meta.tone}>{meta.label}</Badge>;
  }

  const meta = getAvailabilityMeta(props.status, props.roomsLeft);
  return <Badge variant={meta.tone}>{meta.label}</Badge>;
}
