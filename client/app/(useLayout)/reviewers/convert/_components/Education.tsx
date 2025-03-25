"use client";

import CButton from "@/components/common/CButton";
import { useEffect, useState } from "react";

export interface IEducation {
    school: string;
    startYear: string;
    startMonth: string;
    endYear: string;
    endMonth: string;
    department: string;
}

export default function Education({ getEducation }: { getEducation: (data: IEducation[]) => void }) {
    const [educations, setEducations] = useState<IEducation[]>([{ school: "", startYear: "", startMonth: "", endYear: "", endMonth: "", department: "" }]);

    const addItem = () => {
        setEducations([...educations, { school: "", startYear: "", startMonth: "", endYear: "", endMonth: "", department: "" }]);
    };

    const handleEducationChange = (index: number, field: keyof IEducation, value: string | boolean) => {
        setEducations(educations.map((education, i) => (i === index ? { ...education, [field]: value } : education)));
    };

    const deleteItem = (index: number) => {
        if (educations.length === 1) {
            alert("학력을 최소 하나 이상 입력해주세요.");
            return;
        }
        setEducations(educations.filter((_, i) => i !== index));
    };

    useEffect(() => {
        getEducation(educations);
    }, [educations]);

    return (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <div className="text-xl font-bold">
                    학력&nbsp;<span className="text-red-500">*</span>
                </div>
                <CButton title="학력 추가하기" onClick={addItem}></CButton>
            </div>
            <div className="w-full flex flex-col gap-8 mb-4 border-b border-gray-200 pb-8">
                {educations.map((education, index) => (
                    <EducationItem key={index} education={education} index={index} handleEducationChange={handleEducationChange} deleteItem={deleteItem} />
                ))}
            </div>
        </div>
    );
}

const EducationItem = ({
    education,
    index,
    deleteItem,
    handleEducationChange,
}: {
    education: IEducation;
    index: number;
    deleteItem: (index: number) => void;
    handleEducationChange: (index: number, field: keyof IEducation, value: string | boolean) => void;
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
                            value={education.startYear}
                            onChange={(e) => handleEducationChange(index, "startYear", e.target.value)}
                        />
                        <div className="text-sm">.&nbsp;</div>
                        <input
                            name="startMonth"
                            type="text"
                            placeholder="MM"
                            className="w-9 h-full text-sm border-none focus:outline-none"
                            value={education.startMonth}
                            onChange={(e) => handleEducationChange(index, "startMonth", e.target.value)}
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
                                    value={education.endYear}
                                    onChange={(e) => handleEducationChange(index, "endYear", e.target.value)}
                                />
                                <div className="text-sm">.&nbsp;</div>
                                <input
                                    name="endMonth"
                                    type="text"
                                    placeholder="MM"
                                    className="w-9 h-full text-sm border-none focus:outline-none"
                                    value={education.endMonth}
                                    onChange={(e) => handleEducationChange(index, "endMonth", e.target.value)}
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
                            }}
                        />
                        <span className="text-[15px]">재학중</span>
                    </label>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="학교명"
                    className="w-full h-fit text-xl font-bold border-none focus:outline-none"
                    value={education.school}
                    onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="학과"
                    className="w-full h-fit border-none focus:outline-none"
                    value={education.department}
                    onChange={(e) => handleEducationChange(index, "department", e.target.value)}
                />
            </div>

            <div className="w-4 h-4 cursor-pointer" onClick={() => deleteItem(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    );
};
