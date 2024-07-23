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

    const [showAuth, setShowAuth] = useState(false);
    const [authNumResponse, setAuthNumResponse] = useState("00000000");

    return (
        <div className="w-full h-[540px] rounded-lg flex justify-center items-center bg-gray-50 mt-32 mb-24">
            {showAuth ? (
                <EditPassword authNumResponse={authNumResponse} email={email.value} />
            ) : (
                <SendAuthEmail email={email} setShowAuth={setShowAuth} setAuthNumResponse={setAuthNumResponse} />
            )}
        </div>
    );
}
