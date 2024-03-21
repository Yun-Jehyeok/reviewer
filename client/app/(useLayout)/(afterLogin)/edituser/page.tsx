"use client";

import { useInput } from "@/hooks/useInput";
import { userState } from "@/states/userStates";
import { checkBlank } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";

// IFC
import { editUserIFC } from "@/interfaces/userIFC";

// API
import { editUserApi } from "@/apis/userApi";

// Css
import "react-quill/dist/quill.snow.css";
import "./quillset.css";

// Component
import CButton from "@/components/common/CButton";
import CInput from "@/components/common/CInput";
import CSpinner from "@/components/common/CSpinner";

const QuillWrapper = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <CSpinner />,
});

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
    ],
    clipboard: {
        matchVisual: false,
    },
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
];

const allTechs = [
    "C",
    "C++",
    "C#",
    "Dart",
    "Go",
    "Java",
    "JSP",
    "JavaScript",
    "Kotlin",
    "Objective-C",
    "PHP",
    "Python",
    "R",
    "Ruby",
    "Swift",
    "React",
    "React Native",
    "Spring",
    "Spring Boot",
    "Django",
    "Flask",
    ".NET",
    "Node.js",
    "Express.js",
    "NestJS",
    "Angular",
    "Vue.js",
    "Android",
    "Electron",
    "...other",
];

export default function EditUser() {
    const router = useRouter();

    const [user, setUser] = useRecoilState(userState);

    const [introduce, setIntroduce] = useState<string>(user.introduce);
    const [techs, setTechs] = useState<string[]>([]);

    const nickname = useInput(user.nickname);
    const price = useInput(user.price);
    const oneLineIntroduce = useInput(user.oneLineIntroduce);
    const [techVal, setTechVal] = useState<string>("");
    const [filteredTechs, setFilteredTechs] = useState<string[]>([]);

    const [nicknameErr, setNicknameErr] = useState<boolean>(false);
    const [techErr, setTechErr] = useState<boolean>(false);

    const [nicknameErrmsg, setNicknameErrmsg] = useState<string>("");
    const [techErrmsg, setTechErrmsg] = useState<string>("");

    const queryClient = useQueryClient();

    const addTech = (val: string) => {
        if (techs.includes(val)) return;

        let data = techs;

        if (val.indexOf("...") >= 0) data.push(techVal);
        else data.push(val);

        setTechErrmsg("");
        setTechs(data);
        setFilteredTechs([]);
        setTechVal("");
    };

    const searchTech = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.currentTarget.value;
        setTechVal(val);

        let filtered: string[] = [];
        if (val !== "")
            filtered = allTechs.filter(
                (v) =>
                    v.toLocaleLowerCase().match(val.toLocaleLowerCase()) ||
                    v === "...other"
            );
        else filtered = [];

        setFilteredTechs(filtered);
    };

    const removeTech = (val: string) => {
        let data = techs.filter((v) => v !== val);
        setTechs(data);
    };

    useEffect(() => {
        setTechs(user.lang);
    }, []);

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
        (
            e:
                | React.FormEvent<HTMLFormElement>
                | React.MouseEvent<HTMLButtonElement>
        ) => {
            e.preventDefault();

            let errFlag = false;
            if (
                checkBlank(
                    nickname.value,
                    setNicknameErr,
                    "닉네임을 입력해주세요.",
                    setNicknameErrmsg
                )
            )
                errFlag = true;

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
        [
            user,
            nickname,
            introduce,
            price,
            editUserMutation,
            techs,
            oneLineIntroduce,
        ]
    );

    const goToProfile = () => {
        router.push("/mypage");
    };

    return (
        <div className="py-12">
            {editUserMutation.isPending && <CSpinner />}
            <h1 className="text-center w-full text-3xl font-bold mb-12">
                사용자 정보 수정
            </h1>
            <div className="flex flex-col gap-6">
                <CInput
                    {...nickname}
                    type="text"
                    label="닉네임"
                    placeholder="닉네임을 입력해주세요."
                    isErr={nicknameErr}
                    errMsg={nicknameErrmsg}
                />
                <CInput
                    {...oneLineIntroduce}
                    type="text"
                    label="한 줄 소개"
                    placeholder="한 줄 소개를 입력해주세요."
                />
                <CInput
                    {...price}
                    type="text"
                    label="시간 당 가격 (원)"
                    placeholder="시간 당 가격을 입력해주세요."
                />
                <div className="relative">
                    <div className="mb-2 font-medium text-sm ">기술</div>
                    <div
                        className={`w-full h-10 rounded-md border ${
                            techErr ? "border-[#ea002c]" : "border-gray-400"
                        } px-4`}
                    >
                        <input
                            className="w-full h-full border-none text-sm focus:outline-none"
                            value={techVal}
                            type="text"
                            placeholder="사용 가능한 기술을 입력해주세요."
                            onChange={searchTech}
                        />
                        {techErr && (
                            <div className="text-[#ea002c] text-xs mt-1">
                                {techErrmsg}
                            </div>
                        )}
                    </div>

                    {filteredTechs.length > 0 && (
                        <div className="absolute top-[68px] left-0 z-[10] w-full mt-2 border border-gray-200 rounded-md bg-white">
                            {filteredTechs.map((v) => (
                                <div
                                    key={v}
                                    className="w-full bg-white hover:bg-gray-100 cursor-pointer py-2 px-4 rounded-md text-sm"
                                    onClick={() => addTech(v)}
                                >
                                    {v}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-4 mt-4">
                        {techs.map((v) => (
                            <div
                                key={v}
                                className="w-fit h-10 bg-gray-100 rounded-full flex justify-end items-center px-4 gap-8 cursor-pointer hover:shadow-md hover:border-black transition-all"
                            >
                                <div className="text-sm">{v}</div>
                                <div onClick={() => removeTech(v)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18 18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="mb-2 font-medium text-sm ">소개</div>
                    <QuillWrapper
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={introduce}
                        onChange={setIntroduce}
                        placeholder="소개를 입력해주세요."
                    />
                </div>

                <div className="w-full flex justify-end gap-x-5">
                    <CButton
                        title="취소"
                        isCancel={true}
                        onClick={goToProfile}
                    />
                    <CButton title="등록하기" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
