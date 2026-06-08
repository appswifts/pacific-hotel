import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { cn } from "../utils/cn";

export function HeroSection({
  heading = "Welcome to",
  headingAccent = "Pacific Hotel",
  description = "Where the ocean meets paradise. Unforgettable stays, world-class service, and breathtaking views.",
  primaryLabel = "Book Your Stay",
  primaryHref = "/booking",
  secondaryLabel = "Explore Rooms",
  secondaryHref = "/rooms",
  stats = [],
  image = "/images/eeee22222e.jpeg",
  className,
}) {
  return (
    <section
      className={cn(
        "relative h-screen min-h-[640px] flex items-center overflow-hidden bg-neutral-900",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-center bg-cover opacity-50"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-container px-4 md:px-8">
        <div className="max-w-3xl">

          <h1 className="font-display text-4xl font-bold leading-tight tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
            {heading}{" "}
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              {headingAccent}
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/60 md:text-xl">
            {description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to={primaryHref}>
              <Button variant="default" size="xl">
                {primaryLabel} &rarr;
              </Button>
            </Link>
            <Link to={secondaryHref}>
              <Button
                variant="secondary"
                size="xl"
                className="bg-white/10 text-white ring-white/20 hover:bg-white/20"
              >
                {secondaryLabel}
              </Button>
            </Link>
          </div>

          {stats.length > 0 && (
            <div className="mt-12 flex gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold leading-tight text-white">
                    {s.value}
                  </div>
                  <div className="text-xs font-medium text-white/45">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
