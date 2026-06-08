import { Outlet } from "react-router-dom";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";
import { WhatsAppButton } from "./components/WhatsAppButton";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSection />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterSection />
      <WhatsAppButton />
    </div>
  );
}
