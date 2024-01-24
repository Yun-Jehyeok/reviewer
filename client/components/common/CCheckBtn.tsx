import { useState } from 'react';

interface ICCheckBtn {
  checked: boolean;
  data: string;
  onClick: () => void;
}
export default function CCheckBtn({
  checked = false,
  data,
  onClick,
}: ICCheckBtn) {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div
      className="w-fit h-10 rounded-md flex justify-center flex-col border-[#d3d3d3] border bg-white cursor-pointer"
      onClick={() => {
        setIsChecked(!isChecked);
        onClick();
      }}
    >
      <div className="w-fit px-5 pl-3 flex gap-3 items-center">
        <div className="w-6 flex justify-center flex-col">
          <div
            className={`w-full h-6 bg-center bg-no-repeat ${
              isChecked
                ? 'bg-black border-none'
                : 'bg-white border border-gray-400'
            } rounded-md`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
        </div>
        <div className="text-base font-normal">{data}</div>
      </div>
    </div>
  );
}
