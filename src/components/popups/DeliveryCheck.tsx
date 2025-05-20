import { useEffect, useState, type FC } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRestaurant } from "@/context/RestaurantContext";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

interface DeliveryCheckProps {
    setOrderType: (orderType: 2 | 3) => void;
    children?: React.ReactNode;
}

const FormValidation = z.object({
    pinCode: z.string().min(2, "please enter pincode"),
});

type FormData = z.infer<typeof FormValidation>;

const DeliveryCheck: FC<DeliveryCheckProps> = ({ setOrderType, children }) => {
    const [open, setOpen] = useState(false);
    const { restaurant } = useRestaurant();
    // const [success, setSuccess] = useState(false);
    // const [error, setError] = useState(false);
    const { apiUrl, restaurantID } = useRestaurant();
    const form = useForm<FormData>({
        resolver: zodResolver(FormValidation),
        defaultValues: {
            pinCode: "",
        },
    });
    useEffect(() => {
        if (!restaurant?.isTakeAwayEnabled && restaurant?.isDeliveryEnabled) {
            setOpen(true);
        }
    }, []);
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: FormData) => {
            const res: AxiosResponse<{
                data: {
                    _id: string;
                };
            }> = await axios.post(`${apiUrl}/orders/delivery-check`, {
                _idRestaurant: restaurantID,
                postcode: data.pinCode,
            });
            return res.data.data;
        },
        onSuccess: () => {
            toast("Good news! We deliver to your postcode!");
            // setSuccess(true);
            // setError(false);
            setOrderType(2);
            setOpen(false);
        },
        onError: () => {
            toast.error("Oops! Delivery isn’t available here. But you can still place an order for pickup!");
            // setError(true);
            // setSuccess(false);
        },
    });
    useEffect(() => {
        if (!open) {
            form.reset();
            // setSuccess(false);
            // setError(false);
        }
    }, [open]);

    const onSubmit = (data: FormData) => {
        mutate(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {restaurant?.isDeliveryEnabled && restaurant.isTakeAwayEnabled && <DialogTrigger asChild>{children}</DialogTrigger>}
            <DialogContent className="flex w-[90%] flex-col gap-3 rounded-none border-none bg-menubackground p-0 md:w-full lg:h-[305px] lg:max-w-[465px]">
                <DialogHeader className="px-5 py-5">
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <p className="w-full text-center text-2xl font-[300] text-menusecondary">Check Delivery </p>
                    <p className="font-manrope flex max-w-[60%] text-center text-sm font-[300]">Enter your postcode below to check if delivery is available in your area.</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-start justify-center">
                            <FormField
                                control={form.control}
                                name="pinCode"
                                render={({ field }) => (
                                    <FormItem className="w-full lg:w-2/5">
                                        <FormControl>
                                            <Input
                                                placeholder="Post code"
                                                {...field}
                                                className="h-12 rounded-none border-none bg-inputbg outline-none focus-visible:border-b-[2px] focus-visible:ring-0"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isPending} className="h-12 rounded-none">
                                CHECK
                            </Button>
                        </form>
                    </Form>
                    {/* {success && (
                        <p className='font-manrope text-sm flex text-center max-w-[70%] font-[300] text-menuprimary'>
                            Good news! We deliver to your postcode!
                        </p>
                    )
                    }
                    {error && (
                        <p className='font-manrope text-sm flex text-center max-w-[70%] font-[300] text-red-600'>
                            Oops! Delivery isn’t available here. But you can still place an order for pickup!
                        </p>
                    )} */}
                </div>
                <DialogFooter>
                    {/* <div className='w-full flex items-center justify-center gap-4 py-5 px-5'>
                        <Button variant='outline' onClick={() => setOpen(false)} className='w-1/2 text-menusecondary hover:bg-menusecondary hover:text-menubackground'>NO</Button>
                        <Button onClick={() => {
                            setOpen(false)
                        }} className='w-1/2 text-white bg-red-600 hover:bg-red-700'>YES</Button>
                    </div> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeliveryCheck;
