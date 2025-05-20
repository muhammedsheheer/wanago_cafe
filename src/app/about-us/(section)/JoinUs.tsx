"use client";
import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const JoinUs = ({}) => {
  return (
    <section
      className="relative flex h-screen w-full items-center justify-center"
      style={{
        backgroundImage: `url('/images/about-us/4.webp')`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="z-50 flex h-full w-full flex-col-reverse items-center justify-center gap-4 md:flex-row">
        <motion.div
          className="flex h-full w-full flex-col items-center justify-center gap-[2.5rem] p-6"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h1 className="max-w-[500px] text-center font-oswald text-5xl text-[#fae9d2] md:leading-[60px]">
            Join Us for a
            <br />
            Delightful Café Experience
          </h1>
          <p className="max-w-[450px] text-center font-[600] leading-[160%] text-[#fae9d2]">
            Whether you’re stopping by for a cozy catch-up or a special treat,
            Wanago Café invites you to enjoy the best of thoughtfully crafted
            café delights. From freshly brewed coffees to comforting seasonal
            favorites, every dish and drink is a celebration of quality, flavor,
            and care. Step into a café experience where warmth meets modern
            creativity, and every bite and sip tells a story of passion and
            craftsmanship.
          </p>

          <Link href={"/table-booking"}>
            <Button
              variant="outline"
              className="border-[#fae9d2 text-[#fae9d2 group w-fit items-center gap-[1.19rem] bg-transparent px-7 py-7 font-semibold uppercase hover:bg-[#000]"
            >
              Book Now{" "}
              <Icons.rightArrow className="text-[#fae9d2 duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-primary-foreground" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinUs;
