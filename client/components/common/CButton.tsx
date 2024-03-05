interface ICButton {
  title: string;
  isFull?: boolean;
  onClick: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

export default function CButton({ title, isFull, onClick }: ICButton) {
  return (
    <button
      className={`bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800 ${
        isFull && 'w-full'
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
