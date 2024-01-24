interface ICFilterBtn {
  data: string;
  onClick: () => void;
}

export default function CFilterBtn({ data, onClick }: ICFilterBtn) {
  return (
    <div className="w-fit h-10 rounded-md flex justify-center flex-col border-[#d3d3d3] border bg-white">
      <div className="w-fit px-5 pr-3 flex gap-5 items-center">
        <div className="text-base font-normal">{data}</div>
        <div className="w-6 flex justify-center flex-col">
          <div
            className="w-full h-6 cursor-pointer bg-center bg-no-repeat"
            onClick={onClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
