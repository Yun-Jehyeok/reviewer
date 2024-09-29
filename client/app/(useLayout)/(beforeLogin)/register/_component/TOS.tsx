import CButton from '@/components/common/CButton';
import { Dispatch, SetStateAction, useState } from 'react';

interface IProps {
    setTosCheck: Dispatch<SetStateAction<boolean>>;
}
export default function TOS({ setTosCheck }: IProps) {
    const [checkFirst, setCheckFirst] = useState<boolean>(false);
    const [checkSecond, setCheckSecond] = useState<boolean>(false);

    const onSubmit = () => {
        if (checkFirst && checkSecond) setTosCheck(true);
        else alert('필수 항목에 모두 체크해주세요.');
    };

    return (
        <div className="w-full h-fit py-36 bg-gray-50 rounded-2xl flex justify-center items-center">
            <div className="w-4/5 h-fit bg-white shadow-lg rounded-md flex p-20">
                <div className="w-full">
                    <div className="text-center text-4xl font-bold mb-12">
                        이용 약관
                    </div>

                    <div className="mb-12">
                        <div className="w-full flex justify-between mb-4">
                            <div className="text-2xl font-bold">
                                REVIEWER 이용 약관 동의
                                <span className="text-lightBlue relative bottom-0.5 text-base">
                                    (필수)
                                </span>
                            </div>
                            <div
                                className={`w-8 h-8 rounded-full ${
                                    checkFirst && 'bg-black'
                                } border border-gray-200 cursor-pointer bg-check bg-contain`}
                                onClick={() => setCheckFirst(!checkFirst)}
                            ></div>
                        </div>
                        <div className="w-full h-60 border border-gray-200 overflow-y-auto p-4 leading-5">
                            1. 목적 : 지원자 개인 식별, 지원의사 확인,
                            입사전형의 진행, 고지사항 전달, 입사 지원자와의
                            원활한 의사소통, 지원이력 확인 및 면접 불합격자
                            재지원 제한
                            <br />
                            <br />
                            2. 항목 : 아이디(이메일주소), 비밀번호, 이름,
                            생년월일, 휴대폰번호
                            <br />
                            <br />
                            3. 보유기간 : 회원 탈퇴 시까지 보유
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="w-full flex justify-between mb-4">
                            <div className="text-2xl font-bold">
                                개인정보 수집 및 이용 동의{' '}
                                <span className="text-lightBlue relative bottom-0.5 text-base">
                                    (필수)
                                </span>
                            </div>
                            <div
                                className={`w-8 h-8 rounded-full ${
                                    checkSecond && 'bg-black'
                                } border border-gray-200 cursor-pointer bg-check bg-contain`}
                                onClick={() => setCheckSecond(!checkSecond)}
                            ></div>
                        </div>
                        <div className="w-full h-60 border border-gray-200 overflow-y-auto p-4 leading-5">
                            1. 목적 : 지원자 개인 식별, 지원의사 확인,
                            입사전형의 진행, 고지사항 전달, 입사 지원자와의
                            원활한 의사소통, 지원이력 확인 및 면접 불합격자
                            재지원 제한
                            <br />
                            <br />
                            2. 항목 : 아이디(이메일주소), 비밀번호, 이름,
                            생년월일, 휴대폰번호
                            <br />
                            <br />
                            3. 보유기간 : 회원 탈퇴 시까지 보유
                        </div>
                    </div>

                    <CButton title="확인" isFull={true} onClick={onSubmit} />
                </div>
            </div>
        </div>
    );
}
