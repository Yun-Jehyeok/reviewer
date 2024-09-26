"use client";

import { readAlaramApi } from "@/apis/alarmApi";
import { IError } from "@/interfaces/commonIFC";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function NavAlarm({
    showAlarms,
    setShowAlarms,
}: {
    showAlarms: Boolean;
    setShowAlarms: (e: boolean) => void;
}) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const alramReadMutation = useMutation({
        mutationFn: readAlaramApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("changeToCloseErr:::", error);
        },
        onSuccess: (mutateData, variables, context) => {
            if (mutateData.success) {
                queryClient.invalidateQueries({ queryKey: ["alarms"] });
            }
        },
        onSettled: () => {
            console.log("changeToCloseEnd");
        },
    });

    const navigateToReview = () => {
        router.push("/mypage/history/review");
    };

    const onReadAlram = (isRead: boolean, notiId: string) => () => {
        if (!isRead) alramReadMutation.mutate(notiId);
    };

    const handleShowAlarm = async () => {
        setShowAlarms(!showAlarms);
    };

    return (
        <button
            className="w-10 h-10 rounded-full border border-gray-200 shadow-md flex justify-center items-center relative nav-alarm"
            onClick={handleShowAlarm}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
            </svg>

            <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-xs text-white flex justify-center items-center">
                {/* {data?.unreadCount} */}
            </div>

            {showAlarms && (
                <div className="absolute top-[60px] -left-[136px] w-[320px] h-[200px] bg-white z-10 border border-gray-300 shadow-xl rounded-md flex flex-col ">
                    <div className="overflow-auto scrollbar h-full">
                        <ul className="flex flex-1 flex-col px-5 pt-5"></ul>
                    </div>
                    <div
                        className="w-full border-t border-gray-300 h-8 py-1 text-blue-500 cursor-pointer text-sm flex flex-col justify-center hover:underline"
                        onClick={navigateToReview}
                    >
                        전체 메세지
                    </div>
                </div>
            )}
        </button>
    );
}
