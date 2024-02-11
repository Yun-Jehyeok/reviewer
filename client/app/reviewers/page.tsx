'use client';

import { getAllPostApi } from '@/apis/postApi';
import CCard from '@/components/common/CCard';
import { allPostIFC } from '@/interfaces/postIFC';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Pagination } from 'antd';
import { useState } from 'react';

export default function Reviewers() {
  const [page, setPage] = useState<number>(1);

  const { data, error, isLoading } = useQuery<
    allPostIFC,
    Object,
    allPostIFC,
    [_1: string, _2: number]
  >({
    queryKey: ['posts', page],
    queryFn: getAllPostApi,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const queryClient = useQueryClient();

  const handlePagination = async (data: number) => {
    setPage(data);

    try {
      await queryClient.getQueryData(['posts', data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="">총 {data ? data.allPostsCnt : 0}개</div>
        {/* 필터링 */}
        <div className="w-fit flex gap-4">
          <select>
            <option value="1">최신 등록 순</option>
            <option value="2">등급 순</option>
            <option value="3">해결 건수 순</option>
          </select>

          <select>
            <option value="1">전체 선택</option>
            <option value="2">Python</option>
            <option value="3">JavaScript</option>
            <option value="4">C</option>
            <option value="5">C++</option>
            <option value="6">C#</option>
            <option value="7">Java</option>
            <option value="8">PHP</option>
            <option value="9">Go</option>
            <option value="10">R</option>
            <option value="11">Swift</option>
          </select>
        </div>
      </div>

      {/* 리스트 */}
      {data && data.posts ? (
        <div className="w-full grid grid-cols-4 gap-x-8 gap-y-6 mt-6">
          {data.posts.map((post) => {
            let data = {
              id: post._id,
              title: post.title,
              price: Number(post.price),
              image: 'https://picsum.photos/id/27/200/300',
            };
            return <CCard key={data.id} data={data} />;
          })}
        </div>
      ) : (
        <div>등록된 리뷰어가 없습니다.</div>
      )}

      <div className="w-full flex justify-center mt-12">
        <Pagination
          defaultCurrent={page}
          total={data ? data.allPostsCnt : 0}
          defaultPageSize={16}
          current={page}
          onChange={handlePagination}
        />
      </div>
    </div>
  );
}
