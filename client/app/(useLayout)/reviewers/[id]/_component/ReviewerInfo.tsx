// Library
import DOMPurify from "dompurify";

// Components

// Hooks & Utils

// Api

// Interface & States
import { userIFC } from "@/interfaces/userIFC";

interface IProps {
    creator: userIFC;
}

export default function ReviewerInfo({ creator }: IProps) {
    return (
        <div className="w-full h-fit p-12 bg-white rounded-lg shadow-2xl">
            {/* 사진 */}
            <div className="w-full flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gray-500"></div>
            </div>
            <div className="flex flex-col gap-6">
                {/* 닉네임 */}
                <div className="text-xl font-bold text-center">{creator.nickname}</div>
                {/* 소개 */}
                <div>
                    <div className="text-base font-bold mb-2">소개</div>
                    <div className="text-sm text-gray-600">
                        {creator.introduce === "" ? (
                            <div className="w-full text-sm text-gray-600">해당 리뷰어의 소개글이 없습니다.</div>
                        ) : (
                            <div
                                style={{
                                    width: "100%",
                                    whiteSpace: "normal",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(creator.introduce),
                                }}
                            />
                        )}
                    </div>
                </div>
                {/* 언어 */}
                <div>
                    <div className="text-base font-bold mb-2">주 사용 언어</div>
                    <div className="text-sm text-gray-600">
                        {creator.lang.length > 0 ? (
                            creator.lang.join(", ")
                        ) : (
                            <div className="w-full text-sm text-gray-600">해당 리뷰어의 주 사용 언어가 없습니다.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
