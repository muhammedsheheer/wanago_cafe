"use client";
import { useState, type FC } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/types/cart-item.type";

interface CartDeletePopupProps {
    children: React.ReactNode;
    item: CartItem;
}

const CartDeletePopup: FC<CartDeletePopupProps> = ({ children, item }) => {
    const [open, setOpen] = useState(false);
    const { removeItem, cartItems } = useCart();
    const name = cartItems.find((items) => items._idMenuItem === item._idMenuItem)?.name;
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="flex w-[90%] flex-col gap-3 bg-menubackground p-0 md:w-full lg:max-h-[625px] lg:max-w-[625px]">
                <DialogHeader className="px-5 py-5">
                    <DialogTitle>
                        <p className="text-menusecondary">Do You Want To Detele &nbsp;{name}</p>
                    </DialogTitle>
                </DialogHeader>
                {/* <div className='px-5'>
                    <div className='bg-black px-5 py-6 rounded-xl'>
                        <p className='font-manrope text-sm flex items-center justify-start gap-1'>
                            This
                        </p>
                    </div>
                </div> */}
                <DialogFooter>
                    <div className="flex w-full items-center justify-center gap-4 px-5 py-5">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="w-1/2 border-[1px] border-menusecondary text-menusecondary hover:bg-menusecondary hover:text-menubackground"
                        >
                            NO
                        </Button>
                        <Button
                            onClick={() => {
                                removeItem(item._idMenuItem, item.modifiers);
                                setOpen(false);
                            }}
                            className="w-1/2 bg-red-600 text-white hover:bg-red-700"
                        >
                            YES
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CartDeletePopup;
