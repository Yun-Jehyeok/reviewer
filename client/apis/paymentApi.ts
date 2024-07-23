// Library
import { QueryFunction } from "@tanstack/react-query";

// Utils
import { Apis } from "@/utils/api";

// Interface
import { HistoryPaymentIFC } from "@/interfaces/paymentIFC";

export const getPaymentsApi: QueryFunction<HistoryPaymentIFC, [_1: string, _2: number, _3: string, _4: string]> = async ({ queryKey }) => {
    const [_1, page, id, purpose] = queryKey;

    const payload = { id, purpose };
    const res = await Apis.post(`/payment/skip/${page}`, payload);

    console.log("Payment History Response >>>> ", res);
    if (!res.success) {
        throw new Error("Failed to fetch data");
    }

    return { payments: res.data };
};
