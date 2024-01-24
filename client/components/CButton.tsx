interface ICButton {
  title: string;
  onClick: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

export default function CButton({ title, onClick }: ICButton) {
  return (
    <button
      className="w-full bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
