import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import "react-quill-new/dist/quill.snow.css";
import "./quillset.css";

const QuillWrapper = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
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

interface IProps {
    label: string;
    placeholder: string;
    contents: string;
    setContents: Dispatch<SetStateAction<string>>;
    err: boolean;
    errmsg: string;
}

export default function SetTextareaContents({
    label,
    placeholder,
    contents,
    setContents,
    err,
    errmsg,
}: IProps) {
    return (
        <div>
            <div className="mb-2 font-medium text-sm">{label}</div>
            <QuillWrapper
                theme="snow"
                modules={modules}
                formats={formats}
                value={contents}
                onChange={setContents}
                placeholder={placeholder}
            />
            {err && (
                <div className="text-[#ea002c] text-xs mt-1 pl-4">{errmsg}</div>
            )}
        </div>
    );
}
