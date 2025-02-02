"use client";

// Library
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

// Components

// Hooks & Utils

// Api

// Interface & States

export default function PostImgs({ imgs }: { imgs?: string[] }) {
    const swiperRef = useRef<SwiperRef | null>(null);

    const [isPrevArrActive, setIsPrevArrActive] = useState<boolean>(false);
    const [isNextArrActive, setIsNextArrActive] = useState<boolean>(false);

    const initSwiper = () => {
        if (imgs) setIsNextArrActive(imgs.length > 0);
    };

    const handlePrev = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slideNext();
    }, []);

    const handleSlideChange = (e: SwiperType) => {
        const idx = e.activeIndex;
        setIsPrevArrActive(idx !== 0);
        setIsNextArrActive(idx < imgs!.length - 1);
    };

    return imgs && imgs.length > 0 ? (
        <Swiper spaceBetween={0} slidesPerView={1} ref={swiperRef} className="relative" onSlideChange={handleSlideChange} onInit={initSwiper}>
            {imgs.map((img) => {
                return (
                    <SwiperSlide key={img} className="w-full h-[540px] bg-[#F4F6F5] text-center flex flex-col justify-center text-[#9b9b9b] text-lg">
                        <div className="w-full h-[540px] cursor-pointer">
                            <Image src={img} alt={img} layout="fill" className="object-contain" />
                        </div>
                    </SwiperSlide>
                );
            })}

            <div onClick={handlePrev} className={`absolute top-[calc(270px-1rem)] left-6 z-10 w-8 h-8 ${isPrevArrActive && "cursor-pointer"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={isPrevArrActive ? "currentColor" : "#9ca3af"} className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>
            <div onClick={handleNext} className={`absolute top-[calc(270px-1rem)] right-6 z-10 w-8 h-8 ${isNextArrActive && "cursor-pointer"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={isNextArrActive ? "currentColor" : "#9ca3af"} className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </Swiper>
    ) : (
        <div className="w-full h-[540px] bg-[#F4F6F5] rounded-xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg">REVIEWER</div>
    );
}
