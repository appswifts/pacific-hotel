import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/Button";
import { SectionHeader } from "../sections/SectionHeader";
import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function Booking() {
  const rooms = useQuery(api.rooms.list);
  const createBooking = useMutation(api.bookings.create);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", roomId: "",
    checkIn: "", checkOut: "", guests: 1,
  });
  const [booked, setBooked] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const room = rooms?.find((r) => r._id === form.roomId);
  const nights =
    form.checkIn && form.checkOut
      ? Math.max(0, Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)))
      : 0;
  const total = nights * (room?.price || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!room) return;
    await createBooking({
      name: form.name,       email: form.email, phone: form.phone,
      roomId: form.roomId, roomName: room.name,
      checkIn: form.checkIn, checkOut: form.checkOut,
      guests: Number(form.guests), total,
      addons: "", requests: "",
    });
    setBooked(true);
    setForm({ name: "", email: "", phone: "", roomId: "", checkIn: "", checkOut: "", guests: 1 });
  };

  const inputClass =
    "w-full px-3.5 py-2.5 border-0 text-lg outline-none transition-all shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] focus:shadow-[0_0_0_2px_black,0_0_8px_rgba(0,0,0,0.25)]";

  if (rooms === undefined) return <LoadingSpinner />;

  return (
    <>
      <PageHero page="booking" title="Book Your Stay" subtitle="Reserve your room and experience the finest hospitality in Kigali" />
      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">

          {booked ? (
            <div className="max-w-lg mx-auto bg-bg-primary border border-black/10 p-10 text-center">
              <div className="text-4xl mb-4">&#10003;</div>
              <h3 className="text-xl font-bold text-black mb-2">Booking Confirmed!</h3>
              <p className="text-black mb-6">
                We look forward to hosting you at Pacific Hotel in Kigali.
              </p>
              <Button variant="default" size="lg" onClick={() => setBooked(false)}>
                Book Another Stay
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="bg-bg-primary p-8 md:p-10 border border-black/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-black">Full Name</label>
                    <input
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-black">Email</label>
                    <input
                      className={inputClass}
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 mt-4">
                  <label className="text-sm font-medium text-black">Phone</label>
                  <input
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    required
                    placeholder="+1 234 567 890"
                  />
                </div>

                <div className="space-y-1.5 mt-4">
                  <label className="text-sm font-medium text-black">Room Type</label>
                  <select
                    className={`${inputClass} bg-white`}
                    value={form.roomId}
                    onChange={(e) => setForm((f) => ({ ...f, roomId: e.target.value }))}
                    required
                  >
                    <option value="">Select a room</option>
                    {rooms?.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.name} - ${r.price}/night
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-black">Check-in</label>
                    <input
                      className={inputClass}
                      type="date"
                      value={form.checkIn}
                      onChange={(e) => setForm((f) => ({ ...f, checkIn: e.target.value }))}
                      required
                      min={today}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-black">Check-out</label>
                    <input
                      className={inputClass}
                      type="date"
                      value={form.checkOut}
                      onChange={(e) => setForm((f) => ({ ...f, checkOut: e.target.value }))}
                      required
                      min={form.checkIn || today}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 mt-4">
                  <label className="text-sm font-medium text-black">Guests</label>
                  <input
                    className={inputClass}
                    type="number"
                    min="1"
                    max="4"
                    value={form.guests}
                    onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
                  />
                </div>

                <div className="bg-bg-secondary border border-black/10 p-3.5 text-center font-semibold text-black mt-5">
                  {total > 0
                    ? `Total: $${total.toLocaleString()} (${nights} night${nights > 1 ? "s" : ""} x $${room?.price})`
                    : "Select dates to see pricing"}
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="xl"
                  className="w-full justify-center mt-5"
                >
                  Confirm Booking &rarr;
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
