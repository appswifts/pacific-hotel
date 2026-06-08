import { SectionHeader } from "../sections/SectionHeader";
import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";
import { TestimonialSection } from "../sections/TestimonialSection";

const reviews = [
  {
    quote: "Absolutely breathtaking! The view of Kigali's hills from our suite was unforgettable. The staff went above and beyond to make our stay special.",
    name: "Grace Uwimana",
    title: "Business Traveler",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    stars: 5,
  },
  {
    quote: "Impeccable service and stunning property. The infinity pool overlooking the city at sunset is a must-see. Already planning our return.",
    name: "David Mugisha",
    title: "Vacationer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    stars: 5,
  },
  {
    quote: "The executive suite exceeded every expectation. Perfect location near the convention center, incredible comfort, and the staff were phenomenal.",
    name: "Aline Habimana",
    title: "Honeymooner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
    stars: 5,
  },
];

export default function Reviews() {
  return (
    <>
      <PageHero page="reviews" title="What Our Guests Say" subtitle="Real feedback from real guests" />
      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <TestimonialSection reviews={reviews} />
        </div>
      </section>
    </>
  );
}
