"use client";

import SetTech from "@/components/SetTech";
import CButton from "@/components/common/CButton";
import CInput from "@/components/common/CInput";
import CSpinner from "@/components/common/CSpinner";
import { useGetUserQuery } from "@/hooks/queries/user";
import { useInput } from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

// - 보유 기술
export default function ConvertToReviewer() {
    const { user, error, isPending } = useGetUserQuery();
    const router = useRouter();

    const [techErr, setTechErr] = useState<boolean>(false);
    const [techs, setTechs] = useState<string[]>([]);

    const pricePerHour = useInput("");

    const onSubmit = () => {};

    if (isPending) return <CSpinner />;
    if (!user) {
        window.alert("로그인이 필요한 페이지입니다.");
        router.push("/");
        return null;
    }
    if (user.isReviewer) {
        window.alert("리뷰어로 전환된 사용자는 이용할 수 없는 페이지입니다.");
        router.push("/");
        return null;
    }
    return (
        <div className="py-16">
            <h1 className="text-3xl font-bold mb-12">리뷰어 전환을 위해 필요한 정보를 입력해주세요.</h1>

            <div className="flex flex-col gap-12 mb-8">
                <div>
                    <div className="text-xl font-bold mb-4">전문가 소개</div>
                    <textarea className="w-full h-60 resize-none border border-gray-200 focus:outline-none p-4 text-sm" placeholder="전문가 소개를 작성해주세요."></textarea>
                </div>
                <div>
                    <div className="text-xl font-bold mb-4">학력</div>
                    <div>Contents</div>
                </div>
                <div>
                    <div className="text-xl font-bold mb-4">경력</div>
                    <div>Contents</div>
                </div>
                <div>
                    <div className="text-xl font-bold mb-4">보유 기술</div>
                    <SetTech techErr={techErr} techErrmsg="최소 1개의 기술을 입력해주세요." setTechs={setTechs} />
                </div>

                <div>
                    <div className="text-xl font-bold mb-4">
                        희망 시급 <span className="text-base font-medium text-gray-500">(원)</span>
                    </div>
                    <CInput {...pricePerHour} placeholder="희망 시급을 입력해주세요." type="text" />
                </div>
            </div>

            <CButton title="전문가로 전환하기" isFull={true} onClick={onSubmit} />
        </div>
    );
}
