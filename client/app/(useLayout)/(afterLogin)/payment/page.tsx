"use client";

// Library
import { useQueryClient } from "@tanstack/react-query";

// Components
import CInput from "@/components/common/CInput";

// Hooks & Utils
import { useInput } from "@/hooks/useInput";

// Api

// Interface & States
import { userIFC } from "@/interfaces/userIFC";
import PaymentSubmit from "./_component/PaymentSubmit";

export default function Payment() {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<userIFC>(["user"]);

    const price = useInput("0");

    if (!user) return;
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
                            <span className="font-bold">{user.point}</span> 캐시
                        </p>
                    </div>

                    <div className="w-full mb-8">
                        <p className="title font-bold text-xl mb-2">
                            결제 금액
                        </p>
                        <CInput
                            {...price}
                            placeholder="결제하실 금액을 입력해주세요."
                            type="text"
                        />
                    </div>

                    <div className="payment-box payment-method">
                        <div className="title font-bold text-xl mb-2">
                            결제수단
                        </div>
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
                    </div>

                    <div className="mt-8">
                        <p className="title font-bold text-xl mb-2">
                            캐시충전 이용안내
                        </p>
                        <ul className="w-full h-fit overflow-y-auto p-8 rounded-md bg-white flex flex-col gap-4">
                            <li> 모든 상품은 부가세(VAT)포함 가격입니다.</li>
                            <li>
                                캐시는 현금과 동일한 1:1 비율이며, 서비스 사용을
                                위해 자유롭게 사용하실 수 있습니다.
                            </li>
                        </ul>
                    </div>

                    <PaymentSubmit user={user} price={price.value} />
                </div>
            </div>
        </div>
    );
}
