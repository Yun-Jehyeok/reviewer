'use client';

import { authApi } from '@/apis/userApi';
import { userState } from '@/states/userStates';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import { useRecoilState } from 'recoil';

interface AuthenticationWrapperProps {
  children: React.ReactNode;
}

export default function AuthenticationWrapper({
  children,
}: AuthenticationWrapperProps) {
  return <div>{children}</div>;
}
