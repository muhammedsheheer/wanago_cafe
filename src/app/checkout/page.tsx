"use client";
import Navbar from "@/components/Navbar";
import Checkout from "./(section)/Checkout";
import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";

const Page = ({}) => {
    const { restaurant } = useRestaurant();

    if (!restaurant?.onlineOrder) {
        return (
            <main className="flex h-full min-h-screen w-full items-center justify-center">
                <div className="text-2xl font-semibold">Online order is currently not available</div>
            </main>
        );
    }

    return (
        <main className="relative flex h-full w-full flex-col">
            <div className="hidden w-full md:block">
                <Navbar />
            </div>
            <div className="flex h-[10vh] w-full items-center justify-center bg-menubackground md:hidden">
                <div className="flex h-full w-[38%] items-center justify-start px-3">
                    <Link href="/cart">
                        <MoveLeft />
                    </Link>
                </div>
                <div className="flex w-[62%] items-center justify-start">
                    <Link href="/">
                        <Image src="/images/logo.png" width={177} height={101} alt="logo " className="w-20 md:mt-1 md:w-32" />
                    </Link>
                </div>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center">
                <Checkout />
            </div>
        </main>
    );
};

export default Page;
