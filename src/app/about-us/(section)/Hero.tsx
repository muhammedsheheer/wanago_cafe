"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = ({}) => {
  return (
    <section
      id="hero"
      className="flex w-full items-center justify-center bg-[#000] py-6 lg:py-12"
    >
      <div className="relative flex min-h-[100vh] w-full items-center justify-center">
        <div className="flex w-full flex-col gap-6 px-4 lg:flex-row lg:gap-0 lg:px-0">
          <div className="flex w-full items-center justify-center lg:w-1/2">
            <div className="mt-20 flex flex-col items-start gap-6 lg:mt-0 lg:w-8/12">
              <h1 className="font-playfair text-5xl font-semibold text-[#fae9d2] lg:text-6xl">
                Welcome to Wanago Café
                <br /> Where Café Culture Meets Timeless Comfort
              </h1>
              <p className="font-manrope font-normal text-[#fae9d2]">
                At Wanago Café, we take pride in celebrating the heart of
                comforting café fare, reimagined with a fresh, modern twist.
                Every dish is crafted using locally sourced ingredients,
                thoughtfully chosen flavors, and time-honored techniques to
                create a truly memorable experience. Whether you`re savoring our
                signature coffee blends, fresh-baked pastries, or seasonal
                favorites, each bite and sip reflects our commitment to quality,
                warmth, and genuine hospitality.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-6 md:mt-16 lg:w-1/2">
            <motion.img
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="/images/about-us/2.webp"
              width={951}
              height={975}
              alt="hero"
              className="h-full max-h-[600px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
