const remeraCoords = "-1.9441,30.0619";

export function MapSection({ className }) {
  return (
    <section className={className || "py-24 bg-white"}>
      <div className="mx-auto max-w-container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-black md:text-4xl">Find Us</h2>
          <p className="mt-4 text-lg text-black/70">
            KG 15 Ave, Remera, Kigali, Rwanda &middot; Opposite Kigali Convention Centre
          </p>
        </div>
        <div className="mx-auto max-w-5xl overflow-hidden border-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)]">
          <iframe
            title="Pacific Hotel Location"
            width="100%"
            height="400"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=30.04%2C-1.96%2C30.08%2C-1.93&layer=mapnik&marker=${remeraCoords}`}
          />
        </div>
        <div className="mt-6 text-center">
          <a
            href={`https://www.openstreetmap.org/?mlat=-1.9441&mlon=30.0619&zoom=15`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-black/60 hover:text-black underline"
          >
            View larger map &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
