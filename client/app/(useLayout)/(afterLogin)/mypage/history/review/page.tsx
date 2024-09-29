"use client";

// Library
import { useQueryClient } from "@tanstack/react-query";
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

// Interface & States
import { useGetReviews } from "@/hooks/queries/review";
import { applicationIFC } from "@/interfaces/applicationIFC";
import { userIFC } from "@/interfaces/userIFC";
import { applicationState } from "@/states/applicationStates";

export default function ReviweHistory() {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<userIFC>(["user"]);

    const [showModal, setShowModal] = useState<boolean>(false);

    const [application, setApplication] = useRecoilState(applicationState);

    const { reviews, error, isPending } = useGetReviews(user!._id);

    const openDetail = (application: applicationIFC) => {
        setShowModal(true);
        bgFixed();
        setApplication(application);
    };

    if (!user) return null;

    return (
        <div className="w-full">
            {isPending && <CSpinner />}
            <div className="text-2xl font-bold mb-4">리뷰 내역</div>
            <div className="w-full flex flex-col">
                {reviews && reviews.length > 0 ? (
                    reviews.map((v, i) => {
                        return <ReviewItem key={i} review={v} openDetail={openDetail} />;
                    })
                ) : (
                    <CNoItem title="신청 받은 리뷰가 없습니다." />
                )}
            </div>

            {showModal && <ReviewModal setModalOpen={setShowModal} />}
        </div>
    );
}
