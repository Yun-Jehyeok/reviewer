"use client";

// Library

// Components
import CInput from "@/components/common/CInput";

// Hooks & Utils
import { useInput } from "@/hooks/useInput";

// Api

// Interface & States
import CSpinner from "@/components/common/CSpinner";
import { useGetUserQuery } from "@/hooks/queries/user";
import PaymentSubmit from "./_component/PaymentSubmit";

export default function Payment() {
    const { user, error, isPending } = useGetUserQuery();

    const price = useInput("0");

    if (!user) return isPending ? <CSpinner /> : null;
    return (
        <div className="w-full">
            <h1 className="page-title text-3xl font-bold mb-8 mt-[5.5rem] border-b border-gray-200 pb-4">캐시 충전</h1>

            <div className="flex flex-col gap-12">
                <div className="flex bg-slate-50 py-8 px-12 rounded-lg">
                    <div className="flex flex-1 text-lg items-center">
                        <div className="title font-bold mr-12">보유 캐시</div>
                        <div className="flex-1">{user.point}</div>
                    </div>
                    <div className="flex flex-1 text-lg items-center">
                        <div className="title font-bold mr-12">결제 금액</div>
                        <div className="flex-1">
                            <CInput {...price} placeholder="결제하실 금액을 입력해주세요." type="text" />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="title font-bold text-xl mb-2">결제 수단</p>
                    <div className="grid grid-cols-3 gap-4">
                        {["신용카드", "휴대폰결제", "카카오페이"].map((v) => {
                            return (
                                <button key={v} className="h-12 border border-gray-200">
                                    {v}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <p className="title font-bold text-xl mb-2">캐시충전 이용안내</p>
                    <ul className="p-6 border border-gray-200 rounded-md">
                        <li> 모든 상품은 부가세(VAT)포함 가격입니다.</li>
                        <li>캐시는 현금과 동일한 1:1 비율이며, 서비스 사용을 위해 자유롭게 사용하실 수 있습니다.</li>
                    </ul>
                </div>
            </div>

            <PaymentSubmit user={user} price={price.value} />
        </div>
    );
}
