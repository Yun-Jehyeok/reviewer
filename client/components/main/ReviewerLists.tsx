"use client";

import { getBestReviewsApi, getNewReviewsApi } from "@/apis/postApi";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";
import ReviewerList from "./ReviewerList";

export default function ReviewerLists() {
    const results = useQueries({
        queries: [
            {
                queryKey: ["best"],
                queryFn: getBestReviewsApi,
            },
            {
                queryKey: ["new"],
                queryFn: getNewReviewsApi,
            },
        ],
    });

    return (
        <section className="flex flex-col gap-8">
            {results.map((result, index) => {
                return (
                    <div key={index}>
                        <div className="w-full flex justify-between items-center pt-16 pb-8">
                            <div className="text-3xl font-extrabold">{index === 0 ? "BEST REVIEWERS" : "NEW REVIEWERS"}</div>
                            <Link href="/reviewers">
                                <div className="flex items-center gap-2 w-6 h-6 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                        <ReviewerList posts={result.data} noPostContent={index === 0 ? "최고의 리뷰어가 없습니다." : "새로운 리뷰어가 없습니다."} />
                    </div>
                );
            })}
        </section>
    );
}
