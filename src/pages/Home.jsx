import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { FlowerPattern } from "../components/Patterns";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/rooms", label: "Rooms" },
  { to: "/amenities", label: "Amenities" },
  { to: "/offers", label: "Offers" },
  { to: "/reviews", label: "Reviews" },
];

const imageSlides = [
  {
    image: "/images/WhatsApp%20Image%202026-06-04%20at%2011.33.40.jpeg",
    title: "Your unforgettable experience",
    subtitle: "starts upon arrival",
  },
  {
    image: "/images/WhatsApp%20Image%202026-06-04%20at%2011.33.10eeee.jpeg",
    title: "Where luxury meets",
    subtitle: "the heart of Kigali",
  },
  {
    image: "/images/eeeeeeeeeeeeeeeee222222222222.jpeg",
    title: "World-class service",
    subtitle: "in every detail",
  },
  {
    image: "/images/eeee22222e.jpeg",
    title: "A sanctuary in the city",
    subtitle: "designed for your comfort",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSlideIdx((i) => (i + 1) % imageSlides.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => { setMenuOpen(false); }, []);

  return (
    <div className="relative flex h-dvh w-full flex-col md:flex-row">
      <div className="relative h-1/2 w-full overflow-hidden md:h-full md:w-1/2">
        {imageSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${s.image})`,
              opacity: i === slideIdx ? 1 : 0,
              transform: i === slideIdx ? "scale(1)" : "scale(1.06)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div
          className={`absolute inset-0 flex items-end justify-center p-6 transition-opacity duration-700 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-xs text-center">
            <h2 className="font-display text-xl font-bold text-white md:text-2xl">
              {imageSlides[slideIdx]?.title}
            </h2>
            <p className="mt-1 text-sm text-white/70 md:text-lg">
              {imageSlides[slideIdx]?.subtitle}
            </p>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {imageSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setSlideIdx(i); setFade(true); }}
              className={`rounded-full transition-all duration-500 ${
                i === slideIdx
                  ? "h-2 w-6 bg-white"
                  : "h-2 w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative flex h-1/2 w-full flex-col items-center justify-center md:h-full md:w-1/2 overflow-hidden" style={{ backgroundColor: "#6d1414" }}>
        <FlowerPattern opacity={0.2} color="#ffffff" />
        <div className="mx-auto max-w-sm text-center relative z-10">
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
            Pacific Hotel
          </h1>
          <p className="mt-4 text-display-sm text-white/90 md:text-display-md">
            Where golden African sunsets meet lush tropical gardens. Unwind in the heart of Kigali, surrounded by nature&rsquo;s finest embrace.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/booking">
              <Button variant="secondary" size="lg">
                Book Your Stay &rarr;
              </Button>
            </Link>
            <Link to="/rooms">
              <Button
                variant="default"
                size="lg"
                className="border-black bg-black text-white hover:bg-neutral-800 hover:text-white"
              >
                Explore Rooms
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-container items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center">
            <img src="/images/logo.png" alt="Pacific Hotel" className="h-[100px] w-auto md:h-[200px]" />
          </Link>
          <div className="hidden items-center gap-3 md:flex">
            <div className="inline-flex items-center gap-1">
              {links.slice(1).map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="px-3 py-1.5 text-sm font-display font-bold uppercase tracking-wider text-white/80 transition-colors hover:text-white"
                  >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link to="/booking">
              <Button variant="secondary" size="md">
                Book Now
              </Button>
            </Link>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 text-2xl leading-none text-white md:hidden"
            aria-label="Menu"
          >
            {menuOpen ? "\u2715" : "\u2630"}
          </button>
        </div>
        {menuOpen && (
          <div className="w-full px-4 md:hidden">
            <div className="flex w-full flex-col gap-1 bg-black/80 p-6 backdrop-blur-md">
              <nav className="flex flex-col items-center gap-2">
                {links.slice(1).map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="w-full px-4 py-3 text-center text-sm font-display font-bold uppercase tracking-wider text-white/70 transition-colors hover:text-white hover:bg-white/10 rounded-none"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link to="/booking" className="w-full mt-2">
                  <Button variant="secondary" size="md" className="w-full">
                    Book Now
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
