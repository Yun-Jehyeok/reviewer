'use client';

import { signinApi } from '@/apis/userApi';
import { useInput } from '@/hooks/useInput';
import { userState } from '@/states/userStates';
import { cancelBgFixed } from '@/utils/utils';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CInput from '../common/CInput';
import CButton from '../common/CButton';

interface ILoginModal {
  setModalOpen: (flag: boolean) => void;
}

export default function LoginModal({ setModalOpen }: ILoginModal) {
  const router = useRouter();

  const email = useInput('');
  const password = useInput('');

  const [user, setUser] = useRecoilState(userState);

  const signInMutation = useMutation({
    mutationFn: signinApi,
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error, variable, context) => {
      console.error('signinErr:::', error);
    },
    onSuccess: (data, variables, context) => {
      console.log('signinSuccess', data, variables, context);
      if (data.success) {
        setModalOpen(false);
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

      let emailVal = email.value;
      let pwVal = password.value;

      if (emailVal === '') return;
      if (pwVal === '') return;

      let payload = {
        email: emailVal,
        password: pwVal,
      };

      signInMutation.mutate(payload);
    },
    [email, password, signInMutation],
  );

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden">
      <div className="relative w-[480px] h-fit py-20 bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex">
        <div className="w-full h-full px-12 flex justify-center flex-col">
          <div className="mb-12 text-2xl font-bold">Log In To REVIEWERS</div>

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

            <CButton title="SIGN IN" onClick={handleSubmit} />
          </form>

          <div className="text-center mt-8 text-sm text-gray-400">
            Not a Member?{' '}
            <Link
              href="/register"
              onClick={() => {
                setModalOpen(false);
                cancelBgFixed();
              }}
            >
              <span className="text-blue-500">Sign Up</span>
            </Link>
          </div>

          <div className="text-center mt-2">
            <Link
              href="/register"
              onClick={() => {
                setModalOpen(false);
                cancelBgFixed();
              }}
            >
              <span className="text-sm text-gray-400 hover:underline cursor-pointer">
                Forgot your password?
              </span>
            </Link>
          </div>
        </div>

        <div
          className={`absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all`}
          onClick={() => {
            setModalOpen(false);
            cancelBgFixed();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
