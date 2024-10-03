import { getPaymentsApi } from "@/apis/paymentApi";
import { HistoryPaymentIFC } from "@/interfaces/paymentIFC";
import { useQuery } from "@tanstack/react-query";

interface IGetPaymentsReq {
    page: number;
    userId: string;
    purpose: string;
}

export const useGetPayments = ({ page, userId, purpose }: IGetPaymentsReq) => {
    const { data, error, isPending } = useQuery<HistoryPaymentIFC, Error, HistoryPaymentIFC, [_1: string, _2: number, _3: string, _4: string]>({
        queryKey: ["payments", page, userId, purpose],
        queryFn: getPaymentsApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
        enabled: !!userId,
    });

    return { data, error, isPending };
};
