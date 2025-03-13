import { getPostApi } from "@/apis/postApi";
import { getUserApi } from "@/apis/userApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ReviewerDetailCmp from "./_component/ReviewerDetailCmp";

export default async function ReviewerDetail({ params }: { params: Params }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: getUserApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });
    await queryClient.prefetchQuery({
        queryKey: ["posts", params.id],
        queryFn: getPostApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    return (
        <div className={styles.container}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ReviewerDetailCmp />
            </HydrationBoundary>
        </div>
    );
}

const styles = {
    container: "w-full h-fit flex gap-12",
    left: "w-2/3",
    right: "flex-1",
};
