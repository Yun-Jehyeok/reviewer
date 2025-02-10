// Library
import DOMPurify from "dompurify";

// Interface & States
import { userIFC } from "@/interfaces/userIFC";

interface IProps {
    creator: userIFC;
}

export default function ReviewerInfo({ creator }: IProps) {
    return (
        <div className={styles.container}>
            {/* 사진 */}
            <div className={styles.profileImgContainer}>
                <div className={styles.profileImg}></div>
            </div>

            <div className={styles.profileBody}>
                {/* 닉네임 */}
                <div className={styles.nickname}>{creator.nickname}</div>
                {/* 소개 */}
                <div>
                    <div className={styles.label}>소개</div>
                    <div className={styles.value}>
                        {creator.introduce === "" ? (
                            <div className={styles.noIntroduce}>해당 리뷰어의 소개글이 없습니다.</div>
                        ) : (
                            <div
                                style={{
                                    width: "100%",
                                    whiteSpace: "normal",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(creator.introduce),
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* 내용 없음 */}
                <div className={styles.jobExperience}>
                    <div>
                        <div className={styles.label}>직무</div>
                        <div className={styles.value}>프론트엔드 개발자</div>
                    </div>

                    <div>
                        <div className={styles.label}>경력</div>
                        <div className={styles.value}>미들 (4~8년)</div>
                    </div>
                </div>

                <div>
                    <div className={styles.label}>주 사용 언어</div>
                    <div className={styles.value}>{creator.lang.length > 0 ? creator.lang.join(", ") : <div className={styles.noMainLang}>해당 리뷰어의 주 사용 언어가 없습니다.</div>}</div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: "w-full h-fit p-12 bg-white rounded-lg shadow-md border border-gray-200",
    profileImgContainer: "w-full flex justify-center mb-8",
    profileImg: "w-24 h-24 rounded-full bg-gray-500",
    profileBody: "flex flex-col gap-6",
    nickname: "text-xl font-bold text-center",
    label: "text-base font-bold mb-2",
    value: "text-sm text-gray-600",
    noIntroduce: "w-full text-sm text-gray-600",
    jobExperience: "w-full grid grid-cols-2",
    noMainLang: "w-full text-sm text-gray-600",
};
