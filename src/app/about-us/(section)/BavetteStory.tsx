"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const BavetteStory = ({}) => {
  return (
    <section className="relative flex h-full w-full items-center justify-center bg-[#000] p-4 lg:py-16">
      <div className="flex h-full w-full flex-col items-center justify-center gap-11 bg-[#000]">
        <h2 className="text-center font-playfair text-5xl text-[#fae9d2] md:left-[15%] md:text-8xl">
          The Wanago
          <br />
          Story
        </h2>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[#000] md:flex-row lg:px-24 lg:py-20">
          <div className="h-full w-full overflow-hidden p-4 md:w-1/2 md:p-0">
            <motion.img
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="/images/about-us/3.webp"
              width={577}
              height={676}
              alt="private dining"
              className="h-auto w-full rounded-lg md:rounded-none"
            />
          </div>
          <div className="flex h-full w-full flex-col items-center gap-[2.5rem] p-6 md:w-1/2 md:items-start lg:ml-24">
            <h1 className="max-w-[500px] text-center font-playfair text-5xl text-[#fae9d2] md:text-start md:text-7xl">
              From Passion
              <br />
              to Perfection{" "}
            </h1>
            <p className="max-w-[450px] text-center font-manrope font-light leading-[160%] text-[#fae9d2] md:text-start">
              What began as a simple love for heartfelt, quality food and warm
              conversations has blossomed into <strong>Wanago Café</strong>—a
              beloved community hub where comfort meets creativity. Rooted in
              local flavors and driven by a passion for excellence, Wanago was
              founded to bring people together over delicious bites and brews in
              a cozy, modern setting.
              <br />
              From our humble beginnings to becoming a favorite spot for café
              lovers, our dedication to authenticity, taste, and genuine
              hospitality has remained at the core of everything we do. Every
              ingredient is locally sourced with care, every dish and drink is
              thoughtfully prepared, and every visit reflects our love for
              sharing good moments.
              <br />
              At Wanago, we don’t just serve food and coffee—we create a space
              where memories are made, stories are shared, and community
              thrives. As we grow, our mission stays true: to honor the heart of
              café culture, embrace fresh ideas, and offer an experience that
              lingers long after the last sip.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BavetteStory;
