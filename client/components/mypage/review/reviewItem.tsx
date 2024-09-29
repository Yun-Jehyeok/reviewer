import { applicationIFC } from "@/interfaces/applicationIFC";

interface IProps {
    review: applicationIFC;
    openDetail: (v: applicationIFC) => void;
}

export default function ReviewItem({ review, openDetail }: IProps) {
    return (
        <div key={review._id} className="pt-6 border-b border-gray-200 pb-6 hover:bg-gray-50 cursor-pointer px-8 group" onClick={() => openDetail(review)}>
            <div className="w-full flex justify-between items-center">
                <div>
                    <span className="text-lg font-bold cursor-pointer group-hover:underline">
                        {review.reviewerId ? review.reviewerId.nickname : review.applicantId.nickname}&nbsp;
                        <span className="font-medium text-sm">({review.reviewerId ? review.reviewerId.grade : review.applicantId.grade})</span>
                    </span>
                    &nbsp;&nbsp;
                    <span className="text-sm text-gray-400 font-medium">{review.register_date.slice(0, 10)}</span>
                </div>
                <div
                    className={`w-fit h-fit text-sm rounded-full py-1 px-4 border ${review.status === "application" && "border-gray-500 text-gray-500"} ${
                        review.status === "proceeding" && "border-green-500 text-green-500"
                    }
            ${review.status === "complete" && "border-gray-500 text-gray-500"}
            ${review.status === "cancel" && "border-red-500 text-red-500"}`}
                >
                    {review.status === "application" && "리뷰 대기중"}
                    {review.status === "proceeding" && "진행중"}
                    {review.status === "complete" && "완료"}
                    {review.status === "cancel" && "취소"}
                </div>
            </div>
        </div>
    );
}
