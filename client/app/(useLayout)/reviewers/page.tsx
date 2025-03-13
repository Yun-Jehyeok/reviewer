import { getAllPostApi } from "@/apis/postApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ReviewerLists from "./_components/ReviewerLists";

export default async function Reviewers() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["posts", { page: 1, filter: "registerDate", langFilter: "all" }],
        queryFn: getAllPostApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    return (
        <div className="w-full">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ReviewerLists />
            </HydrationBoundary>
        </div>
    );
}
