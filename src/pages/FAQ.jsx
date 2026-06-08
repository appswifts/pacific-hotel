import { PageHero } from "../sections/PageHero";
import { FlowerPattern } from "../components/Patterns";

const faqs = [
  {
    q: "What are your check-in and check-out times?",
    a: "Check-in is from 14:00 and check-out is by 11:00. Early check-in and late check-out can be arranged upon request, subject to availability.",
  },
  {
    q: "Do you offer airport transfers?",
    a: "Yes, we provide airport pickup and drop-off from Kigali International Airport. Please book at least 24 hours in advance. A standard sedan costs $30, and a luxury SUV costs $50.",
  },
  {
    q: "Is Wi-Fi available at the hotel?",
    a: "Complimentary high-speed Wi-Fi is available throughout the hotel, including all guest rooms, lobbies, restaurants, and meeting spaces.",
  },
  {
    q: "Do I need a visa to visit Rwanda?",
    a: "Citizens of most African countries and many international visitors can obtain a visa on arrival. We recommend checking Rwanda's official immigration website for your specific country before traveling.",
  },
  {
    q: "Is breakfast included?",
    a: "A complimentary continental and full English breakfast is served daily from 6:30 AM to 10:30 AM in our Palm Terrace Restaurant.",
  },
  {
    q: "Do you have parking facilities?",
    a: "Yes, we offer free on-site parking with 24-hour security surveillance for all guests.",
  },
  {
    q: "Are pets allowed?",
    a: "Yes, Pacific Hotel is pet-friendly. A non-refundable cleaning fee of $25 per stay applies. Please notify us at the time of booking.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept major credit cards (Visa, Mastercard, American Express), mobile money (MTN, Airtel), and cash in USD or RWF. Full payment is required at check-in.",
  },
  {
    q: "Is there a swimming pool or gym?",
    a: "Yes, we have an outdoor heated pool, a fully equipped 24-hour fitness center, and a spa offering traditional Rwandan massages and wellness treatments.",
  },
  {
    q: "Can I cancel or modify my reservation?",
    a: "Free cancellation is available up to 48 hours before check-in. Late cancellations and no-shows will be charged one night's stay. Please refer to our cancellation policy for detailed terms.",
  },
];

export default function FAQ() {
  return (
    <>
      <PageHero page="faq" title="Frequently Asked Questions" subtitle="Everything you need to know before your stay at Pacific Hotel" />
      <section className="py-24 bg-gradient-to-b from-bg-secondary to-white relative">
        <FlowerPattern opacity={0.06} />
        <div className="mx-auto max-w-container px-4 md:px-8 relative z-10">
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] open:shadow-[0_0_0_2px_black,0_0_8px_rgba(0,0,0,0.25)] transition-all">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-xl font-semibold text-black list-none">
                  {faq.q}
                  <span className="text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-lg text-black/70 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
