// Library
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

// Components

// Hooks & Utils

// Api

// Interface & States

interface IProps {
    setImgFiles: Dispatch<SetStateAction<File[]>>;
}
export default function SetImgs({ setImgFiles }: IProps) {
    const [imgs, setImgs] = useState<string[]>([]);
    const [empties, setEmpties] = useState(3);
    const [isActive, setIsActive] = useState(false);
    const [selectedImgFiles, setSelectedImgFiles] = useState<File[]>([]);

    const handleImgs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files as FileList);
        const selectedFiles: string[] = files.map((file) => URL.createObjectURL(file));

        const totalLen = imgs.length + selectedFiles.length;

        if (totalLen > 3) {
            alert("이미지는 총 3개까지 업로드 할 수 있습니다.");
        } else {
            setImgs((prev) => prev.concat(selectedFiles));
            setImgFiles((prev) => prev.concat(files));
            setSelectedImgFiles((prev) => prev.concat(files));
            setEmpties(3 - totalLen);
        }
    };

    const deleteImage = (e: React.MouseEvent<HTMLImageElement>) => {
        let deleteIdx = -1;

        imgs.map((image, idx) => {
            if (image === e.currentTarget.currentSrc) {
                deleteIdx = idx;
            }
        });

        setImgs(imgs.filter((image) => image !== e.currentTarget.currentSrc));
        setImgFiles(selectedImgFiles.filter((image, idx) => idx !== deleteIdx));
        setSelectedImgFiles(selectedImgFiles.filter((image, idx) => idx !== deleteIdx));
        setEmpties(4 - imgs.length);
    };

    const onDragAddImage = (e: React.DragEvent<HTMLLabelElement>) => {
        e.stopPropagation();
        e.preventDefault();

        const data = Array.from(e.dataTransfer.files as FileList);
        const selectedFiles: string[] = data.map((item) => URL.createObjectURL(item));

        const totalLen = imgs.length + selectedFiles.length;

        if (totalLen > 3) {
            alert("이미지는 총 3개까지 업로드 할 수 있습니다.");
        } else {
            setImgs((prev) => prev.concat(selectedFiles));
            setEmpties(3 - totalLen);
        }
    };

    const onPreventDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>미리보기 이미지</div>
            <label
                onDrop={onDragAddImage}
                onDragOver={onPreventDragOver}
                onMouseOver={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)}
                onDragLeave={() => setIsActive(false)}
                onDragEnter={() => setIsActive(true)}
                className={styles.input(isActive)}
            >
                <svg className={styles.svg} stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className={styles.inputLabel}>Select the imgs</div>
                <input className={styles.inputHidden} type="file" accept="image/*" multiple onChange={handleImgs} />
            </label>

            <div className={styles.previewImgs}>
                {imgs.map((image, i) => (
                    <div key={i} className={styles.previewImgContainer}>
                        <Image className={styles.previewImg} src={image} width={128} height={128} alt={image} onClick={deleteImage} />
                    </div>
                ))}
                {[1, 2, 3].map((item, i) => {
                    if (item <= empties) {
                        return (
                            <div key={i} className={styles.previewImgEmpty}>
                                Empty...
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

const styles = {
    container: "w-full",
    title: "mb-2 font-medium text-sm",
    input: (isActive: boolean) => `w-full cursor-pointer text-gray-600 flex items-center justify-center border-2 border-dashed ${isActive ? "border-[#FB2E86]" : "border-gray-300"} h-48 rounded-md`,
    svg: "h-12 w-12",
    inputLabel: "ml-2 font-lato",
    inputHidden: "hidden",
    previewImgs: "flex mt-4 gap-4",
    previewImgContainer: "w-32 h-32 rounded-md",
    previewImg: "rounded-md w-full h-full cursor-pointer",
    previewImgEmpty: "w-32 h-32 text-gray-600 border-2 border-gray-300 rounded-md text-center flex justify-center flex-col text-base",
};
