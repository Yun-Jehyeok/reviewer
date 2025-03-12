"use client";

import { getBestReviewsApi, getNewReviewsApi } from "@/apis/postApi";
import { useQueries } from "@tanstack/react-query";
import ReviewerList from "./ReviewerList";

export default function ReviewerLists() {
    const results = useQueries({
        queries: [
            {
                queryKey: ["new"],
                queryFn: getNewReviewsApi,
            },
            {
                queryKey: ["best"],
                queryFn: getBestReviewsApi,
            },
        ],
    });

    return (
        <section className={styles.section}>
            <div>
                <div className={styles.label}>BEST REVIEWERS</div>
                <ReviewerList posts={results[1].data} noPostContent="최고의 리뷰어가 없습니다." />
            </div>
            <div>
                <div className={styles.label}>NEW REVIEWERS</div>
                <ReviewerList posts={results[0].data} noPostContent="새로운 리뷰어가 없습니다." />
            </div>
        </section>
    );
}

const styles = {
    section: "flex flex-col gap-8",
    label: "w-full text-3xl font-extrabold pt-16 pb-8",
};
