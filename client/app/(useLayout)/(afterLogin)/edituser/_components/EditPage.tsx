"use client";

// Library
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Components
import CButton from "@/components/common/CButton";
import CInput from "@/components/common/CInput";
import CSpinner from "@/components/common/CSpinner";
import SetTech from "@/components/SetTech";
import SetTextareaContents from "@/components/SetTextareaContents";

// Hooks & Utils
import { useInput } from "@/hooks/useInput";
import { checkBlank } from "@/utils/utils";

// Api

// Interface & States
import { useEditUserMutation } from "@/hooks/mutations/user";
import { useGetUserQuery } from "@/hooks/queries/user";
import { editUserIFC, userIFC } from "@/interfaces/userIFC";

// 상수 정의
const STYLES = {
    container: "py-12",
    title: "w-full text-3xl font-bold mb-6 border-b border-b-gray-200 pb-4",
    formContainer: "flex flex-col gap-6",
    buttonWrapper: "w-full flex justify-end gap-x-2",
} as const;

const FORM_FIELDS = {
    nickname: {
        label: "닉네임",
        placeholder: "닉네임을 입력해주세요.",
        type: "text",
        required: true,
    },
    oneLineIntroduce: {
        label: "한 줄 소개",
        placeholder: "한 줄 소개를 입력해주세요.",
        type: "text",
    },
    price: {
        label: "시간 당 가격 (원)",
        placeholder: "시간 당 가격을 입력해주세요.",
        type: "text",
    },
    introduce: {
        label: "소개",
        placeholder: "소개를 입력해주세요.",
    },
} as const;

export default function EditPage() {
    const router = useRouter();
    // const { data: session } = useSession();
    // console.log("session >>>> ", session?.token);
    // // const [user, setUser] = useState<userIFC | null>(null);
    // const { user, error, isPending: getUserIsPending } = useGetUserQuery(session?.token || "");
    const { user, error, isPending: getUserIsPending } = useGetUserQuery();

    const [introduce, setIntroduce] = useState<string>(user?.introduce || "");
    const [techs, setTechs] = useState<string[]>(user?.lang || []);

    const nickname = useInput(user ? user.nickname : "");
    const price = useInput(user ? user?.price : "");
    const oneLineIntroduce = useInput(user ? user?.oneLineIntroduce : "");

    const [errors, setErrors] = useState({
        nickname: { isError: false, message: "닉네임을 입력해주세요." },
        tech: { isError: false, message: "기술을 하나 이상 입력해주세요." },
        intro: { isError: false, message: "" },
    });

    const editUserMutation = useEditUserMutation();

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            let hasError = false;
            const newErrors = { ...errors };

            if (checkBlank(nickname.value)) {
                newErrors.nickname = { ...newErrors.nickname, isError: true };
                hasError = true;
            }

            if (techs.length < 1) {
                newErrors.tech = { ...newErrors.tech, isError: true };
                hasError = true;
            }

            setErrors(newErrors);
            if (hasError) return;

            const payload: editUserIFC = {
                id: user!._id,
                nickname: nickname.value,
                introduce,
                techs,
                price: price.value,
                oneLineIntroduce: oneLineIntroduce.value,
            };

            editUserMutation.mutate(payload);
        },
        [user, nickname, introduce, price, editUserMutation, techs, oneLineIntroduce, errors]
    );

    const goToProfile = () => {
        router.push("/mypage");
    };

    if (!user) return null;
    return (
        <div className={STYLES.container}>
            {(editUserMutation.isPending || getUserIsPending) && <CSpinner />}
            <h1 className={STYLES.title}>사용자 정보 수정</h1>
            <div className={STYLES.formContainer}>
                <CInput {...nickname} {...FORM_FIELDS.nickname} isErr={errors.nickname.isError} errMsg={errors.nickname.message} />
                <CInput {...oneLineIntroduce} {...FORM_FIELDS.oneLineIntroduce} />
                <CInput {...price} {...FORM_FIELDS.price} />
                <SetTech defaultTechs={user.lang} techErr={errors.tech.isError} techErrmsg={errors.tech.message} setTechs={setTechs} />
                <SetTextareaContents
                    {...FORM_FIELDS.introduce}
                    contents={introduce}
                    setContents={setIntroduce}
                    err={errors.intro.isError}
                    errmsg={errors.intro.message}
                />

                <div className={STYLES.buttonWrapper}>
                    <CButton title="취소" isCancel={true} onClick={goToProfile} />
                    <CButton title="등록하기" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
