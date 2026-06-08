import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const treatments = [
  { name: "Rwandan Herbal Massage", desc: "Traditional deep tissue massage using locally sourced herbs and essential oils — lemongrass, eucalyptus, and calendula.", duration: "60 min", price: "$65" },
  { name: "Volcanic Stone Therapy", desc: "Heated volcanic basalt stones placed on key energy points combined with a full-body massage.", duration: "75 min", price: "$80" },
  { name: "Coffee Body Scrub", desc: "Exfoliating scrub using Rwandan coffee grounds, coconut oil, and brown sugar, followed by a warm rinse and moisturizing wrap.", duration: "50 min", price: "$55" },
  { name: "Facial Radiance Ritual", desc: "Deep-cleansing facial with honey, avocado, and banana mask — all sourced from local farms.", duration: "60 min", price: "$60" },
  { name: "Hot Tub & Steam Room", desc: "Unlimited access to our outdoor hot tub, steam room, and relaxation lounge.", duration: "Full day", price: "$25" },
  { name: "Couples Retreat", desc: "Side-by-side massage with rose petals, sparkling wine, and a private relaxation cabana.", duration: "90 min", price: "$180" },
];

export default function Spa() {
  return (
    <>
      <PageHero page="spa" title="Spa & Wellness" subtitle="Rejuvenate body and soul with nature-inspired treatments" />

      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-black md:text-4xl">Serenity Spa</h2>
            <p className="mt-4 text-lg text-black/70">Open daily &middot; 8:00 AM &ndash; 8:00 PM &middot; Walk-ins welcome</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t, i) => (
              <div key={i} className="border-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] p-6 flex flex-col">
                <h3 className="text-lg font-bold text-black">{t.name}</h3>
                <p className="mt-2 text-base text-black/70 flex-1">{t.desc}</p>
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-black/10">
                  <span className="text-sm text-black/60">{t.duration}</span>
                  <span className="text-lg font-bold text-black">{t.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-2xl mt-16 text-center">
            <div className="border-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] p-8">
              <h3 className="font-display text-2xl font-bold text-black">Fitness Center</h3>
              <p className="mt-3 text-lg text-black/70">Complimentary 24-hour access to our fully equipped fitness center with cardio machines, free weights, and yoga mats. Personal training sessions available on request.</p>
              <Link to="/contact">
                <Button variant="default" size="lg" className="mt-6 bg-gradient-to-r from-brand-700 to-brand-500 text-white hover:from-brand-800 hover:to-brand-600">
                  Book a Treatment &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
