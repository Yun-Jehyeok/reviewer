"use client";

// Library
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

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
import { editUserApi } from "@/apis/userApi";

// Interface & States
import { editUserIFC } from "@/interfaces/userIFC";
import { userState } from "@/states/userStates";

export default function EditUser() {
    const router = useRouter();

    const [user, setUser] = useRecoilState(userState);

    const [introduce, setIntroduce] = useState<string>(user.introduce);
    const [techs, setTechs] = useState<string[]>([]);

    const nickname = useInput(user.nickname);
    const price = useInput(user.price);
    const oneLineIntroduce = useInput(user.oneLineIntroduce);

    const [nicknameErr, setNicknameErr] = useState<boolean>(false);
    const [techErr, setTechErr] = useState<boolean>(false);
    const [introErr, setIntroErr] = useState<boolean>(false);

    const [nicknameErrmsg, setNicknameErrmsg] = useState<string>("");
    const [techErrmsg, setTechErrmsg] = useState<string>("");
    const [introErrmsg, setIntroErrmsg] = useState<string>("");

    const queryClient = useQueryClient();

    const editUserMutation = useMutation({
        mutationFn: editUserApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error, variable, context) => {
            console.error("editUserErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("editUserSuccess", data, variables, context);
            if (data.success) {
                console.log("Edit Success Data >>>> ", data);
                setUser(data.msg);
                queryClient.invalidateQueries({ queryKey: ["user"] });
                router.push(`/mypage`);
            }
        },
        onSettled: () => {
            console.log("editUserEnd");
        },
    });

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
                id: user._id,
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

    return (
        <div className="py-12">
            {editUserMutation.isPending && <CSpinner />}
            <h1 className="text-center w-full text-3xl font-bold mb-12">사용자 정보 수정</h1>
            <div className="flex flex-col gap-6">
                <CInput {...nickname} type="text" label="닉네임" placeholder="닉네임을 입력해주세요." isErr={nicknameErr} errMsg={nicknameErrmsg} />
                <CInput {...oneLineIntroduce} type="text" label="한 줄 소개" placeholder="한 줄 소개를 입력해주세요." />
                <CInput {...price} type="text" label="시간 당 가격 (원)" placeholder="시간 당 가격을 입력해주세요." />
                <SetTech defaultTechs={user.lang} techErr={techErr} techErrmsg={techErrmsg} setTechs={setTechs} />
                <SetTextareaContents
                    label="소개"
                    placeholder="소개를 입력해주세요."
                    contents={introduce}
                    setContents={setIntroduce}
                    err={introErr}
                    errmsg={introErrmsg}
                />

                <div className="w-full flex justify-end gap-x-5">
                    <CButton title="취소" isCancel={true} onClick={goToProfile} />
                    <CButton title="등록하기" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
