'use client';

import { applyApi, getPostApi } from '@/apis/postApi';
import CButton from '@/components/common/CButton';
import CSpinner from '@/components/common/CSpinner';
import { postIFC } from '@/interfaces/postIFC';
import { userState } from '@/states/userStates';
import { useMutation, useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useParams, useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function ReviewerDetail() {
  const { id } = useParams() as { id: string };
  const [user, setUser] = useRecoilState(userState);

  const router = useRouter();

  const {
    data: post,
    error,
    isPending,
  } = useQuery<postIFC, Object, postIFC, [_1: string, _2: string]>({
    queryKey: ['posts', id],
    queryFn: getPostApi,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const applyMutation = useMutation({
    mutationFn: applyApi,
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error, variable, context) => {
      console.error('applyErr:::', error);
    },
    onSuccess: (data, variables, context) => {
      console.log('applySuccess', data, variables, context);
      if (data.success) {
        alert('리뷰가 신청되었습니다.');
        router.push('/mypage/history/apply');
      }
    },
    onSettled: () => {
      console.log('applyEnd');
    },
  });

  const onClick = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (user._id === '') {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    let conf = confirm('해당 리뷰어에게 리뷰를 신청하시겠습니까?');

    if (conf) {
      if (user.point < post!.price) {
        alert('리뷰 신청을 위한 포인트가 부족합니다.');
        router.push('/payment');
        return;
      }

      applyMutation.mutate({
        applicantId: user._id,
        reviewerId: post!.creator._id,
        point: post!.price,
        postId: post!._id,
      });
    }
  };

  const stars = [1, 2, 3, 4, 5];

  console.log('post:::', post);
  if (!post) return null;

  return (
    <div className="w-full h-fit flex gap-12">
      {(isPending || applyMutation.isPending) && <CSpinner />}
      {/* 왼쪽 */}
      <div className="w-2/3">
        <div className="w-full h-[540px] bg-[#F4F6F5] rounded-xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg">
          추후 이미지 업데이트 예정입니다.
        </div>

        <div className="w-full mt-24">
          <div className="text-2xl font-bold mb-6">설명</div>
          <div>
            {post.content && (
              <div
                style={{
                  width: '100%',
                  whiteSpace: 'normal',
                }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(String(post.content)),
                }}
              />
            )}
          </div>
        </div>

        <div className="w-full my-12 h-[1px] border border-gray-100"></div>

        <div className="w-full h-fit">
          <div className="text-darkblue text-2xl font-bold font-josefin mb-3">
            리뷰
            <span className="text-base text-gray-500 font-medium">
              &nbsp;총 {post.reviews.length}개
            </span>
          </div>

          {/* 리뷰 리스트 */}
          <div className="w-full h-fit mt-12">
            {post.reviews.length > 0 ? (
              post.reviews.map((v) => {
                return (
                  <div key={v._id} className="w-full">
                    <div className="w-full flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <div>
                          <div className="text-base font-bold mb-1">
                            {v.nickname}
                          </div>
                          <div className="text-xs text-gray-500">
                            {v.register_date.slice(0, 10)}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {stars.map((star) => {
                          if (star <= v.score)
                            return (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#FC4C4E"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#FC4C4E"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                              </svg>
                            );
                          return;
                        })}
                      </div>
                    </div>

                    <div className="mt-4 text-base">{v.content}</div>
                    <div className="w-full my-8 h-[1px] border border-gray-100"></div>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-[320px] bg-[#F4F6F5] rounded-3xl flex justify-center flex-col">
                <div className="h-fit w-full flex flex-col gap-4">
                  <div className="text-[#9b9b9b] text-lg text-center">
                    받은 리뷰가 없습니다.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 오른쪽 */}
      <div className="flex-1">
        {user._id !== post.creator._id && (
          <div className="w-full h-fit px-8 py-4 border border-gray-200 rounded-md flex justify-between items-center mb-8">
            <div className="text-lg font-bold">
              {String(post.price)}원
              <span className="text-sm text-gray-400 font-medium">
                &nbsp;/&nbsp;시간당
              </span>
            </div>
            <CButton title="신청하기" onClick={onClick} />
          </div>
        )}

        <div className="w-full h-fit p-12 bg-white rounded-lg shadow-2xl">
          {/* 사진 */}
          <div className="w-full flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-500"></div>
          </div>
          <div className="flex flex-col gap-6">
            {/* 닉네임 */}
            <div className="text-xl font-bold text-center">
              {post.creator.nickname}
            </div>
            {/* 소개 */}
            <div>
              <div className="text-base font-bold mb-2">소개</div>
              <div className="text-sm text-gray-600">
                <div
                  style={{
                    width: '100%',
                    whiteSpace: 'normal',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.creator.introduce),
                  }}
                />
              </div>
            </div>
            {/* 언어 */}
            <div>
              <div className="text-base font-bold mb-2">주 사용 언어</div>
              <div className="text-sm text-gray-600">
                {post.creator.lang.map((v, i) => (
                  <span key={v}>
                    {v}
                    {i !== post.creator.lang.length - 1 && <span>,&nbsp;</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
