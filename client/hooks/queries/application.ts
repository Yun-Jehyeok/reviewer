import { getApplicationsApi } from "@/apis/applicationApi";
import { applicationIFC } from "@/interfaces/applicationIFC";
import { useQuery } from "@tanstack/react-query";

interface IGetApplicationsReq {
    userId: string;
}

export const useGetApplicationsQuery = ({ userId }: IGetApplicationsReq) => {
    const {
        data: reviews,
        error,
        isPending,
    } = useQuery<applicationIFC[], Error, applicationIFC[], [_1: string, _2: string]>({
        queryKey: ["applications", userId],
        queryFn: getApplicationsApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
        enabled: !!userId, // user가 존재할 때만 쿼리 실행
    });

    return { reviews, error, isPending };
};
