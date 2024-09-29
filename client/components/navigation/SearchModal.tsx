import { cancelBgFixed } from "@/utils/utils";
import { Dispatch, SetStateAction } from "react";

interface IProps {
    handleModal: Dispatch<SetStateAction<boolean>>;
}

export default function SearchModal({ handleModal }: IProps) {
    const closeModal = () => {
        cancelBgFixed();
        handleModal(false);
    };

    const preventParentEvent = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div
            className="absolute top-0 left-0 w-screen h-screen overflow-hidden flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
            onClick={closeModal}
        >
            <div className="w-[60vw] h-[12vh] bg-white rounded-3xl px-[4vw] flex gap-[0.8333vw]" onClick={preventParentEvent}>
                <input type="text" className="flex-1 h-full border-none focus:outline-none text-4xl" placeholder="검색어를 입력하세요." />
                <div className="w-fit h-full flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-[4vh]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
