import { Icons } from "@/components/Icon";
import ScheduleTImePopup from "@/components/popups/ScheduleTimePopup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { calculateServiceCharge } from "@/lib/calculate-service-charge";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { format } from "date-fns";
import { Calendar, CalendarClock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FormValidation = z.object({
  name: z
    .string()
    .min(
      2,
      "Oops! We need your name to personalise your delicious order. Please enter it to continue.",
    ),
  phone: z
    .string()
    .min(
      11,
      "Oops! That phone number doesn’t seem right. We need it to keep you updated on your order.",
    )
    .max(
      11,
      "Oops! That phone number doesn’t seem right. We need it to keep you updated on your order.",
    ),
  email: z
    .string()
    .min(
      2,
      "Oops! That email doesn’t look right. We need it to send you your delicious meal details.",
    )
    .email(),
  address: z.string().min(2, "please enter address"),
  city: z.string().min(2, "please enter city"),
  pinCode: z.string().min(2, "please enter pincode"),
  notes: z.string().optional(),
});

interface ScheduleTime {
  time: string; // Change to the appropriate type
  date: string; // Change to the appropriate type (e.g., Date, string, etc.)
}

interface errordata {
  response: {
    data: {
      success: boolean;
      code: number;
      msg: string;
    };
  };
}

type FormData = z.infer<typeof FormValidation>;

type DeliveryData = {
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  address?: string;
  city?: string;
  pinCode?: string;
  scheduleTime: {
    time?: string;
    date?: string;
  };
  pickup: string;
};

const Delivery = () => {
  const { apiUrl, restaurantID, restaurant } = useRestaurant();
  const { cartValue } = useCart();
  const router = useRouter();
  const { cartItems } = useCart();
  const parsedPickup = JSON.parse(
    localStorage.getItem("delivery") as string,
  ) as DeliveryData;
  const [pickup, setPickUp] = useState<string>(
    parsedPickup?.pickup ? parsedPickup.pickup : "Standard",
  );
  const [scheduleTime, setScheduleTime] = useState<ScheduleTime>({
    time: "",
    date: "",
  });

  const form = useForm<FormData>({
    resolver: zodResolver(FormValidation),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const res: AxiosResponse<{
        data: {
          _id: string;
        };
      }> = await axios.post(`${apiUrl}/orders`, {
        _idRestaurant: restaurantID,
        orderType: 2,
        deliveryType: pickup === "Standard" ? "standard" : "scheduled",
        deliveryTime:
          pickup === "Standard"
            ? new Date(Date.now() + 20 * 60000).toISOString()
            : new Date(
                `${scheduleTime.date},${scheduleTime.time.split("-")[0]}`,
              ).toISOString(),
        description: "Order for " + data.name,
        orderStatus: "placed_order",
        items: cartItems,
        notes: data.notes,
        userDetails: {
          name: data.name,
          email: data.email,
          phone: {
            number: data.phone,
          },
          address: {
            shipping: {
              address: data.address,
              pincode: data.pinCode,
              city: data.city,
            },
            billing: {
              address: data.address,
              pincode: data.pinCode,
              city: data.city,
            },
          },
        },
        // New Additions
        tip: 0,
        serviceCharge: calculateServiceCharge(
          cartValue(),
          restaurant?.serviceCharge ?? 0,
        ),
        preview: false,
      });

      return res.data.data;
    },
    onSuccess: (data) => {
      toast("Order created successfully");
      router.push("/payment/" + data._id);
    },
    onError: (error: errordata) => {
      toast.error(error?.response?.data?.msg);
    },
  });

  useEffect(() => {
    const localpickup = localStorage.getItem("delivery");
    if (localpickup) {
      // form.setValue('name')
      const parsedPickup = JSON.parse(localpickup) as DeliveryData;
      form.setValue("name", parsedPickup.name as string);
      form.setValue("phone", parsedPickup.phone as string);
      form.setValue("email", parsedPickup.email as string);
      form.setValue("notes", parsedPickup.notes as string);
      form.setValue("address", parsedPickup.address as string);
      form.setValue("city", parsedPickup.city as string);
      form.setValue("pinCode", parsedPickup.pinCode as string);
      if (parsedPickup.pickup) {
        setPickUp(parsedPickup.pickup);
        console.log(parsedPickup.pickup, "====parsedPickup");
        if (parsedPickup.pickup === "Standard") {
          setScheduleTime({
            date: "",
            time: "",
          } as ScheduleTime);
        }
      }
      if (
        (parsedPickup?.scheduleTime as ScheduleTime) &&
        parsedPickup?.scheduleTime?.date &&
        parsedPickup.scheduleTime.time &&
        parsedPickup.scheduleTime.date.length > 0 &&
        parsedPickup.scheduleTime.time.length > 0
      ) {
        setScheduleTime({
          date: parsedPickup.scheduleTime.date,
          time: parsedPickup.scheduleTime.time,
        } as ScheduleTime);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "delivery",
      JSON.stringify({
        name: form.watch("name"),
        phone: form.watch("phone"),
        email: form.watch("email"),
        notes: form.watch("notes"),
        address: form.watch("address"),
        city: form.watch("city"),
        pinCode: form.watch("pinCode"),
        scheduleTime: {
          time: scheduleTime.time,
          date: scheduleTime.date,
        },
        pickup: pickup,
      }),
    );
  }, [
    form.watch("name"),
    scheduleTime,
    form.watch("phone"),
    form.watch("email"),
    form.watch("notes"),
    form,
    pickup,
  ]);

  const onSubmit = (data: FormData) => {
    mutate(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="border-borderinput flex w-full flex-col items-start justify-between gap-3 border-b-[2px] py-3 pb-5">
            <p className="text-menuprimary-foreground w-full text-xl font-semibold">
              Delivery Time
            </p>
            <div className="flex w-full flex-col gap-3 px-1 py-1">
              <div
                className={cn(
                  "border-borderinput flex w-full items-center gap-3 border-[2px] px-4 py-3 lg:w-2/3",
                  pickup === "Standard" && "border-menuprimary",
                )}
                onClick={() => setPickUp("Standard")}
              >
                <Calendar />
                <div className="flex flex-col">
                  <p className="text-menusecondary text-lg font-semibold">
                    Standard
                  </p>
                  <p className="text-menuprimary-foreground">
                    {restaurant?.busyMode
                      ? restaurant?.deliveryETA + restaurant.busyModeTime
                      : restaurant?.deliveryETA}{" "}
                    min
                  </p>
                </div>
              </div>
              <ScheduleTImePopup
                setScheduleTime={setScheduleTime}
                orderType="Delivery"
              >
                <div
                  className={cn(
                    "border-borderinput flex w-full items-center gap-3 border-[2px] px-4 py-3 lg:w-2/3",
                    pickup === "Schedule" && "border-menuprimary",
                  )}
                  onClick={() => setPickUp("Schedule")}
                >
                  <CalendarClock />
                  <div className="flex flex-col">
                    <p className="text-menusecondary text-lg font-semibold">
                      Schedule
                    </p>
                    <p className="text-menuprimary-foreground">
                      {scheduleTime.date || scheduleTime.time ? (
                        <>
                          {scheduleTime.date &&
                          !isNaN(Date.parse(scheduleTime.date))
                            ? format(new Date(scheduleTime.date), "dd-MM-yyyy")
                            : ""}
                          {scheduleTime.date && scheduleTime.time
                            ? ",\u00A0"
                            : ""}
                          {scheduleTime.time}
                        </>
                      ) : (
                        "Choose a time"
                      )}
                    </p>
                  </div>
                </div>
              </ScheduleTImePopup>
            </div>
          </div>

          <div className="border-b-borderinput flex flex-col gap-4 border-b-[2px] pb-7 pt-7">
            <div className="w-full lg:w-2/6">
              <p className="text-menuprimary-foreground text-lg font-semibold">
                Contact Details
              </p>
            </div>
            <div className="flex w-full flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="border-b-borderinput bg-inputbg placeholder:text-placeholder focus-visible:border-b-menuprimary h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 outline-none focus-visible:border-b-[2px] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        {...field}
                        className="border-b-borderinput bg-inputbg placeholder:text-placeholder focus-visible:border-b-menuprimary h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 outline-none focus-visible:border-b-[2px] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="Email ID"
                        {...field}
                        className="border-b-borderinput bg-inputbg placeholder:text-placeholder focus-visible:border-b-menuprimary h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 outline-none focus-visible:border-b-[2px] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="border-b-borderinput flex flex-col gap-4 border-b-[2px] pb-7 pt-7">
            <div className="w-full lg:w-2/6">
              <p className="text-menuprimary-foreground text-lg font-semibold">
                Delivery Address
              </p>
            </div>
            <div className="flex w-full flex-col gap-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="Building/House/flat No/floor"
                        {...field}
                        className="border-b-borderinput bg-inputbg placeholder:text-placeholder focus-visible:border-b-menuprimary h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 outline-none focus-visible:border-b-[2px] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="City"
                        {...field}
                        className="border-b-borderinput bg-inputbg placeholder:text-placeholder focus-visible:border-b-menuprimary h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 outline-none focus-visible:border-b-[2px] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pinCode"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="PostCode"
                        {...field}
                        className="border-b-borderinput bg-inputbg placeholder:text-placeholder focus-visible:border-b-menuprimary h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 outline-none focus-visible:border-b-[2px] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-2">
                    <FormLabel className="text-menusecondary flex cursor-pointer items-center gap-2 pt-10">
                      <Icons.pencil />
                      Packing/Delivery Instructions
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        className="bg-inputbg placeholder:text-placeholder border-none lg:w-4/5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex w-full flex-col pt-7 lg:w-4/5 lg:flex-row">
            <div className="border-t-borderinput fixed bottom-0 left-0 flex w-full flex-col gap-2 border-t-[1px] bg-background md:static md:px-0 md:py-0">
              <Button
                className="bg-menuprimary text-menuforeground hover:bg-buttonhover h-16 w-full rounded-none text-lg font-bold uppercase tracking-[1px]"
                disabled={isPending}
              >
                Place Delivery Order
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Delivery;
