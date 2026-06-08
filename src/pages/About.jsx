import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SectionHeader } from "../sections/SectionHeader";
import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";
import { SocialProofSection } from "../sections/SocialProofSection";
import { CTASection } from "../sections/CTASection";
import { LoadingSpinner } from "../components/LoadingSpinner";

const stats = [
  { value: "120+", label: "Luxury Rooms" },
  { value: "98%", label: "Guest Satisfaction" },
  { value: "15+", label: "Years of Excellence" },
  { value: "4", label: "World-Class Restaurants" },
];

export default function About() {
  return (
    <>
      <PageHero page="about" title="About Pacific Hotel" subtitle="Luxury in the Heart of Kigali" />
      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-black md:text-4xl lg:text-5xl mb-6">
                Luxury in the Heart of Kigali
              </h2>
              <p className="text-lg text-black leading-relaxed mb-6">
                Nestled in the upscale suburb of Remera, Pacific Hotel offers an unparalleled escape into refined luxury. Just minutes from Kigali International Airport and the city center, every detail has been crafted to create an atmosphere of serenity and elegance.
              </p>
              <p className="text-lg text-black leading-relaxed mb-8">
                From our world-class spa to our fine dining restaurants, we invite you to experience
                hospitality reimagined. Whether you&rsquo;re here for business or pleasure, your stay with us
                will be nothing short of extraordinary. Our prime location in Remera puts you minutes away
                from Kigali&rsquo;s premier business hubs, the Kigali Convention Centre, the Amahoro Stadium,
                and the city&rsquo;s best restaurants and shops.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-gradient-to-br from-bg-primary to-bg-secondary p-5 border border-black/10 text-center">
                    <div className="text-2xl font-bold text-black leading-tight tracking-[-0.02em]">{s.value}</div>
                    <div className="text-sm text-black mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="h-[520px] bg-cover bg-center"
              style={{ backgroundImage: "url('/images/WhatsApp%20Image%202026-06-04%20at%2011.33.40.jpeg')" }}
            />
          </div>
        </div>
      </section>

      <SocialProofSection
        items={stats}
        brand
      />

      <CTASection
        heading="Ready to experience Pacific Hotel?"
        text="Book your stay today and discover the finest hospitality in Kigali."
        primaryLabel="Book Your Stay"
        primaryHref="/booking"
        secondaryLabel="View Rooms"
        secondaryHref="/rooms"
      />
    </>
  );
}
