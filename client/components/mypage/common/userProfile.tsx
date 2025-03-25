"use client";

// Library
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

// Component
import CButton from "@/components/common/CButton";

// Interface
import { userIFC } from "@/interfaces/userIFC";

export default function UserProfile({ session }: { session: Session }) {
    const [user, setUser] = useState<userIFC>(session?.user as userIFC);

    const navigateToUpdateUser = () => {
        redirect("/edituser");
    };

    return (
        <div className="w-full bg-gray-50 rounded-sm p-16">
            <div className="w-full flex justify-between items-center">
                <div className="flex gap-8">
                    <div className="w-32 h-32 rounded-full bg-gray-500"></div>
                    <div className="flex flex-col justify-center gap-2">
                        <div className="text-2xl font-bold">{user.nickname}</div>
                        <div className="text-sm text-gray-500">{user.oneLineIntroduce !== "" ? user.oneLineIntroduce : "한 줄 소개를 작성해주세요."}</div>
                    </div>
                </div>

                <CButton title="프로필 수정" onClick={navigateToUpdateUser} />
            </div>
        </div>
    );
}
