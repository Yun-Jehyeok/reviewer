'use client';

import { getAllPostApi } from '@/apis/postApi';
import CCard from '@/components/common/CCard';
import CSelectBox from '@/components/common/CSelectbox';
import CSpinner from '@/components/common/CSpinner';
import { allPostIFC, getAllPostReqIFC } from '@/interfaces/postIFC';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Pagination } from 'antd';
import { useState } from 'react';

const filter = [
    { id: '0', value: '최신 순', label: '최신 순' },
    { id: '1', value: '등급 순', label: '등급 순' },
    { id: '2', value: '해결 건수 순', label: '해결 건수 순' },
];

const langFilter = [
    { id: 'C', value: 'C', label: 'C' },
    { id: 'C++', value: 'C++', label: 'C++' },
    { id: 'C#', value: 'C#', label: 'C#' },
    { id: 'Dart', value: 'Dart', label: 'Dart' },
    { id: 'Go', value: 'Go', label: 'Go' },
    { id: 'Java', value: 'Java', label: 'Java' },
    { id: 'JSP', value: 'JSP', label: 'JSP' },
    { id: 'JavaScript', value: 'JavaScript', label: 'JavaScript' },
    { id: 'Kotlin', value: 'Kotlin', label: 'Kotlin' },
    { id: 'Objective-C', value: 'Objective-C', label: 'Objective-C' },
    { id: 'PHP', value: 'PHP', label: 'PHP' },
    { id: 'Python', value: 'Python', label: 'Python' },
    { id: 'R', value: 'R', label: 'R' },
    { id: 'Ruby', value: 'Ruby', label: 'Ruby' },
    { id: 'Swift', value: 'Swift', label: 'Swift' },
    { id: 'React', value: 'React', label: 'React' },
    { id: 'React Native', value: 'React Native', label: 'React Native' },
    { id: 'Spring', value: 'Spring', label: 'Spring' },
    { id: 'Spring Boot', value: 'Spring Boot', label: 'Spring Boot' },
    { id: 'Django', value: 'Django', label: 'Django' },
    { id: 'Flask', value: 'Flask', label: 'Flask' },
    { id: '.NET', value: '.NET', label: '.NET' },
    { id: 'Node.js', value: 'Node.js', label: 'Node.js' },
    { id: 'Express.js', value: 'Express.js', label: 'Express.js' },
    { id: 'NestJS', value: 'NestJS', label: 'NestJS' },
    { id: 'Angular', value: 'Angular', label: 'Angular' },
    { id: 'Vue.js', value: 'Vue.js', label: 'Vue.js' },
    { id: 'Android', value: 'Android', label: 'Android' },
    { id: 'Electron', value: 'Electron', label: 'Electron' },
];

export default function Reviewers() {
    const [page, setPage] = useState<number>(1);
    const [val, setVal] = useState<string>('최신 순');
    const [langVal, setLangVal] = useState<string>('C');

    const { data, error, isLoading } = useQuery<
        allPostIFC,
        Object,
        allPostIFC,
        [_1: string, _2: getAllPostReqIFC]
    >({
        queryKey: ['posts', { page, filter: val, langFilter: langVal }],
        queryFn: getAllPostApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    const queryClient = useQueryClient();

    const getPosts = async () => {
        try {
            await queryClient.getQueryData(['posts', page]);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePagination = (data: number) => {
        setPage(data);
        getPosts();
    };

    const handleValFilter = (e: string) => {
        setVal(e);
        getPosts();
    };
    const handleLangFilter = (e: string) => {
        setLangVal(e);
        getPosts();
    };

    console.log('data::', data);

    return (
        <div className="w-full">
            {isLoading && <CSpinner />}
            <div className="w-full flex justify-between">
                <div className="">
                    총{' '}
                    <span className="font-bold">
                        {data ? data.allPostsCnt : 0}
                    </span>
                    개
                </div>
                {/* 필터링 */}
                <div className="w-fit flex gap-4">
                    <CSelectBox items={filter} onChange={handleValFilter} />
                    <CSelectBox
                        items={langFilter}
                        onChange={handleLangFilter}
                    />
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
