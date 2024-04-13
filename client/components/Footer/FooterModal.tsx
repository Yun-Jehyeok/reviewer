'use client';

import { cancelBgFixed } from '@/utils/utils';
import Link from 'next/link';

interface IFooterModal {
    setModalOpen: (flag: boolean) => void;
    content: string;
}

export default function FooterModal({ setModalOpen, content }: IFooterModal) {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden">
            <div className="relative w-[480px] h-fit py-12 bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex">
                <div className="w-full h-full px-12">
                    {/* About */}
                    {content === 'about' && (
                        <div>
                            <div className="text-2xl font-bold mb-4">About</div>
                            <div>
                                We are...&nbsp;<b>FRONTEND</b>&nbsp;Avengers...
                            </div>
                        </div>
                    )}

                    {/* Contact */}
                    {content === 'contact' && (
                        <div>
                            <div className="text-2xl font-bold mb-4">
                                Contact
                            </div>

                            <div className="grid grid-cols-2">
                                <div>
                                    <div className="text-lg font-bold mb-2">
                                        윤제혁
                                    </div>
                                    <div className="flex flex-col">
                                        <a
                                            href="mailto:dbswpgur2@naver.com"
                                            className="text-blue-500 w-fit underline"
                                        >
                                            Email
                                        </a>
                                        <Link
                                            href="https://github.com/Yun-Jehyeok"
                                            target="_blank"
                                            className="w-fit text-blue-500 underline"
                                        >
                                            Github
                                        </Link>
                                        <Link
                                            href="https://velog.io/@dbswpgur2"
                                            target="_blank"
                                            className="w-fit text-blue-500 underline"
                                        >
                                            Blog
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold mb-2">
                                        문희수
                                    </div>
                                    <div className="flex flex-col">
                                        <a
                                            href="mailto:hicjacet42@gmail.com"
                                            className="text-blue-500 w-fit underline"
                                        >
                                            Email
                                        </a>
                                        <Link
                                            href="https://github.com/HeeSoo-Moon96"
                                            target="_blank"
                                            className="w-fit text-blue-500 underline"
                                        >
                                            Github
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FAQ */}
                    {content === 'faq' && (
                        <div>
                            <div className="text-2xl font-bold mb-4">FAQs</div>
                            <div>우리한테 궁금한게 있을까요..?</div>
                        </div>
                    )}
                </div>

                <div
                    className={`absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all`}
                    onClick={() => {
                        setModalOpen(false);
                        cancelBgFixed();
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
