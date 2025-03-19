"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
    children: React.ReactNode;
    dehydratedState?: unknown;
}

export default function QueryProviderWrapper({ children, dehydratedState }: Props) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    });

    // 서버에서 가져온 데이터를 클라이언트의 캐시에 설정
    if (dehydratedState) {
        queryClient.setQueryData(["user"], dehydratedState);
    }

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
