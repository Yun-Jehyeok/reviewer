// Library
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

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
    const router = useRouter();

    const email = useInput("");
    const password = useInput("");
    const pwCheck = useInput("");
    const name = useInput("");
    const nickname = useInput("");
    const phone = useInput("");

    const [emailErr, setEmailErr] = useState(false);
    const [pwErr, setPwErr] = useState(false);
    const [pwCheckErr, setPwCheckErr] = useState(false);
    const [nameErr, setNameErr] = useState(false);
    const [nicknameErr, setNicknameErr] = useState(false);
    const [phoneErr, setPhoneErr] = useState(false);
    const [authErr, setAuthErr] = useState(false);
    const [authCheckErr, setAuthCheckErr] = useState(true);

    const [emailErrMsg, setEmailErrMsg] = useState("이메일을 입력해주세요.");
    const [pwErrMsg, setPwErrMsg] = useState("비밀번호를 입력해주세요.");
    const [pwCheckErrMsg, setPwCheckErrMsg] = useState("비밀번호 확인을 입력해주세요.");
    const [nameErrMsg, setNameErrMsg] = useState("이름을 입력해주세요.");
    const [nicknameErrMsg, setNicknameErrMsg] = useState("닉네임을 입력해주세요.");
    const [phoneErrMsg, setPhoneErrMsg] = useState("휴대폰 번호를 입력해주세요.");
    const [authErrMsg, setAuthErrMsg] = useState("인증번호를 입력해주세요.");

    const [showAuth, setShowAuth] = useState(false);
    const authNum = useInput("");

    const [authNumResponse, setAuthNumResponse] = useState("00000000");

    const handleSubmitErr = (errFunc: Dispatch<SetStateAction<boolean>>, errMsgFunc: Dispatch<SetStateAction<string>>, errMsg: string) => {
        setPwErr(false);
        setEmailErr(false);
        setNicknameErr(false);
        setPhoneErr(false);

        errFunc(true);
        errMsgFunc(errMsg);
    };

    const signupMutation = useSignupMutation({
        onError: (error: IError, variable, context) => {
            console.error("signupErr:::", error);
            let { msg } = error.response.data;

            if (msg === "이미 존재하는 이메일입니다.") handleSubmitErr(setEmailErr, setEmailErrMsg, msg);
            else if (msg === "닉네임은 중복될 수 없습니다.") handleSubmitErr(setNicknameErr, setNicknameErrMsg, msg);
            else if (msg === "휴대폰 번호는 중복될 수 없습니다.") handleSubmitErr(setPhoneErr, setPhoneErrMsg, msg);
            else alert(msg);
        },
    });

    const handleErr = (errFunc: Dispatch<SetStateAction<boolean>>, errMsgFunc: Dispatch<SetStateAction<string>>, errMsg: string) => {
        errFunc(true);
        errMsgFunc(errMsg);

        return true;
    };

    const validation = useCallback(
        (emailVal: string, pwVal: string, pwCheckVal: string, nameVal: string, nicknameVal: string, phoneVal: string) => {
            setEmailErr(false);
            setPwErr(false);
            setPwCheckErr(false);
            setNameErr(false);
            setNicknameErr(false);
            setPhoneErr(false);
            setAuthErr(false);

            let errFlag = false;

            let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            let pwRegex = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,}$/;

            if (emailVal === "") errFlag = handleErr(setEmailErr, setEmailErrMsg, "이메일을 입력해주세요.");
            else if (!emailRegex.test(emailVal)) errFlag = handleErr(setEmailErr, setEmailErrMsg, "이메일 형식을 확인해주세요.");

            if (pwVal === "") errFlag = handleErr(setPwErr, setPwErrMsg, "비밀번호를 입력해주세요.");
            else if (!pwRegex.test(pwVal)) errFlag = handleErr(setPwErr, setPwErrMsg, "비밀번호는 영문, 숫자, 특수문자 중 2가지 이상 조합하여 8자리 이상으로 입력해주세요.");

            if (pwCheckVal === "") errFlag = handleErr(setPwCheckErr, setPwCheckErrMsg, "비밀번호 확인을 입력해주세요.");
            else if (pwCheckVal !== pwVal) errFlag = handleErr(setPwCheckErr, setPwCheckErrMsg, "비밀번호와 비밀번호 확인은 동일해야합니다.");

            if (nameVal === "") errFlag = handleErr(setNameErr, setNameErrMsg, "이름을 입력해주세요.");

            if (nicknameVal === "") errFlag = handleErr(setNicknameErr, setNicknameErrMsg, "닉네임을 입력해주세요.");

            if (phoneVal === "") {
                errFlag = handleErr(setPhoneErr, setPhoneErrMsg, "휴대폰 번호를 입력해주세요.");
            } else if (authCheckErr) {
                errFlag = true;
                alert("휴대폰 인증이 필요합니다.");
            } else if (authNum.value === "") errFlag = handleErr(setAuthErr, setAuthErrMsg, "인증번호를 입력해주세요.");
            else if (authNum.value !== authNumResponse) errFlag = handleErr(setAuthErr, setAuthErrMsg, "인증번호를 확인해주세요.");

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CInput {...email} type="email" placeholder="이메일을 입력해주세요." label="E-Mail" isErr={emailErr} errMsg={emailErrMsg} isRequired={true}>
                {emailico}
            </CInput>

            <CInput {...password} type="password" placeholder="비밀번호를 입력해주세요." label="Password" isErr={pwErr} errMsg={pwErrMsg} isRequired={true}>
                {pwico}
            </CInput>

            <CInput {...pwCheck} type="password" placeholder="비밀번호 확인을 입력해주세요." label="Password Check" isErr={pwCheckErr} errMsg={pwCheckErrMsg} isRequired={true}>
                {pwcheckico}
            </CInput>

            <CInput {...name} type="text" placeholder="이름을 입력해주세요." label="Name" isErr={nameErr} errMsg={nameErrMsg} isRequired={true}>
                {nameico}
            </CInput>

            <CInput {...nickname} type="text" placeholder="닉네임을 입력해주세요." label="Nickname" isErr={nicknameErr} errMsg={nicknameErrMsg} isRequired={true}>
                {nicknameico}
            </CInput>

            <PhoneAuth
                setAuthNumResponse={setAuthNumResponse}
                phone={phone}
                setPhoneErr={setPhoneErr}
                setPhoneErrMsg={setPhoneErrMsg}
                setAuthCheckErr={setAuthCheckErr}
                setShowAuth={setShowAuth}
                phoneErr={phoneErr}
                phoneErrMsg={phoneErrMsg}
            />
            {showAuth && <CInput {...authNum} placeholder="인증번호를 입력해주세요" type="text" isErr={authErr} errMsg={authErrMsg} />}

            <CButton title="SIGN UP" onClick={handleSubmit} type="submit" />
        </form>
    );
}
