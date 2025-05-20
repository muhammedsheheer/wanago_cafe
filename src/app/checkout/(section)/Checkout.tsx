"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { formattedItemPrice } from "@/lib/formatted-item-price";
import { getCurrencySymbol } from "@/lib/get-currency-symbol";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Delivery from "./Delivery";
import Pickup from "./Pickup";
import { useRestaurant } from "@/context/RestaurantContext";
import { calculateServiceCharge } from "@/lib/calculate-service-charge";
import { isAfter } from "date-fns";

const Checkout = () => {
  const router = useRouter();
  const { cartItems, cartValue } = useCart();
  const [checkoutType, setCheckoutType] = useState<"delivery" | "pickup">(
    "pickup",
  );
  const [isPickupNow, setIsPickupNow] = useState(true);
  const [Coupon, setCoupon] = useState("");
  const [couponApply, setCouponApply] = useState(false);
  const [isDeliveryNow, setIsDeliveryNow] = useState(true);
  const { restaurant, items } = useRestaurant();
  const [totalCharges, setTotalCharges] = useState(0);
  useEffect(() => {
    const savedOrderType = localStorage.getItem("orderType");
    if (savedOrderType?.toString() === "2") {
      setCheckoutType("delivery");
    } else {
      setCheckoutType("pickup");
    }
  }, []);

  const checkPickupTime = () => {
    const pickupstart = restaurant?.takeAwayWindow.find(
      (item) => item.startTime,
    )?.startTime;
    const pickupend = restaurant?.takeAwayWindow.find(
      (item) => item.startTime,
    )?.endTime;
    if (pickupstart) {
      const [hours, minutes] = pickupstart.split(":").map(Number);
      const today = new Date();
      const pickupDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
      );

      const now = new Date();
      now.setSeconds(0, 0);

      if (isAfter(now, pickupDate)) {
        setIsPickupNow(true);
      } else {
        setIsPickupNow(false);
      }
    }

    if (pickupend) {
      const [hours, minutes] = pickupend.split(":").map(Number);
      const today = new Date();
      const pickupDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
      );

      const now = new Date();
      now.setSeconds(0, 0);

      if (isAfter(now, pickupDate)) {
        setIsPickupNow(false);
      } else {
        setIsPickupNow(true);
      }
    }
  };

  const checkDeliveryTime = () => {
    const deliverystart = restaurant?.deliveryWindow.find(
      (item) => item.startTime,
    )?.startTime;
    const deliveryend = restaurant?.deliveryWindow.find(
      (item) => item.startTime,
    )?.endTime;
    if (deliverystart) {
      const [hours, minutes] = deliverystart.split(":").map(Number);
      const today = new Date();
      const pickupDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
      );

      const now = new Date();
      now.setSeconds(0, 0);

      if (isAfter(now, pickupDate)) {
        setIsDeliveryNow(true);
      } else {
        setIsDeliveryNow(false);
      }
    }

    if (deliveryend) {
      const [hours, minutes] = deliveryend.split(":").map(Number);
      const today = new Date();
      const pickupDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
      );

      const now = new Date();
      now.setSeconds(0, 0);

      if (isAfter(now, pickupDate)) {
        setIsDeliveryNow(false);
      } else {
        setIsDeliveryNow(true);
      }
    }
  };

  useEffect(() => {
    if (restaurant?.takeAwayWindow) {
      checkPickupTime();
      checkDeliveryTime();

      const interval = setInterval(() => {
        checkPickupTime();
        checkDeliveryTime();
      }, 300000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant?.takeAwayWindow]);
  useEffect(() => {
    let totalcharge = 0;
    restaurant?.charges.map((charge) => {
      if (charge.isActive) {
        if (charge?.orderType === "2" && checkoutType !== "delivery") {
          return (totalcharge += 0);
        }
        if (charge?.orderType === "3" && checkoutType !== "pickup") {
          return (totalcharge += 0);
        }
        if (charge.isPercentage) {
          return (totalcharge += (cartValue() * charge?.value) / 100);
        } else {
          return (totalcharge += charge?.value);
        }
      }
    });
    setTotalCharges(totalcharge);
  }, [restaurant?.charges, cartValue, checkoutType]);
  return (
    <section className="bg-menubackground flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full max-w-[1300px] flex-col gap-[2.5rem] px-3 pb-[2.5rem] pt-3 md:pt-[2.5rem]">
        <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:gap-28">
          <Tabs
            value={checkoutType}
            className="flex w-full flex-col gap-4 lg:w-2/3"
          >
            <Button
              className="text-menusecondary hidden w-fit gap-2 p-0 text-lg font-[500] tracking-[1px] md:flex"
              onClick={() => router.push("/menu")}
              variant="link"
            >
              <MoveLeft /> <span>Back to Menu</span>
            </Button>
            <div className="border-borderinput flex w-full flex-col gap-3 border-b-[2px] py-3 pb-5 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-menusecondary text-xl font-semibold">
                {checkoutType === "delivery" ? "Delivery" : "Pickup"} Details
              </p>
              <TabsList className="bg-tabbg flex h-fit w-fit gap-1 rounded-full px-1 py-1">
                {restaurant?.isTakeAwayEnabled && (
                  <TabsTrigger
                    value="pickup"
                    className="text-menusecondary data-[state=active]:bg-menuprimary data-[state=active]:text-menusecondary rounded-full bg-transparent px-4 py-3 text-sm font-semibold"
                    onClick={() => {
                      setCheckoutType("pickup");
                      localStorage.setItem("orderType", (3).toString());
                    }}
                  >
                    Pickup
                  </TabsTrigger>
                )}
                {restaurant?.isDeliveryEnabled && (
                  <TabsTrigger
                    value="delivery"
                    className="text-menusecondary data-[state=active]:bg-menuprimary data-[state=active]:text-menusecondary rounded-full bg-transparent px-4 py-3 text-sm font-semibold"
                    onClick={() => {
                      setCheckoutType("delivery");
                      localStorage.setItem("orderType", (2).toString());
                    }}
                  >
                    Delivery
                  </TabsTrigger>
                )}
              </TabsList>
            </div>
            <TabsContent value="pickup">
              {!restaurant?.isTakeAwayEnabled ? (
                <p>Pickup is unavailable at the moment.</p>
              ) : !isPickupNow ? (
                <p>Pickup is unavailable at the moment.</p>
              ) : restaurant?.minimumCollectionOrderAmount &&
                restaurant?.minimumCollectionOrderAmount >
                  cartValue() +
                    calculateServiceCharge(
                      cartValue(),
                      restaurant?.serviceCharge ?? 0,
                    ) ? (
                <p>
                  Your basket is just under &nbsp; £
                  {restaurant?.minimumCollectionOrderAmount}. Why not try
                  something new from our delicious offerings?
                </p>
              ) : (
                <Pickup />
              )}
            </TabsContent>
            <TabsContent value="delivery">
              {!restaurant?.isDeliveryEnabled ? (
                <p>Delivery is unavailable at the moment.</p>
              ) : !isDeliveryNow ? (
                <p>Delivery is unavailable at the moment.</p>
              ) : restaurant?.minimumDeliveryOrderAmount &&
                restaurant?.minimumDeliveryOrderAmount >
                  cartValue() +
                    calculateServiceCharge(
                      cartValue(),
                      restaurant?.serviceCharge ?? 0,
                    ) ? (
                <p>
                  Your order must total at least &nbsp; £
                  {restaurant?.minimumDeliveryOrderAmount}. Why not have another
                  look and add a few more tempting treats?
                </p>
              ) : (
                <Delivery />
              )}
            </TabsContent>
          </Tabs>

          <div className="mb-16 flex w-full flex-col justify-end gap-3 md:mb-0 lg:w-1/3 lg:flex-row">
            <div className="md:border-borderinput flex h-fit w-full flex-col gap-7 rounded-md md:border-[2px] md:px-4 md:py-5">
              <div className="w-full">
                <p className="text-menuprimary-foreground text-xl font-[600] tracking-[0.6px]">
                  Order Summary
                </p>
              </div>
              <div className="flex flex-col">
                <div className="custom-scrollbar flex max-h-[300px] w-full flex-col overflow-x-auto overflow-y-scroll">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="border-b-borderinput flex w-full items-center justify-between border-b-[2px] py-2"
                    >
                      <div className="flex items-center gap-2">
                        {item.images[0] ? (
                          <Image
                            src={item.images[0]}
                            alt="1"
                            width={435}
                            height={319}
                            className="aspect-square h-full max-h-[70px] w-auto rounded-md"
                          />
                        ) : (
                          <Image
                            src="/images/menu/items/item-placeholder.svg"
                            alt="item-placeholder"
                            width={106}
                            height={108}
                            className="aspect-square h-[70px] max-h-[70px] w-auto rounded-md object-cover"
                          />
                        )}
                        <div className="flex flex-col justify-between py-1">
                          <p className="text-menusecondary line-clamp-1 text-lg font-[600] tracking-[1px]">
                            {item?.quantity}&nbsp; {item.name}
                          </p>
                          {/* {item.description && (
                            <p className="line-clamp-2 text-lg font-normal text-[#FBEAD2]">
                              {item.description}
                            </p>
                          )} */}
                          {Object.entries(
                            item.modifiers.reduce(
                              (acc, modifier) => {
                                const name = items.find(
                                  (i) => i._id === modifier._idMenuItem,
                                )?.name;
                                if (name) {
                                  acc[name] ??= { ...modifier, count: 0 };
                                  acc[name].count += 1;
                                }
                                return acc;
                              },
                              {} as Record<
                                string,
                                (typeof item.modifiers)[0] & { count: number }
                              >,
                            ),
                          ).map(([name, modifier], index) => {
                            // const modifier = items.find(
                            //   (item) => item._id === mod._idMenuItem,
                            // )?.name;
                            return (
                              <div key={index}>
                                <p>
                                  {modifier?.count} X {name}
                                </p>
                              </div>
                            );
                          })}
                          <p className="text-menusecondary text-sm font-[300]">
                            {item.notes && (
                              <span className="border-b-menusecondary border-b-[1px] font-[500]">
                                Instructions
                              </span>
                            )}
                            <br />
                            {item.notes}
                          </p>
                          <p className="text-menusecondary text-lg font-normal">
                            {getCurrencySymbol(item.price.currency)}{" "}
                            {formattedItemPrice(item.price.value)}
                          </p>
                        </div>
                      </div>
                      {/* <Button
                        className="aspect-square p-2 hover:bg-transparent"
                        variant="ghost"
                        onClick={() => removeItem(item._idMenuItem)}
                      >
                        <Trash2 className="text-[#bc995d]" />
                      </Button> */}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4 pt-6">
                  <p className="text-menuprimary-foreground text-lg font-light">
                    Rewards & promos
                  </p>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Gift or discount code"
                        onChange={(e) => {
                          setCoupon(e.target.value);
                        }}
                        className="border-b-borderinput bg-inputbg placeholder:text-placeholder focus-visible:border-b-menuprimary h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 outline-none focus-visible:border-b-[2px] focus-visible:ring-0"
                      />
                      <Button
                        className="bg-menuprimary text-menuforeground hover:bg-buttonhover h-12"
                        type="button"
                        onClick={() => {
                          if (Coupon.length > 0) {
                            setCoupon("");
                          }
                          setCouponApply(true);
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                    {couponApply && (
                      <p className="w-full text-start text-xs text-red-700">
                        The Coupon Code is Invalid
                      </p>
                    )}
                  </div>
                  {/* <div className="flex justify-between">
                    <p className="text-sm font-semibold text-menusecondary">Service Charge</p>
                    <p className="text-lg font-semibold text-menusecondary">
                      {getCurrencySymbol("GBP")}{" "}
                      {calculateServiceCharge(
                        cartValue(),
                        restaurant?.serviceCharge ?? 0,
                      ).toFixed(2)}
                    </p>
                  </div> */}
                  {restaurant?.charges.map((charge) => {
                    if (charge?.isActive) {
                      if (
                        charge?.orderType === "2" &&
                        checkoutType !== "delivery"
                      ) {
                        return null;
                      }
                      if (
                        charge?.orderType === "3" &&
                        checkoutType !== "pickup"
                      ) {
                        return null;
                      }
                      if (charge.isPercentage) {
                        return (
                          <div
                            className="flex justify-between"
                            key={charge._id}
                          >
                            <p className="text-menusecondary text-sm font-semibold">
                              {charge.name}
                            </p>
                            <p className="text-menusecondary text-lg font-semibold">
                              {getCurrencySymbol("GBP")}{" "}
                              {((cartValue() * charge?.value) / 100).toFixed(2)}
                            </p>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className="flex justify-between"
                            key={charge._id}
                          >
                            <p className="text-menusecondary text-sm font-semibold">
                              {charge.name}
                            </p>
                            <p className="text-menusecondary text-lg font-semibold">
                              {getCurrencySymbol("GBP")}{" "}
                              {(charge?.value).toFixed(2)}
                            </p>
                          </div>
                        );
                      }
                    }
                  })}
                  <div className="flex justify-between">
                    <p className="text-menusecondary text-lg font-semibold">
                      Total Amount
                    </p>
                    <p className="text-menusecondary text-lg font-semibold">
                      {getCurrencySymbol("GBP")}{" "}
                      {(cartValue() + totalCharges)
                        // +
                        // calculateServiceCharge(
                        //   cartValue(),
                        //   restaurant?.serviceCharge ?? 0,
                        // )
                        // { restaurant?.charges.map((charge) => charge?.isActive ? charge.isPercentage ? (cartValue() * charge?.value) / 100 : charge?.value : 0 }.reduce((a, b) => a + b, 0)}
                        .toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-menuprimary-foreground text-xs">
                      ALLERGIES:If you or someone you`re ordering for have an
                      allergy, please contact the merchant directly to let them
                      know.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
