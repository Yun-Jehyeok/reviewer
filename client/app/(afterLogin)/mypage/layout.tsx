'use client';

import CButton from '@/components/common/CButton';
import { RequestPayParams, RequestPayResponse } from '@/interfaces/portone';
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

  // 결제는 Navigation에 프로필 드랍다운 & 결제 내역에서 충전하도록
  /* 3. 콜백 함수 정의하기 */
  function callback(response: RequestPayResponse) {
    const { success, error_msg } = response;

    console.log('response:::', response);

    if (success) {
      alert('결제 성공');
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  const handlePayment = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp64767037'); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'nice_v2', // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 1000, // 결제금액
      name: '아임포트 결제 데이터 분석', // 주문명
      buyer_name: '홍길동', // 구매자 이름
      buyer_tel: '01012341234', // 구매자 전화번호
      buyer_email: 'example@example.com', // 구매자 이메일
      buyer_addr: '신사동 661-16', // 구매자 주소
      buyer_postcode: '06018', // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

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
