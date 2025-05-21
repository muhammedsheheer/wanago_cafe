import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Booking = ({}) => {
  return (
    <section className="relative flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full flex-col-reverse items-center justify-center gap-4 bg-[#131313] md:flex-row">
        <div className="h-full w-full overflow-hidden p-4 md:w-1/2 md:p-0">
          <motion.img
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/images/home/booking/image.jpg"
            width={5794}
            height={3863}
            alt="private dining"
            className="h-auto w-full rounded-lg object-cover md:h-[700px] md:rounded-none"
          />
        </div>
        <motion.div
          className="flex h-full w-full flex-col items-center gap-[2.5rem] p-6 md:w-1/2 md:items-start lg:ml-24"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h3 className="font-playfair uppercase italic">Booking</h3>
          <h1 className="max-w-[500px] text-center font-playfair text-6xl sm:text-7xl md:text-start">
            Private & Group Dining
          </h1>
          <p className="max-w-[450px] text-center font-light leading-[160%] text-[#C1B6A6] md:text-start">
            At Wanago Café, we offer exceptional private and group experiences
            tailored to your needs—whether it’s a cozy celebration, a casual
            meetup, or a special gathering with friends. Enjoy our comforting
            menu in a dedicated space, where friendly service and a warm,
            inviting atmosphere make every moment truly memorable.
          </p>
          <Button
            variant="outline"
            className="group w-fit items-center gap-[1.19rem] border-primary bg-transparent py-7 font-semibold uppercase text-white hover:bg-primary"
          >
            <Link
              href="/table-booking"
              className="flex items-center gap-[1.19rem]"
            >
              Book Table{" "}
              <Icons.rightArrow className="text-primary duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-primary-foreground" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
