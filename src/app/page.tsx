"use client";
import ViewMenu from "@/components/floating-buttons/ViewMenu";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Special from "./(section)/(special)/Special";
import Hero from "./(section)/Hero";
import Reviews from "./(section)/Review";
import { useEffect, useState } from "react";
import ExploreMenu from "./(section)/ExploreMenu";
import WeOffer from "./(section)/WeOffer";
import Booking from "./(section)/Booking";
import Gallery from "./(section)/Gallery";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight ?? 0;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <main className="relative flex h-full w-full overflow-hidden">
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#000000]">
        <Navbar position="fixed" />
        <Hero />
        <ExploreMenu />
        <WeOffer />
        <Special />
        <Booking />
        <Reviews />
        <Gallery />
        <Footer />
      </div>
      <div className="fixed bottom-6 right-8 z-50 hidden md:flex">
        <ViewMenu />
      </div>
    </main>
  );
}
