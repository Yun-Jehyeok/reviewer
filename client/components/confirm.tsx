'use client';

import { useRecoilState } from 'recoil';
import { confirmState } from '@/states/clientStates';
import { useEffect } from 'react';
import { bgFixed, cancelBgFixed } from '@/utils/utils';

interface IConfirm {
  title: String;
}

export default function Confirm({ title }: IConfirm) {
  const [confirm, setConfirm] = useRecoilState(confirmState);

  useEffect(() => {
    bgFixed();

    return () => {
      cancelBgFixed();
    };
  }, []);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden">
      <div className="relative w-1/6 h-1/6 bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex flex-col justify-center">
        <div className="w-fit h-fit mx-auto my-0">
          <div className="mb-6 text-center text-2xl">{title}</div>

          <div className="w-full flex justify-center">
            <button
              className="w-36 h-12 rounded-full text-white bg-black hover:bg-gray-800"
              onClick={() => setConfirm(false)}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
