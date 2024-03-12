import { proceedingApi } from '@/apis/applicationApi';
import CButton from '@/components/common/CButton';
import CSpinner from '@/components/common/CSpinner';
import { applicationIFC } from '@/interfaces/applicationIFC';
import { IError } from '@/interfaces/commonIFC';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback } from 'react';

export default function ApplicationContent({
  item,
  setStatus,
}: {
  item: applicationIFC;
  setStatus: Dispatch<SetStateAction<string>>;
}) {
  const proceedingMutation = useMutation({
    mutationFn: proceedingApi,
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error: IError, variable, context) => {
      console.error('changeToProceedingErr:::', error);
    },
    onSuccess: (data, variables, context) => {
      console.log('changeToProceedingSuccess', data, variables, context);
      if (data.success) setStatus('proceeding');
    },
    onSettled: () => {
      console.log('changeToProceedingEnd');
    },
  });

  const acceptApplication = useCallback(
    (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    ) => {
      e.preventDefault();

      proceedingMutation.mutate(item._id);
    },
    [proceedingMutation, item],
  );

  return (
    <div className="w-full">
      {proceedingMutation.isPending && <CSpinner />}

      <div className="text-xl font-bold mb-4">신청자 정보</div>
      <div className="flex flex-col gap-6 mb-12">
        <div className="w-full grid grid-cols-3">
          <div>
            <div className="text-base font-bold mb-1">닉네임</div>
            {/* 클릭해서 해당 유저 정보로 갈 수 있도록 */}
            <div className="text-sm cursor-pointer w-fit hover:underline">
              {item.applicantId.nickname}
            </div>
          </div>
          <div>
            <div className="text-base font-bold mb-1">언어</div>
            <div className="text-sm">
              {item.applicantId.lang.length > 0
                ? item.applicantId.lang.map((v) => {
                    return <span key={v}>{v}, </span>;
                  })
                : '없음'}
            </div>
          </div>
          <div>
            <div className="text-base font-bold mb-1">Level</div>
            <div className="text-sm">{item.applicantId.grade}</div>
          </div>
        </div>

        <div>
          <div className="text-base font-bold mb-2">신청 내용</div>
          <div className="text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
        </div>
      </div>

      <CButton title="수락하기" onClick={acceptApplication} isFull={true} />
    </div>
  );
}
