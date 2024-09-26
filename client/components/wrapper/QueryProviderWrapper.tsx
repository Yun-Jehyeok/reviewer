"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

type Props = {
    children: React.ReactNode;
};

export default function QueryProviderWrapper({ children }: Props) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retryOnMount: true,
                refetchOnReconnect: false,
                retry: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools
                initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
            />
        </QueryClientProvider>
    );
}
