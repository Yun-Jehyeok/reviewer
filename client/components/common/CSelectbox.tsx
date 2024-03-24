'use client';

import { useEffect, useRef, useState } from 'react';

interface IProps {
    items: { id: string; value: string; label: string }[];
    onChange: (val: string) => void;
}

export default function CSelectBox({ items, onChange }: IProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [label, setLabel] = useState<string>(items[0].label);

    const dropDownRef = useRef<HTMLDivElement>(null);

    const selectItem = (val: string) => {
        setLabel(items.filter((v) => v.value === val)[0].label);
        setOpen(false);
        onChange(val);
    };

    useEffect(() => {
        const outSideClick = (e: any) => {
            const { target } = e;

            if (
                open &&
                dropDownRef.current &&
                !dropDownRef.current.contains(target)
            )
                setOpen(false);
        };
        document.addEventListener('mousedown', outSideClick);
    }, [open]);

    return (
        <div className="relative w-fit min-w-[160px]" ref={dropDownRef}>
            <div
                className="w-full flex h-10 flex-col justify-center border border-gray-200 cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <div className="w-full flex justify-between px-4">
                    <div className="text-sm">{label}</div>
                    <div
                        className={`w-fit flex flex-col justify-center ${
                            open && '-rotate-180'
                        } transition-all`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {open && (
                <div className="w-full absolute top-12 h-fit border border-gray-200 bg-white z-50 py-2 px-2 max-h-48 overflow-y-auto">
                    {items.map((v) => {
                        return (
                            <div
                                key={v.id}
                                id="dropdownItem"
                                className="w-full px-2 py-2 text-sm cursor-pointer rounded-md hover:bg-gray-50"
                                onClick={() => selectItem(v.value)}
                            >
                                {v.label}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
