import CButton from "@/components/common/CButton";
import { userIFC } from "@/interfaces/userIFC";

import { useRef, useEffect, forwardRef } from "react";

export default function Profile({
    user,
    showDropdown,
    onToggleDropdown,
    onLogout,
    goToMypage,
}: {
    user: userIFC;
    showDropdown: boolean;
    onToggleDropdown: () => void;
    onLogout: () => void;
    goToMypage: () => void;
}) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onToggleDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onToggleDropdown]);

    return (
        <div className={styles.profile}>
            <div className={styles.profileIcon} onClick={onToggleDropdown}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className={styles.profileIconSvg}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
            </div>

            {showDropdown && <ProfileDropdown ref={dropdownRef} user={user} goToMypage={goToMypage} onLogout={onLogout} />}
        </div>
    );
}

const ProfileDropdown = forwardRef<HTMLDivElement, { user: userIFC; goToMypage: () => void; onLogout: () => void }>(({ user, goToMypage, onLogout }, ref) => {
    return (
        <div ref={ref} className={styles.profileDropdown}>
            <div className={styles.profileDropdownContainer}>
                <div className={styles.profileDropdownContent}>
                    <div className={styles.profileDropdownContentTitle}>{user.nickname}</div>
                    <div className={styles.profileDropdownContentImageContainer}>
                        <div className={styles.profileDropdownContentImage}></div>
                    </div>

                    <div className={styles.navigateToPoint}>
                        <CButton title="포인트 충전하기" onClick={() => {}} />
                    </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.profileDropdownFooter}>
                    <div className={styles.profileDropdownFooterItem} onClick={goToMypage}>
                        Mypage
                    </div>

                    <div className={styles.profileDropdownFooterItem} onClick={onLogout}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    );
});
ProfileDropdown.displayName = "ProfileDropdown";

const styles = {
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
