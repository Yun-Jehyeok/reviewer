'use client';

import CButton from '@/components/common/CButton';
import { userState } from '@/states/userStates';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [user, setUser] = useRecoilState(userState);
  const [tabs, setTabs] = useState([
    { id: 0, value: 'profile', title: '프로필', checked: true, url: '/mypage' },
    {
      id: 1,
      value: 'apply',
      title: '리뷰 신청 내역',
      checked: false,
      url: '/mypage/history/apply',
    },
    {
      id: 2,
      title: '리뷰 내역',
      value: 'review',
      checked: false,
      url: '/mypage/history/review',
    },
    {
      id: 3,
      title: '결제 내역',
      value: 'payment',
      checked: false,
      url: '/mypage/history/payment',
    },
  ]);

  const router = useRouter();

  const navigateToUpdateUser = () => {};

  const onClickTab = (e: React.MouseEvent<HTMLDivElement>) => {
    let val = e.currentTarget.dataset.value;

    let tmpTabs = tabs.map((v) => {
      return { ...v, checked: v.value === val };
    });

    setTabs(tmpTabs);
    let url = tmpTabs.filter((v) => v.checked)[0].url;
    router.push(url);
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-50 rounded-sm p-16">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-8">
            <div className="w-32 h-32 rounded-full bg-gray-500"></div>
            <div className="flex flex-col justify-center gap-2">
              <div className="text-2xl font-bold">윤제혁</div>
              <div className="text-sm text-gray-500">한 줄 소개</div>
            </div>
          </div>
          <CButton title="프로필 수정" onClick={navigateToUpdateUser} />
        </div>
      </div>

      <div className="w-full flex mt-12 gap-8">
        <div className="w-[240px] text-xl flex flex-col">
          {tabs.map((v) => (
            <div
              key={v.id}
              data-value={v.value}
              className={`px-8 py-4 hover:bg-gray-100 cursor-pointer rounded-md ${
                v.checked && 'font-bold'
              }`}
              onClick={onClickTab}
            >
              {v.title}
            </div>
          ))}
        </div>

        <div className="flex-1 border-l border-gray-200 pl-12 pr-8">
          {/* <CButton title="결제하기" onClick={handlePayment} /> */}
          {children}
        </div>
      </div>
    </div>
  );
}
