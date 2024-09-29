import CButton from "@/components/common/CButton";
import CSpinner from "@/components/common/CSpinner";
import { useProceedingMutation, useRejectApplicationMutation } from "@/hooks/mutations/application";
import { applicationIFC } from "@/interfaces/applicationIFC";
import { userIFC } from "@/interfaces/userIFC";
import { cancelBgFixed } from "@/utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useCallback } from "react";

export default function ApplicationContent({ item, setStatus, setModalOpen }: { item: applicationIFC; setStatus: Dispatch<SetStateAction<string>>; setModalOpen: (e: boolean) => void }) {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<userIFC>(["user"]);

    if (!user) return null;

    const proceedingMutation = useProceedingMutation(setStatus);

    const cancelMutation = useRejectApplicationMutation({
        onSuccess: (data, variables, context) => {
            console.log("Cancel Mutate Success >>>> ", data, variables, context);
            if (data.success) {
                setStatus("cancel");
                setModalOpen(false);
                if (user._id === item.reviewerId._id) queryClient.invalidateQueries({ queryKey: ["reviews"] });
                else
                    queryClient.invalidateQueries({
                        queryKey: ["applications"],
                    });

                cancelBgFixed();
            }
        },
    });

    const onApplicationCancel = useCallback(
        (isReviewer: boolean) => (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            let confirmVal = confirm("취소하시겠습니까?");

            if (confirmVal) {
                const payload = {
                    id: item._id,
                    isReviewer: isReviewer ?? false,
                };
                cancelMutation.mutate(payload);
            }
        },
        [cancelMutation, item]
    );

    const acceptApplication = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            proceedingMutation.mutate(item._id);
        },
        [proceedingMutation, item]
    );

    return (
        <div className="w-full">
            {proceedingMutation.isPending && <CSpinner />}

            <div className="text-xl font-bold mb-4">신청자 정보</div>
            <div className="flex flex-col gap-6 mb-12">
                <div className="w-full grid grid-cols-3">
                    <div>
                        <div className="text-base font-bold mb-1">닉네임</div>
                        {/* 클릭해서 해당 유저 정보로 갈 수 있도록 */}
                        <div className="text-sm cursor-pointer w-fit hover:underline">{item.applicantId.nickname}</div>
                    </div>
                    <div>
                        <div className="text-base font-bold mb-1">언어</div>
                        <div className="text-sm">
                            {item.applicantId.lang.length > 0
                                ? item.applicantId.lang.map((v) => {
                                      return <span key={v}>{v}, </span>;
                                  })
                                : "없음"}
                        </div>
                    </div>
                    <div>
                        <div className="text-base font-bold mb-1">Level</div>
                        <div className="text-sm">{item.applicantId.grade}</div>
                    </div>
                </div>

                <div>
                    <div className="text-base font-bold mb-2">신청 내용</div>
                    <div className="text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
            </div>

            {item.reviewerId && user._id === item.reviewerId._id ? (
                <div className="flex gap-2">
                    <CButton title="수락하기" onClick={acceptApplication} addClass="flex-1" />
                    <CButton title="거절하기" isCancel={true} onClick={onApplicationCancel(true)} addClass="flex-1" />
                </div>
            ) : (
                <div className="flex gap-2">
                    <div className="flex-1 bg-black text-white rounded-md px-4 py-2 text-center">리뷰어가 수락하면 리뷰가 시작됩니다.</div>
                    {item.status === "application" && <CButton title="신청 취소" isCancel={true} onClick={onApplicationCancel(false)} />}
                </div>
            )}
        </div>
    );
}
