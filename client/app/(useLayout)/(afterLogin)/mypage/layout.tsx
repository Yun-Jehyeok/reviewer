"use client";

import CButton from "@/components/common/CButton";
import { userState } from "@/states/userStates";
import { usePathname, useRouter } from "next/navigation";

import { ReactNode, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    const [user, setUser] = useRecoilState(userState);
    const [nickname, setNickname] = useState("");
    const [oneLineIntroduce, setOneLineIntroduce] = useState("");
    const [isTabRender, setIsTabRender] = useState(false);
    const [tabs, setTabs] = useState([
        {
            id: 0,
            value: "profile",
            title: "프로필",
            checked: true,
            url: "/mypage",
        },
        {
            id: 1,
            value: "apply",
            title: "리뷰 신청 내역",
            checked: false,
            url: "/mypage/history/apply",
        },
        {
            id: 2,
            title: "리뷰 내역",
            value: "review",
            checked: false,
            url: "/mypage/history/review",
        },
        {
            id: 3,
            title: "결제 내역",
            value: "payment",
            checked: false,
            url: "/mypage/history/payment",
        },
    ]);

    useEffect(() => {
        const currentPath = path.split("/").at(-1);
        let isBraek = false;

        tabs.forEach((tab) => {
            tab.checked = false;

            const condition =
                (currentPath === "mypage" || currentPath === tab.value) &&
                !isBraek;
            if (condition) {
                tab.checked = true;
                isBraek = true;
                setIsTabRender(true);
            }
        });
    }, []);

    useEffect(() => {
        setNickname(user.nickname);
        setOneLineIntroduce(user.oneLineIntroduce);
    }, [user]);

    const router = useRouter();
    const path = usePathname();

    // useEffect(() => {
    //   let tmpTabs = tabs;
    //   tmpTabs = tmpTabs.map((v) => {
    //     return { ...v, checked: v.url === path };
    //   });
    //   setTabs(tmpTabs);
    // }, [tabs, path]);

    const navigateToUpdateUser = () => {
        router.push("/edituser");
    };

    const onClickTab = (e: React.MouseEvent<HTMLDivElement>) => {
        let val = e.currentTarget.dataset.value;

        let tmpTabs = tabs.map((v) => {
            return { ...v, checked: v.value === val };
        });

        setTabs(tmpTabs);
        let url = tmpTabs.filter((v) => v.checked)[0].url;
        router.push(url);
    };

    return (
        <div className="w-full">
            <div className="w-full bg-gray-50 rounded-sm p-16">
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-8">
                        <div className="w-32 h-32 rounded-full bg-gray-500"></div>
                        <div className="flex flex-col justify-center gap-2">
                            <div className="text-2xl font-bold">{nickname}</div>
                            <div className="text-sm text-gray-500">
                                {oneLineIntroduce !== ""
                                    ? oneLineIntroduce
                                    : "한 줄 소개를 작성해주세요."}
                            </div>
                        </div>
                    </div>
                    <CButton
                        title="프로필 수정"
                        onClick={navigateToUpdateUser}
                    />
                </div>
            </div>

            <div className="w-full flex mt-12 gap-8">
                <div className="w-[240px] text-xl flex flex-col">
                    {isTabRender &&
                        tabs.map((v) => (
                            <div
                                key={v.id}
                                data-value={v.value}
                                className={`px-8 py-4 hover:bg-gray-100 cursor-pointer rounded-md ${
                                    v.checked && "font-bold"
                                }`}
                                onClick={onClickTab}
                            >
                                {v.title}
                            </div>
                        ))}
                </div>

                <div className="flex-1 border-l border-gray-200 pl-12 pr-8 min-h-[40vh]">
                    {children}
                </div>
            </div>
        </div>
    );
}
