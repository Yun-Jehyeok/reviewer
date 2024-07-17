"use client";

// Library
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

// Components
import CButton from "@/components/common/CButton";
import CInput from "@/components/common/CInput";
import CSpinner from "@/components/common/CSpinner";
import SetDescription from "./_component/SetDescription/page";
import SetImgs from "./_component/SetImgs/page";
import SetTech from "./_component/SetTech/page";

// Hooks & Utils
import { useInput } from "@/hooks/useInput";
import { checkBlank } from "@/utils/utils";

// Api
import { registerPostApi } from "@/apis/postApi";

// Interface & States
import { registerPostIFC } from "@/interfaces/postIFC";
import { userState } from "@/states/userStates";

export default function RegisterReviewer() {
    const router = useRouter();

    const [user, setUser] = useRecoilState(userState);

    // Value - [S] -
    const [description, setDescription] = useState<string>("");
    const [techs, setTechs] = useState<string[]>([]);
    const [imgFiles, setImgFiles] = useState<File[]>([]);

    const title = useInput("");
    const price = useInput(0);
    // Value - [E] -

    // Error - [S] -
    const [titleErr, setTitleErr] = useState<boolean>(false);
    const [techErr, setTechErr] = useState<boolean>(false);
    const [descErr, setDescErr] = useState<boolean>(false);

    const [titleErrmsg, setTitleErrmsg] = useState<string>("");
    const [techErrmsg, setTechErrmsg] = useState<string>("");
    const [descErrmsg, setDescErrmsg] = useState<string>("");
    // Error - [E] -

    const registerPostMutation = useMutation({
        mutationFn: registerPostApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error, variable, context) => {
            console.error("registerPostErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("registerPostSuccess", data, variables, context);
            if (data.success) router.push(`/reviewers/${data.id}`);
        },
        onSettled: () => {
            console.log("registerPostEnd");
        },
    });

    const checkErrs = useCallback(() => {
        let errFlag = false;
        if (checkBlank(title.value, setTitleErr, "제목을 입력해주세요.", setTitleErrmsg)) errFlag = true;
        if (checkBlank(description, setDescErr, "설명을 입력해주세요.", setDescErrmsg)) errFlag = true;

        if (techs.length < 1) {
            setTechErr(true);
            setTechErrmsg("기술을 하나 이상 입력해주세요.");
            errFlag = true;
        }

        return errFlag;
    }, [description, title, techs]);

    const setUploadImgRequest = useCallback(() => {
        const formData = new FormData();
        if (Array.isArray(imgFiles) && imgFiles.length > 0) {
            imgFiles.map((item) => {
                formData.append("image", item, item.name);
            });
        }

        let requestOptions = {
            method: "POST",
            body: formData,
        };

        return requestOptions;
    }, [imgFiles]);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            if (checkErrs()) return;

            // Save Imgs to s3
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/image`, setUploadImgRequest())
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        let payload: registerPostIFC = {
                            userId: user._id,
                            title: title.value,
                            content: description,
                            lang: techs,
                            price: price.value,
                            imgs: data.url,
                        };

                        console.log("registerPayload:::", payload);

                        // Save Post
                        registerPostMutation.mutate(payload);
                    }
                })
                .catch((error) => console.log("error", error));
        },
        [title, description, techs, registerPostMutation, price, user, checkErrs, setUploadImgRequest]
    );

    return (
        <div className="py-12">
            {registerPostMutation.isPending && <CSpinner />}
            <h1 className="text-center w-full text-3xl font-bold mb-12">Reviewer 등록</h1>
            <div className="flex flex-col gap-6">
                <CInput {...title} type="text" label="제목" placeholder="제목을 입력해주세요." isErr={titleErr} errMsg={titleErrmsg} />
                <CInput {...price} type="text" label="시간 당 가격 (원)" placeholder="시간 당 가격을 입력해주세요." />
                <SetTech techErr={techErr} techErrmsg={techErrmsg} setTechs={setTechs} />
                <SetImgs setImgFiles={setImgFiles} />
                <SetDescription description={description} setDescription={setDescription} descErr={descErr} descErrmsg={descErrmsg} />

                <div className="w-full flex justify-end">
                    <CButton title="등록하기" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
