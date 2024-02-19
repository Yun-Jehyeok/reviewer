'use client';

import { applyApi, getPostApi } from '@/apis/postApi';
import CButton from '@/components/common/CButton';
import { postIFC } from '@/interfaces/postIFC';
import { userState } from '@/states/userStates';
import { useMutation, useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useParams } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function ReviewerDetail() {
  const params = useParams<{ id: string }>();
  const [user, setUser] = useRecoilState(userState);

  const { data: post, error } = useQuery<
    postIFC,
    Object,
    postIFC,
    [_1: string, _2: string]
  >({
    queryKey: ['posts', params.id],
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
      // if (data.success) {
      //   setUser({ ...data.user, token: data.token });
      //   localStorage.setItem('token', data.token);
      //   router.push('/');
      // }
    },
    onSettled: () => {
      console.log('applyEnd');
    },
  });

  const onClick = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    let conf = confirm('해당 리뷰어에게 리뷰를 신청하시겠습니까?');

    if (conf) {
      applyMutation.mutate({ applicantId: user.id, reviewerId: post!.creator });
    }
  };

  if (!post) return null;

  return (
    <div className="w-full h-fit flex gap-12">
      {/* 오른쪽 */}
      <div className="w-2/3">
        <div>
          <img src="https://picsum.photos/id/27/1130/590" alt="dummy" />
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
              &nbsp;총 99개
            </span>
          </div>

          {/* 리뷰 리스트 */}
          <div className="w-full h-fit mt-12">
            {[1, 2, 3, 4].map((v) => {
              return (
                <div key={v} className="w-full">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                      <div>
                        <div className="text-base font-bold mb-1">윤제혁</div>
                        <div className="text-xs text-gray-500">2023.10.27</div>
                      </div>
                    </div>
                    <div>****</div>
                  </div>

                  <div className="mt-4 text-base">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </div>

                  {v === 4 ? (
                    ''
                  ) : (
                    <div className="w-full my-8 h-[1px] border border-gray-100"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 왼쪽 */}
      <div className="flex-1">
        <div className="w-full h-fit px-8 py-4 border border-gray-200 rounded-md flex justify-between items-center">
          <div className="text-lg font-bold">
            {String(post.price)}원
            <span className="text-sm text-gray-400 font-medium">
              &nbsp;/&nbsp;시간당
            </span>
          </div>
          <div className="w-32">
            <CButton title="신청하기" onClick={onClick} />
          </div>
        </div>

        <div className="w-full h-fit p-12 bg-white rounded-lg shadow-2xl mt-8">
          {/* 사진 */}
          <div className="w-full flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-500"></div>
          </div>
          <div className="flex flex-col gap-6">
            {/* 닉네임 */}
            <div className="text-xl font-bold text-center">{user.name}</div>
            {/* 소개 */}
            <div>
              <div className="text-base font-bold mb-2">소개</div>
              <div className="text-sm text-gray-600">
                안녕하세요 윤제혁입니다. 15년 이상의 풍부한 경험과 대기업
                프로젝트를 수행하는 창의적인 디자인 감각과 기술력으로 반응형
                홈페이지를 제작합니다. 중소기업, 대기업, 기관, 공공기관 등
                규모에 상관 없이 최적의 반응형 홈페이지를 제작합니다. 포털 검색
                사이트에 노출과 검색이 잘 되는 대기업에 적용되는 SEO 검색최적화
                기술력으로 결과의 차이를 만듭니다.
              </div>
            </div>
            {/* 언어 */}
            <div>
              <div className="text-base font-bold mb-2">주 사용 언어</div>
              <div className="text-sm text-gray-600">
                {post.lang.map((v, i) => (
                  <span key={v}>
                    {v}
                    {i !== post.lang.length - 1 && <span>,&nbsp;</span>}
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
