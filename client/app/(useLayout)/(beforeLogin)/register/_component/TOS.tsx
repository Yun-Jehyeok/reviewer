import CButton from "@/components/common/CButton";
import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
    setTosCheck: Dispatch<SetStateAction<boolean>>;
}

export default function TOS({ setTosCheck }: IProps) {
    const [checkFirst, setCheckFirst] = useState<boolean>(false);
    const [checkSecond, setCheckSecond] = useState<boolean>(false);

    const onSubmit = () => {
        if (checkFirst && checkSecond) setTosCheck(true);
        else alert("필수 항목에 모두 체크해주세요.");
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.wrapperContainer}>
                    <div className={styles.title}>이용 약관</div>

                    <TOSContainer checkFirst={checkFirst} setCheckFirst={setCheckFirst} />
                    <PersonalInfoContainer checkSecond={checkSecond} setCheckSecond={setCheckSecond} />

                    <CButton title="확인" isFull={true} onClick={onSubmit} />
                </div>
            </div>
        </div>
    );
}

const TOSContainer = ({ checkFirst, setCheckFirst }: { checkFirst: boolean; setCheckFirst: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div className={styles.tosContainer}>
            <div className={styles.tosLabel}>
                <div className={styles.tosTitle}>
                    REVIEWER 이용 약관 동의
                    <span className={styles.required}>(필수)</span>
                </div>
                <div className={styles.tosCheck(checkFirst)} onClick={() => setCheckFirst(!checkFirst)}></div>
            </div>
            <div className={styles.tosContent}>
                1. 목적 : 지원자 개인 식별, 지원의사 확인, 입사전형의 진행, 고지사항 전달, 입사 지원자와의 원활한 의사소통, 지원이력 확인 및 면접 불합격자 재지원 제한
                <br />
                <br />
                2. 항목 : 아이디(이메일주소), 비밀번호, 이름, 생년월일, 휴대폰번호
                <br />
                <br />
                3. 보유기간 : 회원 탈퇴 시까지 보유
            </div>
        </div>
    );
};

const PersonalInfoContainer = ({ checkSecond, setCheckSecond }: { checkSecond: boolean; setCheckSecond: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div className={styles.personalInfoContainer}>
            <div className={styles.personalInfoLabel}>
                <div className={styles.personalInfoTitle}>
                    개인정보 수집 및 이용 동의 <span className={styles.required}>(필수)</span>
                </div>
                <div className={styles.personalInfoCheck(checkSecond)} onClick={() => setCheckSecond(!checkSecond)}></div>
            </div>
            <div className={styles.personalInfoContent}>
                1. 목적 : 지원자 개인 식별, 지원의사 확인, 입사전형의 진행, 고지사항 전달, 입사 지원자와의 원활한 의사소통, 지원이력 확인 및 면접 불합격자 재지원 제한
                <br />
                <br />
                2. 항목 : 아이디(이메일주소), 비밀번호, 이름, 생년월일, 휴대폰번호
                <br />
                <br />
                3. 보유기간 : 회원 탈퇴 시까지 보유
            </div>
        </div>
    );
};

const styles = {
    container: "w-full h-fit py-36 bg-gray-50 rounded-2xl flex justify-center items-center",
    wrapper: "w-4/5 h-fit bg-white shadow-lg rounded-md flex p-20",
    wrapperContainer: "w-full",
    title: "text-center text-4xl font-bold mb-12",
    tosContainer: "mb-12",
    tosLabel: "w-full flex justify-between mb-4",
    tosTitle: "text-2xl font-bold",
    required: "text-lightBlue relative bottom-0.5 text-base",
    tosCheck: (check: boolean) => `w-8 h-8 rounded-full ${check && "bg-black"} border border-gray-200 cursor-pointer bg-check bg-contain`,
    tosContent: "w-full h-60 border border-gray-200 overflow-y-auto p-4 leading-5",
    personalInfoContainer: "mb-6",
    personalInfoLabel: "w-full flex justify-between mb-4",
    personalInfoTitle: "text-2xl font-bold",
    personalInfoCheck: (check: boolean) => `w-8 h-8 rounded-full ${check && "bg-black"} border border-gray-200 cursor-pointer bg-check bg-contain`,
    personalInfoContent: "w-full h-60 border border-gray-200 overflow-y-auto p-4 leading-5",
};
