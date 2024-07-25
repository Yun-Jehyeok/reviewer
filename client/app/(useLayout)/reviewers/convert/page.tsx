// - 전문가 소개
// - 경력
// - 총 경력
// - 희망 시급
// - 학력, 전공
'use client';

import SetTech from '@/components/SetTech';
import CButton from '@/components/common/CButton';
import { useState } from 'react';

// - 보유 기술
export default function ConvertToReviewer() {
    const [techErr, setTechErr] = useState<boolean>(false);
    const [techs, setTechs] = useState<string[]>([]);

    const onSubmit = () => {};

    return (
        <div className="py-16">
            <h1 className="text-3xl font-bold mb-12">
                리뷰어 전환을 위해 필요한 정보를 입력해주세요.
            </h1>

            <div className="flex flex-col gap-12 mb-8">
                <div>
                    <div className="text-xl font-bold mb-4">전문가 소개</div>
                    <textarea
                        className="w-full h-60 resize-none border border-gray-200 focus:outline-none p-4 text-sm"
                        placeholder="전문가 소개를 작성해주세요."
                    ></textarea>
                </div>
                <div>
                    <div className="text-xl font-bold mb-4">학력</div>
                    <div>Contents</div>
                </div>
                <div>
                    <div className="text-xl font-bold mb-4">경력</div>
                    <div>Contents</div>
                </div>
                <div>
                    <div className="text-xl font-bold mb-4">보유 기술</div>
                    <SetTech
                        techErr={techErr}
                        techErrmsg="최소 1개의 기술을 입력해주세요."
                        setTechs={setTechs}
                    />
                </div>

                <div>
                    <div className="text-xl font-bold mb-4">희망 시급</div>
                    <div>Contents</div>
                </div>
            </div>

            <CButton
                title="전문가로 전환하기"
                isFull={true}
                onClick={onSubmit}
            />
        </div>
    );
}
