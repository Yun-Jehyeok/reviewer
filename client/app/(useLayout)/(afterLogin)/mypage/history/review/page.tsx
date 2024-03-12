'use client';

import { getReviewsApi } from '@/apis/applicationApi';
import CSpinner from '@/components/common/CSpinner';
import ReviewModal from '@/components/mypage/review/reviewModal';
import { applicationIFC } from '@/interfaces/applicationIFC';
import { userState } from '@/states/userStates';
import { bgFixed } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function ReviweHistory() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setData] = useState<applicationIFC>({
    _id: '',
    reviewerId: {
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
      price: 0,
      introduce: '',
      oneLineIntroduce: '',
    },
    applicantId: {
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
      price: 0,
      introduce: '',
      oneLineIntroduce: '',
    },
    status: '',
    register_date: '',
    chatRoom: '',
  });

  const [user, setUser] = useRecoilState(userState);

  const {
    data: reviews,
    error,
    isPending,
  } = useQuery<
    applicationIFC[],
    Object,
    applicationIFC[],
    [_1: string, _2: string]
  >({
    queryKey: ['reviews', user._id],
    queryFn: getReviewsApi,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const openDetail = (application: applicationIFC) => {
    setShowModal(true);
    bgFixed();
    setData(application);
  };

  return (
    <div className="w-full">
      {isPending && <CSpinner />}
      <div className="text-2xl font-bold mb-4">리뷰 내역</div>
      <div className="w-full flex flex-col">
        {reviews ? (
          reviews.map((v, i) => {
            return (
              <div
                key={v._id}
                className="pt-6 border-b border-gray-200 pb-6 hover:bg-gray-50 cursor-pointer px-8 group"
                onClick={() => openDetail(v)}
              >
                <div className="w-full flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold cursor-pointer group-hover:underline">
                      {v.applicantId.nickname}&nbsp;
                      <span className="font-medium text-sm">
                        ({v.applicantId.grade})
                      </span>
                    </span>
                    &nbsp;&nbsp;
                    <span className="text-sm text-gray-400 font-medium">
                      {v.register_date.slice(0, 10)}
                    </span>
                  </div>
                  <div
                    className={`w-fit h-fit text-sm rounded-full py-1 px-4 border ${
                      v.status === 'application' &&
                      'border-gray-500 text-gray-500'
                    } ${
                      v.status === 'proceeding' &&
                      'border-green-500 text-green-500'
                    }
                    ${
                      v.status === 'complete' && 'border-gray-500 text-gray-500'
                    }
                    ${v.status === 'cancel' && 'border-red-500 text-red-500'}`}
                  >
                    {v.status === 'application' && '리뷰 대기중'}
                    {v.status === 'proceeding' && '진행중'}
                    {v.status === 'complete' && '완료'}
                    {v.status === 'cancel' && '취소'}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full h-[540px] bg-[#F4F6F5] rounded-3xl flex justify-center flex-col">
            <div className="h-fit w-full flex flex-col gap-4">
              <div className="text-[#9b9b9b] text-lg text-center">
                신청 받은 리뷰가 없습니다.
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && <ReviewModal item={data} setModalOpen={setShowModal} />}
    </div>
  );
}
