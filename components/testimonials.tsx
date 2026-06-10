import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/section-header";
import { getTestimonials } from "@/lib/data";

export function Testimonials() {
  const testimonials = getTestimonials();

  return (
    <section className="section-padding bg-white">
      <div className="container-shell space-y-10">
        <SectionHeader
          eyebrow="Guest confidence"
          title="Designed to make every step feel handled."
          description="The prototype uses guest-centered language and lifecycle clarity so the reservation never feels uncertain."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="space-y-6 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Quote className="h-5 w-5" />
                </div>
                <p className="text-sm leading-7 text-muted-foreground">“{testimonial.quote}”</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
