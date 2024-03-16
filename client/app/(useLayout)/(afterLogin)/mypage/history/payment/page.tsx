'use client';

import { useRouter } from 'next/navigation';

const data = [
  { id: 0, date: '2022-02-03', price: '20,000' },
  { id: 1, date: '2019-04-02', price: '40,000' },
  { id: 2, date: '2023-12-12', price: '30,000' },
  { id: 3, date: '2021-11-23', price: '60,000' },
  { id: 4, date: '2012-09-15', price: '100,000' },
  { id: 5, date: '2016-08-19', price: '50,000' },
  { id: 6, date: '2015-07-23', price: '10,000' },
  { id: 7, date: '2020-04-21', price: '10,000' },
];

export default function PayHistory() {
  const router = useRouter();

  const navigateToPayment = () => {
    router.push('/payment');
  };

  return (
    <div className="w-full">
      <div className="text-2xl font-bold mb-8">결제 내역</div>

      <div className="w-full h-[320px] bg-[#F4F6F5] rounded-3xl flex justify-center flex-col">
        <div className="h-fit w-full flex flex-col gap-4">
          <div className="text-[#9b9b9b] text-lg text-center">
            차후 추가 예정입니다.
          </div>
        </div>
      </div>
      {/* <div className="w-full flex justify-end items-center gap-4 mb-2">
        <div>보유 포인트 : 20,000</div>
        <CButton title="충전하기" onClick={navigateToPayment} />
      </div> */}

      {/* <div className="w-full border-t-2 border-black">
        <div className="w-full flex border-b border-gray-200 py-4 font-bold">
          <div className="w-[200px] text-center">결제 일자</div>
          <div className="flex-1 text-center">결제 금액</div>
        </div>

        {data.map((v, i) => {
          return (
            <div
              key={v.id}
              className={`w-full flex pt-4 ${
                i < data.length && 'border-b border-gray-200 pb-4'
              }`}
            >
              <div className="w-[200px] text-center">{v.date}</div>
              <div className="flex-1 text-center">{v.price}</div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
