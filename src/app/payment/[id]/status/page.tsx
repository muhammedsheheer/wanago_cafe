"use client";
import type { RefreshPayment } from "@/types/refresh-payment.type";
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import Image from "next/image";
import Failed from "./Failed";
import Success from "./Success";

const PaymentStatusPage = (props: {
    params: {
        id: string;
    };
}) => {
    const params = props.params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const { data } = useQuery({
        queryKey: ["stripe", params.id, "refresh-payment"],
        queryFn: async () => {
            return await axios.get(`${apiUrl}/stripe/${params.id}/refresh-payment`).then(
                (
                    res: AxiosResponse<{
                        data: RefreshPayment;
                    }>
                ) => res.data.data
            );
        },
        enabled: !!params.id,
    });
    if (!data) {
        return (
            <main className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-2">
                <p className="text-4xl font-[600] tracking-[2px] text-menuprimary">Placing your order...</p>
                <Image src="/images/payment/loading.png" width={147} height={147} alt="loading" />
            </main>
        );
    }
    return (
        <main className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-2 bg-menubackground">
            {data.onlinePayemtInfo[0]?.status === "FAILED" ? <Failed /> : <Success data={data} id={params.id} />}
        </main>
    );
};

export default PaymentStatusPage;
