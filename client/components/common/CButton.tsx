interface ICButton {
    title: string;
    isFull?: boolean;
    isCancel?: boolean;
    addClass?: string;
    onClick: (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>,
    ) => void;
}

export default function CButton({
    title,
    isFull,
    isCancel,
    onClick,
    addClass,
}: ICButton) {
    return (
        <button
            className={`rounded-md px-4 py-2 
        ${
            isCancel
                ? "h-10 rounded-lg border border-gray-300 text-sm hover:shadow-md transition-all bg-red-500 text-white "
                : "bg-black text-white hover:bg-gray-800 "
        } 
        ${addClass} 
          ${isFull && "w-full "}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
}
