// Library

// Components

// Hooks & Utils

// Api

// Interface & States
import { reviewIFC } from "@/interfaces/reviewIFC";

interface IProps {
    reviews: reviewIFC[];
}

export default function Reviews({ reviews }: IProps) {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="w-full h-fit">
            <div className="text-darkblue text-2xl font-bold font-josefin mb-3">
                리뷰
                <span className="text-base text-gray-500 font-medium">&nbsp;총 {reviews.length}개</span>
            </div>

            {/* 리뷰 리스트 */}
            <div className="w-full h-fit mt-12">
                {reviews.length > 0 ? (
                    reviews.map((v) => {
                        return (
                            <div key={v._id} className="w-full">
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex gap-4 items-center">
                                        <div>
                                            <div className="text-base font-bold mb-1">{v.nickname}</div>
                                            <div className="text-xs text-gray-500">{v.register_date.slice(0, 10)}</div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        {stars.map((star) => {
                                            if (star <= v.score)
                                                return (
                                                    <svg
                                                        key={star}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="#FC4C4E"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="#FC4C4E"
                                                        className="w-4 h-4"
                                                    >
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

                                <div className="mt-4 text-base">{v.content}</div>
                                <div className="w-full my-8 h-[1px] border border-gray-100"></div>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full h-[320px] bg-[#F4F6F5] rounded-3xl flex justify-center flex-col">
                        <div className="h-fit w-full flex flex-col gap-4">
                            <div className="text-[#9b9b9b] text-lg text-center">받은 리뷰가 없습니다.</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
