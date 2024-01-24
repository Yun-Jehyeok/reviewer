'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface QueryProviderWrapperProps {
  children: React.ReactNode;
}

export default function QueryProviderWrapper({
  children,
}: QueryProviderWrapperProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
