import { Button } from "../components/ui/button";
import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";
import { Link } from "react-router-dom";

const roomRates = [
  { name: "Superior Room", price: 140, size: "32 m\u00b2", capacity: 2, features: ["King/Twin Bed", "En-suite Bathroom", "Work Desk", "Coffee Machine", "Mini Bar", "Smart TV", "Free Wi-Fi"] },
  { name: "Superior Twin Room", price: 180, size: "32 m\u00b2", capacity: 2, features: ["Twin Beds", "En-suite Bathroom", "Work Desk", "Coffee Machine", "Mini Bar", "Smart TV", "Free Wi-Fi"] },
  { name: "Deluxe King Room", price: 320, size: "35 m\u00b2", capacity: 2, features: ["King Bed", "Rain Shower", "Work Desk", "Coffee Machine", "Mini Bar", "Smart TV", "Free Wi-Fi"] },
  { name: "Kigali View Suite", price: 450, size: "45 m\u00b2", capacity: 3, features: ["King Bed", "City View Balcony", "Soaking Tub", "Living Area", "Mini Bar", "Smart TV", "Free Wi-Fi"] },
  { name: "Executive Suite", price: 680, size: "65 m\u00b2", capacity: 4, features: ["Separate Living Area", "Butler Service", "Panoramic View", "Soaking Tub", "Mini Bar", "Smart TV", "Free Wi-Fi"] },
  { name: "Family Suite", price: 650, size: "75 m\u00b2", capacity: 4, features: ["Two Bedrooms", "Living Area", "Kitchenette", "Kid-Friendly", "Balcony", "Smart TV", "Free Wi-Fi"] },
  { name: "Presidential Penthouse", price: 2500, size: "200 m\u00b2", capacity: 4, features: ["Rooftop Terrace", "Butler Service", "Jacuzzi", "Home Theater", "Wine Cellar", "Panoramic Views", "Private Concierge"] },
];

const conferenceRates = [
  { name: "Half Day Conference", price: 35, unit: "per person", includes: "Tea break & Lunch" },
  { name: "Full Day Conference", price: 45, unit: "per person", includes: "2x Tea break & Lunch" },
  { name: "24-Hour Conference", price: 300, unit: "per person", includes: "1 night DBB, 2x Tea break & Lunch" },
];

export default function Rates() {
  return (
    <>
      <PageHero page="rates" title="Room Rates" subtitle="Competitive rates for the finest accommodation in Kigali" />
      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border border-black/10 bg-bg-primary">
              <thead>
                <tr className="border-b border-black/10 bg-gradient-to-r from-bg-secondary to-bg-primary">
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Room Type</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Size</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Capacity</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Rate (USD)</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Period</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {roomRates.map((r, i) => (
                  <tr key={r.name} className={i < roomRates.length - 1 ? "border-b border-black/5" : ""}>
                    <td className="px-4 py-3 text-lg font-semibold text-black">{r.name}</td>
                    <td className="px-4 py-3 text-lg text-black">{r.size}</td>
                    <td className="px-4 py-3 text-lg text-black">{r.capacity} guests</td>
                    <td className="px-4 py-3 text-lg font-bold text-black">${r.price}</td>
                    <td className="px-4 py-3 text-lg text-black">Per night</td>
                    <td className="px-4 py-3">
                      <Link to="/booking"><Button variant="default" size="sm">Book Now</Button></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-lg text-black/70">
            Rates are based on single occupancy. $40 supplement applies for double occupancy.
            Corporate discounts available on application.
          </p>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-t from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.04} size={60} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-black text-center mb-2 md:text-4xl lg:text-5xl">Conference Rates</h2>
          <p className="text-center text-lg text-black mb-14">Professional meeting facilities in the heart of Kigali</p>

          <div className="overflow-x-auto">
            <table className="w-full border border-black/10 bg-bg-primary">
              <thead>
                <tr className="border-b border-black/10 bg-gradient-to-r from-bg-secondary to-bg-primary">
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Package</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Rate (USD)</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Unit</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Includes</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {conferenceRates.map((r, i) => (
                  <tr key={r.name} className={i < conferenceRates.length - 1 ? "border-b border-black/5" : ""}>
                    <td className="px-4 py-3 text-lg font-semibold text-black">{r.name}</td>
                    <td className="px-4 py-3 text-lg font-bold text-black">${r.price}</td>
                    <td className="px-4 py-3 text-lg text-black">{r.unit}</td>
                    <td className="px-4 py-3 text-lg text-black">{r.includes}</td>
                    <td className="px-4 py-3">
                      <Link to="/meetings"><Button variant="default" size="sm">Inquire</Button></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
