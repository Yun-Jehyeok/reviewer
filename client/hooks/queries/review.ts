import { getReviewsApi } from "@/apis/applicationApi";
import { applicationIFC } from "@/interfaces/applicationIFC";
import { useQuery } from "@tanstack/react-query";

export const useGetReviews = (userId: string) => {
    const {
        data: reviews,
        error,
        isPending,
    } = useQuery<applicationIFC[], Error, applicationIFC[], [_1: string, _2: string]>({
        queryKey: ["reviews", userId],
        queryFn: getReviewsApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
        enabled: !!userId,
    });

    return { reviews, error, isPending };
};
