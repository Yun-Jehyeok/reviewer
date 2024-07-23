"use client";

// Library
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRecoilState } from "recoil";

// Components
import CSpinner from "@/components/common/CSpinner";
import Apply from "./_component/Apply";
import Description from "./_component/Description";
import PostImgs from "./_component/PostImgs";
import ReviewerInfo from "./_component/ReviewerInfo";
import Reviews from "./_component/Reviews";

// Hooks & Utils

// Api
import { getPostApi } from "@/apis/postApi";

// Interface & States
import { postIFC } from "@/interfaces/postIFC";
import { userState } from "@/states/userStates";

export default function ReviewerDetail() {
    const { id } = useParams() as { id: string };
    const [user, setUser] = useRecoilState(userState);

    const {
        data: post,
        error,
        isPending,
    } = useQuery<postIFC, Object, postIFC, [_1: string, _2: string]>({
        queryKey: ["posts", id],
        queryFn: getPostApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

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
