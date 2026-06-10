import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "LumaStay — Where Luxury Meets Serenity",
  description:
    "Experience world-class hospitality at LumaStay. Browse our luxury rooms, make a reservation, and enjoy an unforgettable stay at Sunset Bay.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#FFF8EF] text-[#0B1324]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
