// Library
import { useCallback, useState } from "react";

// Components
import CButton from "@/components/common/CButton";
import { emailico, nameico, nicknameico, pwcheckico, pwico } from "@/components/common/CIcons";
import CInput from "@/components/common/CInput";
import PhoneAuth from "./PhoneAuth";

// Hooks & Utils
import { useInput } from "@/hooks/useInput";

// Api

// Interface & States
import { useSignupMutation } from "@/hooks/mutations/user";
import { IError } from "@/interfaces/commonIFC";
import { signupIFC } from "@/interfaces/userIFC";

export default function SignupForm() {
    const email = useInput("");
    const password = useInput("");
    const pwCheck = useInput("");
    const name = useInput("");
    const nickname = useInput("");
    const phone = useInput("");

    const [err, setErr] = useState<{ [key: string]: boolean }>({
        email: false,
        pw: false,
        pwCheck: false,
        name: false,
        nickname: false,
        phone: false,
        auth: false,
        authCheck: false,
    });

    const [errMsg, setErrMsg] = useState<{ [key: string]: string }>({
        email: "이메일을 입력해주세요.",
        pw: "비밀번호를 입력해주세요.",
        pwCheck: "비밀번호 확인을 입력해주세요.",
        name: "이름을 입력해주세요.",
        nickname: "닉네임을 입력해주세요.",
        phone: "휴대폰 번호를 입력해주세요.",
        auth: "인증번호를 입력해주세요.",
    });

    const [authCheckErr, setAuthCheckErr] = useState(true);

    const [showAuth, setShowAuth] = useState(false);
    const authNum = useInput("");

    const [authNumResponse, setAuthNumResponse] = useState("00000000");

    const handleErr = (target: string, errMsg: string) => {
        setErr((prev) => ({
            ...prev,
            [target]: true,
        }));

        setErrMsg((prev) => ({
            ...prev,
            [target]: errMsg,
        }));

        return true;
    };

    const signupMutation = useSignupMutation({
        onError: (error: IError, variable, context) => {
            console.error("signupErr:::", error);
            let { msg } = error.response.data;

            setErr((prev) => ({
                ...prev,
                pw: false,
                email: false,
                nickname: false,
                phone: false,
            }));

            if (msg === "이미 존재하는 이메일입니다.") handleErr("email", msg);
            else if (msg === "닉네임은 중복될 수 없습니다.") handleErr("nickname", msg);
            else if (msg === "휴대폰 번호는 중복될 수 없습니다.") handleErr("phone", msg);
            else alert(msg);
        },
    });

    const validation = useCallback(
        (emailVal: string, pwVal: string, pwCheckVal: string, nameVal: string, nicknameVal: string, phoneVal: string) => {
            setErr((prev) =>
                Object.keys(prev).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                }, {} as { [key: string]: boolean })
            );

            let errFlag = false;

            let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            let pwRegex = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,}$/;

            if (emailVal === "") errFlag = handleErr("email", "이메일을 입력해주세요.");
            else if (!emailRegex.test(emailVal)) errFlag = handleErr("email", "이메일 형식을 확인해주세요.");

            if (pwVal === "") errFlag = handleErr("password", "비밀번호를 입력해주세요.");
            else if (!pwRegex.test(pwVal)) errFlag = handleErr("password", "비밀번호는 영문, 숫자, 특수문자 중 2가지 이상 조합하여 8자리 이상으로 입력해주세요.");

            if (pwCheckVal === "") errFlag = handleErr("pwCheck", "비밀번호 확인을 입력해주세요.");
            else if (pwCheckVal !== pwVal) errFlag = handleErr("pwCheck", "비밀번호와 비밀번호 확인은 동일해야합니다.");

            if (nameVal === "") errFlag = handleErr("name", "이름을 입력해주세요.");

            if (nicknameVal === "") errFlag = handleErr("nickname", "닉네임을 입력해주세요.");

            if (phoneVal === "") {
                errFlag = handleErr("phone", "휴대폰 번호를 입력해주세요.");
            } else if (authCheckErr) {
                errFlag = true;
                alert("휴대폰 인증이 필요합니다.");
            } else if (authNum.value === "") errFlag = handleErr("auth", "인증번호를 입력해주세요.");
            else if (authNum.value !== authNumResponse) errFlag = handleErr("auth", "인증번호를 확인해주세요.");

            return errFlag;
        },
        [authCheckErr, authNumResponse, authNum]
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            let emailVal = email.value;
            let pwVal = password.value;
            let pwCheckVal = pwCheck.value;
            let nameVal = name.value;
            let nicknameVal = nickname.value;
            let phoneVal = phone.value;

            if (validation(emailVal, pwVal, pwCheckVal, nameVal, nicknameVal, phoneVal)) return;

            let payload: signupIFC = {
                email: emailVal,
                password: pwVal,
                name: nameVal,
                nickname: nicknameVal,
                phone: phoneVal,
            };

            signupMutation.mutate(payload);
        },
        [email, password, name, nickname, pwCheck, phone, signupMutation, validation]
    );

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <CInput {...email} type="email" placeholder="이메일을 입력해주세요." label="E-Mail" isErr={err.email} errMsg={errMsg.email} isRequired={true}>
                {emailico}
            </CInput>

            <CInput {...password} type="password" placeholder="비밀번호를 입력해주세요." label="Password" isErr={err.pw} errMsg={errMsg.pw} isRequired={true}>
                {pwico}
            </CInput>

            <CInput {...pwCheck} type="password" placeholder="비밀번호 확인을 입력해주세요." label="Password Check" isErr={err.pwCheck} errMsg={errMsg.pwCheck} isRequired={true}>
                {pwcheckico}
            </CInput>

            <CInput {...name} type="text" placeholder="이름을 입력해주세요." label="Name" isErr={err.name} errMsg={errMsg.name} isRequired={true}>
                {nameico}
            </CInput>

            <CInput {...nickname} type="text" placeholder="닉네임을 입력해주세요." label="Nickname" isErr={err.nickname} errMsg={errMsg.nickname} isRequired={true}>
                {nicknameico}
            </CInput>

            <PhoneAuth setAuthNumResponse={setAuthNumResponse} phone={phone} setErr={setErr} setErrMsg={setErrMsg} setShowAuth={setShowAuth} phoneErr={err.phone} phoneErrMsg={errMsg.phone} />
            {showAuth && <CInput {...authNum} placeholder="인증번호를 입력해주세요" type="text" isErr={err.auth} errMsg={errMsg.auth} />}

            <CButton title="SIGN UP" onClick={handleSubmit} type="submit" />
        </form>
    );
}

const styles = {
    container: "flex flex-col gap-4",
};
