"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios, { type AxiosError } from "axios";
import {
  TableBookingValidation,
  type TableFormValues,
} from "./Table-Validation";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import TimeForm from "./TimeForm";
import CustomerDetails from "./CustomerDetails";
import { useRouter } from "next/navigation";

export default function TableBookingForm() {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const form = useForm<TableFormValues>({
    resolver: zodResolver(TableBookingValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: "",
      time: "",
      request: "",
    },
  });

  const bookTableMutation = useMutation({
    mutationFn: async (values: TableFormValues) => {
      // Create a copy of the values to avoid mutating the original
      const adjustedValues = { ...values };

      // Fix the date timezone issue
      if (adjustedValues.date instanceof Date) {
        // Create a new date with the year, month, and day to prevent timezone issues
        const year = adjustedValues.date.getFullYear();
        const month = adjustedValues.date.getMonth();
        const day = adjustedValues.date.getDate();

        // Create new date with the exact date components and set time to noon to avoid any timezone shifts
        const fixedDate = new Date(year, month, day, 12, 0, 0);

        // Replace the date in the values
        adjustedValues.date = fixedDate;
      }

      return await axios.post("/api/table-booking", adjustedValues);
    },
    onSuccess: () => {
      toast(
        (t) => (
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-center">
              Your reservation request has been successfully submitted to the
              restaurant!
            </p>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                form.reset();
                router.push("/");
              }}
              className="rounded bg-popover px-4 py-2 text-[#000]"
            >
              OK
            </button>
          </div>
        ),
        { duration: Infinity },
      );
    },
    onError: (error) => {
      // Type assertion to access the response data
      const axiosError = error as AxiosError<{ error: string }>;

      if (axiosError.response?.data?.error) {
        // Display the specific error message from the API
        toast.error(axiosError.response.data.error, {
          duration: 5000,
        });
      } else {
        // Generic error message as fallback
        toast.error(
          "There was a problem submitting your booking. Please try again.",
          { duration: 5000 },
        );
      }
    },
  });

  const onSubmit = (values: TableFormValues) => {
    bookTableMutation.mutate(values);
  };

  return (
    <div className="w-full space-y-6 px-4">
      {page === 0 ? (
        <TimeForm mainform={form} setpage={setPage} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CustomerDetails
              form={form}
              bookTableMutation={bookTableMutation}
              setpage={setPage}
            />
          </form>
        </Form>
      )}
    </div>
  );
}
