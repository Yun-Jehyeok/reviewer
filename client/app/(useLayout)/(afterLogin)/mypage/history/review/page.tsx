"use client";

// Library
import { useEffect, useState } from "react";
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
import { useGetUserQuery } from "@/hooks/queries/user";
import { applicationIFC } from "@/interfaces/applicationIFC";
import { applicationState } from "@/states/applicationStates";
import { redirect } from "next/navigation";

export default function ReviweHistory() {
    const [showModal, setShowModal] = useState<boolean>(false);

    const [application, setApplication] = useRecoilState(applicationState);

    const { user, error: getUserError, isPending: getUserIsPending } = useGetUserQuery();

    useEffect(() => {
        if (!getUserIsPending && !user) redirect("/");
    }, [getUserIsPending, user]);

    const { reviews, error, isPending } = useGetReviews(user ? user._id : "");

    const openDetail = (application: applicationIFC) => {
        setShowModal(true);
        bgFixed();
        setApplication(application);
    };

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
