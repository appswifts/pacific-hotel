import { useState } from "react";
import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";
import { Button } from "../components/ui/Button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const steps = [
  { num: 1, label: "Contact Info" },
  { num: 2, label: "Event Details" },
  { num: 3, label: "Review & Submit" },
];

export default function MeetingsAndEvents() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", company: "", email: "", phone: "",
    eventName: "", attendees: "", eventType: "", startDate: "", endDate: "", notes: "",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const canGoNext = () => {
    if (step === 0) return form.firstName && form.lastName && form.email && form.phone;
    if (step === 1) return form.eventName && form.attendees && form.eventType && form.startDate && form.endDate;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass = "w-full border-0 bg-bg-secondary px-3 py-2 text-lg text-black outline-none shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] focus:shadow-[0_0_0_2px_black,0_0_8px_rgba(0,0,0,0.25)]";

  const labelClass = "block text-sm font-medium text-black mb-1";

  return (
    <>
      <PageHero page="meetings" title="Meetings & Events" subtitle="Turn any gathering into an unforgettable event" />

      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-black md:text-4xl lg:text-5xl">
                Turn Any Gathering Into an Event
              </h2>
              <p className="mt-4 text-lg text-black leading-relaxed">
                Pacific Hotel offers versatile indoor and outdoor event spaces, perfect for everything from
                efficient business meetings to lavish weddings. Located in Remera, just 5 minutes from the
                Kigali Convention Centre and other key attractions.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "3 conference rooms (up to 30 pax, school room setup)",
                  "1 large conference room (up to 100 pax)",
                  "1 private executive lounge",
                  "State-of-the-art video conferencing equipment",
                  "Translation devices available",
                  "Fiber optic internet for reliable connectivity",
                  "Dedicated event coordinator",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-lg text-black">
                    <span className="mt-0.5">&bull;</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-[400px] bg-cover bg-center border-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)]"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80')" }} />
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-t from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.04} size={60} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-black text-center mb-2 md:text-4xl lg:text-5xl">Request for Proposal</h2>
          <p className="text-center text-lg text-black mb-8">Tell us about your event and we will create a custom proposal</p>

          {sent ? (
            <div className="mx-auto max-w-lg border-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] bg-bg-secondary p-10 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] text-xl">&#9993;</div>
              <h3 className="text-lg font-bold text-black mb-2">Proposal Request Sent!</h3>
              <p className="text-black">Our sales team will contact you within 24 hours with a custom proposal.</p>
              <Button variant="default" size="lg" className="mt-6" onClick={() => { setSent(false); setStep(0); setForm({ firstName: "", lastName: "", company: "", email: "", phone: "", eventName: "", attendees: "", eventType: "", startDate: "", endDate: "", notes: "" }); }}>Submit Another</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
              <div className="border-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] bg-bg-primary p-6 md:p-8">

                {/* Step indicators */}
                <div className="mb-8 flex items-center gap-2">
                  {steps.map((s, i) => (
                    <div key={s.num} className="flex items-center gap-2">
                      <div className={`flex h-7 w-7 items-center justify-center text-xs font-bold ${
                        i === step ? "bg-black text-white" : i < step ? "bg-black/20 text-black" : "bg-transparent border-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] text-black"
                      }`}>
                        {i < step ? <Check className="h-3.5 w-3.5" /> : s.num}
                      </div>
                      <span className={`text-xs font-semibold hidden sm:inline ${i === step ? "text-black" : "text-black/50"}`}>{s.label}</span>
                      {i < steps.length - 1 && <ChevronRight className="h-3 w-3 text-black/30" />}
                    </div>
                  ))}
                </div>

                {/* Step 1 — Contact Information */}
                {step === 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>First Name *</label>
                        <input type="text" value={form.firstName} onChange={set("firstName")} required placeholder="John" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name *</label>
                        <input type="text" value={form.lastName} onChange={set("lastName")} required placeholder="Doe" className={inputClass} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className={labelClass}>Company Name</label>
                      <input type="text" value={form.company} onChange={set("company")} placeholder="Your Company" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className={labelClass}>Email *</label>
                        <input type="email" value={form.email} onChange={set("email")} required placeholder="john@company.com" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Phone *</label>
                        <input type="tel" value={form.phone} onChange={set("phone")} required placeholder="+250 7XX XXX XXX" className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 — Event Details */}
                {step === 1 && (
                  <div>
                    <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4">Event Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Event Name *</label>
                        <input type="text" value={form.eventName} onChange={set("eventName")} required placeholder="Annual Conference" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Attendees *</label>
                        <input type="number" value={form.attendees} onChange={set("attendees")} required min="1" placeholder="50" className={inputClass} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className={labelClass}>Type of Event *</label>
                      <select value={form.eventType} onChange={set("eventType")} required className={inputClass}>
                        <option value="">Select type</option>
                        <option value="meeting">Business Meeting</option>
                        <option value="conference">Conference</option>
                        <option value="wedding">Wedding</option>
                        <option value="social">Social Event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className={labelClass}>Start Date *</label>
                        <input type="date" value={form.startDate} onChange={set("startDate")} required className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>End Date *</label>
                        <input type="date" value={form.endDate} onChange={set("endDate")} required className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3 — Review & Submit */}
                {step === 2 && (
                  <div>
                    <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4">Review Your Proposal Request</h4>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      <span className="font-semibold text-black">First Name</span><span className="text-black">{form.firstName}</span>
                      <span className="font-semibold text-black">Last Name</span><span className="text-black">{form.lastName}</span>
                      <span className="font-semibold text-black">Company</span><span className="text-black">{form.company || "—"}</span>
                      <span className="font-semibold text-black">Email</span><span className="text-black">{form.email}</span>
                      <span className="font-semibold text-black">Phone</span><span className="text-black">{form.phone}</span>
                      <span className="font-semibold text-black">Event</span><span className="text-black">{form.eventName}</span>
                      <span className="font-semibold text-black">Attendees</span><span className="text-black">{form.attendees}</span>
                      <span className="font-semibold text-black">Type</span><span className="text-black capitalize">{form.eventType}</span>
                      <span className="font-semibold text-black">Start</span><span className="text-black">{form.startDate}</span>
                      <span className="font-semibold text-black">End</span><span className="text-black">{form.endDate}</span>
                    </div>
                    <div className="mt-6">
                      <label className={labelClass}>Additional Notes</label>
                      <textarea rows={3} value={form.notes} onChange={set("notes")} placeholder="Any special requirements, setup preferences, or catering needs..."
                        className={`${inputClass} resize-none`} />
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="mt-8 flex gap-3">
                  {step > 0 ? (
                    <Button type="button" variant="default" size="lg" onClick={() => setStep(step - 1)}
                      className="border-black/20 bg-white text-black hover:bg-neutral-100">
                      <ChevronLeft className="h-4 w-4" /> Back
                    </Button>
                  ) : (
                    <div />
                  )}
                  {step < 2 ? (
                    <Button type="button" variant="default" size="lg" onClick={() => setStep(step + 1)}
                      disabled={!canGoNext()} className="ml-auto bg-black text-white hover:bg-neutral-800">
                      Continue <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="default" size="lg" className="ml-auto bg-black text-white hover:bg-neutral-800">
                      Submit Proposal Request &rarr;
                    </Button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
