// Library
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Component
import CButton from "@/components/common/CButton";

// Interface
import { userIFC } from "@/interfaces/userIFC";

export default function UserProfile() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<userIFC>(["user"]);

    const [nickname, setNickname] = useState("");
    const [oneLineIntroduce, setOneLineIntroduce] = useState("");

    useEffect(() => {
        if (user) {
            setNickname(user.nickname);
            setOneLineIntroduce(user.oneLineIntroduce);
        }
    }, [user]);

    const navigateToUpdateUser = () => {
        router.push("/edituser");
    };

    return (
        <div className="w-full bg-gray-50 rounded-sm p-16">
            <div className="w-full flex justify-between items-center">
                <div className="flex gap-8">
                    <div className="w-32 h-32 rounded-full bg-gray-500"></div>
                    <div className="flex flex-col justify-center gap-2">
                        <div className="text-2xl font-bold">{nickname}</div>
                        <div className="text-sm text-gray-500">{oneLineIntroduce !== "" ? oneLineIntroduce : "한 줄 소개를 작성해주세요."}</div>
                    </div>
                </div>
                <CButton
                    title="프로필 수정"
                    onClick={navigateToUpdateUser}
                />
            </div>
        </div>
    );
}
