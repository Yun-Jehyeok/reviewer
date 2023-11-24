'use client';

import { confirmState } from '@/states/clientStates';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import Confirm from './confirm';
import { bgFixed, cancelBgFixed } from '@/utils/utils';

export default function Navigation() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useRecoilState(confirmState);

  return (
    <div className="w-full px-20 py-10 flex justify-between items-center">
      <div className="font-extrabold text-2xl">REVIEWERS</div>

      <div className="flex gap-12 items-center">
        <button>CATALOGUE</button>
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

      {modalOpen ? (
        <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden">
          <div className="relative w-2/3 h-2/3 bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex">
            <div className="w-1/2 h-full bg-[#F4F6F5] rounded-xl"></div>
            <div className="w-1/2 h-full p-6">Login</div>

            <div
              className={`absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all`}
              onClick={() => {
                setModalOpen(!modalOpen);
                cancelBgFixed();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {confirm ? <Confirm title="Confirm 메세지" /> : ''}
    </div>
  );
}
