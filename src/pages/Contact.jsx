import { useState } from "react";
import { PageHero } from "../sections/PageHero";
import { MapSection } from "../sections/MapSection";
import { FlowerPattern } from "../components/Patterns";
import { Button } from "../components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero page="contact" title="Contact Us" subtitle="We would love to hear from you. Get in touch with us." />
      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              {sent ? (
                <div className="border border-black/10 bg-bg-secondary p-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-black/10 bg-bg-primary text-xl">&#9993;</div>
                  <h3 className="text-lg font-bold text-black mb-2">Message Sent!</h3>
                  <p className="text-black">Thank you for reaching out. We will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">First Name</label>
                      <input type="text" required placeholder="John"
                        className="w-full border-0 bg-bg-primary px-3 py-2 text-lg text-black outline-none shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] focus:shadow-[0_0_0_2px_black,0_0_8px_rgba(0,0,0,0.25)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Last Name</label>
                      <input type="text" required placeholder="Doe"
                        className="w-full border-0 bg-bg-primary px-3 py-2 text-lg text-black outline-none shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] focus:shadow-[0_0_0_2px_black,0_0_8px_rgba(0,0,0,0.25)]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Email</label>
                    <input type="email" required placeholder="john@example.com"
                      className="w-full border-0 bg-bg-primary px-3 py-2 text-lg text-black outline-none shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] focus:shadow-[0_0_0_2px_black,0_0_8px_rgba(0,0,0,0.25)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Phone</label>
                    <input type="tel" placeholder="+250 7XX XXX XXX"
                      className="w-full border-0 bg-bg-primary px-3 py-2 text-lg text-black outline-none shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] focus:shadow-[0_0_0_2px_black,0_0_8px_rgba(0,0,0,0.25)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Message</label>
                    <textarea rows={4} required placeholder="How can we help you?"
                      className="w-full border-0 bg-bg-primary px-3 py-2 text-lg text-black outline-none shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] focus:shadow-[0_0_0_2px_black,0_0_8px_rgba(0,0,0,0.25)] resize-none" />
                  </div>
                  <Button variant="default" size="lg" className="w-full justify-center">Send Message &rarr;</Button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="border border-black/10 bg-bg-secondary p-6">
                <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-black" />
                    <div>
                      <p className="text-sm font-semibold text-black">Address</p>
                      <p className="text-sm text-black">KG 123 Street, Remera<br />Kigali, Rwanda</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-black" />
                    <div>
                      <p className="text-sm font-semibold text-black">Phone</p>
                      <p className="text-sm text-black">+250 788 303 483<br />+250 727 000 978</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-black" />
                    <div>
                      <p className="text-sm font-semibold text-black">Email</p>
                      <p className="text-sm text-black">info@pacifichotel.rw</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-black" />
                    <div>
                      <p className="text-sm font-semibold text-black">Front Desk</p>
                      <p className="text-sm text-black">Open 24 hours, every day</p>
                    </div>
                  </div>
                </div>
              </div>

              <MapSection className="" />

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
