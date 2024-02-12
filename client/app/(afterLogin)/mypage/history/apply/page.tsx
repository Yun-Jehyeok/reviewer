'use client';

export default function ApplyHistory() {
  return (
    <div className="w-full">
      <div className="text-2xl font-bold mb-4">리뷰 신청 내역</div>
      <div className="w-full flex flex-col">
        {[1, 2, 3, 4, 5, 6, 7].map((v, i) => {
          return (
            <div
              key={v}
              className={`pt-8 ${i !== 6 && 'border-b border-gray-200 pb-8'}`}
            >
              <div>
                <span className="text-lg font-bold cursor-pointer hover:underline">
                  리뷰 신청 내역
                </span>
                &nbsp;&nbsp;
                <span className="text-sm text-gray-400 font-medium">
                  2019. 02. 03
                </span>
              </div>
              <div className="mt-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lor Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lor Lorem Ipsum is simply dummy text
                of the printing and typesetting industry. Lor ...
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
