import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ChevronDown } from "lucide-react";
import { FlowerPattern } from "../components/Patterns";

const mainLinks = [
  { to: "/about", label: "About" },
  { to: "/rooms", label: "Rooms & Suites" },
  { to: "/gallery", label: "Gallery" },
  { to: "/offers", label: "Offers" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const serviceLinks = [
  { to: "/amenities", label: "Amenities" },
  { to: "/restaurant", label: "Restaurant" },
  { to: "/spa", label: "Spa & Wellness" },
  { to: "/meetings", label: "Meetings & Events" },
];

export function NavbarSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setServicesOpen(false); }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? "bg-transparent" : "bg-brand-800"
      }`}
    >
      {!transparent && <FlowerPattern opacity={0.15} color="#ffffff" />}
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-0 md:px-8 relative">
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo%20for%20red.png"
            alt="Pacific Hotel"
            className="h-[100px] w-auto md:h-[120px]"
          />
        </Link>

        <nav className="hidden items-center gap-0 md:flex">
          {mainLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-2.5 py-2 text-xs font-display font-bold uppercase tracking-wider transition-colors ${
                transparent
                  ? "text-white/80 hover:text-white"
                  : "text-brand-200 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`flex items-center gap-0.5 px-2.5 py-2 text-xs font-display font-bold uppercase tracking-wider transition-colors ${
                transparent
                  ? "text-white/80 hover:text-white"
                  : "text-brand-200 hover:text-white"
              }`}
            >
              Services
              <ChevronDown className={`h-3 w-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="absolute right-0 top-full min-w-[180px] bg-brand-900 shadow-lg">
                {serviceLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider text-brand-200 transition-colors hover:bg-brand-800 hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:block">
          <Link to="/booking">
            <Button variant="secondary" size="sm" className="text-xs px-3 py-1.5 h-auto">
              Book Now
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden text-2xl leading-none p-1 ${
            transparent ? "text-white" : "text-brand-200"
          }`}
          aria-label="Menu"
        >
          {menuOpen ? "\u2715" : "\u2630"}
        </button>
      </div>

      {menuOpen && (
        <div className="bg-brand-900 px-4 py-4 md:hidden max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {[...mainLinks, ...serviceLinks].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm font-display font-bold uppercase tracking-wider text-brand-200 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2">
              <Link to="/booking">
                <Button variant="secondary" size="md" className="w-full justify-center">
                  Book Now
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
