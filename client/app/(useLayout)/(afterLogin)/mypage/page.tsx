"use client";

// Library
import { useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// Components
import CButton from "@/components/common/CButton";

// Hooks & Utils
import { foramttedNumber } from "@/utils/utils";

// Api

// Interface & States
import CSpinner from "@/components/common/CSpinner";
import { useGetUserQuery } from "@/hooks/queries/user";
import { userIFC } from "@/interfaces/userIFC";

// Server Actions
async function handleEdit() {
    redirect("/edituser");
}

export default function Mypage() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<userIFC>(session?.user as userIFC);

    useEffect(() => {
        setUser(session?.user as userIFC);
    }, [session]);

    if (status === "loading") return <CSpinner />;
    if (!user) return <div>로딩중</div>;

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
                <form action={handleEdit}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">수정하기</button>
                </form>
            </div>
        </div>
    );
}
