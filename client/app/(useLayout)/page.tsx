"use client";

// Library
import { useQueries } from "@tanstack/react-query";

// Components
import ReviewerList from "@/components/main/ReviewerList";

// Hooks & Utils

// Api
import { getBestReviewsApi, getNewReviewsApi } from "@/apis/postApi";

// Interface & States

export default function Home() {
    const results = useQueries({
        queries: [
            {
                queryKey: ["new"],
                queryFn: getNewReviewsApi,
                staleTime: 60 * 1000,
                gcTime: 300 * 1000,
            },
            {
                queryKey: ["best"],
                queryFn: getBestReviewsApi,
                staleTime: 60 * 1000,
                gcTime: 300 * 1000,
            },
        ],
    });

    return (
        <div>
            <div className="w-full">
                <div className="w-full h-[540px] bg-[#F4F6F5] rounded-3xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg">추후 이미지 업데이트 예정입니다.</div>
            </div>

            <div className="w-full text-3xl font-extrabold pt-16 pb-8">BEST REVIEWERS</div>
            <ReviewerList
                posts={results[1].data}
                noPostContent="최고의 리뷰어가 없습니다."
            />

            <div className="w-full text-3xl font-extrabold pt-16 pb-8 mt-8">NEW REVIEWERS</div>
            <ReviewerList
                posts={results[0].data}
                noPostContent="새로운 리뷰어가 없습니다."
            />
        </div>
    );
}
