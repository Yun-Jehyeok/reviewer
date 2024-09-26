"use client";

// Library
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// Components
import CSpinner from "@/components/common/CSpinner";
import Apply from "./_component/Apply";
import Description from "./_component/Description";
import PostImgs from "./_component/PostImgs";
import ReviewerInfo from "./_component/ReviewerInfo";
import Reviews from "./_component/Reviews";

// Hooks & Utils

// Api

// Interface & States
import { userIFC } from "@/interfaces/userIFC";
import { useGetPost } from "@/queries/post/post";

export default function ReviewerDetail() {
    const { id } = useParams() as { id: string };
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<userIFC>(["user"]);

    const { post, error, isPending } = useGetPost(id);

    console.log("post:::", post);
    if (!post) return null;

    return (
        <div className="w-full h-fit flex gap-12">
            {isPending && <CSpinner />}

            {/* 왼쪽 */}
            <div className="w-2/3">
                <PostImgs imgs={post.imgs} />
                <Description content={post.content} />
                <Reviews reviews={post.reviews} />
            </div>

            {/* 오른쪽 */}
            <div className="flex-1">
                <Apply user={user} post={post} />
                <ReviewerInfo creator={post.creator} />
            </div>
        </div>
    );
}
