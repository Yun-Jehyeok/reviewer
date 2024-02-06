'use client';

import { confirmState } from '@/states/clientStates';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Confirm from './common/CConfirm';
import { bgFixed } from '@/utils/utils';
import LoginModal from './login/loginModal';
import Link from 'next/link';
import { userState } from '@/states/userStates';
import CButton from './common/CButton';

export default function Navigation() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useRecoilState(confirmState);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    setIsAuth(user.token !== '');
  }, [user]);

  const handleSignIn = () => {
    setModalOpen(true);
    bgFixed();
  };

  const onClickLogout = () => {
    setShowDropdown(false);
    localStorage.removeItem('token');

    setUser({
      id: '',
      name: '',
      email: '',
      token: '',
    });
  };

  return (
    <div className="w-full py-10 flex justify-between items-center">
      <div className="font-extrabold text-2xl">
        <Link href="/">REVIEWERS</Link>
      </div>

      <div className="flex gap-8 items-center">
        <Link href="/reviewers">리뷰어 목록</Link>
        <button>알림</button>
        <button onClick={() => setConfirm(true)}>메시지</button>
        {isAuth ? (
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full bg-black flex justify-center items-center cursor-pointer hover:bg-gray-800"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>

            {showDropdown && (
              <div className="absolute top-14 -left-[120px]">
                <div className="bg-white rounded-md border border-gray-200 z-10 absolute w-[280px] h-fit shadow-md">
                  <div className="p-8 w-full">
                    <div className="w-full text-center text-xl font-bold mb-4">
                      {user.name}
                    </div>
                    <div className="w-full flex justify-center">
                      <div className="w-24 h-24 rounded-full bg-gray-500"></div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] border border-gray-200"></div>
                  <div className="p-4 py-2 w-full flex justify-end gap-4">
                    <div className="text-sm text-blue-600 cursor-pointer">
                      Mypage
                    </div>
                    <div
                      className="text-sm text-blue-600 cursor-pointer"
                      onClick={onClickLogout}
                    >
                      Logout
                    </div>
                  </div>
                </div>
                <div className="w-3 h-3 rotate-45 bg-white border border-gray-200 absolute -top-1 left-[135px]"></div>
              </div>
            )}
          </div>
        ) : (
          <CButton title="SIGN IN" onClick={handleSignIn} />
        )}
      </div>

      {modalOpen ? <LoginModal setModalOpen={setModalOpen} /> : ''}

      {confirm ? <Confirm title="Confirm 메세지" /> : ''}
    </div>
  );
}
