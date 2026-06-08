import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { CheckIcon, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const fallbackRooms = [
  {
    _id: "kigali-view-suite",
    name: "Kigali View Suite",
    description: "Experience breathtaking panoramic views of Kigali's rolling hills from our signature suite. Floor-to-ceiling windows frame the city skyline, while a private balcony offers the perfect spot to enjoy Rwanda's legendary sunsets. This elegantly appointed suite features a king-size bed with premium linens and a marble ensuite bathroom with deep soaking tub.",
    price: 450,
    size: "45 m\u00b2",
    capacity: 3,
    features: [
      "King-size bed", "City view balcony", "Rain shower & soaking tub",
      "Free high-speed Wi-Fi", "Mini bar", "Flat-screen TV",
      "In-room safe", "24-hour room service",
    ],
    image: "/images/eeeeeeeeeeeeee.jpeg",
    gallery: [
      "/images/eeeeeeeeeeeeee.jpeg",
      "/images/WhatsApp%20Image%202026-06-04%20at%2011.33.40.jpeg",
      "/images/WhatsApp%20Image%202026-06-04%20at%2011.33.10eeee.jpeg",
    ],
  },
  {
    _id: "deluxe-king-room",
    name: "Deluxe King Room",
    description: "Perfect for couples or business travelers visiting Kigali, the Deluxe King Room offers sophisticated comfort with a premium king-size bed, modern work desk, and sleek bathroom with walk-in rain shower. Located in our quiet wing, every detail is curated for a restful stay after exploring the city.",
    price: 320,
    size: "35 m\u00b2",
    capacity: 2,
    features: [
      "King-size bed", "Work desk", "Walk-in rain shower",
      "Free high-speed Wi-Fi", "Mini bar", "Flat-screen TV",
      "In-room safe", "Room service",
    ],
    image: "/images/WhatsApp%20Image%202026-06-04%20at%2011.33.09.jpeg",
    gallery: [
      "/images/WhatsApp%20Image%202026-06-04%20at%2011.33.09.jpeg",
      "/images/eeee22222e.jpeg",
      "/images/WhatsApp%20Image%202026-06-04%20at%2011.33.10eeee.jpeg",
    ],
  },
  {
    _id: "executive-suite",
    name: "Executive Suite",
    description: "Our Executive Suite sets the standard for luxury accommodation in Kigali, featuring a separate living area, panoramic city views, and exclusive butler service. The expansive marble bathroom includes both a soaking tub and separate rain shower. Ideally located near the Kigali Convention Centre and business district.",
    price: 680,
    size: "65 m\u00b2",
    capacity: 4,
    features: [
      "Separate living area", "Panoramic city views", "Butler service",
      "King-size bed + sofa bed", "Soaking tub & rain shower",
      "Free high-speed Wi-Fi", "Mini bar", "Flat-screen TV",
      "In-room safe", "24-hour room service",
    ],
    image: "/images/eeeeeeeeeeeeeeeee222222222222.jpeg",
    gallery: [
      "/images/eeeeeeeeeeeeeeeee222222222222.jpeg",
      "/images/WhatsApp%20Image%202026-06-04%20at%2011.33.40.jpeg",
      "/images/eeee22222e.jpeg",
    ],
  },
];

const addons = [
  { id: "breakfast", label: "Daily Breakfast Buffet", price: 25, icon: "\uD83E\uDD5D" },
  { id: "airport", label: "Airport Transfer (round trip)", price: 40, icon: "\uD83D\uDE8C" },
  { id: "spa", label: "Spa Treatment (60 min)", price: 80, icon: "\uD83D\uDC86" },
  { id: "late-checkout", label: "Late Check-out (until 3pm)", price: 30, icon: "\u23F0" },
];

const steps = [
  { num: 1, label: "Dates & Guests" },
  { num: 2, label: "Add-ons" },
  { num: 3, label: "Your Details" },
  { num: 4, label: "Confirm" },
];

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rooms = useQuery(api.rooms.list);
  const createBooking = useMutation(api.bookings.create);

  const room = rooms?.find((r) => r._id === id) || fallbackRooms.find((r) => r._id === id);

  const [step, setStep] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");
  const [booked, setBooked] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  if (rooms === undefined) return <LoadingSpinner />;

  if (!room) {
    return (
      <div className="pt-[150px] py-24 text-center">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <h2 className="font-display text-4xl font-bold tracking-[-0.03em] text-black mb-2">Room not found</h2>
          <p className="text-black mb-6">The room you are looking for does not exist or has been removed.</p>
          <Link to="/rooms">
            <Button variant="default" size="lg">&larr; Back to Rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

  const nights = checkIn && checkOut
    ? Math.max(0, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
    : 0;
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const a = addons.find((x) => x.id === id);
    return sum + (a ? a.price * nights : 0);
  }, 0);
  const roomTotal = nights * room.price;
  const grandTotal = roomTotal + addonsTotal;

  const handleBook = async () => {
    if (!room) return;
    setBookingError("");
    try {
      await createBooking({
        name, email, phone,
        roomId: room._id, roomName: room.name,
        checkIn, checkOut,
        guests: Number(guests),
        total: grandTotal,
        addons: selectedAddons.join(", "),
        requests,
      });
      setBooked(true);
    } catch (e) {
      setBookingError("Booking failed. Please try again.");
    }
  };

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const canGoNext = () => {
    if (step === 0) return checkIn && checkOut && new Date(checkOut) > new Date(checkIn);
    if (step === 1) return true;
    if (step === 2) return name && email && phone;
    return true;
  };

  const images = room.gallery?.length ? room.gallery : [room.image];

  if (booked) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col pt-[150px]">
        <div className="flex flex-1 items-center justify-center bg-bg-secondary p-8">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-black/10 bg-bg-primary text-2xl">&#10003;</div>
            <h2 className="font-display text-3xl font-bold text-black mb-2">Booking Confirmed!</h2>
            <p className="text-black mb-2">Thank you, {name}. Your stay at <strong>{room.name}</strong> has been reserved.</p>
            <p className="text-black/70 text-sm mb-6">A confirmation email will be sent to {email}.</p>
            <div className="mb-8 border border-black/10 bg-bg-primary p-4 text-left text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold text-black">Check-in</span><span className="text-black">{checkIn}</span>
                <span className="font-semibold text-black">Check-out</span><span className="text-black">{checkOut}</span>
                <span className="font-semibold text-black">Guests</span><span className="text-black">{guests}</span>
                <span className="font-semibold text-black">Total</span><span className="text-black">${grandTotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-center gap-3">
              <Link to="/"><Button variant="secondary" size="lg">Return Home</Button></Link>
              <Link to="/rooms"><Button variant="default" size="lg">Browse More Rooms</Button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row pt-[150px]">
      <div className="relative w-full overflow-hidden md:w-1/2">
        <Carousel className="h-full w-full" opts={{ loop: true }}>
          <CarouselContent className="h-full">
            {images.map((img, i) => (
              <CarouselItem key={i} className="h-full">
                <div className="h-[50vh] w-full bg-cover bg-center md:h-[calc(100vh-150px)]" style={{ backgroundImage: `url(${img})` }} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 text-white bg-black/30 hover:bg-black/50 border-0" />
          <CarouselNext className="right-4 text-white bg-black/30 hover:bg-black/50 border-0" />
        </Carousel>
      </div>

      <div className="flex w-full flex-col bg-brand-800 md:w-1/2 overflow-y-auto">
        <div className="p-6 md:p-8 lg:p-10">
          <Link to="/rooms" className="mb-4 inline-flex items-center gap-1 text-sm text-brand-200 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Rooms
          </Link>

          <span className="text-xs font-semibold tracking-[0.2em] text-brand-200 uppercase">
            {room.size} &middot; Up to {room.capacity} guests
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">{room.name}</h1>

          <div className="mt-4">
            <span className="inline-block bg-white/20 px-3 py-1.5 text-xl font-bold text-white">
              ${room.price}<span className="ml-1 text-sm font-normal">/ night</span>
            </span>
          </div>

          <p className="mt-4 leading-relaxed text-white/80 text-sm">{room.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
            {room.features?.map((f) => (
              <div key={f} className="text-sm text-white/80">
                {f}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 p-6 md:p-8 lg:p-10">
          <div className="mb-6 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center text-xs font-bold ${
                  i === step ? "bg-white text-brand-800" : i < step ? "bg-brand-200 text-brand-800" : "bg-white/20 text-white"
                }`}>{i < step ? "\u2713" : s.num}</div>
                <span className={`text-xs hidden sm:inline ${i === step ? "text-white font-semibold" : "text-brand-200"}`}>{s.label}</span>
                {i < steps.length - 1 && <ChevronRight className="h-3 w-3 text-brand-200" />}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Select Dates & Guests</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-brand-200 mb-1">Check-in</label>
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                    min={today} required
                    className="w-full border-0 bg-white/[0.08] px-3 py-2 text-sm text-white outline-none shadow-[0_0_0_1.5px_rgba(255,255,255,0.4),0_0_6px_rgba(255,255,255,0.12)] focus:shadow-[0_0_0_2px_white,0_0_8px_rgba(255,255,255,0.25)]" />
                </div>
                <div>
                  <label className="block text-xs text-brand-200 mb-1">Check-out</label>
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || today} required
                    className="w-full border-0 bg-white/[0.08] px-3 py-2 text-sm text-white outline-none shadow-[0_0_0_1.5px_rgba(255,255,255,0.4),0_0_6px_rgba(255,255,255,0.12)] focus:shadow-[0_0_0_2px_white,0_0_8px_rgba(255,255,255,0.25)]" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-brand-200 mb-1">Guests</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)}
                  className="w-full border-0 bg-white/[0.08] px-3 py-2 text-sm text-white outline-none shadow-[0_0_0_1.5px_rgba(255,255,255,0.4),0_0_6px_rgba(255,255,255,0.12)] focus:shadow-[0_0_0_2px_white,0_0_8px_rgba(255,255,255,0.25)]">
                  {[1,2,3,4].map((n) => <option key={n} value={n} className="text-black">{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                </select>
              </div>
              {nights > 0 && (
                <p className="text-sm text-brand-200">{nights} night{nights > 1 ? "s" : ""} &times; ${room.price} = <strong className="text-white">${roomTotal.toLocaleString()}</strong></p>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Add-ons & Extras</h3>
              <p className="text-xs text-brand-200">Enhance your stay (prices shown per night)</p>
              <div className="space-y-2">
                {addons.map((a) => (
                  <label key={a.id} className="flex cursor-pointer items-center gap-3 border border-white/20 bg-white/5 p-3 hover:bg-white/10 transition-colors">
                    <input type="checkbox" checked={selectedAddons.includes(a.id)}
                      onChange={() => toggleAddon(a.id)}
                      className="h-4 w-4 accent-brand-200" />
                    <span className="text-sm text-white flex-1"><span className="mr-1">{a.icon}</span> {a.label}</span>
                    <span className="text-xs text-brand-200">+${a.price}/night</span>
                  </label>
                ))}
              </div>
              {selectedAddons.length > 0 && (
                <p className="text-xs text-brand-200">Add-ons total: <strong className="text-white">${addonsTotal.toLocaleString()}</strong> ({nights} night{nights > 1 ? "s" : ""})</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Your Details</h3>
              <div>
                <label className="block text-xs text-brand-200 mb-1">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name"
                  className="w-full border-0 bg-white/[0.08] px-3 py-2 text-sm text-white outline-none shadow-[0_0_0_1.5px_rgba(255,255,255,0.4),0_0_6px_rgba(255,255,255,0.12)] focus:shadow-[0_0_0_2px_white,0_0_8px_rgba(255,255,255,0.25)] placeholder:text-white/30" />
              </div>
              <div>
                <label className="block text-xs text-brand-200 mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com"
                  className="w-full border-0 bg-white/[0.08] px-3 py-2 text-sm text-white outline-none shadow-[0_0_0_1.5px_rgba(255,255,255,0.4),0_0_6px_rgba(255,255,255,0.12)] focus:shadow-[0_0_0_2px_white,0_0_8px_rgba(255,255,255,0.25)] placeholder:text-white/30" />
              </div>
              <div>
                <label className="block text-xs text-brand-200 mb-1">Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+250 7XX XXX XXX"
                  className="w-full border-0 bg-white/[0.08] px-3 py-2 text-sm text-white outline-none shadow-[0_0_0_1.5px_rgba(255,255,255,0.4),0_0_6px_rgba(255,255,255,0.12)] focus:shadow-[0_0_0_2px_white,0_0_8px_rgba(255,255,255,0.25)] placeholder:text-white/30" />
              </div>
              <div>
                <label className="block text-xs text-brand-200 mb-1">Special Requests <span className="text-brand-200/60">(optional)</span></label>
                <textarea value={requests} onChange={(e) => setRequests(e.target.value)} rows={2} placeholder="Any special requirements..."
                                     className="w-full border-0 bg-white/[0.08] px-3 py-2 text-sm text-white outline-none shadow-[0_0_0_1.5px_rgba(255,255,255,0.4),0_0_6px_rgba(255,255,255,0.12)] focus:shadow-[0_0_0_2px_white,0_0_8px_rgba(255,255,255,0.25)] placeholder:text-white/30 resize-none" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Review Your Booking</h3>
              <div className="border border-white/20 bg-white/5 p-4 space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-brand-200">Room</span><span className="text-white font-semibold">{room.name}</span>
                  <span className="text-brand-200">Check-in</span><span className="text-white">{checkIn}</span>
                  <span className="text-brand-200">Check-out</span><span className="text-white">{checkOut}</span>
                  <span className="text-brand-200">Nights</span><span className="text-white">{nights}</span>
                  <span className="text-brand-200">Guests</span><span className="text-white">{guests}</span>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between"><span className="text-brand-200">Room total</span><span className="text-white">${roomTotal.toLocaleString()}</span></div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between"><span className="text-brand-200">Add-ons</span><span className="text-white">+${addonsTotal.toLocaleString()}</span></div>
                )}
                <hr className="border-white/10" />
                <div className="flex justify-between text-lg"><span className="text-white font-bold">Grand Total</span><span className="text-white font-bold">${grandTotal.toLocaleString()}</span></div>
              </div>
              <div className="border border-white/20 bg-white/5 p-3 space-y-1 text-sm">
                <span className="text-brand-200">Guest</span>
                <p className="text-white">{name} &middot; {email} &middot; {phone}</p>
                {requests && <p className="text-brand-200 text-xs">{requests}</p>}
              </div>
              {bookingError && <p className="text-sm text-red-300">{bookingError}</p>}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {step > 0 ? (
              <Button variant="default" size="md" onClick={() => setStep(step - 1)}
                className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            ) : (
              <Link to="/rooms">
                <Button variant="default" size="md" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                  <ChevronLeft className="h-4 w-4" /> All Rooms
                </Button>
              </Link>
            )}
            {step < 3 ? (
              <Button variant="secondary" size="md" onClick={() => setStep(step + 1)}
                disabled={!canGoNext()} className="flex-1 justify-center">
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="secondary" size="md" onClick={handleBook}
                className="flex-1 justify-center">
                Confirm Booking &rarr;
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
