import { ReactNode } from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getUserApi } from "@/apis/userApi";
import UserProfile from "@/components/mypage/common/userProfile";
import Tabs from "@/components/mypage/common/tab";
import { redirect } from "next/navigation";

interface Props {
    children: ReactNode;
}

export default async function Layout({ children }: Props) {
    return (
        <div className="w-full">
            <UserProfile />
            <div className="w-full flex mt-12 gap-8">
                <Tabs />
                <div className="flex-1 border-l border-gray-200 pl-12 pr-8 min-h-[40vh]">{children}</div>
            </div>
        </div>
    );
}
