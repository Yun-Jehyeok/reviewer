interface ICButton {
    title: string;
    isFull?: boolean;
    isCancel?: boolean;
    onClick: (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>
    ) => void;
}

export default function CButton({
    title,
    isFull,
    isCancel,
    onClick,
}: ICButton) {
    return (
        <button
            className={`rounded-md px-4 py-2 
        ${
            isCancel
                ? "bg-slate-50 border-solid border border-slate-200 text-neutral-700 hover:bg-slate-100"
                : "bg-black text-white hover:bg-gray-800"
        } 
          ${isFull && "w-full"}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
}
