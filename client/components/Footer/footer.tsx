"use client";

import { bgFixed } from "@/utils/utils";
import { useState } from "react";
import FooterModal from "./FooterModal";

export default function Footer() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [content, setContent] = useState<string>("about");

    const handleModalOpen = (content: string) => {
        setContent(content);
        setIsModalOpen(true);
        bgFixed();
    };

    return (
        <div className="w-full mt-32">
            <div className="w-full bg-black h-48 flex flex-col justify-center text-white">
                <div className="w-full px-20 flex justify-between m-auto max-w-[1730px]">
                    <div>
                        <div className="text-3xl font-bold mb-6">REVIEWERS</div>
                        <div className="text-sm text-gray-500">
                            Get your code reviewed and
                            <br />
                            improve your skills from us.
                        </div>
                    </div>
                    <div className="flex gap-32">
                        <div className="flex gap-6 items-center">
                            <div
                                className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit"
                                onClick={() => handleModalOpen("about")}
                            >
                                About
                            </div>
                            <div
                                className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit"
                                onClick={() => handleModalOpen("contact")}
                            >
                                Contact us
                            </div>
                            <div
                                className="text-sm text-gray-500 cursor-pointer hover:text-white transition-all w-fit"
                                onClick={() => handleModalOpen("faq")}
                            >
                                FAQs
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <FooterModal setModalOpen={setIsModalOpen} content={content} />
            )}
        </div>
    );
}
