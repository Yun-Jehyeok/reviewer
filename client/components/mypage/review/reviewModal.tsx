'use client';

import { applicationIFC } from '@/interfaces/applicationIFC';
import { cancelBgFixed } from '@/utils/utils';
import { useState } from 'react';
import ApplicationContent from './applicationContent';
import CancelContent from './cancelContent';
import CompleteContent from './completeContent';
import ProceedingContent from './proceedingContent';

export default function ReviewModal({
  item,
  setModalOpen,
}: {
  item: applicationIFC;
  setModalOpen: (status: boolean) => void;
}) {
  // 대기중, 진행중, 완료, 취소에 대해서 케이스 나눠서 작업
  // 대기중 : 신청자 정보, 신청하기 버튼
  // 진행중 : 신청자 닉네임(클릭 시, 유저 정보로), 채팅, 화상채팅으로 넘어가는 버튼, 종료 버튼
  // 완료 : 신청자 닉네임(클릭 시, 유저 정보로), 날짜, 채팅 내역들
  // 취소 : 신청자 닉네임(클릭 불가), 취소일
  const [status, setStatus] = useState<string>(item.status);
  const [width, setWidth] = useState<string>('480px');

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden">
      <div
        className={`relative w-[${width}] h-fit py-12 bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex`}
      >
        <div className="w-full h-full px-12 flex justify-center flex-col">
          <div className="mb-8 flex justify-between w-full items-center">
            <div className="text-3xl font-bold">상세</div>
            <div className="w-fit h-fit text-sm rounded-full py-1 px-4 border border-green-200 bg-green-100">
              {status === 'application' && '리뷰 대기중'}
              {status === 'proceeding' && '진행중'}
              {status === 'complete' && '완료'}
              {status === 'cancel' && '취소'}
            </div>
          </div>

          {/* 리뷰 대기중 */}
          {status === 'application' && (
            <ApplicationContent item={item} setStatus={setStatus} />
          )}

          {/* 진행중 */}
          {status === 'proceeding' && (
            <ProceedingContent item={item} setModalOpen={setModalOpen} />
          )}

          {/* 완료 */}
          {status === 'complete' && <CompleteContent />}

          {/* 취소 */}
          {status === 'cancel' && <CancelContent />}
        </div>

        <div
          className={`absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all`}
          onClick={() => {
            setModalOpen(false);
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
  );
}
