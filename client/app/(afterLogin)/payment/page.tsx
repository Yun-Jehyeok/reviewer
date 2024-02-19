'use client';

import CInput from '@/components/common/CInput';
import { useInput } from '@/hooks/useInput';
import { RequestPayParams, RequestPayResponse } from '@/interfaces/portone';
import { userState } from '@/states/userStates';
import { bgFixed, cancelBgFixed } from '@/utils/utils';
import { useRecoilState } from 'recoil';

export default function Payment() {
  const [user, setUser] = useRecoilState(userState);

  const price = useInput(0);

  function callback(response: RequestPayResponse) {
    cancelBgFixed();

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
    bgFixed();

    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp64767037'); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'nice_v2', // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: Number(price.value), // 결제금액
      name: 'Reviwer 포인트 결제', // 주문명
      buyer_name: user.name, // 구매자 이름
      buyer_tel: '01012341234', // 구매자 전화번호
      buyer_email: user.email, // 구매자 이메일
      buyer_addr: '신사동 661-16', // 구매자 주소
      buyer_postcode: '06018', // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  return (
    <div className="w-full">
      <h1 className="page-title text-4xl font-extrabold text-center my-8">
        캐시 충전
      </h1>

      <div className="w-full flex justify-center">
        <div className="w-[600px] h-fit p-16 bg-gray-50 rounded-3xl">
          <div className="w-full flex justify-between mb-8 text-xl border-b border-gray-200 pb-4">
            <p className="font-bold">보유 캐시</p>
            <p>
              <span className="font-bold">0</span> 캐시
            </p>
          </div>
          <div className="w-full mb-8">
            <p className="title font-bold text-xl mb-2">결제 금액</p>
            <CInput
              {...price}
              placeholder="결제하실 금액을 입력해주세요."
              type="text"
            />
          </div>
          <div className="payment-box payment-method">
            <div className="title font-bold text-xl mb-2">결제수단</div>
            <div className="bg-white flex items-center pl-4 border border-gray-200 rounded-sm cursor-pointer mb-2">
              <input
                checked
                id="card"
                type="radio"
                value=""
                name="payment-type"
                readOnly
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                                        focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="card"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                신용카드
              </label>
            </div>
            <div className="bg-white flex items-center pl-4 border border-gray-200 rounded-sm cursor-pointer">
              <input
                id="phone"
                type="radio"
                value=""
                name="payment-type"
                readOnly
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                                        focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="phone"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                휴대폰
              </label>
            </div>
          </div>
          <div className="mt-8">
            <p className="title font-bold text-xl mb-2">캐시충전 이용안내</p>
            <ul className="w-full h-[200px] overflow-y-auto p-8 rounded-md bg-white flex flex-col gap-4">
              <li> 모든 상품은 부가세(VAT)포함 가격입니다.</li>
              <li>
                캐시는 현금과 동일한 1:1 비율이며, 서비스 사용을 위해 자유롭게
                사용하실 수 있습니다.
              </li>
              <li>
                캐시를 정기 충전하시면 상품에 따라 일정량의 보너스 캐시가
                지급됩니다.
              </li>
              <li>
                캐시는 세금계산서 발행 대상이 아닙니다. 구매 후 신용카드
                전표/휴대폰 결제 영수증은 개인소득공제용으로만 사용하실 수
                있습니다.
              </li>
              <li>
                환불 가능 기간은 충전일로부터 5년까지이며, 환불 시 보너스 캐시는
                자동으로 차감됩니다.
              </li>
              <li> 충전캐시의 유효기간은 충전일로부터 5년입니다.</li>
              <li> 보너스캐시의 유효기간은 충전일로부터 180일입니다.</li>
            </ul>
          </div>

          <button
            className="w-full bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800 mt-12"
            onClick={handlePayment}
          >
            충전하기
          </button>
        </div>
      </div>
    </div>
  );
}
