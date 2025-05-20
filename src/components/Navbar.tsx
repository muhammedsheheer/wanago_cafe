"use client";
import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
// import { BetaMenuActive } from "@/lib/constants";
import { cn } from "@/lib/utils";
// import { usePathname } from "next/navigation";

const Navbar = ({
  position = "static",
}: {
  position?: "static" | "fixed" | "absolute";
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  // const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight ?? 0;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        `${position} top-0 z-50 flex w-full max-w-[1300px] justify-center`,
        isScrolled && "max-w-full bg-black",
      )}
    >
      <div
        className={cn(
          "flex h-[10vh] w-full items-center transition-all duration-300 ease-in-out",
          isScrolled && "max-w-[1300px]",
        )}
      >
        <div className="flex h-full w-full items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={198}
              height={66}
              alt="logo"
              className="w-[140px] md:w-[190px]"
            />
          </Link>
          {!isScrolled && (
            <div className="hidden flex-row items-center justify-center gap-[3.48rem] md:flex">
              <Button
                asChild
                variant="link"
                className="px-0 uppercase text-accent"
              >
                <Link href="/menu">Menu</Link>
              </Button>
              <Button
                asChild
                variant="link"
                className="px-0 uppercase text-accent"
              >
                <Link href="/about-us">Our Story</Link>
              </Button>
              <Button
                asChild
                variant="link"
                className="px-0 uppercase text-accent"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                variant="link"
                className="px-0 uppercase text-accent"
              >
                <Link href="/table-booking">Table Booking</Link>
              </Button>
            </div>
          )}
          {!isScrolled && (
            <div className="hidden items-center justify-center gap-[2.5rem] md:flex">
              {/* {pathname !== "/" && (
                <CartSheet>
                  <Button
                    variant="ghost"
                    className="px-1 py-1 hover:bg-transparent"
                    disabled={!BetaMenuActive}
                  >
                    <span className="sr-only">Shopping Cart</span>
                    <Icons.shoppingCart />
                  </Button>
                </CartSheet>
              )} */}
              <Button
                className="group items-center gap-[1.19rem] font-semibold uppercase text-[#282828] hover:bg-primary"
                variant="secondary"
                asChild
              >
                <Link href="/menu">
                  View Menu
                  <Icons.rightArrow className="duration-300 ease-in-out group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          )}
          {isScrolled ? (
            <Sidebar>
              <Button
                variant="ghost"
                className="flex px-1 py-1 text-primary hover:bg-transparent hover:text-primary"
              >
                <span className="sr-only">Menu</span>
                <Icons.menu />
              </Button>
            </Sidebar>
          ) : (
            <Sidebar>
              <Button
                variant="ghost"
                className="px-1 py-1 text-primary hover:bg-transparent hover:text-primary md:hidden"
              >
                <span className="sr-only">Menu</span>
                <Icons.menu />
              </Button>
            </Sidebar>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
