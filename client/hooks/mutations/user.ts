import { readAlaramApi } from "@/apis/alarmApi";
import { authEmailApi, authPhoneApi, changePwApi, editUserApi, signinApi, signupApi, withdrawalApi } from "@/apis/userApi";
import { IError } from "@/interfaces/commonIFC";
import { emailIFC, signinIFC, signupIFC } from "@/interfaces/userIFC";
import { cancelBgFixed } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import nookies, { setCookie } from "nookies";
import { SetStateAction } from "react";

const setTokenInCookie = (token: string) => {
    setCookie(null, "token", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
};

export const useEditUserMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: editUserApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error, variable, context) => {
            console.error("editUserErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("editUserSuccess", data, variables, context);
            if (data.success) {
                console.log("Edit Success Data >>>> ", data);
                queryClient.invalidateQueries({ queryKey: ["user"] });

                router.push(`/mypage`);
            }
        },
        onSettled: () => {
            console.log("editUserEnd");
        },
    });
};

export const useWithdrawalMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: withdrawalApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("withdrawalErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("withdrawalSuccess", data, variables, context);
            if (data.success) {
                localStorage.removeItem("token");
                router.push("/");
            }
        },
        onSettled: () => {
            console.log("withdrawalEnd");
        },
    });
};

export const useEditPwMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: changePwApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("changePwErr:::", error.response.data.msg);
        },
        onSuccess: (data, variables, context) => {
            console.log("changePwSuccess", data, variables, context);
            if (data.success) {
                router.push("/");
            }
        },
        onSettled: () => {
            console.log("changePwEnd");
        },
    });
};

interface IAuthEmail {
    onError: (error: IError, variable: emailIFC, context: void | undefined) => void;
    onSuccess: (data: any, variables: emailIFC, context: void) => void;
}
export const useAuthEmailMutation = ({ onError, onSuccess }: IAuthEmail) => {
    return useMutation({
        mutationFn: authEmailApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError,
        onSuccess,
        onSettled: () => {
            console.log("emailAuthEnd");
        },
    });
};

export const useAuthPhoneMutation = (setAuthNumResponse: (value: SetStateAction<string>) => void) => {
    return useMutation({
        mutationFn: authPhoneApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("phoneAuthErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("phoneAuthSuccess", data, variables, context);
            if (data.success) setAuthNumResponse(data.msg);
        },
        onSettled: () => {
            console.log("phoneAuthEnd");
        },
    });
};

interface ISignup {
    onError: (error: IError, variable: signupIFC, context: void | undefined) => void;
}

export const useSignupMutation = ({ onError }: ISignup) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: signupApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError,
        onSuccess: (data, variables, context) => {
            console.log("signupSuccess", data, variables, context);
            if (data.success) {
                setTokenInCookie(data.token);
                console.log(nookies.get(), " : on Success Query Nookies");

                queryClient.invalidateQueries({ queryKey: ["user"] });
                router.push("/");
            }
        },
        onSettled: () => {
            console.log("signupEnd");
        },
    });
};

interface ISignin {
    onError: (error: IError, variable: signinIFC, context: void | undefined) => void;
    onSuccess: (data: any, variables: signinIFC, context: void) => void;
}

export const useSigninMutation = ({ onError, onSuccess }: ISignin) => {
    return useMutation({
        mutationFn: signinApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError,
        onSuccess: (data, variables, context) => {
            if (data.token) {
                try {
                    console.log("Token Exist >>>> ", data);
                    setTokenInCookie(data.token);
                } catch (err) {
                    console.error("Login Mutation Error >>>> ", err);
                }
            }

            if (onSuccess) {
                onSuccess(data, variables, context);
            }
        },
        onSettled: () => {
            cancelBgFixed();
            console.log("signinEnd");
        },
    });
};

export const useReadAlarmMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: readAlaramApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("changeToCloseErr:::", error);
        },
        onSuccess: (mutateData, variables, context) => {
            if (mutateData.success) {
                queryClient.invalidateQueries({ queryKey: ["alarms"] });
            }
        },
        onSettled: () => {
            console.log("changeToCloseEnd");
        },
    });
};
