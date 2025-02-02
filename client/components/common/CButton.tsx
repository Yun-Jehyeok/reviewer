interface ICButton {
    title: string;
    isFull?: boolean;
    isCancel?: boolean;
    addClass?: string;
    onClick: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
    type?: "submit" | "button" | "reset" | undefined;
}

export default function CButton({ title, isFull, isCancel, onClick, addClass, type = "button" }: ICButton) {
    return (
        <button
            className={`rounded-md px-4 py-2 
        ${isCancel ? "h-10 rounded-lg border border-gray-300 text-sm hover:shadow-md transition-all bg-red-500 text-white " : "bg-gray-900 text-white hover:bg-gray-800 "} 
        ${addClass} 
          ${isFull && "w-full "}`}
            onClick={onClick}
            type={type}
        >
            {title}
        </button>
    );
}
