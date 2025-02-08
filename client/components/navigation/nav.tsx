"use client";

import { useGetUserQuery } from "@/hooks/queries/user";
import { userIFC } from "@/interfaces/userIFC";
import { confirmState } from "@/states/clientStates";
import { bgFixed } from "@/utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import nookies from "nookies";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CButton from "../common/CButton";
import CConfirm from "../common/CConfirm";
import LoginModal from "../login/loginModal";
import SearchModal from "./SearchModal";
import NavAlarm from "./navAlarm";

export default function Navigation() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [confirm, setConfirm] = useRecoilState(confirmState);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showAlarms, setShowAlarms] = useState<boolean>(false);
    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

    const { user } = useGetUserQuery();
    const queryClient = useQueryClient();

    const router = useRouter();

    useEffect(() => {
        const handleShowPopup = async (e: Event) => {
            const alarmIconCon = (e.target as HTMLElement).classList.contains("nav-alarm") || (e.target as HTMLElement).closest(".nav-alarm");
            const myPageIconCon = (e.target as HTMLElement).classList.contains("nav-mypage") || (e.target as HTMLElement).closest(".nav-mypage");

            if (showAlarms && !alarmIconCon) setShowAlarms(() => !showAlarms);
            if (showDropdown && !myPageIconCon) setShowDropdown(() => !showDropdown);
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
        nookies.destroy(null, "token");
        queryClient.invalidateQueries({ queryKey: ["user"] });

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

    const openSearch = () => {
        bgFixed();
        setIsOpenSearch(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link href="/">REVIEWERS</Link>
            </div>

            <div className={styles.nav}>
                <NavItems user={user} />
                <Search openSearch={openSearch} />
                <NavAlarm showAlarms={showAlarms} setShowAlarms={setShowAlarms} />

                {user ? (
                    <Profile
                        user={user}
                        navigateToPayment={navigateToPayment}
                        navigateToMypage={navigateToMypage}
                        onClickLogout={onClickLogout}
                        handleShowMyPage={handleShowMyPage}
                        showDropdown={showDropdown}
                    />
                ) : (
                    <CButton title="SIGN IN" onClick={handleSignIn} />
                )}
            </div>

            {modalOpen ? <LoginModal setModalOpen={setModalOpen} /> : ""}
            {isOpenSearch && <SearchModal handleModal={setIsOpenSearch} />}
            {confirm ? <CConfirm title="Confirm 메세지" /> : ""}
        </div>
    );
}

const NavItems = ({ user }: { user: userIFC | undefined }) => {
    return (
        <>
            <Link href="/reviewers">리뷰어 목록</Link>
            {user && (user?.isReviewer ? <Link href="/reviewers/register">게시글 작성</Link> : <Link href="/reviewers/convert">리뷰어 전환</Link>)}
        </>
    );
};

const Search = ({ openSearch }: { openSearch: () => void }) => {
    return (
        <div className={styles.search} onClick={openSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </div>
    );
};

const Profile = ({
    user,
    navigateToPayment,
    navigateToMypage,
    onClickLogout,
    handleShowMyPage,
    showDropdown,
}: {
    user: userIFC;
    navigateToPayment: () => void;
    navigateToMypage: () => void;
    onClickLogout: () => void;
    handleShowMyPage: () => void;
    showDropdown: boolean;
}) => {
    return (
        <div className={styles.profile}>
            <div className={styles.profileIcon} onClick={handleShowMyPage}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className={styles.profileIconSvg}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
            </div>

            {showDropdown && <Dropdown user={user} navigateToPayment={navigateToPayment} navigateToMypage={navigateToMypage} onClickLogout={onClickLogout} />}
        </div>
    );
};

const Dropdown = ({ user, navigateToPayment, navigateToMypage, onClickLogout }: { user: userIFC; navigateToPayment: () => void; navigateToMypage: () => void; onClickLogout: () => void }) => {
    return (
        <div className={styles.profileDropdown}>
            <div className={styles.profileDropdownContainer}>
                <div className={styles.profileDropdownContent}>
                    <div className={styles.profileDropdownContentTitle}>{user.nickname}</div>
                    <div className={styles.profileDropdownContentImageContainer}>
                        <div className={styles.profileDropdownContentImage}></div>
                    </div>

                    <div className={styles.navigateToPoint}>
                        <CButton title="포인트 충전하기" onClick={navigateToPayment} />
                    </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.profileDropdownFooter}>
                    <div className={styles.profileDropdownFooterItem} onClick={navigateToMypage}>
                        Mypage
                    </div>

                    <div className={styles.profileDropdownFooterItem} onClick={onClickLogout}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: "w-full py-10 flex justify-between items-center",
    logo: "font-extrabold text-2xl",
    nav: "flex gap-8 items-center",
    search: "rounded-full w-6 h-6 cursor-pointer transition-all duration-100",
    profile: "relative nav-mypage",
    profileIcon: "w-10 h-10 rounded-full bg-black flex justify-center items-center cursor-pointer hover:bg-gray-800",
    profileIconSvg: "w-6 h-6",
    profileDropdown: "absolute top-14 right-[280px]",
    profileDropdownContainer: "bg-white rounded-md border border-gray-200 z-10 absolute w-[280px] h-fit shadow-md",
    profileDropdownContent: "p-8 w-full",
    profileDropdownContentTitle: "w-full text-center text-xl font-bold mb-4",
    profileDropdownContentImageContainer: "w-full flex justify-center",
    profileDropdownContentImage: "w-24 h-24 rounded-full bg-gray-500",
    navigateToPoint: "w-full flex justify-center items-center mt-8",
    divider: "w-full h-[1px] border border-gray-200",
    profileDropdownFooter: "p-4 py-2 w-full flex justify-end gap-4",
    profileDropdownFooterItem: "text-sm text-blue-600 cursor-pointer",
};
