"use client";

// Library
import { useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Components
import CButton from "@/components/common/CButton";

// Hooks & Utils
import { foramttedNumber } from "@/utils/utils";

// Api

// Interface & States
import { userIFC } from "@/interfaces/userIFC";

export default function Mypage() {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<userIFC>(["user"]);

    const router = useRouter();

    const handleEdit = () => {
        router.push("/edituser");
    };
    useEffect(() => {
        console.log("!)!)!)!)!)!)!) >>>> ", user);
    }, [user]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="w-full">
            <div className="text-2xl font-bold mb-8">프로필</div>

            <div className="w-full text-lg">
                <div className="w-full flex gap-8 py-4">
                    <div className="w-[120px] font-bold">닉네임</div>
                    <div className="flex-1">{user.nickname}</div>
                </div>

                <div className="w-full flex gap-8 py-4">
                    <div className="w-[120px] font-bold">사용 언어</div>
                    <div className="flex-1">{user.lang.length > 0 ? user.lang.join(", ") : "사용 언어를 설정해주세요."}</div>
                </div>

                <div className="w-full flex gap-8 py-4">
                    <div className="w-[120px] font-bold">가격</div>
                    <div className="flex-1">
                        {foramttedNumber(user.price)}
                        <span className="text-sm">&nbsp;/&nbsp;시간</span>
                    </div>
                </div>

                <div className="w-full flex gap-8 py-4">
                    <div className="w-[120px] font-bold">설명</div>
                    <div className="flex-1">
                        {user.introduce !== "" ? (
                            <div
                                style={{
                                    width: "100%",
                                    whiteSpace: "normal",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(String(user.introduce)),
                                }}
                            />
                        ) : (
                            "상세 설명을 작성해주세요."
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-end mt-12">
                <CButton
                    title="수정하기"
                    onClick={handleEdit}
                />
            </div>
        </div>
    );
}
