// Library
import { useCallback, useState } from "react";

// Components
import CButton from "@/components/common/CButton";
import { emailico, nameico, nicknameico, pwcheckico, pwico } from "@/components/common/CIcons";
import CInput from "@/components/common/CInput";
import PhoneAuth from "./PhoneAuth";

// Hooks & Utils
import { useInput } from "@/hooks/useInput";

// Interface & States
import { useSignupMutation } from "@/hooks/mutations/user";
import { IError } from "@/interfaces/commonIFC";

const REGEX = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
    password: /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,}$/,
};

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
        onError: (error: IError) => {
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

    const validation = ({ email, password, pwCheck, name, nickname, phone }: { email: string; password: string; pwCheck: string; name: string; nickname: string; phone: string }) => {
        // 모든 에러 상태 초기화
        setErr((prev) => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}));

        const validations = [
            // 이메일 검증
            {
                condition: !email,
                field: "email",
                message: "이메일을 입력해주세요.",
            },
            {
                condition: email && !REGEX.email.test(email),
                field: "email",
                message: "이메일 형식을 확인해주세요.",
            },

            // 비밀번호 검증
            {
                condition: !password,
                field: "password",
                message: "비밀번호를 입력해주세요.",
            },
            {
                condition: password && !REGEX.password.test(password),
                field: "password",
                message: "비밀번호는 영문, 숫자, 특수문자 중 2가지 이상 조합하여 8자리 이상으로 입력해주세요.",
            },

            // 비밀번호 확인 검증
            {
                condition: !pwCheck,
                field: "pwCheck",
                message: "비밀번호 확인을 입력해주세요.",
            },
            {
                condition: pwCheck && pwCheck !== password,
                field: "pwCheck",
                message: "비밀번호와 비밀번호 확인은 동일해야합니다.",
            },

            // 이름 검증
            {
                condition: !name,
                field: "name",
                message: "이름을 입력해주세요.",
            },

            // 닉네임 검증
            {
                condition: !nickname,
                field: "nickname",
                message: "닉네임을 입력해주세요.",
            },

            // 휴대폰 및 인증 검증
            {
                condition: !phone,
                field: "phone",
                message: "휴대폰 번호를 입력해주세요.",
            },
            {
                condition: phone && authCheckErr,
                field: "phone",
                message: "휴대폰 인증이 필요합니다.",
                customHandler: () => alert("휴대폰 인증이 필요합니다."),
            },
            {
                condition: phone && !authCheckErr && !authNum.value,
                field: "auth",
                message: "인증번호를 입력해주세요.",
            },
            {
                condition: phone && !authCheckErr && authNum.value && authNum.value !== authNumResponse,
                field: "auth",
                message: "인증번호를 확인해주세요.",
            },
        ];

        // 유효성 검사 실행
        for (const validation of validations) {
            if (validation.condition) {
                if (validation.customHandler) {
                    validation.customHandler();
                }
                handleErr(validation.field, validation.message);
                return true;
            }
        }

        return false;
    };

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            const formValues = {
                email: email.value,
                password: password.value,
                pwCheck: pwCheck.value,
                name: name.value,
                nickname: nickname.value,
                phone: phone.value,
            } as const;

            if (validation(formValues)) return;

            const { pwCheck: _, ...payload } = formValues;
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
