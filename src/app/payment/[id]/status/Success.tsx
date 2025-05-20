import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { formattedItemPrice } from "@/lib/formatted-item-price";
import { getCurrencySymbol } from "@/lib/get-currency-symbol";
import { cn } from "@/lib/utils";
import type { RefreshPayment } from "@/types/refresh-payment.type";
import { ChevronDown, MoveLeft, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FC } from "react";

interface SuccessProps {
  data: RefreshPayment;
  id: string;
}

const Success: FC<SuccessProps> = ({ data, id }) => {
  const { restaurant } = useRestaurant();
  const { clearCart } = useCart();
  const [close, setClose] = useState(false);

  useEffect(() => {
    if (data?._id) {
      clearCart();
      localStorage.removeItem("pickup");
      localStorage.removeItem("delivery");
      localStorage.removeItem("scrollCategory");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data) {
    return (
      <div className="bg-menubackground flex h-full w-full flex-col items-center justify-center gap-5">
        <p className="text-menuprimary text-4xl font-[600] tracking-[2px]">
          Placing your order...
        </p>
        <Image
          src="/images/payment/loading.png"
          width={147}
          height={147}
          alt="loading"
        />
      </div>
    );
  }

  return (
    // <main className="flex h-full min-h-screen w-full flex-col items-center justify-center">
    //   <div className="flex aspect-square h-32 w-32 items-center justify-center rounded-full bg-primary p-4">
    //     <Check size={64} />
    //   </div>
    //   <h1 className="mt-4 text-3xl font-bold">Payment Successful</h1>
    //   <p className="mt-2 text-center text-lg">
    //     Your payment has been successfully processed. Thank you for your order.
    //   </p>

    //   <Button className="mt-4" asChild>
    //     <Link href="/">Go Home</Link>
    //   </Button>
    // </main>
    <section className="bg-menubackground relative flex h-full w-full flex-col md:px-[130px]">
      <div className="flex w-full flex-col items-center justify-center">
        {/*head section */}
        <div className="bg-menubackground flex w-full flex-row items-center justify-between px-4 py-4 md:flex-col md:items-start md:gap-12 md:px-24 md:py-8">
          <Link href="/menu" replace className="md:hidden">
            <Image
              src={"/images/home/checkout/arrow.png"}
              width={30}
              height={26}
              alt="heart"
            />
          </Link>
          <Link href="/" replace className="pt-4">
            <Image
              src={"/images/logo.png"}
              width={129}
              height={48}
              alt="heart"
            />
          </Link>
          <Link
            href="/menu"
            replace
            className="text-menusecondary hidden items-center justify-center gap-2 px-[120px] font-manrope text-lg md:flex"
          >
            <MoveLeft />
            <p className="text-menusecondary font-manrope text-lg">
              Back To Menu
            </p>
          </Link>
          <Search className="h-0 w-0" />
        </div>

        {/*first section */}
        <div className="bg-menubackground relative h-full w-full pb-6 md:w-2/4">
          <div className="absolute bottom-1 left-0 top-1">
            <Image
              src={"/images/home/checkout/left.png"}
              width={124}
              height={240}
              alt="heart"
            />
          </div>
          <div className="absolute bottom-1 right-0 top-1">
            <Image
              src={"/images/home/checkout/right.png"}
              width={124}
              height={240}
              alt="heart"
            />
          </div>
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3 pb-12 pt-6 md:pt-12"
            style={{
              backgroundImage: "url('/images/home/checkout/bg.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div>
              <button className="bg-menubackground text-menuprimary px-5 py-3 font-manrope text-sm font-[800] leading-[150%] md:text-base">
                ORDER #{id.slice(-5)}
              </button>
            </div>
            <h4 className="text-menubackground text-center font-manrope text-2xl font-[500] leading-[150%] md:text-4xl">
              We’ve got your order
            </h4>
            <div className="flex flex-col">
              <h5 className="text-menubackground border-b-[1px] border-b-black text-center font-manrope text-base font-[800] leading-[150%] md:text-lg">
                Scheduled {data?.orderType === 2 ? "Delivery" : "Pickup"} Time
              </h5>
              <span className="text-menubackground text-center font-manrope text-lg font-[800] leading-[150%] md:text-xl">
                {new Date(data?.deliveryTime ?? new Date()).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/*second section */}
        <div className="bg-menubackground flex w-full flex-col gap-6 px-4 py-4 md:w-2/4 md:px-0 md:py-8">
          <div className="bg-itembackground flex flex-col gap-2 p-4 md:p-6">
            <h5 className="text-menusecondary font-manrope text-sm font-[700] leading-[150%] md:text-lg">
              Restaurant Details
            </h5>
            <h4 className="text-menusecondary pb-2 font-manrope text-sm font-[400] capitalize leading-[80%] tracking-[0.86px] md:text-lg">
              {restaurant?.name}
            </h4>
            <p className="text-menusecondary font-manrope text-xs font-[400] leading-[150%] tracking-[1.02px] md:text-base">
              {restaurant?.address.firstLine} {restaurant?.address.secondLine}
              <br />
              {restaurant?.address.city}
              {restaurant?.address.countryCode}
              {restaurant?.address.postCode}
            </p>
            <span className="text-menusecondary decoration-menusecondary font-manrope text-xs font-[400] leading-[150%] tracking-[1.02px] underline decoration-1 underline-offset-4 md:text-base">
              {restaurant?.contactNumber}
            </span>
            <div className="flex flex-row gap-3 pt-6">
              <Link
                href={`https://www.google.com/maps/place/${restaurant?.address?.coords[0]},${restaurant?.address?.coords[1]}`}
                target="_blank"
                className="border-menuprimary bg-menubackground text-menuprimary hover:bg-menuprimary hover:text-menusecondary border px-4 py-3 text-center font-inter text-sm font-[700] uppercase leading-[22px] md:text-base"
              >
                Get Directions
              </Link>
              <Link
                href={`tel:${restaurant?.contactNumber}`}
                target="_blank"
                className="border-menuprimary bg-menubackground text-menuprimary hover:bg-menuprimary hover:text-menusecondary border px-4 py-3 text-center font-inter text-sm font-[700] uppercase leading-[22px] md:text-base"
              >
                Call restaurant
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-4 md:pb-6">
            <div
              className="border-menuprimary flex flex-row justify-between border-b-[0.5px] pb-2"
              onClick={() => setClose(!close)}
            >
              <h5 className="text-menusecondary font-manrope text-lg font-[700] leading-[150%] md:text-xl">
                View order details
              </h5>
              <ChevronDown
                className={cn(
                  "h-6 w-6 rotate-180 transition-all duration-500 ease-in",
                  !close && "rotate-0",
                )}
              />
            </div>
            <div className={cn("flex w-full flex-col gap-3 overflow-hidden")}>
              {close &&
                data.cart.map((item, index) => {
                  return (
                    <div
                      className={cn(
                        "flex max-h-[1000px] flex-col justify-between gap-2 pb-2 transition-all duration-500 ease-in",
                      )}
                      key={index}
                    >
                      <div className="flex w-full justify-between">
                        <h5 className="text-menusecondary font-manrope text-sm font-[700] leading-[150%] md:text-base">
                          {item.quantity} x {item?.menuItemName}
                          <br />
                          {item?.notes && (
                            <span className="border-b-menusecondary border-b-[1px]">
                              Instructions
                            </span>
                          )}
                          {item?.notes && <br />}
                          {item.notes}
                        </h5>
                        <span className="text-menuprimary font-manrope text-sm font-[700] leading-[150%] md:text-base">
                          £
                          {formattedItemPrice(
                            item?.price.value * item.quantity,
                          )}
                        </span>
                      </div>
                      {Object.entries(
                        item?.modifiers?.reduce(
                          (
                            acc: Record<
                              string,
                              { count: number; price: number }
                            >,
                            mod,
                          ) => {
                            const name = mod?.menuItem?.name;
                            if (name) {
                              acc[name] ??= {
                                count: 0,
                                price: mod?.price?.value,
                              };
                              acc[name].count += 1;
                            }
                            return acc;
                          },
                          {},
                        ),
                      ).map(([name, { count, price }], i) => (
                        <div
                          className="flex w-full justify-between pl-4"
                          key={i}
                        >
                          <h5 className="text-menusecondary font-manrope text-sm font-[400] leading-[150%] md:text-base">
                            {count} x {name}
                          </h5>
                          <span className="text-menuprimary font-manrope text-sm font-[700] leading-[150%] md:text-base">
                            £{formattedItemPrice(price * count)}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              {close && (
                <div className="flex flex-row justify-between pb-2">
                  <h5 className="text-menusecondary font-manrope text-sm font-[700] leading-[150%] md:text-base">
                    Sub-Total
                  </h5>
                  <span className="text-menuprimary font-manrope text-sm font-[700] leading-[150%] md:text-base">
                    £{formattedItemPrice(data?.totalCartAmount)}
                  </span>
                </div>
              )}
              {/* {close && (
                                <div className="flex flex-row justify-between border-b border-menuprimary pb-2">
                                    <h5 className="font-manrope text-sm font-[700] leading-[150%] text-menusecondary md:text-base">Service Charge</h5>
                                    <span className="font-manrope text-sm font-[700] leading-[150%] text-menuprimary md:text-base">
                                        £{calculateServiceCharge(data?.totalCartAmount, restaurant?.serviceCharge ?? 0).toFixed(2)}
                                    </span>
                                </div>
                            )} */}
              {close &&
                data?.charges.map((charge) => {
                  if (charge?.isActive) {
                    if (charge.isPercentage) {
                      return (
                        <div
                          className="flex flex-row justify-between pb-2"
                          key={charge._id}
                        >
                          <p className="text-menusecondary font-manrope text-sm font-[400] leading-[150%] md:text-base">
                            {charge.name}
                          </p>
                          <p className="text-menuprimary font-manrope text-sm font-[700] leading-[150%] md:text-base">
                            {getCurrencySymbol("GBP")}{" "}
                            {(
                              (data?.totalCartAmount * charge?.value) /
                              100
                            ).toFixed(2)}
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="flex flex-row justify-between pb-2"
                          key={charge._id}
                        >
                          <p className="text-menusecondary font-manrope text-sm font-[400] leading-[150%] md:text-base">
                            {charge.name}
                          </p>
                          <p className="text-menuprimary font-manrope text-sm font-[700] leading-[150%] md:text-base">
                            {getCurrencySymbol("GBP")}{" "}
                            {(charge?.value).toFixed(2)}
                          </p>
                        </div>
                      );
                    }
                  }
                })}
              {close && <div className="bg-menuprimary h-[0.2px] w-full" />}
              <div className="flex flex-row justify-between pb-2">
                <h5 className="text-menusecondary font-manrope text-sm font-[700] leading-[150%] md:text-base">
                  Order Total
                </h5>
                <span className="text-menuprimary font-manrope text-sm font-[700] leading-[150%] md:text-base">
                  £{formattedItemPrice(data?.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/*last section */}
        <div className="bg-menubackground flex w-full flex-col gap-4 md:w-2/4">
          {data?.notes && (
            <div className="bg-menubackground flex w-full flex-col items-center justify-center gap-2 px-2 py-4">
              <p className="text-menusecondary w-full text-start font-manrope text-xs font-[500] capitalize leading-[20px] tracking-[0.74px] md:text-lg">
                Packaging Instructions Given
              </p>
              {/* <Image src={"/images/home/checkout/heart.png"} width={55} height={42} alt="heart" /> */}
              <p className="text-menusecondary w-full text-start font-manrope text-xs font-[400] capitalize md:text-base">
                {data?.notes}
              </p>
            </div>
          )}
          <div className="bg-menuprimary flex w-full flex-row items-center justify-center gap-2 px-2 py-4">
            {/* <Image src={"/images/home/checkout/heart.png"} width={55} height={42} alt="heart" /> */}
            <p className="text-menubackground font-manrope text-xs font-[500] capitalize leading-[20px] tracking-[0.74px] md:text-lg">
              Thanks for choosing us! Your food will be freshly prepared and
              ready soon.
            </p>
          </div>
          {data.orderType !== 2 && (
            <div className="flex flex-col items-center justify-center gap-4 py-6 md:py-8">
              <h3 className="text-menuprimary pt-4 text-center font-manrope text-lg font-[800] leading-[150%] md:pt-6 md:text-2xl">
                How to collect your food{" "}
              </h3>
              <div>
                <span className="bg-menuprimary text-menusecondary flex h-12 w-12 items-center justify-center rounded-full text-center font-manrope text-base font-[800] leading-[150%] md:text-xl">
                  1
                </span>
              </div>
              <p className="text-menusecondary w-[280px] text-center font-manrope text-base font-[400] capitalize leading-[25px] tracking-[0.86px] md:w-full md:text-lg">
                Head to the restaurant to pick up order
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-menubackground flex w-full justify-end px-7 py-6">
        <Link
          href="https://foodo.ai"
          className="text-primary hover:underline"
          target="_blank"
        >
          Powered By Foodo
        </Link>
      </div>
    </section>
  );
};

export default Success;
