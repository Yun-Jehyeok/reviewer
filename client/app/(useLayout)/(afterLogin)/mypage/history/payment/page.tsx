"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { HistoryPayment, HistoryPaymentIFC } from "@/interfaces/paymentIFC";
import { getPaymentsApi } from "@/apis/paymentApi";
import { userState } from "@/states/userStates";
import CButton from "@/components/common/CButton";
// Util
import { foramttedNumber } from "@/utils/utils";

export default function PayHistory() {
    const router = useRouter();

    const [page, setPage] = useState<number>(1);
    const [purpose, setPurpose] = useState<string>("");
    const [user, setUser] = useRecoilState(userState);
    const [point, setPoint] = useState<number>(0);
    // const [data, setData] = useState<HistoryPaymentIFC[]>();

    const { data, error, isPending } = useQuery<
        HistoryPaymentIFC,
        Object,
        HistoryPaymentIFC,
        [_1: string, _2: number, _3: string, _4: string]
    >({
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
    }, []);

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
                            <div
                                key={v._id}
                                className={`w-full flex pt-4 ${
                                    i < data.payments?.length &&
                                    "border-b border-gray-200 pb-4"
                                }`}
                            >
                                <div className="w-[300px] text-center">
                                    {v.date}
                                </div>
                                <div className="w-[300px] text-center">
                                    {foramttedNumber(v.point)}
                                </div>
                                <div className="w-[300px] text-center">
                                    {v.purpose}
                                </div>
                                <div className="flex-1 text-center">
                                    {v.etc}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full h-[320px] bg-[#F4F6F5] rounded-3xl flex justify-center flex-col">
                        <div className="h-fit w-full flex flex-col gap-4">
                            <div className="text-[#9b9b9b] text-lg text-center">
                                결제 내역이 존재하지 않습니다.
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
