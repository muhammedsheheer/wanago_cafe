import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const Special = () => {
  return (
    <section className="relative flex h-full max-w-[1400px] flex-col items-start justify-center bg-[#000000] px-7 py-10 lg:py-20 lg:pl-28">
      <div
        className="absolute inset-0 z-10 hidden lg:block"
        style={{
          backgroundImage: "url(/images/home/special-vector-1.png)",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "50%",
        }}
      ></div>
      <div
        className="absolute left-14 top-4 z-10 h-1/2 w-full -rotate-180 lg:z-0 lg:hidden lg:h-0 lg:w-0"
        style={{
          backgroundImage: "url(/images/home/special-vector-1.png)",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="w-full lg:w-1/3">
        <div className="z-10 flex h-full w-full flex-col gap-3 lg:gap-5">
          <h3 className="text-center font-oswald uppercase lg:text-start">
            Special
          </h3>
          <h1 className="lg;text-6xl text-center font-oswald text-4xl font-bold sm:text-7xl md:text-start lg:text-start lg:leading-[80px]">
            Istanbul
            <br />
            <span className="text-primary">Specials</span>
          </h1>
        </div>
      </div>
      <div className="z-50 flex w-full items-start justify-center bg-auto lg:h-[600px] lg:items-start">
        <div className="hidden w-0 lg:flex lg:w-2/12"></div>
        <div className="w-full pt-10 lg:w-10/12 lg:pt-0">
          <div className="">
            <div className="flex w-full flex-col justify-center gap-3 lg:flex-row lg:gap-5">
              <div
                style={{
                  backgroundImage: "url('/images/home/special-vector.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="flex items-center justify-center p-2 lg:w-1/2 lg:p-12"
              >
                <div className="w-7/12 lg:w-8/12">
                  <Image
                    src="/images/home/special1.png"
                    alt="special"
                    width={1360}
                    height={564}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2 lg:gap-4">
                <p className="text-center text-2xl font-bold text-primary lg:text-start lg:text-5xl">
                  €30
                </p>
                <p className="text-center text-xl font-semibold text-white lg:w-[250px] lg:text-start lg:text-4xl">
                  Ravioli with Ice cream
                </p>
                <div className="flex w-full justify-center gap-3 lg:justify-start">
                  <Button
                    variant="outline"
                    className="rounded-full border-primary px-2 py-5"
                  >
                    <ArrowLeft className="text-primary" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-primary px-2 py-5"
                  >
                    <ArrowRight className="text-primary" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Special;
