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
    const email = useInput("");
    const password = useInput("");

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("이메일 또는 비밀번호를 확인해주세요.");

    const router = useRouter();
    const queryClient = useQueryClient();

    const signInMutation = useMutation({
        mutationFn: signinApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError) => {
            console.error("signinErr:::", error);
            let { msg } = error.response.data;
            if (msg === "이메일 또는 비밀번호를 확인해주세요.") {
                setErr(true);
                setErrMsg(msg);
            } else {
                setErr(false);
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

        if (email === "") {
            setErr(true);
            setErrMsg("이메일을 입력해주세요.");
            return true;
        } else if (!email_regex.test(email)) {
            setErr(true);
            setErrMsg("이메일 형식을 확인해주세요.");
            return true;
        }
        if (pw === "") {
            setErr(true);
            setErrMsg("비밀번호를 입력해주세요.");
            return true;
        }

        return false;
    }, []);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            setErr(false);

            if (validation(email.value, password.value)) return;

            let payload = {
                email: email.value,
                password: password.value,
            };

            signInMutation.mutate(payload);
        },
        [email, password, signInMutation, validation]
    );

    return (
        <div className={styles.background}>
            {signInMutation.isPending && <CSpinner />}

            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>Log In To REVIEWERS</div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <Input valueAndOnChange={email} label="E-Mail" type="email" placeholder="이메일을 입력해주세요." />
                        <Input valueAndOnChange={password} label="Password" type="password" placeholder="비밀번호를 입력해주세요." />

                        {err && <div className={styles.errMsg}>{errMsg}</div>}

                        <CButton title="SIGN IN" type="submit" onClick={handleSubmit} />
                    </form>

                    <Footer setModalOpen={setModalOpen} />
                </div>

                <CloseBtn setModalOpen={setModalOpen} />
            </div>
        </div>
    );
}

const Input = ({
    label,
    type,
    placeholder,
    valueAndOnChange,
}: {
    label: string;
    type: string;
    placeholder: string;
    valueAndOnChange: {
        value: any;
        onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    };
}) => {
    return (
        <div>
            <div className={styles.label}>{label}</div>
            <CInput {...valueAndOnChange} type={type} placeholder={placeholder}>
                {type === "email" ? emailico : pwico}
            </CInput>
        </div>
    );
};

const Footer = ({ setModalOpen }: ILoginModal) => {
    return (
        <div>
            <div className={styles.signupCon}>
                Not a Member?&nbsp;
                <Link
                    href="/register"
                    onClick={() => {
                        setModalOpen(false);
                        cancelBgFixed();
                    }}
                >
                    <span className={styles.signupLink}>Sign Up</span>
                </Link>
            </div>

            <div className={styles.findPwCon}>
                <Link
                    href="/findpw"
                    onClick={() => {
                        setModalOpen(false);
                        cancelBgFixed();
                    }}
                >
                    <span className={styles.findPwLink}>Forgot your password?</span>
                </Link>
            </div>
        </div>
    );
};

const CloseBtn = ({ setModalOpen }: ILoginModal) => {
    return (
        <div
            className={styles.closeBtn}
            onClick={() => {
                setModalOpen(false);
                cancelBgFixed();
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    );
};

const styles = {
    background: "w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden z-50",
    container: "relative w-[480px] h-fit py-20 bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex",
    wrapper: "w-full h-full px-12 flex justify-center flex-col",
    header: "mb-12 text-2xl font-bold",
    form: "flex flex-col gap-4",
    label: "mb-2 font-medium text-sm",
    errMsg: "text-[#ea002c] text-[0.625vw] pl-[0.4167vw] -mt-[0.8vh]",
    signupCon: "text-center mt-8 text-sm text-gray-400",
    signupLink: "text-blue-500",
    findPwCon: "text-center mt-2",
    findPwLink: "text-sm text-gray-400 hover:underline cursor-pointer",
    closeBtn: "absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all",
};
