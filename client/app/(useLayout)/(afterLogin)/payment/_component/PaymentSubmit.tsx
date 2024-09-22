// Library
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// Components

// Hooks & Utils
import { bgFixed, cancelBgFixed } from "@/utils/utils";

// Api
import { paymentApi } from "@/apis/userApi";

// Interface & States
import { IError } from "@/interfaces/commonIFC";
import { RequestPayParams, RequestPayResponse } from "@/interfaces/portone";
import { userIFC } from "@/interfaces/userIFC";

interface IProps {
    user: userIFC;
    price: string;
}

export default function PaymentSubmit({ user, price }: IProps) {
    const router = useRouter();

    const paymentMutation = useMutation({
        mutationFn: paymentApi,
        onMutate: (variable) => {
            console.log("onMutate", variable);
        },
        onError: (error: IError, variable, context) => {
            console.error("paymentErr:::", error);
        },
        onSuccess: (data, variables, context) => {
            console.log("paymentSuccess", data, variables, context);
            if (data.success) {
                router.push("/");
            }
        },
        onSettled: () => {
            cancelBgFixed();
            console.log("paymentEnd");
        },
    });

    function callback(response: RequestPayResponse) {
        const { imp_uid, merchant_uid, error_code, error_msg } = response;

        if (error_code) {
            // 결제 창 닫음
            if (error_code !== "F400") alert(`${error_msg}`);
        } else {
            paymentMutation.mutate({
                id: user!._id,
                point: Number(price),
            });
        }
    }

    const handlePayment = (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>
    ) => {
        if (isNaN(Number(price))) {
            alert("결제 금액은 숫자만 입력 가능합니다.");
            return;
        }
        if (Number(price) < 1000) {
            alert("결제 금액은 1000원 이상이어야 합니다.");
            return;
        }
        if (!window.IMP) return;
        bgFixed();

        /* 1. 가맹점 식별하기 */
        const { IMP } = window;
        IMP.init("imp64767037"); // 가맹점 식별코드

        /* 2. 결제 데이터 정의하기 */
        const data: RequestPayParams = {
            pg: "nice_v2", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
            pay_method: "card", // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: Number(price), // 결제금액
            name: "Reviewer 포인트 결제", // 주문명
            buyer_name: user!.name, // 구매자 이름
            buyer_tel: "01012341234", // 구매자 전화번호
            buyer_email: user!.email, // 구매자 이메일
            buyer_addr: "신사동 661-16", // 구매자 주소
            buyer_postcode: "06018", // 구매자 우편번호
        };

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    };

    return (
        <button
            className="w-full bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800 mt-12"
            onClick={handlePayment}
        >
            충전하기
        </button>
    );
}
