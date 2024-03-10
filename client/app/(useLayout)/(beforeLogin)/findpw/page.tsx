'use client';

import { authEmailApi, changePwApi } from '@/apis/userApi';
import CButton from '@/components/common/CButton';
import CInput from '@/components/common/CInput';
import CSpinner from '@/components/common/CSpinner';
import { useInput } from '@/hooks/useInput';
import { IError } from '@/interfaces/commonIFC';
import { checkBlank } from '@/utils/utils';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function FindPw() {
  const router = useRouter();

  const email = useInput('');
  const authNum = useInput('');
  const password = useInput('');

  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState('비밀번호를 입력해주세요.');
  const [authErr, setAuthErr] = useState(false);

  const [showAuth, setShowAuth] = useState(false);
  const [authNumResponse, setAuthNumResponse] = useState('00000000');

  const emailMutation = useMutation({
    mutationFn: authEmailApi,
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error: IError, variable, context) => {
      console.error('emailAuthErr:::', error.response.data.msg);
      setIsErr(true);
      setErrMsg(error.response.data.msg);
    },
    onSuccess: (data, variables, context) => {
      console.log('emailAuthSuccess', data, variables, context);
      if (data.success) {
        setIsErr(false);
        setShowAuth(true);
        setAuthNumResponse(data.msg);
      }
    },
    onSettled: () => {
      console.log('emailAuthEnd');
    },
  });

  const changePwMutation = useMutation({
    mutationFn: changePwApi,
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error: IError, variable, context) => {
      console.error('changePwErr:::', error.response.data.msg);
    },
    onSuccess: (data, variables, context) => {
      console.log('changePwSuccess', data, variables, context);
      if (data.success) {
        router.push('/');
      }
    },
    onSettled: () => {
      console.log('changePwEnd');
    },
  });

  const sendEmail = useCallback(
    (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    ) => {
      e.preventDefault();

      setIsErr(false);

      let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

      if (
        checkBlank(email.value, setIsErr, '이메일을 입력해주세요.', setErrMsg)
      ) {
        return;
      }
      if (!emailRegex.test(email.value)) {
        setIsErr(true);
        setErrMsg('이메일 형식을 확인해주세요.');
        return;
      }

      emailMutation.mutate({ email: email.value });
    },
    [email, emailMutation],
  );

  const onChangePw = useCallback(
    (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    ) => {
      e.preventDefault();

      setIsErr(false);
      setAuthErr(false);

      if (
        checkBlank(
          authNum.value,
          setAuthErr,
          '인증번호를 입력해주세요.',
          setErrMsg,
        )
      ) {
        return;
      }
      if (authNumResponse !== authNum.value) {
        setAuthErr(true);
        setErrMsg('인증번호를 확인해주세요.');
        return;
      }
      if (
        checkBlank(
          password.value,
          setIsErr,
          '비밀번호를 입력해주세요.',
          setErrMsg,
        )
      ) {
        return;
      }
      let pwRegex =
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,}$/;
      if (!pwRegex.test(password.value)) {
        setIsErr(true);
        setErrMsg(
          '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상 조합하여 8자리 이상으로 입력해주세요.',
        );
        return;
      }

      changePwMutation.mutate({ email: email.value, password: password.value });
    },
    [changePwMutation, email, password, authNum, authNumResponse],
  );

  return (
    <div className="w-full h-[540px] rounded-lg flex justify-center items-center bg-gray-50 mt-32 mb-24">
      {emailMutation.isPending && <CSpinner />}
      {showAuth ? (
        <div className="w-[640px] h-fit bg-white shadow-lg rounded-lg flex p-20">
          <div className="w-full">
            <div className="text-center text-4xl font-bold mb-12">
              비밀번호 변경
            </div>
            <form className="flex flex-col gap-4" onSubmit={onChangePw}>
              <CInput
                {...authNum}
                label="인증번호"
                placeholder="인증번호를 입력해주세요."
                type="text"
                isErr={authErr}
                errMsg={errMsg}
              />
              <CInput
                {...password}
                label="비밀번호"
                placeholder="변경할 비밀번호를 입력해주세요."
                type="password"
                isErr={isErr}
                errMsg={errMsg}
              />
              <CButton title="비밀번호 변경" onClick={onChangePw} />
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-lg font-bold mb-4 text-center">
            비밀번호를 찾을 이메일을 입력해주세요
          </div>
          <form className="flex gap-2" onSubmit={sendEmail}>
            <CInput
              {...email}
              placeholder="이메일을 입력해주세요."
              type="email"
              isErr={isErr}
              errMsg={errMsg}
            />
            <div className="h-10 w-52">
              <CButton title="인증번호 전송" onClick={sendEmail} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
