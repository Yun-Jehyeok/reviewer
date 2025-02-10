"use client";

// Library
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";

// Components
import ReviewerList from "@/components/main/ReviewerList";

// Api
import { getBestReviewsApi, getNewReviewsApi } from "@/apis/postApi";

// Assets
import TempBanner from "../../public/temp_banner.jpg";

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
            <div className={styles.container}>
                <div className={styles.banner}>
                    <Image src={TempBanner} alt="banner" className={styles.bannerImg} />
                </div>
            </div>

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
        </div>
    );
}

const styles = {
    container: "w-full",
    banner: "w-full h-[540px] bg-[#F4F6F5] rounded-3xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg bg-contain cursor-pointer",
    bannerImg: "w-full h-full rounded-3xl",
    section: "flex flex-col gap-8",
    label: "w-full text-3xl font-extrabold pt-16 pb-8",
};
