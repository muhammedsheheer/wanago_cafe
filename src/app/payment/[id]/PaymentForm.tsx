"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { getCurrencySymbol } from "@/lib/get-currency-symbol";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FC } from "react";

const PaymentForm: FC<{
  _id: string;
}> = ({ _id }) => {
  const [loading, setLoading] = useState(false);
  const [totalCharges, setTotalCharges] = useState(0);
  const { restaurant } = useRestaurant();
  const { cartValue } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/${_id}/status`,
      },
    });

    if (error) {
      console.log("[error]", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    let totalcharge = 0;
    restaurant?.charges.map((charge) => {
      if (charge.isActive) {
        if (charge.isPercentage) {
          return (totalcharge += (cartValue() * charge?.value) / 100);
        } else {
          return (totalcharge += charge?.value);
        }
      }
    });
    setTotalCharges(totalcharge);
  }, [restaurant?.charges, cartValue]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4"
    >
      <div className="flex w-full">
        <MoveLeft onClick={() => router.push("/checkout")} />
      </div>
      <div className="flex w-full justify-between px-2 md:px-12">
        <p className="text-lg font-semibold text-menusecondary">Total Amount</p>
        <p className="text-lg font-semibold text-menusecondary">
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
      <PaymentElement
        className="w-full max-w-[400px]"
        options={{
          layout: "tabs",
          business: {
            name: restaurant?.name ?? "",
          },
          terms: {
            card: "always",
          },
        }}
      />
      <Button
        disabled={loading || !stripe || !elements}
        type="submit"
        className="w-full max-w-[400px]"
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default PaymentForm;
