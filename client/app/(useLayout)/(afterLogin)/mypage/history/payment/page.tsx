"use client";

// Library
import { userState } from "@/states/userStates";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

// Components
import CButton from "@/components/common/CButton";

// Hooks & Utils
import { foramttedNumber } from "@/utils/utils";

// Api
import { getPaymentsApi } from "@/apis/paymentApi";

// Interface & States
import CNoItem from "@/components/common/CNoItem";
import { HistoryPaymentIFC } from "@/interfaces/paymentIFC";

export default function PayHistory() {
    const router = useRouter();

    const [page, setPage] = useState<number>(1);
    const [purpose, setPurpose] = useState<string>("");
    const [user, setUser] = useRecoilState(userState);
    const [point, setPoint] = useState<number>(0);

    const { data, error, isPending } = useQuery<HistoryPaymentIFC, Object, HistoryPaymentIFC, [_1: string, _2: number, _3: string, _4: string]>({
        queryKey: ["payments", page, user._id, purpose],
        queryFn: getPaymentsApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    const navigateToPayment = () => {
        router.push("/payment");
    };

    useEffect(() => {
        setPoint(user.point);
    }, [user]);

    return (
        <div className="w-full">
            <div className="text-2xl font-bold mb-8">결제 내역</div>

            <div className="w-full flex justify-end items-center gap-4 mb-2">
                <div>보유 포인트 : {foramttedNumber(point)}</div>
                <CButton title="충전하기" onClick={navigateToPayment} />
            </div>

            <div className="w-full border-t-2 border-black">
                <div className="w-full flex border-b border-gray-200 py-4 font-bold">
                    <div className="w-[300px] text-center">결제 일자</div>
                    <div className="w-[300px] text-center">결제 금액</div>
                    <div className="w-[300px] text-center">용도</div>
                    <div className="flex-1 text-center">비고</div>
                </div>

                {data ? (
                    data?.payments?.map((v, i) => {
                        return (
                            <div key={v._id} className={`w-full flex pt-4 ${i < data.payments?.length && "border-b border-gray-200 pb-4"}`}>
                                <div className="w-[300px] text-center">{v.date}</div>
                                <div className="w-[300px] text-center">{foramttedNumber(v.point)}</div>
                                <div className="w-[300px] text-center">{v.purpose}</div>
                                <div className="flex-1 text-center">{v.etc}</div>
                            </div>
                        );
                    })
                ) : (
                    <CNoItem title="결제 내역이 존재하지 않습니다." />
                )}
            </div>
        </div>
    );
}
