"use client";
import { useEffect, useRef, useState, type FC } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useRestaurant } from "@/context/RestaurantContext";
import type { DayHours, OpenHours } from "@/types/restaurant.type";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TableFormValues } from "./Table-Validation";
import Link from "next/link";
import { formValidation, type FormValues } from "./formValidation";

interface TimeFormProps {
  mainform: UseFormReturn<TableFormValues, undefined>;
  setpage: (value: number | ((page: number) => number)) => void;
}

const TimeForm: FC<TimeFormProps> = ({ mainform, setpage }) => {
  const { restaurant } = useRestaurant();

  const form = useForm<FormValues>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      guests: "",
      time: "",
    },
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const timeref = useRef<(HTMLDivElement | null)[]>([]);
  const [disable, setDisable] = useState(false);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(12);
  const dateValue = form.watch("date");
  function roundToHourIfNeeded(timeString: string) {
    const [hours, minutes] = timeString.split(":").map(Number);

    // Check if minutes are greater than 45, if so, round up
    if (minutes !== undefined && hours !== undefined) {
      if (minutes > 45) {
        return hours + 1;
      }
      return hours;
    }
  }
  useEffect(() => {
    const opening = (restaurant?.openHours as Partial<OpenHours>) ?? {};
    if (dateValue) {
      const day = format(
        new Date(dateValue),
        "EEEE",
      ).toLowerCase() as keyof OpenHours;
      if (day in opening) {
        const hours = (opening[day] as Partial<DayHours>) ?? {};

        const fromTime: string | undefined = hours.timings?.find(
          (item) => item.from,
        )?.from;
        const toTime: string | undefined = hours.timings?.find(
          (item) => item.to,
        )?.to;
        if (toTime) {
          const to = roundToHourIfNeeded(toTime);
          setTo(Number(to));
        }
        if (fromTime) {
          const from = roundToHourIfNeeded(fromTime);
          setFrom(Number(from));
        }
      }
    } else {
      console.log("Date is invalid or undefined");
    }
  }, [dateValue, restaurant?.openHours]);

  const generateTimeSlots = () => {
    const slots = [];
    const currentDate = new Date();
    const isToday = dateValue
      ? new Date(dateValue).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
      : false;

    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    if (from < to) {
      for (let hour = from; hour < to; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          // Skip past times for today
          if (
            isToday &&
            (hour < currentHour ||
              (hour === currentHour && minute <= currentMinute))
          ) {
            continue;
          }

          const time = `${hour}:${minute.toString().padStart(2, "0")}`;
          slots.push(time);
        }
      }
    } else {
      for (let hour = from; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          // Skip past times for today
          if (
            isToday &&
            (hour < currentHour ||
              (hour === currentHour && minute <= currentMinute))
          ) {
            continue;
          }

          const time = `${hour}:${minute.toString().padStart(2, "0")}`;
          slots.push(time);
        }
      }
      for (let hour = 0; hour < to; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          // We don't need to check isToday condition here since this block runs for hours after midnight
          const time = `${hour}:${minute.toString().padStart(2, "0")}`;
          slots.push(time);
        }
      }
    }
    return slots;
  };

  const guestNumbers = Array.from({ length: 15 }, (_, i) => i + 1);

  const onSubmit = (data: FormValues) => {
    mainform.setValue("guests", data.guests);
    mainform.setValue("time", data.time);

    // Fix date handling to prevent timezone issues
    if (data.date instanceof Date) {
      // Create a new date with year, month, day to ensure timezone consistency
      const year = data.date.getFullYear();
      const month = data.date.getMonth();
      const day = data.date.getDate();

      // Create a date object with the time set to noon to avoid timezone shifts
      const fixedDate = new Date(year, month, day, 12, 0, 0);

      mainform.setValue("date", fixedDate);
    } else {
      mainform.setValue("date", data.date);
    }

    setDisable(true);
    setpage(1);
    window.scrollBy({ top: -350, behavior: "smooth" });
  };

  useEffect(() => {
    const selectedTime = form.watch("time");
    const timeSlots = generateTimeSlots();
    const index = timeSlots.indexOf(selectedTime);

    if (index !== -1 && timeref.current[index]) {
      timeref.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [form.watch("time")]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <p className="text-3xl font-semibold text-muted">Book A Table</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center gap-2"
        >
          <div className="grid w-full grid-cols-1 gap-6 border-b-[2px] border-b-muted py-12 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted">No of Guests</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border-muted bg-transparent text-muted placeholder:text-muted">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px]">
                      {guestNumbers.map((num) => (
                        <SelectItem
                          className="text-[#000]"
                          key={num}
                          value={num.toString()}
                        >
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-muted">Date</FormLabel>
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`h-12 w-full justify-start border-muted bg-transparent text-left font-normal text-muted hover:bg-[#000] hover:text-muted`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="text-muted">Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) {
                            // Create a new date with year, month, day to ensure timezone consistency
                            const year = date.getFullYear();
                            const month = date.getMonth();
                            const day = date.getDate();

                            // Create a date object with the time set to noon to avoid timezone shifts
                            const fixedDate = new Date(
                              year,
                              month,
                              day,
                              12,
                              0,
                              0,
                            );

                            field.onChange(fixedDate);
                          } else {
                            field.onChange(date);
                          }
                          setIsPopoverOpen(false);
                        }}
                        initialFocus
                        fromDate={
                          new Date(new Date().setDate(new Date().getDate()))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("date") ? (
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted">Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 border-muted bg-transparent text-muted">
                          <SelectValue
                            placeholder={
                              form.watch("time")
                                ? form.watch("time")
                                : "Select time"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        {generateTimeSlots().map((time) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const now = new Date();
                          now.setMinutes(now.getMinutes() + 120);

                          const formattedNow = now.toTimeString().slice(0, 5);
                          if (
                            today.toString() === form.watch("date").toString()
                          ) {
                            if (time < formattedNow) {
                              return null;
                            }
                          }
                          return (
                            <SelectItem
                              className="text-[#000]"
                              key={time}
                              value={time}
                            >
                              {time}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div></div>
            )}
          </div>
          {form.watch("date") && (
            <div className="flex w-full flex-col gap-4 py-12">
              <p className="text-muted">Choose an available time slot:</p>
              <div className="custom-scrollbar grid h-[250px] grid-cols-2 gap-6 overflow-y-scroll md:grid-cols-4 lg:grid-cols-5">
                {generateTimeSlots().map((time, index) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const now = new Date();
                  now.setMinutes(now.getMinutes() + 120);

                  const formattedNow = now.toTimeString().slice(0, 5);
                  if (today.toString() === form.watch("date").toString()) {
                    if (time < formattedNow) {
                      return null;
                    }
                  }
                  return (
                    <div
                      key={time}
                      ref={(el) => {
                        timeref.current[index] = el;
                      }}
                      onClick={() => form.setValue("time", time)}
                      className={cn(
                        "flex h-full w-full cursor-pointer items-center justify-center border-[1px] border-muted py-4 text-muted",
                        form.watch("time") === time &&
                          "border-[3px] border-popover",
                      )}
                    >
                      {time}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <Button
            className="mt-4 w-fit bg-[#fae9d2] px-6 py-6 font-semibold text-[#000] hover:bg-[#f1d1a5]"
            disabled={disable}
          >
            Book A Table
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TimeForm;
