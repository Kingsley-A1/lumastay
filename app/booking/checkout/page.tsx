import { CheckoutForm } from "@/components/checkout-form";
import { SectionHeader } from "@/components/section-header";

export default function CheckoutPage() {
  return (
    <section className="section-padding bg-background">
      <div className="container-shell space-y-10">
        <SectionHeader
          eyebrow="Checkout"
          title="Guest details, payment simulation, confirmation."
          description="A clean checkout step that shows how the reservation moves from pending payment to confirmed booking in the prototype lifecycle."
        />
        <CheckoutForm />
      </div>
    </section>
  );
}
