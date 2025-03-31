"use client";

// Library
import { memo, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

// Component
import CButton from "../common/CButton";
import LoginModal from "../login/loginModal";
import SearchModal from "./_components/SearchModal";
import NavAlarm from "./_components/navAlarm";
import Profile from "./_components/navProfile";

// Interface
import { userIFC } from "@/interfaces/userIFC";

export default function Navigation({ userSession }: { userSession: Session }) {
    const router = useRouter();
    const [user, setUser] = useState(userSession?.user);
    const { data: session, status } = useSession();

    // const { data: user, isPending } = useQuery({
    //     queryKey: ["user"],
    //     queryFn: getUserApi,
    //     enabled: !!userToken,
    //     refetchOnMount: false,
    //     refetchOnWindowFocus: false,
    // });
    // const queryClient = useQueryClient();

    useEffect(() => {
        if (status === "authenticated") {
            setUser(session?.user);
        }
    }, [session, status]);

    const [modalStates, setModalStates] = useState({
        loginModal: false,
        searchModal: false,
        dropdown: false,
        alarms: false,
    });

    const toggleModal = useCallback((modalName: keyof typeof modalStates) => {
        setModalStates((prev) => ({
            ...prev,
            [modalName]: !prev[modalName],
        }));
    }, []);

    const handleLogout = useCallback(() => {
        router.push("/");
        signOut();
    }, [router]);

    const goToMypage = () => {
        router.push("/mypage");
    };

    return (
        <div className={styles.container}>
            {/* {isPending && <CSpinner />} */}
            <div className={styles.logo}>
                <Link href="/">REVIEWERS</Link>
            </div>

            <div className={styles.nav}>
                {user && <NavItems user={user} />}
                <Search openSearch={() => toggleModal("searchModal")} />
                {user ? (
                    <>
                        <NavAlarm showAlarms={modalStates.alarms} setShowAlarms={() => toggleModal("alarms")} />
                        <Profile
                            user={user}
                            showDropdown={modalStates.dropdown}
                            onToggleDropdown={() => toggleModal("dropdown")}
                            onLogout={handleLogout}
                            goToMypage={goToMypage}
                        />
                    </>
                ) : (
                    <CButton title="로그인" onClick={() => toggleModal("loginModal")} />
                )}
            </div>

            {modalStates.loginModal && <LoginModal onClose={() => toggleModal("loginModal")} />}
            {modalStates.searchModal && <SearchModal handleModal={() => toggleModal("searchModal")} />}
        </div>
    );
}

const NavItems = memo(({ user }: { user: userIFC | undefined }) => {
    return (
        <>
            <Link href="/reviewers">리뷰어 목록</Link>
            {user && (user?.isReviewer ? <Link href="/reviewers/register">게시글 작성</Link> : <Link href="/reviewers/convert">리뷰어 전환</Link>)}
        </>
    );
});
NavItems.displayName = "NavItems";

const Search = ({ openSearch }: { openSearch: () => void }) => {
    return (
        <div className={styles.search} onClick={openSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </div>
    );
};

const styles = {
    container: "w-full py-10 flex justify-between items-center",
    logo: "font-extrabold text-2xl",
    nav: "flex gap-8 items-center",
    search: "rounded-full w-6 h-6 cursor-pointer transition-all duration-100",
};
