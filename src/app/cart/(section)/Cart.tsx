"use client";
import EditMenuItemDrawer from "@/components/drawer/EditMenuItemDrawer";
import CartDeletePopup from "@/components/popups/CartDeletePopup";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { formattedItemPrice } from "@/lib/formatted-item-price";
import { getCurrencySymbol } from "@/lib/get-currency-symbol";
import { GetModifiersFromItemId } from "@/lib/get-modifiers-from-item-id";
import { cn } from "@/lib/utils";
import { ArrowLeft, CircleMinus, CirclePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cart = ({}) => {
  const { cartItems, updateItem, removeItem } = useCart();
  const { restaurant } = useRestaurant();
  const [totalAmount, setTotalAmount] = useState(0);
  const { items } = useRestaurant();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const totalcart = cartItems.reduce((acc, i) => acc + i.price.value, 0);

    setTotalAmount(totalcart);
  }, [cartItems]);
  const reversedCartItems = [...cartItems].reverse();
  return (
    <section className="bg-menubackground w-full">
      <div className="bg-menubackground fixed left-0 top-0 z-30 flex h-[10vh] w-full items-center justify-start px-4">
        <Link href="/menu" className="text-menusecondary flex gap-1 p-0">
          <ArrowLeft />
          Menu
        </Link>
        <div className="flex w-[55%] justify-center">
          <Image
            src="/images/logo.png"
            width={177}
            height={101}
            alt="logo"
            className="w-16"
          />
        </div>
      </div>
      <div className="bg-menubackground h-[94vh] w-full flex-col overflow-y-hidden">
        <p className="text-menusecondary mt-24 px-4 text-xl font-bold">
          Your Order
        </p>
        <div className="bg-menubackground sticky top-0 z-10 h-[80vh] overflow-y-visible px-4 py-2">
          <div className="scrollbar-none flex flex-col gap-6 overflow-x-auto pb-2">
            <div className="scrollbar-none flex h-[69vh] w-full flex-col gap-4 overflow-y-scroll">
              {cartItems.length !== 0 ? (
                <div className="flex w-full flex-col">
                  {reversedCartItems.map((item, index) => {
                    const menuitem = items.find(
                      (i) => i._id === item._idMenuItem,
                    );
                    return (
                      <div
                        className="border-b-menuprimary flex w-full flex-col items-start justify-start gap-3 border-b-[0.3px] px-3 py-5"
                        key={index}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="flex w-3/4 flex-col items-start justify-start gap-1">
                            <p className="text-menusecondary text-lg font-[700] tracking-[1.8px]">
                              {item?.quantity}&nbsp;&nbsp;{item.name}
                            </p>
                          </div>
                          {menuitem && menuitem.price.value > 0 ? (
                            <p className="text-menuprimary font-[700]">
                              {menuitem && menuitem.takeawayPrice.value > 0 ? (
                                <>
                                  {getCurrencySymbol(
                                    menuitem.takeawayPrice.currency,
                                  )}{" "}
                                  {formattedItemPrice(
                                    menuitem.takeawayPrice.value,
                                  )}
                                </>
                              ) : (
                                <>
                                  {menuitem && menuitem.price.value > 0 ? (
                                    <>
                                      {getCurrencySymbol(
                                        menuitem.price.currency,
                                      )}{" "}
                                      {formattedItemPrice(menuitem.price.value)}
                                    </>
                                  ) : (
                                    <>
                                      {menuitem &&
                                      menuitem.modifiers.length === 0 ? (
                                        <>Free</>
                                      ) : (
                                        menuitem?.modifiers.map((mod, index) =>
                                          GetModifiersFromItemId(
                                            menuitem,
                                            items,
                                            index,
                                          ).map((modifier) => {
                                            if (
                                              modifier._id ===
                                              item.modifiers.find(
                                                (modifier) =>
                                                  modifier.defaultSelection,
                                              )?.defaultSelection
                                            ) {
                                              return `${getCurrencySymbol(modifier.price.currency)} ${formattedItemPrice(modifier.price.value)}`;
                                            }
                                          }),
                                        )
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="flex w-full flex-col items-center justify-between gap-2 pl-3">
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
                          ).map(([name, modifier], index) => (
                            <div
                              className="flex w-full items-center justify-between"
                              key={index}
                            >
                              <p className="text-menusecondary w-[80%] text-sm font-[300] tracking-[1.4px]">
                                {modifier.count}&nbsp;&nbsp;{name}
                              </p>
                              {modifier && modifier.price.value > 0 ? (
                                <p className="text-menuprimary text-sm font-[700]">
                                  {getCurrencySymbol(modifier.price.currency)}{" "}
                                  {formattedItemPrice(modifier.price.value)}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="text-menusecondary text-sm font-[400] tracking-[1.8px]">
                          {item.notes && (
                            <span className="border-b-menusecondary border-b-[1px]">
                              Instructions
                            </span>
                          )}
                          <br />
                          {item?.notes}
                        </p>
                        <div
                          className={cn(
                            "flex w-full items-center justify-between pt-0",
                            item.modifiers.length > 0 && "pt-3",
                          )}
                        >
                          <EditMenuItemDrawer item={item} index={index}>
                            <p className="text-menuprimary font-[400] capitalize underline">
                              Edit Item
                            </p>
                          </EditMenuItemDrawer>
                          <div className="flex items-center justify-center gap-2">
                            {item.quantity === 1 && (
                              <CartDeletePopup item={item}>
                                <button className="text-menusecondary transition-all duration-150 ease-out hover:scale-[1.2]">
                                  <Trash2 />
                                </button>
                              </CartDeletePopup>
                            )}
                            {item.quantity > 1 && (
                              <button
                                className="text-menusecondary transition-all duration-150 ease-out hover:scale-[1.2]"
                                onClick={() => {
                                  if (item.quantity <= 1) {
                                    return removeItem(
                                      item._idMenuItem,
                                      item.modifiers,
                                    );
                                  }
                                  updateItem(
                                    {
                                      ...item,
                                      price: {
                                        ...item.price,
                                        value:
                                          item.price.value -
                                          item.price.value / item.quantity,
                                      },
                                      quantity: item.quantity - 1,
                                    },
                                    index,
                                  );
                                }}
                              >
                                <CircleMinus />
                              </button>
                            )}
                            <p className="text-menuprimary text-2xl font-[500]">
                              {item.quantity}
                            </p>
                            <button
                              className="text-menusecondary transition-all duration-150 ease-out hover:scale-[1.2]"
                              onClick={() => {
                                updateItem(
                                  {
                                    ...item,
                                    price: {
                                      ...item.price,
                                      value:
                                        item.price.value +
                                        item.price.value / item.quantity,
                                    },
                                    quantity: item.quantity + 1,
                                  },
                                  index,
                                );
                              }}
                            >
                              <CirclePlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-menusecondary w-full text-center">
                  Your cart is empty! Add items to proceed
                </p>
              )}
            </div>

            {/* Footer */}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 z-40 flex w-full flex-col gap-4 bg-background">
        <div className="flex w-full items-center justify-between px-4">
          <p className="text-menuprimary text-lg font-bold capitalize tracking-[1px]">
            Your Total Bill
          </p>
          <p className="text-menuprimary text-lg font-bold">
            {"£"} {formattedItemPrice(totalAmount)}
          </p>
        </div>
        <Link href="/checkout" className="">
          <Button
            disabled={
              cartItems.length === 0 ||
              !restaurant?.onlineOrder ||
              (!restaurant?.isDeliveryEnabled && !restaurant.isTakeAwayEnabled)
            }
            className="bg-menuprimary text-menuforeground hover:bg-buttonhover disabled:bg-buttondisabled flex w-full items-center justify-center rounded-none py-8 text-lg font-[700] uppercase tracking-[1px]"
          >
            checkout {"£"} {formattedItemPrice(totalAmount)}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Cart;
