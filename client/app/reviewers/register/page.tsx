'use client';

import CButton from '@/components/common/CButton';
import CInput from '@/components/common/CInput';
import { useInput } from '@/hooks/useInput';

import { registerPostApi } from '@/apis/postApi';
import { registerPostIFC } from '@/interfaces/postIFC';
import { userState } from '@/states/userStates';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useRecoilState } from 'recoil';
import './quillset.css';

const QuillWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

export default function RegisterReviewer() {
  const [user, setUser] = useRecoilState(userState);

  const [description, setDescription] = useState<string>('');
  const [techs, setTechs] = useState<string[]>([
    'Python',
    'JavaScript',
    'C++',
    'Spring',
  ]);

  const title = useInput('');
  const price = useInput(0);
  const techVal = useInput('');

  // 사용 가능 기술이랑, 기술 수준 정도도 필요

  const searchTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.keyCode === 13) {
      let data = techs;
      data.push(techVal.value);

      setTechs(data);
      console.log('techs:::', techs);
    }
  };

  const registerPostMutation = useMutation({
    mutationFn: registerPostApi,
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error, variable, context) => {
      console.error('registerPostErr:::', error);
    },
    onSuccess: (data, variables, context) => {
      console.log('registerPostSuccess', data, variables, context);
      if (data.success) {
      }
    },
    onSettled: () => {
      console.log('registerPostEnd');
    },
  });

  const handleSubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    ) => {
      e.preventDefault();

      let payload: registerPostIFC = {
        userId: user.id,
        title: title.value,
        content: description,
        lang: techs,
        price: price.value,
      };

      console.log('payload:::', payload);

      registerPostMutation.mutate(payload);
    },
    [user, title, description, description, price, registerPostMutation],
  );

  return (
    <div className="py-12">
      <h1 className="text-center w-full text-3xl font-bold mb-12">
        Reviewer 등록
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <CInput
          {...title}
          type="text"
          label="제목"
          placeholder="제목을 입력해주세요."
        />
        <CInput
          {...price}
          type="text"
          label="시간 당 가격 (원)"
          placeholder="시간 당 가격을 입력해주세요."
        />
        <div>
          <div className="mb-2 font-medium text-sm ">기술</div>
          <div className="w-full h-10 rounded-md border border-gray-400 px-4">
            <input
              className="w-full h-full border-none text-sm focus:outline-none"
              {...techVal}
              type="text"
              placeholder="사용 가능한 기술을 입력하고 Enter를 입력해주세요."
              onKeyUp={searchTech}
            />
          </div>

          <div className="flex gap-4 mt-4">
            {techs.map((v) => (
              <div
                key={v}
                className="w-fit h-10 bg-gray-100 rounded-full flex justify-end items-center px-4 gap-8 cursor-pointer hover:shadow-md hover:border-black transition-all"
              >
                <div className="text-sm">{v}</div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 font-medium text-sm ">설명</div>
          <QuillWrapper
            theme="snow"
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
            placeholder="설명을 입력해주세요."
          />
        </div>

        <div className="w-full flex justify-end">
          <CButton title="등록하기" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
}
