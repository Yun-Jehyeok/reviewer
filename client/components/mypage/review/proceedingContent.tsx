import { completeAppApi } from '@/apis/applicationApi';
import { applicationIFC } from '@/interfaces/applicationIFC';
import { IError } from '@/interfaces/commonIFC';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import io from 'socket.io-client';

type Message = {
  author: string;
  message: string;
};

export default function ProceedingContent({
  item,
  setModalOpen,
}: {
  item: applicationIFC;
  setModalOpen: (e: boolean) => void;
}) {
  let socket;

  const [username, setUsername] = useState(''); //이름 지정
  const [chosenUsername, setChosenUsername] = useState(''); //선택된 유저 이름 지정
  const [message, setMessage] = useState(''); // 메시지 (채팅창에 치는 중인 글)
  const [messages, setMessages] = useState<Array<Message>>([]); //매세지들 (채팅창에 전부 다 쳐서 쌓인 글들)

  //   useEffect(() => {
  //     socketInitializer();
  //   }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket'); //socket API에 도달한다.

    socket = io(); //

    socket.on('newIncomingMessage', (msg) => {
      // 새로 메시지가 들어왔을 때 즉, 서버에서 다시 메시지를 사용자들에게 뿌렸을 때이다.
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message },
      ]);
      console.log('newIncomingMessage: ', messages);
    });
  };

  const sendMessage = async () => {
    socket.emit('createdMessage', { author: chosenUsername, message }); //메시지를 서버에 보낸다. 이후 newIncoming
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: chosenUsername, message },
    ]);
    console.log('Sent Message');
    setMessage('');
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

  return (
    <div className="w-full">
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
        <>
          <div className="flex flex-col justify-end bg-white h-[20rem] w-full border border-gray-300 shadow-md ">
            <div className="h-full last:border-b-0 overflow-y-scroll rounded-md">
              {messages.map((msg, i) => {
                return (
                  <div
                    className="w-full py-1 px-2 border-b border-gray-200"
                    key={i}
                  >
                    {msg.author} : {msg.message}
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
            <button className="h-10 rounded-lg border border-gray-300 text-sm hover:shadow-md transition-all">
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
