import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { SectionHeader } from "../sections/SectionHeader";
import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function Rooms() {
  const rooms = useQuery(api.rooms.list);

  if (rooms === undefined) return <LoadingSpinner />;
  if (!rooms?.length) {
    return (
      <>
        <PageHero page="rooms" title="Our Rooms & Suites" subtitle="Each room is thoughtfully designed to provide the perfect blend of comfort and elegance" />
        <div className="py-24 text-center">
          <div className="mx-auto max-w-container px-4 md:px-8">
            <p className="text-lg text-black">No rooms loaded yet.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero page="rooms" title="Our Rooms & Suites" subtitle="Each room is thoughtfully designed to provide the perfect blend of comfort and elegance" />
      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((r) => (
              <Link
                key={r._id}
                to={`/room/${r._id}`}
                className="bg-bg-primary border border-black/10 overflow-hidden block transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <div
                  className="h-60 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${r.image})` }}
                >
                  <span className="absolute top-4 right-4 bg-bg-brand-solid text-text-white px-3.5 py-1 text-sm font-semibold">
                    ${r.price}<span className="font-normal text-xs">/night</span>
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black tracking-[-0.02em] mb-1">{r.name}</h3>
                  <div className="flex gap-3 text-xs text-black mb-3">
                    <span>{r.size}</span>
                    <span>Up to {r.capacity} guests</span>
                  </div>
                  <p className="text-lg text-black leading-relaxed mb-4 line-clamp-2">{r.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {r.features?.slice(0, 3).map((f) => (
                      <span key={f} className="bg-bg-secondary px-2.5 py-1 text-xs text-black border border-black/10">
                        {f}
                      </span>
                    ))}
                  </div>
                  <Button variant="default" size="md" className="w-full justify-center pointer-events-none bg-black text-white hover:bg-neutral-800 border-black">
                    View Details &rarr;
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
