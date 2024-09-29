import { cancelAppApi, completeApplicantAppApi, completeReviwerAppApi, proceedingApi } from "@/apis/applicationApi";
import { applyApi } from "@/apis/postApi";
import { createReviewApi } from "@/apis/reviewApi";
import { IError } from "@/interfaces/commonIFC";
import { cancelBgFixed } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SetStateAction } from "react";

export const useApplyMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: applyApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error, variable, context) => {
            console.error("applyErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("applySuccess", data, variables, context);
            if (data.success) {
                alert("리뷰가 신청되었습니다.");
                router.push("/mypage/history/apply");
            }
        },
        onSettled: () => {
            console.log("applyEnd");
        },
    });
};

export const useProceedingMutation = (setStatus: (value: SetStateAction<string>) => void) => {
    return useMutation({
        mutationFn: proceedingApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("changeToProceedingErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("changeToProceedingSuccess", data, variables, context);
            if (data.success) setStatus("proceeding");
        },
        onSettled: () => {
            console.log("changeToProceedingEnd");
        },
    });
};

interface IRejectApplication {
    onSuccess: (data: any, variables: any, context: void) => void;
}

export const useRejectApplicationMutation = ({ onSuccess }: IRejectApplication) => {
    return useMutation({
        mutationFn: cancelAppApi,
        onMutate: (variable) => {
            console.log("on Cancel Mutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("Cancel Mutate API Error :::", error);
        },
        onSuccess,
        onSettled: () => {
            console.log("Cancel Mudate Settled");
        },
    });
};

export const useCreateReviewMutation = (setModalOpen: (e: boolean) => void) => {
    return useMutation({
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
};

export const useApplicationCloseMutation = (isApplicationReq: boolean, setModalOpen: (e: boolean) => void) => {
    return useMutation({
        mutationFn: isApplicationReq ? completeApplicantAppApi : completeReviwerAppApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("changeToCloseErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("changeToCloseSuccess", data, variables, context);
            if (data.success) setModalOpen(false);
        },
        onSettled: () => {
            cancelBgFixed();
            console.log("changeToCloseEnd");
        },
    });
};
