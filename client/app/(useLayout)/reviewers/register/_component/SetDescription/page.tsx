import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import "react-quill/dist/quill.snow.css";
import "../../quillset.css";

const QuillWrapper = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
    ],
    clipboard: {
        matchVisual: false,
    },
};

const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

interface IProps {
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    descErr: boolean;
    descErrmsg: string;
}

export default function SetDescription({ description, setDescription, descErr, descErrmsg }: IProps) {
    return (
        <div>
            <div className="mb-2 font-medium text-sm">설명</div>
            <QuillWrapper theme="snow" modules={modules} formats={formats} value={description} onChange={setDescription} placeholder="설명을 입력해주세요." />
            {descErr && <div className="text-[#ea002c] text-xs mt-1 pl-4">{descErrmsg}</div>}
        </div>
    );
}
