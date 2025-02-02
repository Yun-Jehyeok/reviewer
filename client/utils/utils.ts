import { Dispatch, SetStateAction } from "react";

export const cls = (...classNames: string[]) => {
    return classNames.join(" ");
};

export const bgFixed = () => {
    document.querySelector("body")!.style.height = "100vh";
    document.querySelector("body")!.style.overflow = "hidden";
};

export const cancelBgFixed = () => {
    document.querySelector("body")!.style.height = "fit-content";
    document.querySelector("body")!.style.overflow = "auto";
};

export const checkBlank = (val: string, errFunc: Dispatch<SetStateAction<boolean>>, errMsg: string, setErrMsg: Dispatch<SetStateAction<string>>) => {
    errFunc(val === "");
    if (val === "") setErrMsg(errMsg);

    return val === "";
};

export const foramttedNumber = (num: string | number) => {
    let formatValue = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formatValue;
};

export const insertHTML = (html: string) => {
    return { __html: html };
};
