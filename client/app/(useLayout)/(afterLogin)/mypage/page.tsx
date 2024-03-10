'use client';

import CButton from '@/components/common/CButton';

export default function Mypage() {
  const handleEdit = () => {};

  return (
    <div className="w-full">
      <div className="text-2xl font-bold mb-8">프로필</div>

      <div className="w-full text-lg">
        <div className="w-full flex gap-8 py-4">
          <div className="w-[120px] font-bold">닉네임</div>
          <div className="flex-1">IMU</div>
        </div>

        <div className="w-full flex gap-8 py-4">
          <div className="w-[120px] font-bold">사용 언어</div>
          <div className="flex-1">Python, JavaScript, Java, React</div>
        </div>

        <div className="w-full flex gap-8 py-4">
          <div className="w-[120px] font-bold">가격</div>
          <div className="flex-1">
            20,000&nbsp;원<span className="text-sm">&nbsp;/&nbsp;시간</span>
          </div>
        </div>

        <div className="w-full flex gap-8 py-4">
          <div className="w-[120px] font-bold">설명</div>
          <div className="flex-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
            <br />
            <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
            <br />
            <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end mt-12">
        <CButton title="수정하기" onClick={handleEdit} />
      </div>
    </div>
  );
}
