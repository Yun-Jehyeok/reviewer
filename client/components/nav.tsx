'use client';

import { confirmState } from '@/states/clientStates';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Confirm from './common/CConfirm';
import { bgFixed } from '@/utils/utils';
import LoginModal from './login/loginModal';
import Link from 'next/link';
import { userState } from '@/states/userStates';
import { useMutation } from 'react-query';
import { authApi } from '@/apis/userApi';

export default function Navigation() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useRecoilState(confirmState);

  const [user, setUser] = useRecoilState(userState);
  // const [token, setToken] = useState<string | null>();

  // const authMutation = useMutation(authApi, {
  //   onMutate: (variable) => {
  //     console.log('onMutate', variable);
  //   },
  //   onError: (error, variable, context) => {
  //     console.error('signinErr:::', error);
  //   },
  //   onSuccess: (data, variables, context) => {
  //     console.log('signinSuccess', data, variables, context);
  //     if (data.success) {
  //       console.log('인증');
  //       setUser({ ...data.user, token: data.token });
  //       setToken(data.token);
  //     }
  //   },
  //   onSettled: () => {
  //     console.log('signinEnd');
  //   },
  // });

  // authMutation.mutate({ id: user.id });

  return (
    <div className="w-full py-10 flex justify-between items-center">
      <div className="font-extrabold text-2xl">
        <Link href="/">REVIEWERS</Link>
      </div>

      <div className="flex gap-12 items-center">
        <Link href="/reviewers">리뷰어 목록</Link>
        <button>FASHION</button>
        <button>FAVOURITE</button>
        <button onClick={() => setConfirm(true)}>LIFESTYLE</button>
        <button
          className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800"
          onClick={() => {
            setModalOpen(true);
            bgFixed();
          }}
        >
          SIGN IN
        </button>
      </div>

      {modalOpen ? <LoginModal setModalOpen={setModalOpen} /> : ''}

      {confirm ? <Confirm title="Confirm 메세지" /> : ''}
    </div>
  );
}
