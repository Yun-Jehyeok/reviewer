// Library
import DOMPurify from "dompurify";

// Components

// Hooks & Utils

// Api

// Interface & States

interface IProps {
    content: string;
}

export default function Description({ content }: IProps) {
    return (
        <div className="w-full mt-24">
            <div className="text-2xl font-bold mb-6">설명</div>
            <div>
                {content && (
                    <div
                        style={{
                            width: "100%",
                            whiteSpace: "normal",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(String(content)),
                        }}
                    />
                )}
            </div>
            <div className="w-full my-12 h-[1px] border border-gray-100"></div>
        </div>
    );
}
