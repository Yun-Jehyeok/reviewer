'use client';

import { getApplicationsApi } from '@/apis/applicationApi';
import { applicationIFC } from '@/interfaces/applicationIFC';
import { userState } from '@/states/userStates';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

export default function ApplyHistory() {
  const [user, setUser] = useRecoilState(userState);

  const { data: reviews, error } = useQuery<
    applicationIFC[],
    Object,
    applicationIFC[],
    [_1: string, _2: string]
  >({
    queryKey: ['applications', user._id],
    queryFn: getApplicationsApi,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  console.log('reviews2:::', reviews);

  return (
    <div className="w-full">
      <div className="text-2xl font-bold mb-4">리뷰 신청 내역</div>
      <div className="w-full flex flex-col">
        {reviews &&
          reviews.map((v, i) => {
            return (
              <div
                key={v._id}
                className={`pt-6 border-b border-gray-200 pb-6 hover:bg-gray-50 cursor-pointer px-8 group`}
              >
                <div className="w-full flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold cursor-pointer group-hover:underline">
                      {v.reviewerId
                        ? v.reviewerId.nickname
                        : v.applicantId.nickname}
                      &nbsp;
                      <span className="font-medium text-sm">
                        (
                        {v.reviewerId
                          ? v.reviewerId.grade
                          : v.applicantId.grade}
                        )
                      </span>
                    </span>
                    &nbsp;&nbsp;
                    <span className="text-sm text-gray-400 font-medium">
                      {v.register_date.slice(0, 10)}
                    </span>
                  </div>
                  <div className="w-fit h-fit text-sm rounded-full py-2 px-4 border border-green-300 bg-green-100">
                    {v.status === 'application' ? '리뷰 대기중' : ''}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
