import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Gallery = ({}) => {
  return (
    <section className="relative flex h-full w-full items-center justify-center bg-[#070707] pt-10 md:pt-24">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <h3 className="font-playfair uppercase italic">gallery</h3>
        <h1 className="max-w-[700px] text-center font-playfair text-4xl md:text-7xl">
          A Glimpse of Wanago
        </h1>
        <div className="relative mt-4 grid h-full w-full grid-cols-2 md:mt-16 md:grid-cols-3">
          <motion.img
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/images/home/gallery/1.jpg"
            alt="gallery"
            className="h-[200px] w-full object-cover md:h-[400px]"
            width={5794}
            height={3863}
          />
          <motion.img
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/images/home/gallery/2.jpg"
            alt="gallery"
            className="h-[200px] w-full object-cover md:h-[400px]"
            width={5794}
            height={3863}
          />
          <motion.img
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/images/home/gallery/3.jpg"
            alt="gallery"
            className="h-[200px] w-full object-cover md:h-[400px]"
            width={5794}
            height={3863}
          />
          <motion.img
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/images/home/gallery/4.jpg"
            alt="gallery"
            className="h-[200px] w-full object-cover md:h-[400px]"
            width={5794}
            height={3863}
          />
          <motion.img
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/images/home/gallery/5.jpg"
            alt="gallery"
            className="h-[200px] w-full object-cover md:h-[400px]"
            width={5794}
            height={3863}
          />
          <motion.img
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/images/home/gallery/6.jpg"
            alt="gallery"
            className="h-[200px] w-full object-cover md:h-[400px]"
            width={5794}
            height={3863}
          />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <Button
              className="gap-[1.19rem] font-playfair text-lg text-white md:text-[1.62rem] lg:px-[4.12rem] lg:py-[2.26rem]"
              style={{
                borderRadius: "10rem",
                border: "1px solid, #BC995D",
                background: "rgba(7, 7, 7, 0.26)",
                backdropFilter: "blur(17px)",
              }}
              asChild
            >
              <Link href="https://www.instagram.com/wanagodidsbury/">
                <Icons.instagram className="text-primary" />
                Check out our instagram
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
