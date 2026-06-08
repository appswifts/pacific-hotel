import { useState } from "react";
import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";

const categories = ["All", "Rooms", "Dining", "Conference", "Exterior"];

const images = [
  { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80", title: "Kigali View Suite", category: "Rooms" },
  { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80", title: "Deluxe King Room", category: "Rooms" },
  { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", title: "Executive Suite", category: "Rooms" },
  { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80", title: "Family Suite", category: "Rooms" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbe6ef?w=600&q=80", title: "Poolside Restaurant", category: "Dining" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", title: "Fine Dining Experience", category: "Dining" },
  { src: "https://images.unsplash.com/photo-1559304822-0bb203c8a8f6?w=600&q=80", title: "Breakfast Buffet", category: "Dining" },
  { src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80", title: "Conference Room", category: "Conference" },
  { src: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&q=80", title: "Board Room", category: "Conference" },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80", title: "Meeting Space", category: "Conference" },
  { src: "https://images.unsplash.com/photo-1560023907-5f3394d0cf30?w=600&q=80", title: "Hotel Exterior", category: "Exterior" },
  { src: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=600&q=80", title: "Main Entrance", category: "Exterior" },
  { src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80", title: "Pool & Garden", category: "Exterior" },
];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === "All" ? images : images.filter((i) => i.category === active);

  return (
    <>
      <PageHero page="gallery" title="Our Gallery" subtitle="Explore Pacific Hotel through our lens" />
      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-4 py-1.5 text-sm font-medium border transition-colors ${
                  active === cat
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-transparent text-black hover:bg-black/5"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((img, i) => (
              <button key={i} onClick={() => setLightbox(img)}
                className="group relative aspect-[4/3] overflow-hidden border border-black/10 bg-bg-secondary">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${img.src})` }} />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 text-left transition-transform group-hover:translate-y-0">
                  <p className="text-sm font-semibold text-white">{img.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
