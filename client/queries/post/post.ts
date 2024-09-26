import { getAllPostApi, getPostApi } from "@/apis/postApi";
import { allPostIFC, getAllPostReqIFC, postIFC } from "@/interfaces/postIFC";
import { useQuery } from "@tanstack/react-query";

interface IGetAllPostsReq {
    page: number;
    filter: string;
    langFilter: string;
}

export const useGetAllPost = ({
    page,
    filter,
    langFilter,
}: IGetAllPostsReq) => {
    const { data, error, isLoading } = useQuery<
        allPostIFC,
        Error,
        allPostIFC,
        [_1: string, _2: getAllPostReqIFC]
    >({
        queryKey: ["posts", { page, filter, langFilter }],
        queryFn: getAllPostApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    return { data, error, isLoading };
};

export const useGetPost = (id: string) => {
    const {
        data: post,
        error,
        isPending,
    } = useQuery<postIFC, Error, postIFC, [_1: string, _2: string]>({
        queryKey: ["posts", id],
        queryFn: getPostApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    return { post, error, isPending };
};
