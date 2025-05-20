"use client";
import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import gsap, { Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

const ExploreMenu = ({}) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(max-width:500px)", () => {
      gsap.to(".menu-one", {
        scrollTrigger: {
          trigger: ".menu-one",
          toggleActions: "restart none none none",
          // start: "top 80%", // When the top of the .title enters 80% of the viewport
          // end: "top 50%",   // When the top of the .title reaches 50% of the viewport
          // scrub: true
        },
        x: 0,
        duration: 0.8,
      });

      gsap.to(".menu-two", {
        scrollTrigger: {
          trigger: ".menu-two",
          toggleActions: "restart none none none",
          // start: "top 80%", // When the top of the .title enters 80% of the viewport
          // end: "top 50%",   // When the top of the .title reaches 50% of the viewport
          // scrub: true
        },
        x: 0,
        scale: 1,
        duration: 0.8,
      });
    });

    mm.add("(min-width:501px)", () => {
      gsap.to(".menu-one", {
        scrollTrigger: {
          trigger: ".menu-one",
          toggleActions: "restart none none none",
          // start: "top 80%", // When the top of the .title enters 80% of the viewport
          // end: "top 50%",   // When the top of the .title reaches 50% of the viewport
          // scrub: true
        },
        x: 30,
        scale: 1,
        duration: 0.8,
      });
      gsap.to(".menu-two", {
        scrollTrigger: {
          trigger: ".menu-two",
          toggleActions: "restart none none none",
          // start: "top 80%", // When the top of the .title enters 80% of the viewport
          // end: "top 50%",   // When the top of the .title reaches 50% of the viewport
          // scrub: true
        },
        x: 30,
        duration: 0.8,
      });
    });
    gsap.to(".menu-items", {
      scrollTrigger: {
        trigger: ".menu-items",
        toggleActions: "restart none none none",
        // start: "top 80%", // When the top of the .title enters 80% of the viewport
        // end: "top 50%",   // When the top of the .title reaches 50% of the viewport
        // scrub: true
      },
      scale: 1,
      ease: Power4.easeOut,
      duration: 1.5,
    });

    const splitType = document.querySelectorAll(".head-menu");
    splitType.forEach((char, i) => {
      if (char instanceof HTMLElement) {
        const text = new SplitType(char, { types: "chars" });
        gsap.from(text.chars, {
          scrollTrigger: {
            trigger: char,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            markers: false,
          },
          opacity: 0.2,
          stagger: 0.2,
        });
      }
    });
  }, []);

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-x-hidden bg-[#131313]">
      <div className="flex h-full w-full max-w-[1300px] flex-col items-center justify-center gap-4 py-44">
        <h3 className="head-menu font-playfair uppercase italic">
          explore menu
        </h3>
        <div
          className="menu-items relative mb-14 mt-20 flex h-full w-full flex-col justify-between gap-12 px-4 md:flex-row md:gap-20"
          style={{
            transform: "scale(1.5)",
          }}
        >
          <h2 className="absolute -top-28 left-[5%] font-playfair text-8xl text-[#262626] md:left-[15%] md:text-9xl">
            Wanago
          </h2>
          <div className="menu-one z-10 mt-0 flex h-full w-full justify-center md:-ml-[50px] md:mt-12 md:w-1/3">
            <Image
              src="/images/home/menu/1.webp"
              width={435}
              height={319}
              alt="1"
              className="h-auto w-full max-w-[400px] object-cover md:h-[300px]"
            />
          </div>
          <div className="menu-one z-10 flex h-full w-full justify-center md:-ml-[50px] md:w-1/3">
            <Image
              src="/images/home/menu/3.webp"
              width={365}
              height={495}
              alt="1"
              className="h-auto w-full max-w-[400px] object-cover md:h-[550px]"
            />
          </div>
          <div className="menu-one z-10 mt-0 flex h-full w-full justify-center md:-ml-[50px] md:mt-40 md:w-1/3">
            <Image
              src="/images/home/menu/2.webp"
              width={439}
              height={320}
              alt="1"
              className="h-auto w-full max-w-[400px] object-cover md:h-[300px]"
            />
          </div>
          <h2 className="head-menu absolute -bottom-12 right-[25%] z-20 font-playfair text-8xl text-[#FBF5DC] md:text-9xl">
            Menu
          </h2>
        </div>
        <p className="menu-two max-w-[500px] px-2 text-center font-light leading-[160%] text-[#C1B6A6] md:-ml-[50px] md:px-0">
          Wanago Café was born from a love of serving heartwarming food and
          artisan coffee to the heart of the community, grounded in a deep
          commitment to sustainability and exceptional quality. Every dish and
          brew is a labor of love, thoughtfully prepared by our passionate team
          who handpick the finest ingredients to ensure every bite and sip is
          simply perfect.
        </p>
        <Button
          variant="outline"
          className="menu-two group items-center gap-[1.19rem] border-primary bg-transparent py-7 font-semibold uppercase text-white hover:bg-primary md:-ml-[50px]"
          asChild
        >
          <Link href="/menu">
            View Menu
            <Icons.rightArrow className="text-primary duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-primary-foreground" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default ExploreMenu;
