// Library
import { useRouter } from "next/navigation";

// Component
import CButton from "@/components/common/CButton";

// Interface
import { useGetUserQuery } from "@/hooks/queries/user";

export default function UserProfile() {
    const router = useRouter();
    const { user } = useGetUserQuery();

    const navigateToUpdateUser = () => {
        router.push("/edituser");
    };

    if (!user) return null;
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
