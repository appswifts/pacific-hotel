import { cn } from "../utils/cn";

const heroImages = {
  rooms: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&q=80",
  about: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80",
  amenities: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80",
  offers: "https://images.unsplash.com/photo-1540555700478-4be289fbe6ef?w=1600&q=80",
  reviews: "https://images.unsplash.com/photo-1581848069540-2a5ad4f91b77?w=1600&q=80",
  booking: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80",
  gallery: "https://images.unsplash.com/photo-1578683010236-d716f9a3f3c9?w=1600&q=80",
  contact: "https://images.unsplash.com/photo-1469737899487-8c2849f9e6c4?w=1600&q=80",
  rates: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1600&q=80",
  meetings: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1600&q=80",
  faq: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1600&q=80",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80",
};

export function PageHero({ page, title, subtitle, className }) {
  const image = heroImages[page] || heroImages.rooms;

  return (
    <div className={cn("relative flex min-h-[calc(45vh+150px)] items-center justify-center overflow-hidden pt-[150px]", className)}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
      <div className="relative z-10 mx-auto max-w-container px-4 text-center md:px-8">
        <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
