import { Dispatch, SetStateAction, useEffect, useState } from "react";

const allTechs = [
    "C",
    "C++",
    "C#",
    "Dart",
    "Go",
    "Java",
    "JSP",
    "JavaScript",
    "Kotlin",
    "Objective-C",
    "PHP",
    "Python",
    "R",
    "Ruby",
    "Swift",
    "React",
    "React Native",
    "Spring",
    "Spring Boot",
    "Django",
    "Flask",
    ".NET",
    "Node.js",
    "Express.js",
    "NestJS",
    "Angular",
    "Vue.js",
    "Android",
    "Electron",
];

interface IProps {
    defaultTechs?: string[];
    techErr: boolean;
    techErrmsg: string;
    setTechs: Dispatch<SetStateAction<string[]>>; // 부모에게 선택된 Tech들 넘겨줄 함수
}

export default function SetTech({ defaultTechs = [], techErr, techErrmsg, setTechs }: IProps) {
    const [techVal, setTechVal] = useState<string>(""); // 검색 value
    const [filteredTechs, setFilteredTechs] = useState<string[]>([]); // 검색 필터링된 기술들
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]); // 선택된 기술들

    useEffect(() => {
        if (defaultTechs.length > 0) setSelectedTechs(defaultTechs);
    }, [defaultTechs]);

    const searchTech = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.currentTarget.value;
        setTechVal(val);

        let filtered: string[] = [];

        if (val !== "") filtered = allTechs.filter((v) => v.toLowerCase().includes(val.toLowerCase()));
        else filtered = [];

        setFilteredTechs(filtered);
    };

    const addTech = (val: string) => {
        if (selectedTechs.includes(val)) {
            setFilteredTechs([]);
            setTechVal("");
            return;
        }

        let data = [...selectedTechs];
        data.push(val);

        setSelectedTechs(data);
        setTechs(data);
        setFilteredTechs([]);
        setTechVal("");
    };

    const removeTech = (val: string) => {
        let data = selectedTechs.filter((v) => v !== val);

        setTechs(data);
        setSelectedTechs(data);
    };

    return (
        <div className="relative">
            <div className="mb-2 font-medium text-sm ">기술</div>
            <div className={`w-full h-10 rounded-md border ${techErr ? "border-[#ea002c]" : "border-gray-400"} px-4`}>
                <input className="w-full h-full border-none text-sm focus:outline-none" value={techVal} type="text" placeholder="사용 가능한 기술을 입력해주세요." onChange={searchTech} />
                {techErr && <div className="text-[#ea002c] text-xs mt-1">{techErrmsg}</div>}
            </div>

            {filteredTechs.length > 0 && (
                <div className="absolute top-[68px] left-0 z-[10] w-full mt-2 border border-gray-200 rounded-md bg-white">
                    {filteredTechs.map((v) => (
                        <div key={v} className="w-full bg-white hover:bg-gray-100 cursor-pointer py-2 px-4 rounded-md text-sm" onClick={() => addTech(v)}>
                            {v}
                        </div>
                    ))}
                </div>
            )}

            {selectedTechs.length > 0 && (
                <div className="flex gap-4 mt-4">
                    {selectedTechs.map((v) => (
                        <div key={v} className="w-fit h-10 bg-gray-100 rounded-full flex justify-end items-center px-4 gap-8 cursor-pointer hover:shadow-sm hover:border-black transition-all">
                            <div className="text-sm">{v}</div>
                            <div onClick={() => removeTech(v)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
