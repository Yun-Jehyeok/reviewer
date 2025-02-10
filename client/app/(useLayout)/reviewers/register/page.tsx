"use client";

// Library
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

// Components
import SetTech from "@/components/SetTech";
import SetTextareaContents from "@/components/SetTextareaContents";
import CButton from "@/components/common/CButton";
import CInput from "@/components/common/CInput";
import CSpinner from "@/components/common/CSpinner";
import SetImgs from "./_component/SetImgs";

// Hooks & Utils
import { useInput } from "@/hooks/useInput";
import { checkBlank } from "@/utils/utils";

// Interface & States
import { useRegisterPostMutation } from "@/hooks/mutations/post";
import { registerPostIFC } from "@/interfaces/postIFC";
import { userIFC } from "@/interfaces/userIFC";

export default function RegisterReviewer() {
    const router = useRouter();

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<userIFC>(["user"]);

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

    const registerPostMutation = useRegisterPostMutation();

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
                            userId: user!._id,
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

    if (!user) return null;
    return (
        <div className={styles.container}>
            {registerPostMutation.isPending && <CSpinner />}
            <h1 className={styles.title}>Reviewer 등록</h1>
            <section className={styles.section}>
                <CInput {...title} type="text" label="제목" placeholder="제목을 입력해주세요." isErr={titleErr} errMsg={titleErrmsg} />
                <CInput {...price} type="text" label="시간 당 가격 (원)" placeholder="시간 당 가격을 입력해주세요." />
                <SetTech techErr={techErr} techErrmsg={techErrmsg} setTechs={setTechs} />
                <SetImgs setImgFiles={setImgFiles} />
                <SetTextareaContents label="설명" placeholder="설명을 입력해주세요." contents={description} setContents={setDescription} err={descErr} errmsg={descErrmsg} />

                <div className={styles.registerBtn}>
                    <CButton title="등록하기" onClick={handleSubmit} />
                </div>
            </section>
        </div>
    );
}

const styles = {
    container: "py-12",
    title: "text-center w-full text-3xl font-bold mb-12",
    section: "flex flex-col gap-6",
    registerBtn: "w-full flex justify-end",
};
