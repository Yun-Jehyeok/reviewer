import Image from "next/image";
import Link from "next/link";

interface ICCard {
    data: {
        id: string;
        title: string;
        price: number;
        image: string;
    };
}

export default function CCard({ data }: ICCard) {
    return (
        <Link href={`/reviewers/${data.id}`} className="cursor-pointer group">
            <div className="w-full h-[200px] bg-[#F4F6F5] rounded-xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg  relative transition-all top-0 group-hover:-top-1 group-hover:shadow-md">
                {data.image === "noimg" ? (
                    "REVIEWER"
                ) : (
                    <Image
                        className="rounded-md w-full h-full object-contain overflow-hidden"
                        src={data.image}
                        width={64}
                        height={64}
                        alt={data.image}
                    />
                )}
            </div>

            <div className="w-full flex mt-4 gap-2">
                <div className="flex-1 overflow-hidden">
                    <div className="text-base font-bold overflow-hidden overflow-ellipsis whitespace-nowrap mb-1">
                        {data.title}
                    </div>
                    <div className="text-[#7F7F7F] text-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {data.price}원/시간
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
