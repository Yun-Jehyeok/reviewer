import { registerPostApi } from "@/apis/postApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegisterPostMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: registerPostApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error, variable, context) => {
            console.error("registerPostErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("registerPostSuccess", data, variables, context);
            if (data.success) router.push(`/reviewers/${data.id}`);
        },
        onSettled: () => {
            console.log("registerPostEnd");
        },
    });
};
