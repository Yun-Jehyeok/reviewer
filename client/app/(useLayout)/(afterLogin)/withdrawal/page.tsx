'use client';

import { withdrawalApi } from '@/apis/userApi';
import CButton from '@/components/common/CButton';
import { IError } from '@/interfaces/commonIFC';
import { userState } from '@/states/userStates';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function Withdrawals() {
  const router = useRouter();

  const [user, setUser] = useRecoilState(userState);

  const withdrawalMutation = useMutation({
    mutationFn: withdrawalApi,
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error: IError, variable, context) => {
      console.error('withdrawalErr:::', error);
    },
    onSuccess: (data, variables, context) => {
      console.log('withdrawalSuccess', data, variables, context);
      if (data.success) {
        setUser({
          _id: '',
          reputation: 0,
          register_date: '',
          profile_img: '',
          posts: [],
          point: 0,
          phone: '',
          nickname: '',
          name: '',
          login_way: '',
          lang: [],
          isSubmit: false,
          grade: '',
          getApplications: [],
          email: '',
          applications: [],
          token: '',
          price: 0,
          introduce: '',
          oneLineIntroduce: '',
        });
        localStorage.removeItem('token');
        router.push('/');
      }
    },
    onSettled: () => {
      console.log('withdrawalEnd');
    },
  });
  const onSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    withdrawalMutation.mutate(user._id);
  };

  return (
    <div className="w-full flex justify-center my-8">
      <div className="w-full h-fit p-12 bg-gray-50 rounded-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">탈퇴 안내</h1>
          <div className="text-sm text-gray-500">
            회원 탈퇴를 진행하시기 전에 안내 사항을 꼭 확인해주세요.
          </div>
        </div>
        <div>
          <b>
            사용하고 계신 아이디(
            <span className="text-[#1890FF]">{user.email}</span>)는 탈퇴할 경우
            재사용 및 복구가 불가능합니다.
          </b>
        </div>
        <div className="mb-8">
          <span className="text-[#FF4D50]">
            탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가
          </span>
          하오니 신중하게 선택하시기 바랍니다.
        </div>
        <div>
          <b>탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.</b>
        </div>
        <div className="text-gray-500 mb-8">
          회원정보 및 게시글, 프로젝트 관리 등 서비스 이용기록은 모두 삭제되며,
          삭제된 데이터는 복구되지 않습니다.
        </div>
        <div className="mb-8 text-[#ff4d50]">
          탈퇴 후 이메일 {user.email} 로 다시 가입이 가능하지만 기존 데이터는
          복구할 수 없습니다.
        </div>
        <div>
          <CButton title="회원 탈퇴" onClick={onSubmit}></CButton>
        </div>
      </div>
    </div>
  );
}
