"use client";
import { Icons } from "@/components/Icon";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRestaurant } from "@/context/RestaurantContext";
import Image from "next/image";
import { motion } from "framer-motion";

const Reviews = ({}) => {
  const { reviews } = useRestaurant();
  return (
    <section className="relative flex h-full w-full justify-center bg-[#000] pb-28 pt-10 md:pb-32 md:pt-16">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <motion.h3
            className="text-center font-playfair text-4xl font-[500] uppercase text-[#fae9d2] md:text-6xl"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            WHY PEOPLE BELIEVE IN US!
          </motion.h3>
        </div>
        {reviews && (
          <div className="w-full px-4">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {reviews
                  .filter((review) => review.rating >= 4)
                  .map((review, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1">
                        <Card className="h-[300px] border border-[#fae9d2] bg-transparent">
                          <CardContent className="flex flex-col items-center justify-between gap-4 p-6">
                            {/* ⭐ Star Rating */}
                            <div className="flex justify-center">
                              {Array.from({ length: review.rating }).map(
                                (_, i) => (
                                  <Icons.star
                                    key={i}
                                    className="text-[#fae9d2]"
                                  />
                                ),
                              )}
                            </div>

                            {/* Review Text */}
                            <p className="font-cormorant line-clamp-6 text-center text-sm text-[#fae9d2]">
                              {review.text.text}
                            </p>

                            {/* Author Name */}
                            <p className="text-center font-playfair text-xs tracking-wide text-[#fae9d2]">
                              — {review.authorAttribution.displayName}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>

              {/* Navigation Arrows */}
              <div className="group absolute -bottom-20 left-1/2 flex w-fit -translate-x-1/2 transform items-center gap-2 pb-20 transition-transform duration-300 ease-in-out">
                <CarouselPrevious className="border-[#fae9d2] text-[#fae9d2] transition-transform duration-300 ease-in-out group-hover:-translate-x-2" />
                <CarouselNext className="border-[#fae9d2] text-[#fae9d2] transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
