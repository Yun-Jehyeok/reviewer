// Library
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";

// Components
import CButton from "@/components/common/CButton";
import CInput from "@/components/common/CInput";
import CSpinner from "@/components/common/CSpinner";

// Hooks & Utils
import { checkBlank } from "@/utils/utils";

// Api
import { authEmailApi } from "@/apis/userApi";

// Interface & States
import { IError } from "@/interfaces/commonIFC";

/**
 * Props
 * @param setShowAuth: 인증 완료 체크 Func[setState[string]];
 * @param setAuthNumResponse: 서버에서 받아온 6자리 값을 넘겨줄 Func[setState[string]]
 * @param email: 이메일 useInput[typeof useInput];
 */
interface IProps {
    setShowAuth: Dispatch<SetStateAction<boolean>>;
    setAuthNumResponse: Dispatch<SetStateAction<string>>;
    email: {
        value: any;
        onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    };
}

export default function SendAuthEmail({ email, setShowAuth, setAuthNumResponse }: IProps) {
    const [isErr, setIsErr] = useState(false);
    const [errMsg, setErrMsg] = useState("비밀번호를 입력해주세요.");

    const emailMutation = useMutation({
        mutationFn: authEmailApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("emailAuthErr:::", error.response.data.msg);
            setIsErr(true);
            setErrMsg(error.response.data.msg);
        },
        onSuccess: (data, variables, context) => {
            console.log("emailAuthSuccess", data, variables, context);
            if (data.success) {
                setIsErr(false);
                setShowAuth(true);
                setAuthNumResponse(data.msg);
            }
        },
        onSettled: () => {
            console.log("emailAuthEnd");
        },
    });

    const sendEmail = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            setIsErr(false);

            let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

            if (checkBlank(email.value, setIsErr, "이메일을 입력해주세요.", setErrMsg)) {
                return;
            }
            if (!emailRegex.test(email.value)) {
                setIsErr(true);
                setErrMsg("이메일 형식을 확인해주세요.");
                return;
            }

            emailMutation.mutate({ email: email.value });
        },
        [email, emailMutation]
    );

    return (
        <div>
            {emailMutation.isPending && <CSpinner />}

            <div className="text-lg font-bold mb-4 text-center">비밀번호를 찾을 이메일을 입력해주세요</div>
            <form className="flex gap-2" onSubmit={sendEmail}>
                <CInput {...email} placeholder="이메일을 입력해주세요." type="email" isErr={isErr} errMsg={errMsg} />
                <div className="h-10 w-52">
                    <CButton title="인증번호 전송" onClick={sendEmail} />
                </div>
            </form>
        </div>
    );
}
