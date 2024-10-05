"use client";

import { useRouter } from "next/navigation";
import { useTabs } from "@/hooks/mypage/common/useTabs";

export default function Tab() {
    const router = useRouter();
    const { tabs, setTabs } = useTabs();

    const onClickTab = (value: string) => {
        const updatedTabs = tabs.map((tab) => ({
            ...tab,
            checked: tab.value === value,
        }));

        setTabs(updatedTabs);
        const targetTab = updatedTabs.find((tab) => tab.checked);
        if (targetTab) {
            router.push(targetTab.url);
        }
    };

    return (
        <div className="w-[240px] text-xl flex flex-col">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    data-value={tab.value}
                    className={`px-8 py-4 hover:bg-gray-100 cursor-pointer rounded-md ${tab.checked && "font-bold"}`}
                    onClick={() => onClickTab(tab.value)}
                >
                    {tab.title}
                </div>
            ))}
        </div>
    );
}
