// Library
import { useRouter } from "next/navigation";

// Components
import CButton from "@/components/common/CButton";

// Interface & States
import { useApplyMutation } from "@/hooks/mutations/application";
import { postIFC } from "@/interfaces/postIFC";
import { userIFC } from "@/interfaces/userIFC";

export default function Apply({ user, post }: { user?: userIFC; post: postIFC }) {
    const router = useRouter();

    const applyMutation = useApplyMutation();

    const onClick = () => {
        if (!user) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }

        let conf = confirm("해당 리뷰어에게 리뷰를 신청하시겠습니까?");

        if (conf) {
            if (user.point < post!.price) {
                alert("리뷰 신청을 위한 포인트가 부족합니다.");
                router.push("/payment");
                return;
            }

            applyMutation.mutate({
                applicantId: user._id,
                reviewerId: post!.creator._id,
                point: post!.price,
                postId: post!._id,
            });
        }
    };

    if (!user || user._id !== post.creator._id) {
        return (
            <div className={styles.container}>
                <div className={styles.price}>
                    {String(post.price)}원<span className={styles.pricePerHour}>&nbsp;/&nbsp;시간당</span>
                </div>
                <CButton title="신청하기" onClick={onClick} />
            </div>
        );
    }
}

const styles = {
    container: "w-full h-fit px-8 py-4 border border-gray-200 rounded-md flex justify-between items-center mb-4 shadow-md",
    price: "text-lg font-bold",
    pricePerHour: "text-sm text-gray-400 font-medium",
};
