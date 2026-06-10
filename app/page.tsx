import { Experiences } from "@/components/experiences";
import { FeaturedRooms } from "@/components/featured-rooms";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { Testimonials } from "@/components/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedRooms />
      <Experiences />
      <Testimonials />
      <FinalCta />
    </>
  );
}
