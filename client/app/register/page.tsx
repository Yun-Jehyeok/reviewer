'use client';

import { signupApi } from '@/apis/userApi';
import { useInput } from '@/hooks/useInput';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/states/userStates';

export default function Register() {
  const router = useRouter();

  const [user, setUser] = useRecoilState(userState);

  const email = useInput('');
  const password = useInput('');
  const pwCheck = useInput('');
  const name = useInput('');
  const nickname = useInput('');
  const phone = useInput('');

  const signupMutation = useMutation(signupApi, {
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error, variable, context) => {
      console.error('signinErr:::', error);
    },
    onSuccess: (data, variables, context) => {
      console.log('signinSuccess', data, variables, context);
      if (data.success) {
        setUser({ ...data.user, token: data.token });
        localStorage.setItem('token', data.token);
        router.push('/');
      }
    },
    onSettled: () => {
      console.log('signinEnd');
    },
  });

  const handleSubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    ) => {
      e.preventDefault();

      let emailVal = email.v.value;
      let pwVal = password.v.value;
      let nameVal = name.v.value;
      let nicknameVal = nickname.v.value;
      let phoneVal = phone.v.value;

      if (emailVal === '') return;
      if (pwVal === '') return;

      console.log('here');

      let payload = {
        email: emailVal,
        password: pwVal,
        name: nameVal,
        nickname: nicknameVal,
        phone: phoneVal,
      };

      signupMutation.mutate(payload);
    },
    [],
  );

  return (
    <div className="w-full px-20">
      <div className="w-full h-fit bg-[#F4F6F5] rounded-3xl flex p-20 py-12">
        <div className="w-1/2 flex flex-col justify-center text-5xl font-black gap-3">
          <div className="w-3/4 bg-white py-2 px-3">LET'S</div>
          <div className="w-3/4 py-2 px-3">SIGN UP</div>
          <div className="w-3/4 bg-[#EBD96B] py-2 px-3">AND</div>
          <div className="w-3/4 py-2 px-3">REVIEW!</div>
        </div>
        <div className="w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-2 font-medium text-sm">E-Mail</div>
            <div className="w-full h-12 border border-gray-400 bg-white rounded-md mb-4 flex gap-2 px-4">
              <input
                className="flex-1 h-full border-none rounded-md focus:outline-none text-sm"
                type="email"
                {...email.v}
              />
              <div className="w-[10%] h-full bg-center bg-no-repeat bg-email"></div>
            </div>

            <div className="mb-2 font-medium text-sm">Password</div>
            <div className="w-full h-12 border border-gray-400 bg-white rounded-md mb-6 flex gap-2 px-4">
              <input
                className="flex-1 h-full border-none rounded-md focus:outline-none text-sm"
                type="password"
                {...password.v}
              />
              <div className="w-[10%] h-full bg-center bg-no-repeat bg-pw"></div>
            </div>

            <div className="mb-2 font-medium text-sm">Password Check</div>
            <div className="w-full h-12 border border-gray-400 bg-white rounded-md mb-6 flex gap-2 px-4">
              <input
                className="flex-1 h-full border-none rounded-md focus:outline-none text-sm"
                type="password"
                {...pwCheck.v}
              />
              <div className="w-[10%] h-full bg-center bg-no-repeat bg-check"></div>
            </div>

            <div className="mb-2 font-medium text-sm">Name</div>
            <div className="w-full h-12 border border-gray-400 bg-white rounded-md mb-6 flex gap-2 px-4">
              <input
                className="flex-1 h-full border-none rounded-md focus:outline-none text-sm"
                type="text"
                {...name.v}
              />
              <div className="w-[10%] h-full bg-center bg-no-repeat bg-name"></div>
            </div>

            <div className="mb-2 font-medium text-sm">Nickname</div>
            <div className="w-full h-12 border border-gray-400 bg-white rounded-md mb-6 flex gap-2 px-4">
              <input
                className="flex-1 h-full border-none rounded-md focus:outline-none text-sm"
                type="text"
                {...nickname.v}
              />
              <div className="w-[10%] h-full bg-center bg-no-repeat bg-nickname"></div>
            </div>

            <div className="mb-2 font-medium text-sm">Phone</div>
            <div className="w-full h-12 border border-gray-400 bg-white rounded-md mb-6 flex gap-2 px-4">
              <input
                className="flex-1 h-full border-none rounded-md focus:outline-none text-sm"
                type="text"
                {...phone.v}
              />
              <div className="w-[10%] h-full bg-center bg-no-repeat bg-phone"></div>
            </div>

            <button
              className="w-full h-12 text-white bg-black hover:bg-gray-800 rounded-md"
              onClick={handleSubmit}
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
