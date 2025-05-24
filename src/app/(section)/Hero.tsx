"use client";
import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";

const Hero = ({}) => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(".head-container", 1.5, {
      y: 50,
      opacity: 1,
      ease: "power4.out",
    })
      .from(".head-hero", 1, {
        x: 200,
        opacity: 0,
        delay: -1.5,
      })
      .from(".hero-button", 1, {
        y: 100,
        opacity: 0,
        ease: "power4.out",
        delay: -1.5,
      });
  }, []);
  return (
    <section id="hero" className="flex w-full items-center justify-center">
      <div className="relative flex min-h-[100vh] w-full items-center justify-center">
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
          <video
            className="min-h-full min-w-full object-cover"
            style={{ objectPosition: "30% center" }}
            src="https://d8q1b3smcycac.cloudfront.net/wanago/wanago-web.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="https://d8q1b3smcycac.cloudfront.net/wanago/wanago-thumbnail.png"
          ></video>
        </div>
        <div className="z-50 flex h-full w-full max-w-[1300px] items-center justify-center">
          <div className="head-container flex w-fit flex-col items-end justify-center">
            <h1 className="head-hero font-playfair text-7xl font-normal uppercase leading-[80%] sm:text-8xl md:text-9xl lg:text-[11.62rem]">
              Wanago
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
