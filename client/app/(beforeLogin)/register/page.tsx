'use client';

import { signupApi } from '@/apis/userApi';
import { useInput } from '@/hooks/useInput';
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/states/userStates';
import { signupIFC } from '@/interfaces/userIFC';
import CInput from '@/components/common/CInput';
import CButton from '@/components/common/CButton';

export default function Register() {
  const router = useRouter();

  const [user, setUser] = useRecoilState(userState);

  const email = useInput('');
  const password = useInput('');
  const pwCheck = useInput('');
  const name = useInput('');
  const nickname = useInput('');
  const phone = useInput('');

  const [errMsg, setErrMsg] = useState<string>('');

  const signupMutation = useMutation({
    mutationFn: signupApi,
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error, variable, context) => {
      console.error('signupErr:::', error);
    },
    onSuccess: (data, variables, context) => {
      console.log('signupSuccess', data, variables, context);
      if (data.success) {
        setUser({ ...data.user, token: data.token });
        localStorage.setItem('token', data.token);
        router.push('/');
      }
    },
    onSettled: () => {
      console.log('signupEnd');
    },
  });

  const handleSubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    ) => {
      e.preventDefault();

      let emailVal = email.value;
      let pwVal = password.value;
      let pwCheckVal = pwCheck.value;
      let nameVal = name.value;
      let nicknameVal = nickname.value;
      let phoneVal = phone.value;

      if (emailVal === '') return;
      if (pwVal === '') return;
      if (pwCheckVal === '') return;
      if (nameVal === '') return;
      if (nicknameVal === '') return;
      if (phoneVal === '') return;

      let payload: signupIFC = {
        email: emailVal,
        password: pwVal,
        name: nameVal,
        nickname: nicknameVal,
        phone: phoneVal,
      };

      signupMutation.mutate(payload);
    },
    [email, password, name, nickname, phone, signupMutation],
  );

  return (
    <div className="w-full flex justify-center mt-[120px]">
      <div className="w-[640px] h-fit bg-white shadow-2xl rounded-3xl flex p-20">
        <div className="w-full">
          <div className="text-center text-4xl font-bold mb-12">Sign Up</div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 font-medium text-sm">E-Mail</div>
              <CInput
                {...email}
                type="email"
                placeholder="이메일을 입력해주세요."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              </CInput>
            </div>

            <div>
              <div className="mb-2 font-medium text-sm">Password</div>
              <CInput
                {...password}
                type="password"
                placeholder="비밀번호를 입력해주세요."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </CInput>
            </div>

            <div>
              <div className="mb-2 font-medium text-sm">Password Check</div>
              <CInput
                {...pwCheck}
                type="password"
                placeholder="비밀번호 확인을 입력해주세요."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </CInput>
            </div>

            <div>
              <div className="mb-2 font-medium text-sm">Name</div>
              <CInput {...name} type="text" placeholder="이름을 입력해주세요.">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </CInput>
            </div>

            <div>
              <div className="mb-2 font-medium text-sm">Nickname</div>
              <CInput
                {...nickname}
                type="text"
                placeholder="닉네임을 입력해주세요."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </CInput>
            </div>

            <div>
              <div className="mb-2 font-medium text-sm">Phone</div>
              <CInput
                {...phone}
                type="text"
                placeholder="휴대폰 번호를 입력해주세요."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              </CInput>
            </div>

            <CButton title="SIGN UP" onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </div>
  );
}
