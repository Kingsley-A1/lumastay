import Image from "next/image";
import { SectionHeader } from "@/components/section-header";
import { getExperiences } from "@/lib/data";

export function Experiences() {
  const experiences = getExperiences();

  return (
    <section className="section-padding bg-background">
      <div className="container-shell space-y-10">
        <SectionHeader
          align="center"
          eyebrow="Beyond the room"
          title="Small details that make arrival feel easy."
          description="LumaStay is designed around real guest moments: food, rest, work, and calm transitions."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {experiences.map((experience) => (
            <article key={experience.title} className="overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-card">
              <Image src={experience.image} alt={experience.title} width={1200} height={900} className="h-64 w-full object-cover" />
              <div className="space-y-2 p-6">
                <h3 className="text-lg font-semibold">{experience.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{experience.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
