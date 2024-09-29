import { useApplicationCloseMutation } from "@/hooks/mutations/application";
import { useGetChatRoom } from "@/hooks/queries/chatroom";
import { applicationIFC, chatIFC } from "@/interfaces/applicationIFC";
import { userIFC } from "@/interfaces/userIFC";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL as string);

/**
 * 1. ChatRoom 에 접속 시, 해당 채팅방의 채팅 내용을 DB에서 가져온다.
 * 2. 채팅을 하고, 매 요청 발생시마다, 데이터를 저장한다.
 *
 * 그럼... 채팅 방에 접속했을 때,
 * 1. 해당 chatroom 의 ID가 필요하고, 해당 ID를 가지고 채팅 내역을 쓸어온다.
 * 2. 현재 유저를 해당 chatroom에 접속시킨다.
 * 3. 이전 채팅 내역을 모두 출력하고, 채팅을 시작한다.
 * 4. 채팅 시, chatroom ID, use.r Id, message를 서버에 보낸다.
 * 5. 서버에서 데이터를 적재한다.
 *
 * 끝
 */

export default function ProceedingContent({ item, setModalOpen }: { item: applicationIFC; setModalOpen: (e: boolean) => void }) {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<userIFC>(["user"]);

    const router = useRouter();

    const [message, setMessage] = useState(""); // 메시지 (채팅창에 치는 중인 글)
    const [messages, setMessages] = useState<chatIFC[]>([]); //매세지들 (채팅창에 전부 다 쳐서 쌓인 글들)

    const msgBoxEl = useRef<null | HTMLDivElement>(null);
    const { chatRoom, error, isPending } = useGetChatRoom(item.chatRoom);

    // 첫 렌더링 후, 채팅방의 모든채팅을 가져와 messages에 담고,
    // 해당 chatroom에 접속한다.
    const [isRendered, setIsRendered] = useState<boolean>(false);
    useEffect(() => {
        if (chatRoom && !isRendered) {
            setIsRendered(true);

            setMessages(chatRoom.chats);
            scrollBottom();

            // 특정 채팅룸에 Join
            socket.emit("join room", item.chatRoom);
        }
    }, [chatRoom]);

    useEffect(() => {
        // 서버로부터 메시지 수신
        // 지금 서버에는 chat 이 하나씩 잘 저장되고 있는데, 여기로 챗이 2번 보내짐
        socket.on("message", (chat: chatIFC) => {
            setMessages((prevMessages) => [...prevMessages, chat]);
            scrollBottom();
        });

        // 컴포넌트 언마운트 시, 소켓 이벤트 제거 및 연결 해제
        return () => {
            socket.off("message");

            // 지금 reviewModal 에서 recoil을 사용하고, 그에 따라 status가 변경되며
            // 이에 따라, proceedingContent가 조건부 렌더링 되고 있는데
            // 이로 인해, 컴포넌트 렌더링 시, unmount도 같이 진행되고 있다.
            // 나중에 이를 해결한 이후 disconnect는 다시...

            // socket.disconnect();
        };
    }, []);

    const sendMessage = async () => {
        // 유저가 있을 때만..., 유저가 없으면 당연히 채팅 못보내야지
        if (user) {
            setMessage("");

            // 여기서 채팅을 보내면 back 에서 다시 io.emit('message')를 통해 메세지를 보내옴
            socket.emit("message", {
                roomId: item.chatRoom,
                author: user._id,
                message,
                userName: user.nickname,
            });
        } else {
            alert("로그인이 필요한 서비스입니다.");
        }
    };

    // 채팅 입력 후, 채팅 룸 화면을 가장 아래로 이동
    const scrollBottom = () => {
        if (msgBoxEl) {
            setTimeout(() => {
                msgBoxEl.current?.scrollTo({
                    top: msgBoxEl.current?.scrollHeight,
                    behavior: "smooth",
                });
            }, 10);
        }
    };

    // 채팅 입력 후 Enter Evt
    const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            if (message) sendMessage();
        }
    };

    // 지원자의 close 요청인지, reviewer 의 close 요청인지
    const [isApplicantReq, setIsApplicantReq] = useState<boolean>(false);
    const applicationCloseMutation = useApplicationCloseMutation(isApplicantReq, setModalOpen);

    // 리뷰 종료 Evt
    const closeApplication = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            if (!user) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }

            let confirm = window.confirm("리뷰를 종료하시겠습니까?");

            if (confirm) {
                if (item.applicantId._id === user._id) setIsApplicantReq(true);
                else setIsApplicantReq(false);

                applicationCloseMutation.mutate(item._id);
            }
        },
        [applicationCloseMutation, applicationCloseMutation, user, item]
    );

    // 화상 채팅 방으로 이동
    const navigateToVideo = () => {
        router.push("/video/1");
    };

    // 로그인 되지 않은 사용자거나, 채팅 룸이 없으면 X
    if (!user || !chatRoom) return null;

    return (
        <div className="w-full">
            <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
                <>
                    <div className="flex flex-col justify-end bg-white h-[20rem] w-full border border-gray-300 shadow-md ">
                        <div ref={msgBoxEl} className="h-full last:border-b-0 overflow-y-scroll rounded-md flex flex-col gap-2 px-2 py-4 pt-2 scrollbar">
                            {messages?.length > 0 &&
                                messages.map((msg, i) => {
                                    return (
                                        <div className={`w-full flex py-1 px-2 border-gray-200 ${msg.user === user._id && "justify-end"}`} key={i}>
                                            <div className="text-sm">
                                                {msg.user !== user._id && <div className="mb-1">{msg.userName}</div>}
                                                <div className="p-1 bg-sky-50 rounded-sm px-2">{msg.message}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="border-t border-gray-300 w-full flex rounded-bl-md">
                            <input
                                type="text"
                                placeholder="새로운 메시지를 입력하세요."
                                value={message}
                                className="outline-none py-2 px-4 rounded-bl-md flex-1 text-sm"
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyUp={handleKeypress}
                            />
                            <div className="border-l border-gray-300 flex justify-center items-center bg-black rounded-br-md group hover:bg-gray-800 transition-all">
                                <button
                                    className="text-white px-3 h-full text-sm"
                                    onClick={() => {
                                        sendMessage();
                                    }}
                                >
                                    보내기
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-2 mt-6 gap-2">
                        <button className="h-10 rounded-lg border border-gray-300 text-sm hover:shadow-md transition-all" onClick={navigateToVideo}>
                            화상 채팅 참여하기
                        </button>
                        <button className="h-10 rounded-lg border border-gray-300 text-sm hover:shadow-md transition-all bg-red-500 text-white" onClick={closeApplication}>
                            리뷰 종료
                        </button>
                    </div>
                </>
            </main>
        </div>
    );
}
