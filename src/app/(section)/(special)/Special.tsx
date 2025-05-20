"use client";
import EmblaCarousel from "@/app/(section)/(special)/MenuCarousel";
import { useRestaurant } from "@/context/RestaurantContext";
import type { EmblaOptionsType } from "embla-carousel";
import { motion } from "framer-motion";

const OPTIONS: EmblaOptionsType = { loop: true };

const Special = ({}) => {
  const { modelData } = useRestaurant();

  return (
    <section className="relative flex h-full w-full justify-center bg-[#070707] pb-12 pt-12 md:pb-16 md:pt-32">
      <div className="absolute left-[20%] top-[25%]">
        <h1
          className="hidden px-4 font-playfair text-4xl font-[400] uppercase md:block md:text-4xl"
          style={{
            background: "linear-gradient(180deg, #fae9d2 29.5%, #fae9d2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Wanago <br /> Signature <br /> SPECIALS
        </h1>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-12">
        <h1
          className="px-4 text-center font-playfair text-4xl font-[400] uppercase md:hidden md:text-5xl"
          style={{
            background: "linear-gradient(180deg, #fae9d2 29.5%, #fae9d2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Wanago Signature SPECIALS
        </h1>
        {modelData && (
          <div className="relative z-20 flex min-h-[400px] w-full flex-col justify-center px-2">
            <EmblaCarousel slides={modelData} options={OPTIONS} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Special;
