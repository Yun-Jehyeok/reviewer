"use client";

import CButton from "@/components/common/CButton";
import { useEffect, useState } from "react";

export interface ICareer {
    company: string;
    startYear: string;
    startMonth: string;
    endYear: string;
    endMonth: string;
    department: string;
    description: string;
}

export default function Career({ getCareer }: { getCareer: (data: ICareer[]) => void }) {
    const [careers, setCareers] = useState<ICareer[]>([{ company: "", startYear: "", startMonth: "", endYear: "", endMonth: "", department: "", description: "" }]);

    const addItem = () => {
        setCareers([...careers, { company: "", startYear: "", startMonth: "", endYear: "", endMonth: "", department: "", description: "" }]);
    };

    const handleCareerChange = (index: number, field: keyof ICareer, value: string | boolean) => {
        setCareers(careers.map((career, i) => (i === index ? { ...career, [field]: value } : career)));
    };

    const deleteItem = (index: number) => {
        if (careers.length === 1) {
            alert("경력을 최소 하나 이상 입력해주세요.");
            return;
        }
        setCareers(careers.filter((_, i) => i !== index));
    };

    useEffect(() => {
        getCareer(careers);
    }, [careers]);

    return (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <div className="text-xl font-bold ">
                    경력&nbsp;<span className="text-red-500">*</span>
                </div>
                <CButton title="경력 추가하기" onClick={addItem}></CButton>
            </div>

            <div className="w-full flex flex-col gap-8 mb-4 border-b border-gray-200 pb-8">
                {careers.map((career, index) => (
                    <CareerItem key={index} career={career} index={index} handleCareerChange={handleCareerChange} deleteItem={deleteItem} />
                ))}
            </div>
        </div>
    );
}

const CareerItem = ({
    career,
    index,
    handleCareerChange,
    deleteItem,
}: {
    career: ICareer;
    index: number;
    handleCareerChange: (index: number, field: keyof ICareer, value: string | boolean) => void;
    deleteItem: (index: number) => void;
}) => {
    const [isCurrentAttending, setIsCurrentAttending] = useState(false);

    return (
        <div className="w-full flex gap-4">
            <div className="w-80">
                <div className="flex gap-2 h-5 mb-2 items-center">
                    <div className="flex h-full">
                        <input
                            name="startYear"
                            type="text"
                            placeholder="YYYY"
                            className="w-9 h-full text-sm border-none focus:outline-none"
                            value={career.startYear}
                            onChange={(e) => handleCareerChange(index, "startYear", e.target.value)}
                        />
                        <div className="text-sm">.&nbsp;</div>
                        <input
                            name="startMonth"
                            type="text"
                            placeholder="MM"
                            className="w-9 h-full text-sm border-none focus:outline-none"
                            value={career.startMonth}
                            onChange={(e) => handleCareerChange(index, "startMonth", e.target.value)}
                        />
                    </div>

                    {!isCurrentAttending && (
                        <>
                            -
                            <div className="flex h-5">
                                <input
                                    name="endYear"
                                    type="text"
                                    placeholder="YYYY"
                                    className="w-9 h-full text-sm border-none focus:outline-none"
                                    value={career.endYear}
                                    onChange={(e) => handleCareerChange(index, "endYear", e.target.value)}
                                />
                                <div className="text-sm">.&nbsp;</div>
                                <input
                                    name="endMonth"
                                    type="text"
                                    placeholder="MM"
                                    className="w-9 h-full text-sm border-none focus:outline-none"
                                    value={career.endMonth}
                                    onChange={(e) => handleCareerChange(index, "endMonth", e.target.value)}
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="flex gap-2 items-center">
                    <label className="flex gap-2 items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isCurrentAttending}
                            onChange={(e) => {
                                setIsCurrentAttending(e.target.checked);
                                handleCareerChange(index, "endYear", "");
                                handleCareerChange(index, "endMonth", "");
                            }}
                        />
                        <span className="text-[15px]">재직중</span>
                    </label>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="회사명"
                    className="w-full h-fit text-xl font-bold border-none focus:outline-none"
                    value={career.company}
                    onChange={(e) => handleCareerChange(index, "company", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="부서명"
                    className="w-full h-fit border-none focus:outline-none"
                    value={career.department}
                    onChange={(e) => handleCareerChange(index, "department", e.target.value)}
                />
                <textarea
                    className="w-full h-96 border-none focus:outline-none resize-none"
                    placeholder="경력사항"
                    value={career.description}
                    onChange={(e) => handleCareerChange(index, "description", e.target.value)}
                ></textarea>
            </div>

            <div className="w-4 h-4 cursor-pointer" onClick={() => deleteItem(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    );
};
