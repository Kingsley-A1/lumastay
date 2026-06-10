import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-shell">
        <div className="navy-gradient overflow-hidden rounded-[2rem] p-8 text-white shadow-soft sm:p-12 lg:p-16">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Ready when you are</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Reserve a warm, premium stay in minutes.</h2>
            <p className="text-base leading-7 text-white/70">
              Move from room discovery to confirmation through a clear booking lifecycle built for speed, confidence, and calm arrival.
            </p>
            <Button asChild variant="accent" size="lg">
              <Link href="/rooms">Explore rooms <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
