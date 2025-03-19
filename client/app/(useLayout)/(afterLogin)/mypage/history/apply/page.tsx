import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getApplicationsApi } from "@/apis/applicationApi";
import { getUserApi } from "@/apis/userApi";
import ApplyHistoryClient from "./_components/ApplyHistory";
import { redirect } from "next/navigation";

export default async function ApplyHistory() {
    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery({
            queryKey: ["applications", "userId"],
            queryFn: getApplicationsApi,
        });
    } catch (error) {
        console.error("ApplyHistory Error >>>> ", error);
        // redirect("/");
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ApplyHistoryClient />
        </HydrationBoundary>
    );
}
