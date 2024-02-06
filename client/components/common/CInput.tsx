interface ICInput {
  label?: string;
  value: any;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  placeholder: string;
  type: string;
  isErr?: boolean;
  errMsg?: string;
  children: React.ReactNode;
}

export default function CInput({
  label,
  value,
  onChange,
  placeholder,
  type,
  isErr = false,
  errMsg,
  children,
}: ICInput) {
  return (
    <div>
      {label !== '' && <div className="mb-2 font-medium text-sm">{label}</div>}
      <div className="w-full h-10 flex gap-2 rounded-md border border-gray-400 px-4">
        <input
          className="flex-1 h-full border-none text-sm focus:outline-none"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <div className="w-6 h-full flex flex-col justify-center">
          {children}
        </div>
      </div>
      {isErr && (
        <div className="text-[#ea002c] text-xs mt-1 pl-4">{errMsg}</div>
      )}
    </div>
  );
}
