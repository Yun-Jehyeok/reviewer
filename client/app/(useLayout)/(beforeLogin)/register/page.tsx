"use client";

// Library
import { useState } from "react";

// Components
import Signup from "./_component/Signup";
import TOS from "./_component/TOS";

export default function Register() {
    const [tosCheck, setTosCheck] = useState<boolean>(false);

    return <div className={styles.container}>{tosCheck ? <Signup /> : <TOS setTosCheck={setTosCheck} />}</div>;
}

const styles = {
    container: "w-full flex justify-center my-16",
};
