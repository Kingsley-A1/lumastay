import { Badge } from "@/components/ui/Badge";
import { getStatusLabel, getStatusColor } from "@/lib/booking";
import { BookingStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: BookingStatus | string;
  className?: string;
}

function statusToVariant(status: BookingStatus | string): "default" | "success" | "warning" | "error" | "info" | "neutral" {
  switch (status) {
    case BookingStatus.Confirmed:
    case BookingStatus.Completed:
      return "success";
    case BookingStatus.PendingPayment:
      return "warning";
    case BookingStatus.Cancelled:
      return "error";
    case BookingStatus.CheckedIn:
      return "info";
    case BookingStatus.CheckedOut:
      return "neutral";
    case BookingStatus.Draft:
    default:
      return "neutral";
  }
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = statusToVariant(status);
  return (
    <Badge variant={variant} className={className}>
      {getStatusLabel(status)}
    </Badge>
  );
}
