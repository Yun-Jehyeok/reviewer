"use client";

// Library
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

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
import { editUserIFC, userIFC } from "@/interfaces/userIFC";

export default function EditUser() {
    const router = useRouter();

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<userIFC>(["user"]);

    const [introduce, setIntroduce] = useState<string>(user?.introduce || "");
    const [techs, setTechs] = useState<string[]>([]);

    const nickname = useInput(user ? user.nickname : "");
    const price = useInput(user ? user?.price : "");
    const oneLineIntroduce = useInput(user ? user?.oneLineIntroduce : "");

    const [nicknameErr, setNicknameErr] = useState<boolean>(false);
    const [techErr, setTechErr] = useState<boolean>(false);
    const [introErr, setIntroErr] = useState<boolean>(false);

    const [nicknameErrmsg, setNicknameErrmsg] = useState<string>("");
    const [techErrmsg, setTechErrmsg] = useState<string>("");
    const [introErrmsg, setIntroErrmsg] = useState<string>("");

    const editUserMutation = useEditUserMutation();

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            let errFlag = false;
            if (checkBlank(nickname.value, setNicknameErr, "닉네임을 입력해주세요.", setNicknameErrmsg)) errFlag = true;

            if (techs.length < 1) {
                setTechErr(true);
                setTechErrmsg("기술을 하나 이상 입력해주세요.");
                errFlag = true;
            }

            if (errFlag) return;

            let payload: editUserIFC = {
                id: user!._id,
                nickname: nickname.value,
                introduce: introduce,
                techs: techs,
                price: price.value,
                oneLineIntroduce: oneLineIntroduce.value,
            };

            editUserMutation.mutate(payload);
        },
        [user, nickname, introduce, price, editUserMutation, techs, oneLineIntroduce]
    );

    const goToProfile = () => {
        router.push("/mypage");
    };

    if (!user) return null;
    return (
        <div className="py-12">
            {editUserMutation.isPending && <CSpinner />}
            <h1 className="text-center w-full text-3xl font-bold mb-12">사용자 정보 수정</h1>
            <div className="flex flex-col gap-6">
                <CInput {...nickname} type="text" label="닉네임" placeholder="닉네임을 입력해주세요." isErr={nicknameErr} errMsg={nicknameErrmsg} />
                <CInput {...oneLineIntroduce} type="text" label="한 줄 소개" placeholder="한 줄 소개를 입력해주세요." />
                <CInput {...price} type="text" label="시간 당 가격 (원)" placeholder="시간 당 가격을 입력해주세요." />
                <SetTech defaultTechs={user.lang} techErr={techErr} techErrmsg={techErrmsg} setTechs={setTechs} />
                <SetTextareaContents label="소개" placeholder="소개를 입력해주세요." contents={introduce} setContents={setIntroduce} err={introErr} errmsg={introErrmsg} />

                <div className="w-full flex justify-end gap-x-2">
                    <CButton title="취소" isCancel={true} onClick={goToProfile} />
                    <CButton title="등록하기" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
