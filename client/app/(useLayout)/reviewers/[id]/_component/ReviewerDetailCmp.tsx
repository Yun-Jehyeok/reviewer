"use client";

// Library
import { useParams } from "next/navigation";

// Components
import CSpinner from "@/components/common/CSpinner";
import Apply from "./Apply";
import Description from "./Description";
import PostImgs from "./PostImgs";
import ReviewerInfo from "./ReviewerInfo";
import Reviews from "./Reviews";

// Interface & States
import { useGetPost } from "@/hooks/queries/post";
import { useGetUserQuery } from "@/hooks/queries/user";

export default function ReviewerDetailCmp() {
    const { id } = useParams() as { id: string };
    const { user, isPending: isUserPending } = useGetUserQuery();

    const { post, isPending } = useGetPost(id);

    if (isPending || isUserPending) return <CSpinner />;
    if (!post) return null;

    return (
        <div className={styles.container}>
            {/* 왼쪽 */}
            <div className={styles.left}>
                <PostImgs imgs={post.imgs} />
                <Description content={post.content} />
                <Reviews reviews={post.reviews} />
            </div>

            {/* 오른쪽 */}
            <div className={styles.right}>
                <Apply user={user} post={post} />
                <ReviewerInfo creator={post.creator} />
            </div>
        </div>
    );
}

const styles = {
    container: "w-full h-fit flex gap-12",
    left: "w-2/3",
    right: "flex-1",
};
