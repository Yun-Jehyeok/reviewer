"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const paths = [
    { label: "프로필", path: "/mypage" },
    { label: "리뷰 신청 내역", path: "/mypage/history/apply" },
    { label: "리뷰 내역", path: "/mypage/history/review" },
    { label: "결제 내역", path: "/mypage/history/payment" },
];

export default function Tab() {
    const pathname = usePathname();

    return (
        <div className="w-[240px] text-xl flex flex-col">
            {paths.map((path) => (
                <Link href={path.path} key={path.label} className={`px-8 py-4 hover:bg-gray-100 cursor-pointer rounded-md ${path.path === pathname && "font-bold"}`}>
                    {path.label}
                </Link>
            ))}
        </div>
    );
}
