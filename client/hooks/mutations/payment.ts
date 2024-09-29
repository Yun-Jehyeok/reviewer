import { paymentApi } from "@/apis/userApi";
import { IError } from "@/interfaces/commonIFC";
import { cancelBgFixed } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePaymentMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: paymentApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("paymentErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("paymentSuccess", data, variables, context);
            if (data.success) {
                router.push("/");
            }
        },
        onSettled: () => {
            cancelBgFixed();
            console.log("paymentEnd");
        },
    });
};
