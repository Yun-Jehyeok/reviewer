'use client';

import { confirmState } from '@/states/clientStates';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import Confirm from './confirm';
import { bgFixed } from '@/utils/utils';
import LoginModal from './loginModal';
import Link from 'next/link';

export default function Navigation() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useRecoilState(confirmState);

  return (
    <div className="w-full px-20 py-10 flex justify-between items-center">
      <div className="font-extrabold text-2xl">
        <Link href="/">REVIEWERS</Link>
      </div>

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

      {modalOpen ? <LoginModal setModalOpen={setModalOpen} /> : ''}

      {confirm ? <Confirm title="Confirm 메세지" /> : ''}
    </div>
  );
}
