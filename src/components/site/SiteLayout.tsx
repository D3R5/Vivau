import { Outlet } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppWidget } from "@/extras/WhatsAppWidget";
import { Popup } from "@/extras/Popup.tsx";

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Popup />

      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
