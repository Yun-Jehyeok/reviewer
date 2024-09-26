import { getUserApi } from "@/apis/userApi";
import { userIFC } from "@/interfaces/userIFC";
import { useQuery } from "@tanstack/react-query";

export const useGetUserQuery = () => {
    const {
        data: user,
        error,
        isPending,
    } = useQuery<userIFC, Error, userIFC, [_1: string]>({
        queryKey: ["user"],
        queryFn: getUserApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    return { user, error, isPending };
};
