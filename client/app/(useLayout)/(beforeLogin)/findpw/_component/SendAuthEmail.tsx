// Library
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";

// Components
import CButton from "@/components/common/CButton";
import CInput from "@/components/common/CInput";
import CSpinner from "@/components/common/CSpinner";

// Hooks & Utils
import { checkBlank } from "@/utils/utils";

// Api

// Interface & States
import { useAuthEmailMutation } from "@/hooks/mutations/user";
import { useInput } from "@/hooks/useInput";
import { IError } from "@/interfaces/commonIFC";

/**
 * Props
 * @param setShowAuth: 인증 완료 체크 Func[setState[string]];
 * @param setAuthNumResponse: 서버에서 받아온 6자리 값을 넘겨줄 Func[setState[string]]
 * @param email: 이메일 useInput[typeof useInput];
 */
interface IProps {
    email: {
        value: any;
        onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    };
    setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export default function SendAuthEmail({ email, setIsAuth }: IProps) {
    const [isErr, setIsErr] = useState(false);
    const [errMsg, setErrMsg] = useState("비밀번호를 입력해주세요.");

    const [showAuth, setShowAuth] = useState(false);
    const [authNumResponse, setAuthNumResponse] = useState("00000000");
    const authNum = useInput("");
    const [authErr, setAuthErr] = useState(false);
    const [authErrMsg, setAuthErrMsg] = useState("인증번호를 입력해주세요.");

    const authEmailMutation = useAuthEmailMutation({
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

            authEmailMutation.mutate({ email: email.value });
        },
        [email, authEmailMutation]
    );

    const checkAuth = () => {
        setAuthErr(false);

        if (authNum.value === "") {
            setAuthErr(true);
            setAuthErrMsg("인증번호를 입력해주세요.");
            return;
        }

        if (authNum.value !== authNumResponse) {
            setAuthErr(true);
            setAuthErrMsg("인증번호를 확인해주세요.");
            return;
        }

        setIsAuth(true);
    };

    return (
        <div>
            {authEmailMutation.isPending && <CSpinner />}

            <div className={styles.title}>비밀번호를 찾을 이메일을 입력해주세요</div>
            <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <CInput {...email} placeholder="이메일을 입력해주세요." type="email" isErr={isErr} errMsg={errMsg} />
                <div className={styles.sendEmailBtn}>
                    <CButton title="인증번호 전송" isFull={true} onClick={sendEmail} />
                </div>
            </form>

            {showAuth && <AuthenticationForm authNum={authNum} authErr={authErr} authErrMsg={authErrMsg} checkAuth={checkAuth} />}
        </div>
    );
}

const AuthenticationForm = ({
    authNum,
    authErr,
    authErrMsg,
    checkAuth,
}: {
    authNum: { value: string; onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void };
    authErr: boolean;
    authErrMsg: string;
    checkAuth: () => void;
}) => {
    return (
        <div className={styles.authInput}>
            <CInput {...authNum} placeholder="인증번호를 입력해주세요." type="text" isErr={authErr} errMsg={authErrMsg} />
            <CButton title="인증하기" isFull={true} onClick={checkAuth} />
        </div>
    );
};

const styles = {
    title: "text-lg font-bold mb-4 text-center",
    form: "flex gap-2",
    sendEmailBtn: "h-10 w-52",
    authInput: "flex flex-col gap-2 mt-4",
};
