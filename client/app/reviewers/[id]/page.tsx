'use client';

import CButton from '@/components/common/CButton';

export default function ReviewerDetail() {
  const onClick = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    console.log('신청하기');
  };

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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Why do we use it? It is
            a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English. Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text,
            and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions have evolved over the years,
            sometimes by accident, sometimes on purpose (injected humour and the
            like). Where does it come from? Contrary to popular belief, Lorem
            Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years
            old. Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the cites
            of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
            Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
            Cicero, written in 45 BC. This book is a treatise on the theory of
            ethics, very popular during the Renaissance. The first line of Lorem
            Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
            1.10.32.
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
                    typesetting industry. Lorem Ipsum has been the industry's
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
            20,000원
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
            <div className="text-xl font-bold text-center">윤제혁</div>
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
              <div className="text-sm text-gray-600">Python, JavaScript</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
