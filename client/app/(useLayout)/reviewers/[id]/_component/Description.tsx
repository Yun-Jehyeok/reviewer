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
        <div className="w-full my-16 mt-8">
            <div className="text-2xl font-bold mb-6 border-b border-gray-200 pb-4">설명</div>
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
        </div>
    );
}
