"use client";

// Library
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
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

// 공통 스타일 상수
const COMMON_STYLES = {
    flexCenter: "flex justify-center items-center",
    flexCol: "flex flex-col",
    text: {
        sm: "text-sm",
        gray: "text-gray-400",
    },
} as const;

interface ILoginModal {
    setModalOpen: (flag: boolean) => void;
}

interface InputProps {
    label: string;
    type: "email" | "password";
    placeholder: string;
    valueAndOnChange: ReturnType<typeof useInput>;
}

export default function LoginModal({ setModalOpen }: ILoginModal) {
    const email = useInput("");
    const password = useInput("");
    const [error, setError] = useState<{ show: boolean; message: string }>({ show: false, message: "" });

    const router = useRouter();
    const queryClient = useQueryClient();

    const handleClose = useCallback(() => {
        setModalOpen(false);
        cancelBgFixed();
    }, [setModalOpen]);

    const signInMutation = useMutation({
        mutationFn: signinApi,
        onError: (error: IError) => {
            const { msg } = error.response.data;
            setError({
                show: true,
                message: msg === "이메일 또는 비밀번호를 확인해주세요." ? msg : "알 수 없는 이유로 로그인에 실패했습니다.",
            });
        },
        onSuccess: (data) => {
            if (data.success) {
                handleClose();
                setCookie(null, "token", data.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                });
                queryClient.invalidateQueries({ queryKey: ["user"] });
                router.push("/");
            }
        },
        onSettled: cancelBgFixed,
    });

    const validateForm = (email: string, password: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

        if (!email) {
            setError({ show: true, message: "이메일을 입력해주세요." });
            return false;
        }
        if (!emailRegex.test(email)) {
            setError({ show: true, message: "이메일 형식을 확인해주세요." });
            return false;
        }
        if (!password) {
            setError({ show: true, message: "비밀번호를 입력해주세요." });
            return false;
        }
        return true;
    };

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setError({ show: false, message: "" });

            if (!validateForm(email.value, password.value)) return;

            signInMutation.mutate({ email: email.value, password: password.value });
        },
        [email.value, password.value, signInMutation, validateForm]
    );

    return (
        <div className={styles.background}>
            {signInMutation.isPending && <CSpinner />}
            <div className={styles.container}>
                <LoginForm email={email} password={password} error={error} handleSubmit={handleSubmit} />
                <CloseButton onClick={handleClose} />
            </div>
        </div>
    );
}

const LoginForm = ({
    email,
    password,
    error,
    handleSubmit,
}: {
    email: ReturnType<typeof useInput>;
    password: ReturnType<typeof useInput>;
    error: { show: boolean; message: string };
    handleSubmit: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
}) => (
    <div className={styles.wrapper}>
        <div className={styles.header}>Log In To REVIEWERS</div>
        <form onSubmit={handleSubmit} className={styles.form}>
            <FormInput valueAndOnChange={email} label="E-Mail" type="email" placeholder="이메일을 입력해주세요." />
            <FormInput valueAndOnChange={password} label="Password" type="password" placeholder="비밀번호를 입력해주세요." />
            {error.show && <div className={styles.errMsg}>{error.message}</div>}
            <CButton title="SIGN IN" type="submit" onClick={handleSubmit} />
        </form>
        <LoginFooter />
    </div>
);

const FormInput = ({ label, type, placeholder, valueAndOnChange }: InputProps) => (
    <div>
        <div className={styles.label}>{label}</div>
        <CInput {...valueAndOnChange} type={type} placeholder={placeholder}>
            {type === "email" ? emailico : pwico}
        </CInput>
    </div>
);

const LoginFooter = () => (
    <>
        <div className={styles.signupCon}>
            Not a Member?&nbsp;
            <Link href="/register" className={styles.signupLink}>
                Sign Up
            </Link>
        </div>
        <div className={styles.findPwCon}>
            <Link href="/findpw" className={styles.findPwLink}>
                Forgot your password?
            </Link>
        </div>
    </>
);

const CloseButton = ({ onClick }: { onClick: () => void }) => (
    <button className={styles.closeBtn} onClick={onClick} type="button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);

const styles = {
    background: `${COMMON_STYLES.flexCenter} w-screen h-screen fixed top-0 left-0 bg-gray-500 bg-opacity-40 overflow-hidden z-50`,
    container: "relative w-[480px] h-fit py-20 bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex",
    wrapper: `${COMMON_STYLES.flexCol} w-full h-full px-12 justify-center`,
    header: "mb-12 text-2xl font-bold",
    form: `${COMMON_STYLES.flexCol} gap-4`,
    label: "mb-2 font-medium text-sm",
    errMsg: "text-[#ea002c] text-[0.625vw] pl-[0.4167vw] -mt-[0.8vh]",
    inputError: "border-red-500",
    signupCon: `text-center mt-8 ${COMMON_STYLES.text.sm} ${COMMON_STYLES.text.gray}`,
    signupLink: "text-blue-500 hover:underline",
    findPwCon: "text-center mt-2",
    findPwLink: `${COMMON_STYLES.text.sm} ${COMMON_STYLES.text.gray} hover:underline cursor-pointer`,
    closeBtn: "absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all",
} as const;
