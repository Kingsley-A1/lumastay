import { CheckCircle2 } from "lucide-react";
import { bookingLifecycle, getStatusMeta } from "@/lib/booking";

export function BookingSteps() {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      {bookingLifecycle.map((status, index) => {
        const meta = getStatusMeta(status);
        return (
          <div key={status} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">{index + 1}</span>
              <CheckCircle2 className="h-4 w-4 text-[#2F7D6D]" />
            </div>
            <p className="text-sm font-semibold">{meta.label}</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{meta.description}</p>
          </div>
        );
      })}
    </div>
  );
}
