"use client";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Failed() {
    const router = useRouter();
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/checkout");
        }, 5000);

        return () => clearTimeout(timeout);
    }, [router]);
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-menubackground">
            <div className="flex h-fit w-10/12 flex-col items-center justify-center gap-4 rounded-2xl bg-itembackground px-6 py-10 md:w-4/12">
                <div className="flex aspect-square h-24 w-24 items-center justify-center rounded-full bg-red-700">
                    <CircleX className="h-20 w-20" />
                </div>
                <p className="text-2xl font-[600] tracking-[2px] text-menuprimary md:text-4xl">Payment Failed</p>
                <p className="text-center text-lg text-menusecondary">Please try again</p>
                <Link href="/checkout">
                    <Button className="bg-red-700 py-6 text-white hover:bg-red-700">Try Again</Button>
                </Link>
            </div>
        </div>
    );
}
