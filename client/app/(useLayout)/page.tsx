import { getBestReviewsApi, getNewReviewsApi } from "@/apis/postApi";
import ReviewerLists from "@/components/main/ReviewerLists";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Home() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["new"],
        queryFn: getNewReviewsApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });
    await queryClient.prefetchQuery({
        queryKey: ["best"],
        queryFn: getBestReviewsApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.banner}>Banner</div>
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <ReviewerLists />
            </HydrationBoundary>
        </div>
    );
}

const styles = {
    container: "w-full",
    banner: "w-full h-[540px] bg-[#F4F6F5] rounded-3xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg bg-contain cursor-pointer",
    bannerImg: "w-full h-full rounded-3xl",
};
