'use client';

import { useState } from 'react';
// Library

// Components
import Signup from './_component/Signup';
import TOS from './_component/TOS';

// Hooks & Utils

// Api

// Interface & States

export default function Register() {
    const [tosCheck, setTosCheck] = useState<boolean>(false);

    return (
        <div className="w-full flex justify-center my-16">
            {tosCheck ? <Signup /> : <TOS setTosCheck={setTosCheck} />}
        </div>
    );
}
