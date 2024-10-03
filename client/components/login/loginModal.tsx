"use client";

// Library
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import nookies, { setCookie } from "nookies";
import { useCallback, useState } from "react";

// Hook
import { useInput } from "@/hooks/useInput";

// Component
import CButton from "../common/CButton";
import { emailico, pwico } from "../common/CIcons";
import CInput from "../common/CInput";
import CSpinner from "../common/CSpinner";

// Interface
import { IError } from "@/interfaces/commonIFC";

// Util
import { cancelBgFixed } from "@/utils/utils";

// API
import { signinApi } from "@/apis/userApi";

interface ILoginModal {
    setModalOpen: (flag: boolean) => void;
}

export default function LoginModal({ setModalOpen }: ILoginModal) {
    const [emailErr, setEmailErr] = useState(false);
    const [pwErr, setPwErr] = useState(false);
    const [emailErrMsg, setEmailErrMsg] = useState("이메일을 입력해주세요.");
    const [pwErrMsg, setPwErrMsg] = useState("비밀번호를 입력해주세요.");

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("이메일 또는 비밀번호를 확인해주세요.");

    const router = useRouter();
    const queryClient = useQueryClient();

    const email = useInput("");
    const password = useInput("");

    const signInMutation = useMutation({
        mutationFn: signinApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("signinErr:::", error);
            let { msg } = error.response.data;
            if (msg === "이메일 또는 비밀번호를 확인해주세요.") {
                setEmailErr(false);
                setPwErr(false);
                setErr(true);
                setErrMsg(msg);
            } else {
                setEmailErr(false);
                setPwErr(false);
                alert("알 수 없는 이유로 로그인에 실패했습니다.");
            }
        },
        onSuccess: (data, variables, context) => {
            console.log("signinSuccess", data, variables, context);
            if (data.success) {
                setModalOpen(false);
                setCookie(null, "token", data.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                });
                console.log(nookies.get(), " : on Success Query Nookies");

                queryClient.invalidateQueries({ queryKey: ["user"] });
                router.push("/");
            }
        },
        onSettled: () => {
            cancelBgFixed();
            console.log("signinEnd");
        },
    });

    const validation = useCallback((email: string, pw: string) => {
        let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

        let errFlag = false;
        if (email === "") {
            setEmailErr(true);
            setEmailErrMsg("이메일을 입력해주세요.");
            errFlag = true;
        } else if (!email_regex.test(email)) {
            setEmailErr(true);
            setEmailErrMsg("이메일 형식을 확인해주세요.");
            errFlag = true;
        }

        if (pw === "") {
            setPwErr(true);
            setPwErrMsg("비밀번호를 입력해주세요.");
            errFlag = true;
        }

        return errFlag;
    }, []);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            setEmailErr(false);
            setPwErr(false);

            let emailVal = email.value;
            let pwVal = password.value;

            if (validation(emailVal, pwVal)) return;

            let payload = {
                email: emailVal,
                password: pwVal,
            };

            signInMutation.mutate(payload);
        },
        [email, password, signInMutation, validation]
    );

    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden z-50">
            {signInMutation.isPending && <CSpinner />}

            <div className="relative w-[480px] h-fit py-20 bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex">
                <div className="w-full h-full px-12 flex justify-center flex-col">
                    <div className="mb-12 text-2xl font-bold">Log In To REVIEWERS</div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 font-medium text-sm">E-Mail</div>
                            <CInput {...email} type="email" placeholder="이메일을 입력해주세요." isErr={emailErr} errMsg={emailErrMsg}>
                                {emailico}
                            </CInput>
                        </div>

                        <div>
                            <div className="mb-2 font-medium text-sm">Password</div>
                            <CInput {...password} type="password" placeholder="비밀번호를 입력해주세요." isErr={pwErr} errMsg={pwErrMsg}>
                                {pwico}
                            </CInput>
                        </div>

                        {err && <div className="text-[#ea002c] text-[0.625vw] pl-[0.4167vw] -mt-[0.8vh]">이메일 혹은 비밀번호를 확인해주세요.</div>}

                        <CButton title="SIGN IN" onClick={handleSubmit} type="submit" />
                    </form>

                    <div className="text-center mt-8 text-sm text-gray-400">
                        Not a Member?{" "}
                        <Link
                            href="/register"
                            onClick={() => {
                                setModalOpen(false);
                                cancelBgFixed();
                            }}
                        >
                            <span className="text-blue-500">Sign Up</span>
                        </Link>
                    </div>

                    <div className="text-center mt-2">
                        <Link
                            href="/findpw"
                            onClick={() => {
                                setModalOpen(false);
                                cancelBgFixed();
                            }}
                        >
                            <span className="text-sm text-gray-400 hover:underline cursor-pointer">Forgot your password?</span>
                        </Link>
                    </div>
                </div>

                <div
                    className={`absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all`}
                    onClick={() => {
                        setModalOpen(false);
                        cancelBgFixed();
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
