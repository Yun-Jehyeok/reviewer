"use client";

import { createReviewApi } from "@/apis/reviewApi";
import CButton from "@/components/common/CButton";
import { useInput } from "@/hooks/useInput";
import { applicationIFC } from "@/interfaces/applicationIFC";
import { IError } from "@/interfaces/commonIFC";
import { userIFC } from "@/interfaces/userIFC";
import { useGetChatRoom } from "@/queries/chatroom/chatroom";
import { cancelBgFixed } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

interface IProps {
    item: applicationIFC;
    setModalOpen: (e: boolean) => void;
}

export default function CompleteContent({ item, setModalOpen }: IProps) {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<userIFC>(["user"]);

    if (!user) return null;

    const { chatRoom, error, isPending } = useGetChatRoom(item.chatRoom);

    const review = useInput("");
    const [current, setCurrent] = useState(0);

    const [isErr, setIsErr] = useState(false);
    const [errMsg, setErrMsg] = useState("리뷰를 작성해주세요.");

    const handleStar = (e: number) => {
        setCurrent(e);
    };

    const createReviewMutation = useMutation({
        mutationFn: createReviewApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("createReviewErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("createReviewSuccess", data, variables, context);
            if (data.success) {
                cancelBgFixed();
                setModalOpen(false);
            }
        },
        onSettled: () => {
            console.log("createReviewEnd");
        },
    });

    const handleSubmit = useCallback(
        (
            e:
                | React.FormEvent<HTMLFormElement>
                | React.MouseEvent<HTMLButtonElement>
        ) => {
            e.preventDefault();

            let errFlag = false;

            setIsErr(false);

            if (current === 0) {
                alert("별점은 1점 이상 필수입니다.");
                errFlag = true;
            }
            if (review.value === "") {
                setIsErr(true);
                errFlag = true;
            }

            if (errFlag) return;

            createReviewMutation.mutate({
                creator: user._id,
                nickname: user.nickname,
                content: review.value,
                score: current,
                postId: item.postId,
                appId: item._id,
            });
        },
        [createReviewMutation, user, review, current, item]
    );

    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="w-full">
            <div className="w-full grid grid-cols-2">
                <div>
                    <div className="text-lg font-bold">리뷰어</div>
                    <div>{item.reviewerId.nickname}</div>
                </div>
                <div>
                    <div className="text-lg font-bold">신청 날짜</div>
                    <div>{item.register_date.slice(0, 10)}</div>
                </div>
            </div>

            <div className="mt-8">
                <div className="text-lg font-bold mb-2">채팅 내역</div>
                <div className="flex flex-col justify-end bg-white h-48 w-full border border-gray-300 shadow-md ">
                    <div className="h-full last:border-b-0 overflow-y-scroll rounded-md flex flex-col gap-2 px-2 py-4 pt-2">
                        {chatRoom &&
                            chatRoom.chats.length > 0 &&
                            chatRoom.chats.map((msg, i) => {
                                return (
                                    <div
                                        className={`w-full flex py-1 px-2 border-gray-200 ${
                                            msg.user === user._id &&
                                            "justify-end"
                                        }`}
                                        key={i}
                                    >
                                        <div className="text-sm">
                                            {msg.user !== user._id && (
                                                <div className="mb-1">
                                                    {msg.userName}
                                                </div>
                                            )}

                                            <div className="p-1 bg-sky-50 rounded-sm px-2">
                                                {msg.message}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>

            {item.review ? (
                <div className="mt-8">
                    <div className="text-lg font-bold mb-2 text-center">
                        리뷰 작성을 완료했습니다.
                    </div>
                </div>
            ) : (
                <div className="mt-8">
                    <div className="text-lg font-bold mb-2">리뷰 작성</div>
                    <div className="w-full h-10 mb-4 flex justify-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={current >= 1 ? "#FC4C4E" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke={current >= 1 ? "#FC4C4E" : "currentColor"}
                            className="w-8 h-8 cursor-pointer"
                            onMouseOver={() => handleStar(1)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={current >= 2 ? "#FC4C4E" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke={current >= 2 ? "#FC4C4E" : "currentColor"}
                            className="w-8 h-8 cursor-pointer"
                            onMouseOver={() => handleStar(2)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={current >= 3 ? "#FC4C4E" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke={current >= 3 ? "#FC4C4E" : "currentColor"}
                            className="w-8 h-8 cursor-pointer"
                            onMouseOver={() => handleStar(3)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={current >= 4 ? "#FC4C4E" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke={current >= 4 ? "#FC4C4E" : "currentColor"}
                            className="w-8 h-8 cursor-pointer"
                            onMouseOver={() => handleStar(4)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={current >= 5 ? "#FC4C4E" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke={current >= 5 ? "#FC4C4E" : "currentColor"}
                            className="w-8 h-8 cursor-pointer"
                            onMouseOver={() => handleStar(5)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                        </svg>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className={`w-full h-20 border ${
                                isErr ? "border-[#ea002c]" : "border-gray-400"
                            } rounded-md resize-none focus:outline-none p-3 text-sm`}
                            {...review}
                            placeholder="리뷰를 300자 이내로 작성해주세요."
                            maxLength={300}
                        ></textarea>
                        {isErr && (
                            <div className="text-[#ea002c] text-xs pl-2 mb-4">
                                {errMsg}
                            </div>
                        )}
                        <CButton
                            title="리뷰 작성하기"
                            onClick={handleSubmit}
                            isFull={true}
                        />
                    </form>
                </div>
            )}
        </div>
    );
}
