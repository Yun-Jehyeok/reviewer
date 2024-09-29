// Library
import { ChangeEvent, Dispatch, SetStateAction } from "react";

// Components
import CButton from "@/components/common/CButton";
import { phoneico } from "@/components/common/CIcons";
import CInput from "@/components/common/CInput";

// Hooks & Utils

// Api

// Interface & States
import { useAuthPhoneMutation } from "@/hooks/mutations/user";

interface IProps {
    phone: {
        value: any;
        onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    };
    setAuthNumResponse: Dispatch<SetStateAction<string>>;
    setPhoneErr: Dispatch<SetStateAction<boolean>>;
    setPhoneErrMsg: Dispatch<SetStateAction<string>>;
    setAuthCheckErr: Dispatch<SetStateAction<boolean>>;
    setShowAuth: Dispatch<SetStateAction<boolean>>;
    phoneErr: boolean;
    phoneErrMsg: string;
}

export default function PhoneAuth({ setAuthNumResponse, phone, setPhoneErr, setPhoneErrMsg, setAuthCheckErr, setShowAuth, phoneErr, phoneErrMsg }: IProps) {
    const phoneMutation = useAuthPhoneMutation(setAuthNumResponse);

    const handleAuth = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let phoneVal = phone.value;

        if (phoneVal === "") {
            setPhoneErr(true);
            setPhoneErrMsg("휴대폰 번호를 입력해주세요.");
        } else {
            setAuthCheckErr(false);
            setShowAuth(true);
            setAuthNumResponse("00000000");

            phoneMutation.mutate({ phone: phoneVal });
        }
    };

    return (
        <div>
            <div className="w-full flex gap-4">
                <div className="flex-1">
                    <CInput {...phone} type="text" placeholder="휴대폰 번호를 입력해주세요." label="Phone" isErr={phoneErr} isRequired={true}>
                        {phoneico}
                    </CInput>
                </div>

                <div className={`w-fit flex flex-col justify-end ${phoneErr && "relative -top-1"}`}>
                    <CButton title="인증하기" onClick={handleAuth} />
                </div>
            </div>

            {phoneErr && <div className="text-[#ea002c] text-xs mt-1 pl-4">{phoneErrMsg}</div>}
        </div>
    );
}
