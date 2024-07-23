// Library
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";

// Components
import CButton from "@/components/common/CButton";
import CInput from "@/components/common/CInput";

// Hooks & Utils
import { useInput } from "@/hooks/useInput";
import { checkBlank } from "@/utils/utils";

// Api
import { changePwApi } from "@/apis/userApi";

// Interface & States
import { IError } from "@/interfaces/commonIFC";

/**
 * Props
 * @param authNumResponse: 서버에서 받아온 6자리 인증번호[string];
 * @param email: 사용자가 입력한 이메일값[string];
 */

interface IProps {
    authNumResponse: string;
    email: string;
}

// 인증번호를 왜 여기서 체크하는지 모르겠네...? SendAuthEmail 컴포넌트로 넘길것
export default function EditPassword({ email, authNumResponse }: IProps) {
    const router = useRouter();

    const [authErr, setAuthErr] = useState(false);

    const authNum = useInput("");
    const password = useInput("");

    const [isErr, setIsErr] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("");

    const changePwMutation = useMutation({
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

    const onChangePw = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            setIsErr(false);
            setAuthErr(false);

            if (checkBlank(authNum.value, setAuthErr, "인증번호를 입력해주세요.", setErrMsg)) {
                return;
            }
            if (authNumResponse !== authNum.value) {
                setAuthErr(true);
                setErrMsg("인증번호를 확인해주세요.");
                return;
            }
            if (checkBlank(password.value, setIsErr, "비밀번호를 입력해주세요.", setErrMsg)) {
                return;
            }
            let pwRegex = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,}$/;
            if (!pwRegex.test(password.value)) {
                setIsErr(true);
                setErrMsg("비밀번호는 영문, 숫자, 특수문자 중 2가지 이상 조합하여 8자리 이상으로 입력해주세요.");
                return;
            }

            changePwMutation.mutate({ email, password: password.value });
        },
        [changePwMutation, email, password, authNum, authNumResponse]
    );

    return (
        <div className="w-[640px] h-fit bg-white shadow-lg rounded-lg flex p-20">
            <div className="w-full">
                <div className="text-center text-4xl font-bold mb-12">비밀번호 변경</div>
                <form className="flex flex-col gap-4" onSubmit={onChangePw}>
                    <CInput {...authNum} label="인증번호" placeholder="인증번호를 입력해주세요." type="text" isErr={authErr} errMsg={errMsg} />
                    <CInput {...password} label="비밀번호" placeholder="변경할 비밀번호를 입력해주세요." type="password" isErr={isErr} errMsg={errMsg} />
                    <CButton title="비밀번호 변경" onClick={onChangePw} />
                </form>
            </div>
        </div>
    );
}
