import { SectionHeader } from "../sections/SectionHeader";
import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";
import { FeaturesSection } from "../sections/FeaturesSection";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Waves, Sparkles, UtensilsCrossed, Car, Briefcase, ConciergeBell } from "lucide-react";

const amenities = [
  { icon: Waves, title: "Infinity Pool", subtitle: "Heated pool overlooking the stunning Kigali hills" },
  { icon: Sparkles, title: "Spa & Wellness", subtitle: "Full-service spa, sauna, steam room & gym" },
  { icon: UtensilsCrossed, title: "Fine Dining", subtitle: "Three restaurants with world-class cuisine" },
  { icon: Car, title: "Airport Shuttle", subtitle: "Complimentary transfers from Kigali International Airport" },
  { icon: Briefcase, title: "Business Center", subtitle: "Meeting rooms, coworking & concierge" },
  { icon: ConciergeBell, title: "Concierge", subtitle: "24/7 personalized service for every need" },
];

export default function Amenities() {
  return (
    <>
      <PageHero page="amenities" title="World-Class Amenities" subtitle="Every detail designed to make your stay exceptional" />
      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <FeaturesSection items={amenities} columns={3} />
        </div>
      </section>
    </>
  );
}
