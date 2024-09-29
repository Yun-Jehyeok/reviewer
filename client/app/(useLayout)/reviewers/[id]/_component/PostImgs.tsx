// Library
import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

// Components

// Hooks & Utils

// Api

// Interface & States

export default function PostImgs({ imgs }: { imgs?: string[] }) {
    return imgs && imgs.length > 0 ? (
        <Swiper spaceBetween={0} slidesPerView={1}>
            {imgs.map((img) => {
                return (
                    <SwiperSlide
                        key={img}
                        className="w-full h-[540px] bg-[#F4F6F5] text-center flex flex-col justify-center text-[#9b9b9b] text-lg"
                    >
                        <div className="w-full h-[540px] cursor-pointer">
                            <Image
                                src={img}
                                alt={img}
                                layout="fill"
                                className="object-contain"
                            />
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    ) : (
        <div className="w-full h-[540px] bg-[#F4F6F5] rounded-xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg">
            REVIEWER
        </div>
    );
}
