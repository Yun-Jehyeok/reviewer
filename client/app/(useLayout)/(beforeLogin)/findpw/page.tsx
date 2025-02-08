"use client";

// Library
import { useState } from "react";

// Components
import EditPassword from "./_component/EditPassword";
import SendAuthEmail from "./_component/SendAuthEmail";

// Hooks & Utils
import { useInput } from "@/hooks/useInput";

// Api

// Interface & States

export default function FindPw() {
    const email = useInput("");
    const [isAuth, setIsAuth] = useState<boolean>(false);

    return <div className={styles.container}>{isAuth ? <EditPassword email={email.value} /> : <SendAuthEmail email={email} setIsAuth={setIsAuth} />}</div>;
}

const styles = {
    container: "w-full h-[540px] rounded-lg flex justify-center items-center bg-gray-50 mt-32 mb-24",
};
