import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const phone = "+250788000000";

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 border-0 bg-white shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_12px_rgba(0,0,0,0.15)]">
          <div className="flex items-center justify-between bg-black px-4 py-3">
            <span className="text-sm font-semibold text-white">Chat with us</span>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-black mb-4">
              Hi there! How can we help you? Click below to start a WhatsApp conversation with our team.
            </p>
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              <Send className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all hover:bg-neutral-800 hover:scale-110"
        aria-label="Chat with us"
      >
        {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </>
  );
}
