export default function CNoItem({ title }: { title: string }) {
    return (
        <div className="w-full h-[540px] bg-[#F4F6F5] rounded-3xl flex justify-center flex-col">
            <div className="h-fit w-full flex flex-col gap-4">
                <div className="text-[#9b9b9b] text-lg text-center">{title}</div>
            </div>
        </div>
    );
}
