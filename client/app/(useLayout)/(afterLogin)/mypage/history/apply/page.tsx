"use client";

// Library
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilState } from "recoil";

// Components
import CNoItem from "@/components/common/CNoItem";
import CSpinner from "@/components/common/CSpinner";
import ReviewItem from "@/components/mypage/review/reviewItem";
import ReviewModal from "@/components/mypage/review/reviewModal";

// Hooks & Utils
import { bgFixed } from "@/utils/utils";

// Api
import { getApplicationsApi } from "@/apis/applicationApi";

// Interface & States
import { applicationIFC } from "@/interfaces/applicationIFC";
import { applicationState } from "@/states/applicationStates";
import { userState } from "@/states/userStates";

export default function ApplyHistory() {
    const [showModal, setShowModal] = useState<boolean>(false);

    const [application, setApplication] = useRecoilState(applicationState);
    const [user, setUser] = useRecoilState(userState);

    const {
        data: reviews,
        error,
        isPending,
    } = useQuery<applicationIFC[], Object, applicationIFC[], [_1: string, _2: string]>({
        queryKey: ["applications", user._id],
        queryFn: getApplicationsApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    const openDetail = (application: applicationIFC) => {
        setShowModal(true);
        bgFixed();
        setApplication(application);
    };

    return (
        <div className="w-full">
            {isPending && <CSpinner />}

            <div className="text-2xl font-bold mb-4">리뷰 신청 내역</div>

            <div className="w-full flex flex-col">
                {reviews && reviews.length > 0 ? (
                    reviews.map((v, i) => {
                        return <ReviewItem key={i} review={v} openDetail={openDetail} />;
                    })
                ) : (
                    <CNoItem title="신청한 리뷰가 없습니다." />
                )}
            </div>

            {showModal && <ReviewModal setModalOpen={setShowModal} />}
        </div>
    );
}
