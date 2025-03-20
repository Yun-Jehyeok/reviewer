import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Component
import UserProfile from "@/components/mypage/common/userProfile";
import Tabs from "@/components/mypage/common/tab";
import { SessionContext } from "next-auth/react";

// Interface
interface Props {
    children: ReactNode;
}

export default async function Layout({ children }: Props) {
    const session = await auth();

    if (!session) redirect("/");

    return (
        <div className="w-full">
            <UserProfile session={session} />
            <div className="w-full flex mt-12 gap-8">
                <Tabs />
                <div className="flex-1 border-l border-gray-200 pl-12 pr-8 min-h-[40vh]">{children}</div>
            </div>
        </div>
    );
}
