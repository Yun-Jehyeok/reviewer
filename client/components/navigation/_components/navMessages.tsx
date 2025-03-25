'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NavMessages() {
  const router = useRouter();

  const [showMessages, setShowMessages] = useState<boolean>(false);

  const navigateToReview = () => {
    router.push('/mypage/history/review');
  };

  return (
    <button
      className="w-10 h-10 rounded-full border border-gray-200 shadow-md flex justify-center items-center relative"
      onClick={() => setShowMessages(!showMessages)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>

      <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-xs text-white flex justify-center items-center">
        6
      </div>

      {showMessages && (
        <div className="absolute top-[60px] -left-[136px] w-[320px] h-[200px] bg-white z-10 border border-gray-300 shadow-xl rounded-md flex flex-col">
          <div className="flex-1"></div>
          <div
            className="w-full border-t border-gray-300 h-8 text-blue-500 cursor-pointer text-sm flex flex-col justify-center hover:underline"
            onClick={navigateToReview}
          >
            전체 메세지
          </div>
        </div>
      )}
    </button>
  );
}
