// Library
import { useCallback, useState } from "react";

// Components
import CButton from "@/components/common/CButton";
import CInput from "@/components/common/CInput";

// Hooks & Utils
import { useInput } from "@/hooks/useInput";
import { checkBlank } from "@/utils/utils";

// Api

// Interface & States
import { useEditPwMutation } from "@/hooks/mutations/user";

/**
 * Props
 * @param email: 사용자가 입력한 이메일값[string];
 */

interface IProps {
    email: string;
}

export default function EditPassword({ email }: IProps) {
    const password = useInput("");

    const [isErr, setIsErr] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("");

    const editPwMutation = useEditPwMutation();

    const onChangePw = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            setIsErr(false);

            if (checkBlank(password.value, setIsErr, "비밀번호를 입력해주세요.", setErrMsg)) {
                return;
            }
            let pwRegex = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,}$/;
            if (!pwRegex.test(password.value)) {
                setIsErr(true);
                setErrMsg("비밀번호는 영문, 숫자, 특수문자 중 2가지 이상 조합하여 8자리 이상으로 입력해주세요.");
                return;
            }

            editPwMutation.mutate({ email, password: password.value });
        },
        [editPwMutation, email, password]
    );

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.title}>비밀번호 변경</div>
                <form className={styles.form} onSubmit={onChangePw}>
                    <CInput {...password} label="비밀번호" placeholder="변경할 비밀번호를 입력해주세요." type="password" isErr={isErr} errMsg={errMsg} />
                    <CButton title="비밀번호 변경" onClick={onChangePw} />
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: "w-[640px] h-fit bg-white shadow-lg rounded-lg flex p-20",
    wrapper: "w-full",
    title: "text-center text-4xl font-bold mb-12",
    form: "flex flex-col gap-4",
};
