import { postIFC } from "@/interfaces/postIFC";
import Image from "next/image";
import Link from "next/link";

export default function ReviewerList({ posts, noPostContent }: { posts: postIFC[] | undefined; noPostContent: string }) {
    return (
        <div className="w-full flex justify-between gap-12">
            <title>List</title>
            {posts && posts.length > 0 ? (
                posts.map((v, i) => {
                    return (
                        <Link href={`/reviewers/${v._id}`} key={v._id} className="w-1/3 cursor-pointer">
                            <div>
                                <div
                                    className={`w-full h-[540px] ${i === 0 && "bg-[#9C9C9C]"} ${i === 1 && "bg-[#B29BC7]"} ${
                                        i === 2 && "bg-[#B1DAD8]"
                                    } rounded-xl text-center flex flex-col justify-center text-black text-lg`}
                                >
                                    {v.imgs && v.imgs.length > 0 ? (
                                        <Image className="rounded-md w-full h-full" src={v.imgs[0]} width={128} height={128} alt={v.imgs[0]} />
                                    ) : (
                                        "REVIEWERS"
                                    )}
                                </div>
                                <div className="w-full flex justify-between mt-4">
                                    <div>
                                        <div className="text-lg font-bold">{v.title}</div>
                                        <div className="text-[#7F7F7F] text-sm">{v.lang.map((l, i) => (i === v.lang.length - 1 ? l : `${l}, `))}</div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <div className="w-full h-[320px] bg-[#F4F6F5] rounded-3xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg">{noPostContent}</div>
            )}
        </div>
    );
}
