"use client";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import CNoItem from "@/components/common/CNoItem";
import CSpinner from "@/components/common/CSpinner";
import ReviewItem from "@/components/mypage/review/reviewItem";
import ReviewModal from "@/components/mypage/review/reviewModal";
import { bgFixed } from "@/utils/utils";
import { applicationState } from "@/states/applicationStates";
import { applicationIFC } from "@/interfaces/applicationIFC";
import { useGetUserQuery } from "@/hooks/queries/user";
import { useGetApplicationsQuery } from "@/hooks/queries/application";

export default function ApplyHistoryClient() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [application, setApplication] = useRecoilState(applicationState);

    const { user } = useGetUserQuery();
    const { reviews, isPending } = useGetApplicationsQuery({
        userId: user?._id ?? "",
    });

    const openDetail = (application: applicationIFC) => {
        setShowModal(true);
        bgFixed();
        setApplication(application);
    };

    if (isPending) return <CSpinner />;
    if (!user) return null;

    return (
        <div className="w-full">
            <div className="text-2xl font-bold mb-4">리뷰 신청 내역</div>

            <div className="w-full flex flex-col">
                {reviews && reviews.length > 0 ? (
                    reviews.map((v, i) => <ReviewItem key={i} review={v} openDetail={openDetail} />)
                ) : (
                    <CNoItem title="신청한 리뷰가 없습니다." />
                )}
            </div>

            {showModal && <ReviewModal setModalOpen={setShowModal} />}
        </div>
    );
}
