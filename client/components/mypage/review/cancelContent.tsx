import { applicationIFC } from "@/interfaces/applicationIFC";

export default function CancelContent({ item }: { item: applicationIFC }) {
    return (
        <div className="w-full">
            <div className="text-xl font-bold mb-4">신청자 정보</div>
            <div className="flex flex-col gap-6 mb-12">
                <div className="w-full grid grid-cols-3">
                    <div>
                        <div className="text-base font-bold mb-1">닉네임</div>
                        {/* 클릭해서 해당 유저 정보로 갈 수 있도록 */}
                        <div className="text-sm cursor-pointer w-fit hover:underline">
                            {item.applicantId.nickname}
                        </div>
                    </div>
                    <div>
                        <div className="text-base font-bold mb-1">언어</div>
                        <div className="text-sm">
                            {item.applicantId.lang.length > 0
                                ? item.applicantId.lang.map((v) => {
                                      return <span key={v}>{v}, </span>;
                                  })
                                : "없음"}
                        </div>
                    </div>
                    <div>
                        <div className="text-base font-bold mb-1">Level</div>
                        <div className="text-sm">{item.applicantId.grade}</div>
                    </div>
                </div>

                <div>
                    <div className="text-base font-bold mb-2">신청 내용</div>
                    <div className="text-sm">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industrys
                        standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type and scrambled it
                        to make a type specimen book.
                    </div>
                </div>
            </div>
        </div>
    );
}
