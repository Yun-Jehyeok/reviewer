import { reviewIFC } from "@/interfaces/reviewIFC";

interface IProps {
    reviews: reviewIFC[];
}

export default function Reviews({ reviews }: IProps) {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className={styles.container}>
            <TotalCount reviews={reviews} />

            {/* 리뷰 리스트 */}
            <div className={styles.reviewList}>
                {reviews.length > 0 ? (
                    reviews.map((review) => {
                        return <ReviewItem review={review} stars={stars} />;
                    })
                ) : (
                    <NoReviews />
                )}
            </div>
        </div>
    );
}

const TotalCount = ({ reviews }: { reviews: reviewIFC[] }) => {
    return (
        <div className={styles.totalCount}>
            리뷰
            <span className={styles.total}>
                총 <span className={styles.totalSpan}>{reviews.length}</span>개
            </span>
        </div>
    );
};

const ReviewItem = ({ review, stars }: { review: reviewIFC; stars: number[] }) => {
    return (
        <div key={review._id} className={styles.reviewItem}>
            <div className={styles.reviewItemHeader}>
                <div className={styles.reviewItemNicknameAndDate}>
                    <div>
                        <div className={styles.reviewItemNickname}>{review.nickname}</div>
                        <div className={styles.reviewItemDate}>{review.register_date.slice(0, 10)}</div>
                    </div>
                </div>
                <div className={styles.reviewItemStars}>
                    {stars.map((star) => {
                        if (star <= review.score)
                            return (
                                <svg key={star} xmlns="http://www.w3.org/2000/svg" fill="#FC4C4E" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FC4C4E" className={styles.reviewItemStar}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                    />
                                </svg>
                            );
                        return;
                    })}
                </div>
            </div>

            <div className={styles.reviewItemContent}>{review.content}</div>
            <div className={styles.reviewItemDivider}></div>
        </div>
    );
};

const NoReviews = () => {
    return (
        <div className={styles.noReviews}>
            <div className={styles.noReviewsContent}>
                <div className={styles.noReviewsText}>받은 리뷰가 없습니다.</div>
            </div>
        </div>
    );
};

const styles = {
    container: "w-full h-fit",
    totalCount: "text-darkblue text-2xl font-bold font-josefin border-b border-gray-200 pb-4 mb-6",
    total: "text-base text-gray-500 font-medium ml-2",
    totalSpan: "font-bold",
    reviewList: "w-full h-fit",
    reviewItem: "w-full",
    reviewItemHeader: "w-full flex justify-between items-center",
    reviewItemNicknameAndDate: "flex gap-4 items-center",
    reviewItemNickname: "text-base font-bold mb-1",
    reviewItemDate: "text-xs text-gray-500",
    reviewItemStars: "flex",
    reviewItemStar: "w-4 h-4",
    reviewItemContent: "mt-4 text-base",
    reviewItemDivider: "w-full my-8 h-[1px] border border-gray-100",
    noReviews: "w-full h-[320px] bg-[#F4F6F5] rounded-3xl flex justify-center flex-col",
    noReviewsContent: "h-fit w-full flex flex-col gap-4",
    noReviewsText: "text-[#9b9b9b] text-lg text-center",
};
