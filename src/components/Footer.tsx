"use client";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "./Icon";

const Footer = ({}) => {
  return (
    <footer className="h-full w-full bg-[#000]">
      <div className="h-[1px] w-full border-b-[1px] border-b-[#fae9d2]" />
      <div className="flex flex-col gap-4 px-4 pt-12 md:gap-6 lg:px-10 lg:pt-24">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-1">
          <Link href={"/"}>
            <Image
              src={"/images/logo.png"}
              width={281}
              height={74}
              alt="logo"
              className="w-40 md:w-56"
            />
          </Link>
        </div>
        {/*big screen */}
        <div className="hidden flex-row items-center justify-center gap-40 md:flex">
          <div className="flex flex-col items-center justify-center gap-3 md:items-start">
            <Link
              href={"/"}
              className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]"
            >
              Home{" "}
            </Link>
            <Link
              href={"/menu"}
              className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]"
            >
              Menu{" "}
            </Link>
            <Link
              href={"/contact"}
              className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]"
            >
              Contact us{" "}
            </Link>
            <Link
              href={"/about-us"}
              className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]"
            >
              Our Story{" "}
            </Link>
            <Link
              href={"/table-booking"}
              className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]"
            >
              Booking{" "}
            </Link>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div>
              <span className="font-open_sans text-base font-[400] uppercase tracking-[2px] text-[#fae9d2]">
                Contact{" "}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Link
                href={"https://g.co/kgs/R1iaUji"}
                target="_blank"
                className="font-open_sans text-end text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2] md:text-start"
              >
                194-196 Burton Rd, West Didsbury, <br /> Manchester M20 1LH, U
              </Link>
              {/* <Link
                href={"mailto:chaddertongrill@gmail.com"}
                className="font-open_sans text-end text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2] md:text-start"
              >
                chaddertongrill@gmail.com
              </Link> */}
              <Link
                href={"tele:+441614453461"}
                className="font-open_sans text-end text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2] md:text-start"
              >
                +44 161 445 3461
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link
              href={""}
              className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]"
            >
              Opening hours
            </Link>
            <p className="font-open_sans text-center text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2] md:text-start">
              Monday-Thursday 3pm-10:30pm
              <br />
              Friday-Saturday 12pm-11pm
              <br />
              Sunday 12pm-10pm
            </p>
          </div>
        </div>
        {/* mobile screen */}

        <div className="flex flex-col gap-4 md:hidden md:flex-row md:items-center md:justify-end md:gap-2">
          <div className="flex w-full flex-col items-start justify-start gap-8 md:w-[45%] md:flex-row md:items-center md:justify-end md:gap-16">
            <div className="flex flex-col items-start justify-start gap-3 md:items-start">
              <Link
                href={"/"}
                className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]"
              >
                Home{" "}
              </Link>
              <Link
                href={"/menu"}
                className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]"
              >
                Menu{" "}
              </Link>
              <Link
                href={"/contact"}
                className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]"
              >
                Contact us{" "}
              </Link>
              <Link
                href={"/about-us"}
                className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]"
              >
                Our Story{" "}
              </Link>
              <Link
                href={"/table-booking"}
                className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]"
              >
                Booking{" "}
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3 md:items-start">
            <div>
              <Link
                href={""}
                className="font-open_sans text-base font-[400] uppercase tracking-[2px] text-[#fae9d2]"
              >
                Contact{" "}
              </Link>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Link
                href={"https://g.co/kgs/R1iaUji"}
                target="_blank"
                className="font-open_sans text-end text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2] md:text-start"
              >
                194-196 Burton Rd, West Didsbury, <br /> Manchester M20 1LH, U
              </Link>
              {/* <Link
                href={"mailto:chaddertongrill@gmail.com"}
                className="font-open_sans text-end text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2] md:text-start"
              >
                chaddertongrill@gmail.com
              </Link> */}
              <Link
                href={"tele:+441614453461"}
                className="font-open_sans text-end text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2] md:text-start"
              >
                +44 161 445 3461
              </Link>
            </div>
          </div>
          <div className="w-full border-b-[1px] border-b-[#fae9d2]" />
          <div className="flex w-full flex-col items-center justify-center gap-8 pt-6 md:w-[45%] md:flex-row md:justify-start md:gap-20">
            <div className="flex flex-col items-center gap-3 md:items-start">
              <span className="font-open_sans text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2]">
                Opening hours
              </span>
              <p className="font-open_sans text-center text-sm font-[400] uppercase tracking-[2px] text-[#fae9d2] md:text-start">
                Monday-Thursday 3pm-10:30pm
                <br />
                Friday-Saturday 12pm-11pm
                <br />
                Sunday 12pm-10pm
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-3 md:ml-10 md:items-center md:justify-center">
          <Link
            href={"https://www.instagram.com/wanagodidsbury/"}
            target="_blank"
            className="text-[#fae9d2]"
          >
            <Icons.instagram />
          </Link>
          <Link
            href={"http://facebook.com/WansgoStreetFood"}
            target="_blank"
            className="text-[#fae9d2]"
          >
            <Icons.facebook />
          </Link>
          <Link
            href={"https://g.co/kgs/R1iaUji"}
            target="_blank"
            className="text-[#fae9d2]"
          >
            <Icons.google />
          </Link>
        </div>
        <div className="flex flex-col gap-2 pb-10">
          <div className="flex flex-col justify-center gap-2 md:flex-row md:justify-between">
            <span className="font-open_sans text-center text-xs font-[400] uppercase tracking-[2px] text-[#fae9d2] md:text-start">
              © 2025 Wanago , All Rights Reserved
            </span>

            <Link
              href={"https://foodo.ai"}
              target="_blank"
              className="font-open_sans text-center text-xs font-[400] uppercase tracking-[2px] text-[#fae9d2] md:text-start"
            >
              Powerd by foodo
            </Link>
          </div>
        </div>
      </div>
      <div className="mb-1 h-[1px] w-full border-b-[1px] border-b-[#fae9d2]" />
    </footer>
  );
};

export default Footer;
