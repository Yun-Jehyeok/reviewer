'use client';

import CButton from '@/components/common/CButton';
import CInput from '@/components/common/CInput';
import { useInput } from '@/hooks/useInput';

import { registerPostApi } from '@/apis/postApi';
import CSpinner from '@/components/common/CSpinner';
import { registerPostIFC } from '@/interfaces/postIFC';
import { userState } from '@/states/userStates';
import { checkBlank } from '@/utils/utils';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
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

const allTechs = [
  'C',
  'C++',
  'C#',
  'Dart',
  'Go',
  'Java',
  'JSP',
  'JavaScript',
  'Kotlin',
  'Objective-C',
  'PHP',
  'Python',
  'R',
  'Ruby',
  'Swift',
  'React',
  'React Native',
  'Spring',
  'Spring Boot',
  'Django',
  'Flask',
  '.NET',
  'Node.js',
  'Express.js',
  'NestJS',
  'Angular',
  'Vue.js',
  'Android',
  'Electron',
];

export default function RegisterReviewer() {
  const router = useRouter();

  const [user, setUser] = useRecoilState(userState);

  const [description, setDescription] = useState<string>('');
  const [techs, setTechs] = useState<string[]>([]);

  const title = useInput('');
  const price = useInput(0);
  const [techVal, setTechVal] = useState<string>('');
  const [filteredTechs, setFilteredTechs] = useState<string[]>([]);

  const [titleErr, setTitleErr] = useState<boolean>(false);
  const [techErr, setTechErr] = useState<boolean>(false);
  const [descErr, setDescErr] = useState<boolean>(false);

  const [titleErrmsg, setTitleErrmsg] = useState<string>('');
  const [techErrmsg, setTechErrmsg] = useState<string>('');
  const [descErrmsg, setDescErrmsg] = useState<string>('');

  const addTech = (val: string) => {
    if (techs.includes(val)) return;

    let data = techs;
    data.push(val);
    setTechs(data);
    setFilteredTechs([]);
    setTechVal('');
  };

  const searchTech = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value;
    setTechVal(val);

    let filtered: string[] = [];
    if (val !== '') filtered = allTechs.filter((v) => v.includes(val));
    else filtered = [];

    setFilteredTechs(filtered);
  };

  const removeTech = (val: string) => {
    let data = techs.filter((v) => v !== val);
    setTechs(data);
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
      if (data.success) router.push(`/reviewers/${data.id}`);
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

      let errFlag = false;
      if (
        checkBlank(
          title.value,
          setTitleErr,
          '제목을 입력해주세요.',
          setTitleErrmsg,
        )
      )
        errFlag = true;

      if (
        checkBlank(
          description,
          setDescErr,
          '설명을 입력해주세요.',
          setDescErrmsg,
        )
      )
        errFlag = true;

      if (techs.length < 1) {
        setTechErr(true);
        setTechErrmsg('기술을 하나 이상 입력해주세요.');
        errFlag = true;
      }

      if (errFlag) return;

      let payload: registerPostIFC = {
        userId: user._id,
        title: title.value,
        content: description,
        lang: techs,
        price: price.value,
      };

      registerPostMutation.mutate(payload);
    },
    [user, title, description, price, registerPostMutation, techs],
  );

  return (
    <div className="py-12">
      {registerPostMutation.isPending && <CSpinner />}
      <h1 className="text-center w-full text-3xl font-bold mb-12">
        Reviewer 등록
      </h1>
      <div className="flex flex-col gap-6">
        <CInput
          {...title}
          type="text"
          label="제목"
          placeholder="제목을 입력해주세요."
          isErr={titleErr}
          errMsg={titleErrmsg}
        />
        <CInput
          {...price}
          type="text"
          label="시간 당 가격 (원)"
          placeholder="시간 당 가격을 입력해주세요."
        />
        <div className="relative">
          <div className="mb-2 font-medium text-sm ">기술</div>
          <div
            className={`w-full h-10 rounded-md border ${
              techErr ? 'border-[#ea002c]' : 'border-gray-400'
            } px-4`}
          >
            <input
              className="w-full h-full border-none text-sm focus:outline-none"
              value={techVal}
              type="text"
              placeholder="사용 가능한 기술을 입력해주세요."
              onChange={searchTech}
            />
            {techErr && (
              <div className="text-[#ea002c] text-xs mt-1">{techErrmsg}</div>
            )}
          </div>

          {filteredTechs.length > 0 && (
            <div className="absolute top-[68px] left-0 z-[10] w-full mt-2 border border-gray-200 rounded-md bg-white">
              {filteredTechs.map((v) => (
                <div
                  key={v}
                  className="w-full bg-white hover:bg-gray-100 cursor-pointer py-2 px-4 rounded-md text-sm"
                  onClick={() => addTech(v)}
                >
                  {v}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-4">
            {techs.map((v) => (
              <div
                key={v}
                className="w-fit h-10 bg-gray-100 rounded-full flex justify-end items-center px-4 gap-8 cursor-pointer hover:shadow-md hover:border-black transition-all"
              >
                <div className="text-sm">{v}</div>
                <div onClick={() => removeTech(v)}>
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
          {descErr && (
            <div className="text-[#ea002c] text-xs mt-1 pl-4">{descErrmsg}</div>
          )}
        </div>

        <div className="w-full flex justify-end">
          <CButton title="등록하기" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
