import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useTabs = () => {
    const path = usePathname();
    const [tabs, setTabs] = useState([
        { id: 0, value: "profile", title: "프로필", checked: true, url: "/mypage" },
        { id: 1, value: "apply", title: "리뷰 신청 내역", checked: false, url: "/mypage/history/apply" },
        { id: 2, value: "review", title: "리뷰 내역", checked: false, url: "/mypage/history/review" },
        { id: 3, value: "payment", title: "결제 내역", checked: false, url: "/mypage/history/payment" },
    ]);

    useEffect(() => {
        const currentPath = path.split("/").at(-1);
        let isBraek = false;

        setTabs((prevTabs) =>
            prevTabs.map((tab) => {
                const condition = (currentPath === "mypage" || currentPath === tab.value) && !isBraek;
                if (condition) {
                    isBraek = true;
                    return { ...tab, checked: true };
                }
                return { ...tab, checked: false };
            })
        );
    }, [path]);

    return { tabs, setTabs };
};
