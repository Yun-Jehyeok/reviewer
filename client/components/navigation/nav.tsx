"use client";

import { confirmState } from "@/states/clientStates";
import { userState } from "@/states/userStates";
import { bgFixed } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import CButton from "../common/CButton";
import CConfirm from "../common/CConfirm";
import LoginModal from "../login/loginModal";
import NavAlarm from "./navAlarm";
import NavMessages from "./navMessages";

export default function Navigation() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [confirm, setConfirm] = useRecoilState(confirmState);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showAlarms, setShowAlarms] = useState<boolean>(false);

    const [user, setUser] = useRecoilState(userState);

    const router = useRouter();

    useEffect(() => {
        setIsAuth(user.token !== "");
    }, [user]);

    useEffect(() => {
        const handleShowPopup = async (e: Event) => {
            console.log(
                (e.target as HTMLElement).closest(".nav-mypage"),
                " : target",
            );
            const alarmIconCon =
                (e.target as HTMLElement).classList.contains("nav-alarm") ||
                (e.target as HTMLElement).closest(".nav-alarm");
            const myPageIconCon =
                (e.target as HTMLElement).classList.contains("nav-mypage") ||
                (e.target as HTMLElement).closest(".nav-mypage");

            console.log(showAlarms, alarmIconCon, " : alarmIconCon");
            if (showAlarms && !alarmIconCon) setShowAlarms(() => !showAlarms);
            if (showDropdown && !myPageIconCon)
                setShowDropdown(() => !showDropdown);
        };

        window.addEventListener("click", handleShowPopup);
        return () => {
            window.removeEventListener("click", handleShowPopup);
        };
    }, [showDropdown, showAlarms]);

    const handleSignIn = () => {
        setModalOpen(true);
        bgFixed();
    };

    const handleShowMyPage = async () => {
        setShowDropdown((prev) => !prev);
    };

    const onClickLogout = () => {
        setShowDropdown(false);
        localStorage.removeItem("token");

        setUser({
            _id: "",
            reputation: 0,
            register_date: "",
            profile_img: "",
            posts: [],
            point: 0,
            phone: "",
            nickname: "",
            name: "",
            login_way: "",
            lang: [],
            isSubmit: false,
            grade: "",
            getApplications: [],
            email: "",
            applications: [],
            token: "",
            price: 0,
            introduce: "",
            oneLineIntroduce: "",
        });

        router.push("/");
    };

    const navigateToMypage = () => {
        setShowDropdown(false);

        router.push("/mypage");
    };

    const navigateToPayment = () => {
        setShowDropdown(false);

        router.push("/payment");
    };

    return (
        <div className="w-full py-10 flex justify-between items-center">
            <div className="font-extrabold text-2xl">
                <Link href="/">REVIEWERS</Link>
            </div>

            <div className="flex gap-8 items-center">
                <Link href="/reviewers">리뷰어 목록</Link>
                <Link href="/reviewers/register">리뷰어 등록</Link>
                <NavAlarm
                    showAlarms={showAlarms}
                    setShowAlarms={setShowAlarms}
                />
                {/* <NavMessages /> */}
                {isAuth ? (
                    <div className="relative nav-mypage">
                        <div
                            className="w-10 h-10 rounded-full bg-black flex justify-center items-center cursor-pointer hover:bg-gray-800"
                            // onClick={() => setShowDropdown((prev) => !prev)}
                            onClick={handleShowMyPage}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                />
                            </svg>
                        </div>

                        {showDropdown && (
                            <div className="absolute top-14 -left-[120px]">
                                <div className="bg-white rounded-md border border-gray-200 z-10 absolute w-[280px] h-fit shadow-md">
                                    <div className="p-8 w-full">
                                        <div className="w-full text-center text-xl font-bold mb-4">
                                            {user.name}
                                        </div>
                                        <div className="w-full flex justify-center">
                                            <div className="w-24 h-24 rounded-full bg-gray-500"></div>
                                        </div>

                                        <div className="w-full flex justify-center items-center mt-8">
                                            <CButton
                                                title="포인트 충전하기"
                                                onClick={navigateToPayment}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full h-[1px] border border-gray-200"></div>
                                    <div className="p-4 py-2 w-full flex justify-end gap-4">
                                        <div
                                            className="text-sm text-blue-600 cursor-pointer"
                                            onClick={navigateToMypage}
                                        >
                                            Mypage
                                        </div>

                                        <div
                                            className="text-sm text-blue-600 cursor-pointer"
                                            onClick={onClickLogout}
                                        >
                                            Logout
                                        </div>
                                    </div>
                                </div>
                                <div className="w-3 h-3 rotate-45 bg-white border border-gray-200 absolute -top-1 left-[135px]"></div>
                            </div>
                        )}
                    </div>
                ) : (
                    <CButton title="SIGN IN" onClick={handleSignIn} />
                )}
            </div>

            {modalOpen ? <LoginModal setModalOpen={setModalOpen} /> : ""}

            {confirm ? <CConfirm title="Confirm 메세지" /> : ""}
        </div>
    );
}
