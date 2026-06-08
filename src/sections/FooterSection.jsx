import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const footerNav = [
  {
    label: "Accommodations",
    items: [
      { label: "Rooms & Suites", href: "/rooms" },
      { label: "Rates", href: "/rates" },
      { label: "Amenities", href: "/amenities" },
      { label: "Special Offers", href: "/offers" },
      { label: "Booking", href: "/booking" },
    ],
  },
  {
    label: "Experiences",
    items: [
      { label: "Restaurant & Dining", href: "/restaurant" },
      { label: "Spa & Wellness", href: "/spa" },
      { label: "Gallery", href: "/gallery" },
      { label: "Meetings & Events", href: "/meetings" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "Support",
    items: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cancellations", href: "/faq" },
      { label: "Virtual Tour", href: "#" },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="bg-black py-12 md:pt-16">
      <div className="mx-auto max-w-container px-4 md:px-8">
        <nav>
          <ul className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {footerNav.map((category) => (
              <li key={category.label}>
                <h4 className="text-sm font-bold text-white">
                  {category.label}
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {category.items.map((item) => (
                    <li key={item.label}>
                      {item.href.startsWith("/") ? (
                        <Link
                          to={item.href}
                          className="text-sm font-semibold text-white hover:text-white/70 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="text-sm font-semibold text-white hover:text-white/70 transition-colors"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-12 flex flex-col justify-between gap-6 border-t border-white/20 pt-8 md:mt-16 md:flex-row md:items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo%20for%20red.png"
              alt="Pacific Hotel"
              className="h-12 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="text-xs font-semibold text-white hover:text-white/70 transition-colors">
              Admin
            </Link>
            <p className="text-sm font-semibold text-white">
              &copy; {new Date().getFullYear()} Pacific Hotel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
