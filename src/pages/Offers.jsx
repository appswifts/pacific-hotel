import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { SectionHeader } from "../sections/SectionHeader";
import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function Offers() {
  const offers = useQuery(api.offers.list);

  if (offers === undefined) return <LoadingSpinner />;
  if (!offers?.length) return <div className="pt-[150px]" />;

  return (
    <>
      <PageHero page="offers" title="Special Offers" subtitle="Exclusive packages crafted for unforgettable experiences" />
      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((o) => (
              <div
                key={o._id}
                className="bg-bg-primary border border-black/10 overflow-hidden transition-all hover:shadow-lg"
              >
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${o.image})` }}
                >
                  <span className="absolute bottom-3 left-4 bg-bg-brand-solid text-text-white px-3.5 py-1 text-sm font-bold">
                    {o.price}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold text-black uppercase tracking-wider mb-1">
                    {o.subtitle}
                  </p>
                  <h3 className="text-xl font-semibold text-black tracking-[-0.02em] mb-2">{o.title}</h3>
                  <p className="text-lg text-black leading-relaxed mb-4">{o.description}</p>
                  <div className="space-y-1.5 mb-4">
                    {o.features?.map((f) => (
                      <div key={f} className="flex items-center gap-1.5 text-lg text-black">
                        <span className="text-black">&#10003;</span> {f}
                      </div>
                    ))}
                  </div>
                  <Link to="/booking">
                    <Button variant="default" size="md" className="w-full justify-center">
                      Book This Offer &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
