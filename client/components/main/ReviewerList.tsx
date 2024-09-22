import { postIFC } from "@/interfaces/postIFC";
import Image from "next/image";
import Link from "next/link";

export default function ReviewerList({
    posts,
    noPostContent,
}: {
    posts: postIFC[] | undefined;
    noPostContent: string;
}) {
    return (
        <div className="w-full grid grid-cols-5 gap-8">
            <title>List</title>
            {posts && posts.length > 0 ? (
                posts.map((v, i) => {
                    return (
                        <Link
                            href={`/reviewers/${v._id}`}
                            key={v._id}
                            className="w-full cursor-pointer group"
                        >
                            <div>
                                <div
                                    className={`w-full h-[200px] bg-[#F5F6F5] rounded-xl text-center flex flex-col justify-center text-black text-lg relative transition-all top-0 group-hover:-top-1 group-hover:shadow-md`}
                                >
                                    {v.imgs && v.imgs.length > 0 ? (
                                        <Image
                                            className="rounded-md w-full h-full object-contain overflow-hidden"
                                            src={v.imgs[0]}
                                            width={128}
                                            height={128}
                                            alt={v.imgs[0]}
                                        />
                                    ) : (
                                        "REVIEWERS"
                                    )}
                                </div>
                                <div className="w-full flex mt-4 gap-2">
                                    <div className="flex-1 overflow-hidden">
                                        <div className="text-base font-bold overflow-hidden overflow-ellipsis whitespace-nowrap mb-1">
                                            {v.title}
                                        </div>
                                        <div className="text-[#7F7F7F] text-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
                                            {v.lang.map((l, i) =>
                                                i === v.lang.length - 1
                                                    ? l
                                                    : `${l}, `
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <div className="w-full h-[320px] bg-[#F4F6F5] rounded-3xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg">
                    {noPostContent}
                </div>
            )}
        </div>
    );
}
