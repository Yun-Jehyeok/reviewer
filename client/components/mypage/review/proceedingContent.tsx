import { completeAppApi } from '@/apis/applicationApi';
import { applicationIFC } from '@/interfaces/applicationIFC';
import { IError } from '@/interfaces/commonIFC';
import { userState } from '@/states/userStates';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import io from 'socket.io-client';

type Message = {
  _id?: string;
  user: string;
  roomId?: string;
  message: string;
  userName: string;
  createdAt?: string;
};

export default function ProceedingContent({
  item,
  setModalOpen,
}: {
  item: applicationIFC;
  setModalOpen: (e: boolean) => void;
}) {
  const socket = io('http://localhost:8080');

  const [user, setUser] = useRecoilState(userState);

  const [username, setUsername] = useState(''); //이름 지정
  const [chosenUsername, setChosenUsername] = useState('윤제혁'); //선택된 유저 이름 지정
  const [message, setMessage] = useState(''); // 메시지 (채팅창에 치는 중인 글)
  const [messages, setMessages] = useState<Array<Message>>([]); //매세지들 (채팅창에 전부 다 쳐서 쌓인 글들)

  const [chatId, setChatId] = useState('0');

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    socket.emit(
      'init',
      item.chatRoom,
      (res: { success: boolean; msg: any }) => {
        console.log('res:::', res.msg.chats);

        if (res.success) {
          setMessages(res.msg.chats);
          console.log('messages:::', messages);
        }
      },
    );
  };

  const sendMessage = async () => {
    setMessages((currentMsg) => [
      ...currentMsg,
      { user: user._id, userName: user.nickname, message },
    ]);
    console.log('Sent Message', messages);
    setMessage('');

    socket.emit(
      'chat message',
      {
        roomId: item.chatRoom,
        author: user._id,
        message,
        userName: user.nickname,
      },
      (res: { success: boolean; msg: any }) => {
        console.log('res:::', res);
      },
    ); //메시지를 서버에 보낸다. 이후 newIncoming
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      //Enter을 누르게 되면 실행한다
      if (message) {
        sendMessage(); // 메시지가 있으면 보낸다.
      }
    }
  };

  const closeMutation = useMutation({
    mutationFn: completeAppApi,
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error: IError, variable, context) => {
      console.error('changeToCloseErr:::', error);
    },
    onSuccess: (data, variables, context) => {
      console.log('changeToCloseSuccess', data, variables, context);
      if (data.success) setModalOpen(false);
    },
    onSettled: () => {
      console.log('changeToCloseEnd');
    },
  });

  const closeApplication = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      let confirm = window.confirm('리뷰를 종료하시겠습니까?');

      if (confirm) closeMutation.mutate(item._id);
    },
    [closeMutation, item],
  );

  const router = useRouter();

  const navigateToVideo = () => {
    router.push('/video/1');
  };

  return (
    <div className="w-full">
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
        <>
          <div className="flex flex-col justify-end bg-white h-[20rem] w-full border border-gray-300 shadow-md ">
            <div className="h-full last:border-b-0 overflow-y-scroll rounded-md flex flex-col gap-2 px-2 py-4 pt-2">
              {message.length > 0 &&
                messages.map((msg, i) => {
                  return (
                    <div
                      className={`w-full flex py-1 px-2 border-gray-200 ${
                        msg.user === user._id && 'justify-end'
                      }`}
                      key={i}
                    >
                      <div className="text-sm">
                        <div
                          className={`mb-1 ${
                            msg.user === user._id && 'text-end'
                          }`}
                        >
                          {msg.userName}
                        </div>
                        <div className="p-1 bg-sky-50 rounded-sm px-2">
                          {msg.message}
                        </div>
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
            <button
              className="h-10 rounded-lg border border-gray-300 text-sm hover:shadow-md transition-all"
              onClick={navigateToVideo}
            >
              화상 채팅 참여하기
            </button>
            <button
              className="h-10 rounded-lg border border-gray-300 text-sm hover:shadow-md transition-all bg-red-500 text-white"
              onClick={closeApplication}
            >
              리뷰 종료
            </button>
          </div>
        </>
      </main>
    </div>
  );
}
