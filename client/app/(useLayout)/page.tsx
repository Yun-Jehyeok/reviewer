'use client';

import { getBestReviewsApi, getNewReviewsApi } from '@/apis/postApi';
import ReviewerList from '@/components/main/ReviewerList';
import { useQueries } from '@tanstack/react-query';

export default function Home() {
  const results = useQueries({
    queries: [
      {
        queryKey: ['new'],
        queryFn: getNewReviewsApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
      },
      {
        queryKey: ['best'],
        queryFn: getBestReviewsApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
      },
    ],
  });

  return (
    <div>
      <div className="w-full">
        <div className="w-full h-[540px] bg-[#F4F6F5] rounded-3xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg">
          추후 이미지 업데이트 예정입니다.
        </div>
      </div>

      <div className="w-full text-3xl font-extrabold py-16">BEST REVIEWERS</div>
      <ReviewerList posts={results[1].data} />

      <div className="w-full text-3xl font-extrabold py-16 mt-8">
        NEW REVIEWERS
      </div>
      <ReviewerList posts={results[0].data} />
    </div>
  );
}
