'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

// PeerA = 먼저 룸에 들어와있는 상태
// PeerB = 이후에 룸에 접속을 할 상태

// PeerA
// 1. 브라우저에서 미디어 스트림을 받는다 (getUserMedia)
// 2. stream을 등록한다. (addStream, addTrack)
// 3. createOffer 후에 local sdp를 설정한다. (createOffer => setLocalDescription)
// 4. PeerB에 offer를 전달한다. (send offer)

// PeerB에서 offer를 받은 이후

// PeerB
// 1. PeerA에게서 받은 offer(sdp)로 remote sdp를 설정한다. (setRemoteDescription)
// 2. 브라우저 미디어 스트림을 받는다. (getUserMedia)
// 3. createAnswer 이후 local sdp를 설정한다. (createAnswer => setLocalDescription)
// 4. PeerA에게 answer를 보낸다. (send answer)
// 5. PeerA에서는 answer를 전달받고 remote sdp를 설정한다 (setRemoteDescription)

// create answer 과정 이후 icecandidate로 네트워크 정보를 교환한다.

// 1. 요청자에게 candidate륿 보낸다.
// 2. 연결할 peer에서 받은 정보를 저장하고 자신의 candidate를 보내고(send candidate)
// 3. 받는 쪽에서 해당 candidate를 저장한다. (addICECandidate)

const Test = () => {
    const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
    const [isAudioOn, setIsAudioOn] = useState<boolean>(true);

    const router = useRouter();

    const socketRef = useRef<Socket>();
    // 메인 비디오
    const mainVideoRef = useRef<HTMLVideoElement>(null);
    // 자신의 비디오
    const myVideoRef = useRef<HTMLVideoElement>(null);
    // 다른 사람의 비디오
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    // 자신의 스크린
    const myScreenRef = useRef<HTMLVideoElement>(null);
    // 다른 사람의 스크린
    const remoteScreenRef = useRef<HTMLVideoElement>(null);
    // peerConnection
    const peerConnectionRef = useRef<RTCPeerConnection>();

    const remoteScreenTestRef = useRef<HTMLVideoElement>(null); // 원격 비디오 요소에 대한 참조
    // url 파라미터에 있는 room 정보
    const roomName = '1';

    const getMedia = async () => {
        try {
            // 자신의 스트림 정보
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });

            if (myVideoRef.current) {
                myVideoRef.current.srcObject = stream;
            }
            if (!(peerConnectionRef.current && socketRef.current)) {
                return;
            }

            // 스트림을 peerConnection에 등록
            stream.getTracks().forEach((track) => {
                if (!peerConnectionRef.current) {
                    return;
                }
                peerConnectionRef.current.addTrack(track, stream);
            });

            // iceCandidate 이벤트
            peerConnectionRef.current.onicecandidate = (e) => {
                if (e.candidate) {
                    if (!socketRef.current) return;

                    console.log('recv candidate');
                    socketRef.current.emit('candidate', e.candidate, roomName);
                }
            };

            // 구 addStream 현 track 이벤트
            peerConnectionRef.current.ontrack = (e) => {
                console.log('streams:::::', e.streams);
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = e.streams[0];
                }
            };
        } catch (e) {
            console.error(e);
        }
    };

    const createOffer = async () => {
        console.log('create Offer');
        if (!(peerConnectionRef.current && socketRef.current)) {
            return;
        }
        try {
            // offer 생성
            const sdp = await peerConnectionRef.current.createOffer();
            // 자신의 sdp로 localDescription 설정
            peerConnectionRef.current.setLocalDescription(sdp);
            console.log('sent the offer');

            // offer 전달
            socketRef.current.emit('offer', sdp, roomName);
        } catch (e) {
            console.error(e);
        }
    };

    const createAnswer = async (sdp: RTCSessionDescription) => {
        // sdp인자 : PeerA 에게서 받은 offer
        console.log('createAnswer');
        if (!(peerConnectionRef.current && socketRef.current)) {
            return;
        }

        try {
            // sdp를 remoteDescription에 등록
            peerConnectionRef.current.setRemoteDescription(sdp);
            // answer 생성
            const answerSdp = await peerConnectionRef.current.createAnswer();
            // answer를 localDescription에 등록 (PeerB 기준)
            peerConnectionRef.current.setLocalDescription(answerSdp);

            console.log('sent the answer');
            socketRef.current.emit('answer', answerSdp, roomName);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URL as string, {
            path: '/api/video',
        });

        peerConnectionRef.current = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
            ],
        });

        // 서버로부터 화면 공유에 대한 요청을 수신하는 이벤트 핸들러 등록
        socketRef.current.on(
            'screenShareOffer',
            async (offer: RTCSessionDescriptionInit) => {
                // 여기서 상대방의 offer를 전달받고 이를 본인의 peerConnection에 등록해야됨
                console.log('screenShareOffer:::', offer);
                await receiveScreenShareOffer(offer);
            },
        );

        // 서버로부터 화면 공유에 대한 응답을 수신하는 이벤트 핸들러 등록
        socketRef.current.on(
            'screenShareAnswer',
            async (answer: RTCSessionDescriptionInit) => {
                console.log('here2');
                await receiveScreenShareAnswer(answer);
            },
        );

        // 기존 유저가 있고, 새로운 유저가 들어왔다면 오퍼 생성
        socketRef.current.on('all_users', (allUsers: Array<{ id: string }>) => {
            if (allUsers.length > 0) {
                createOffer();
            }
        });

        // 오퍼를 전달받은 PeerB만 사용할 함수
        // offer를 들고 만들어준 answer 함수 실행
        socketRef.current.on('getOffer', (sdp: RTCSessionDescription) => {
            console.log('recv Offer');
            createAnswer(sdp);
        });

        // answer를 전달받을 PeerA만 사용할 함수
        // answer를 전달받아 PeerA의 RemoteDescription에 등록
        socketRef.current.on('getAnswer', (sdp: RTCSessionDescription) => {
            console.log('recv Answer');
            if (!peerConnectionRef.current) return;

            peerConnectionRef.current.setRemoteDescription(sdp);
        });

        // 서로의 candidate를 전달받아 등록
        socketRef.current.on(
            'getCandidate',
            async (candidate: RTCIceCandidate) => {
                if (!peerConnectionRef.current) return;

                await peerConnectionRef.current.addIceCandidate(candidate);
            },
        );

        // 마운트 시, 해당 방의 roomName을 서버에 전달
        socketRef.current.emit('join_room', {
            room: roomName,
        });

        getMedia();

        return () => {
            // 언마운트 시 socketRef disconnect
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
        };
    }, [socketRef]);

    let screenStream: MediaStream | null = null; // 화면 공유 미디어 스트림
    const localVideoRef = useRef<HTMLVideoElement>(null); // 로컬 비디오 요소에 대한 참조

    // 화면 공유를 시작하는 함수
    const startScreenSharing = async () => {
        try {
            screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });
            // 공유되는 화면을 내 화면에 출력
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = screenStream;
            }
            // 상대방에게 보낼 offer를 만들기
            const offer = await createScreenShareOffer();

            // 그 offer를 받아서 상대방에게 전달
            if (socketRef.current)
                socketRef.current.emit('screenShareOffer', offer);
        } catch (error) {
            console.error('Error accessing screen sharing.', error);
        }
    };

    // 화면 공유 Offer를 생성하는 함수
    const createScreenShareOffer = async () => {
        if (!screenStream) return;
        // 여기서 peerConnection에 내가 공유한 화면의 stream이 track에 등록되고
        screenStream
            .getTracks()
            .forEach((track) =>
                peerConnectionRef.current?.addTrack(
                    track,
                    screenStream as MediaStream,
                ),
            );

        // 내 스트림이 등록된 peerConnection에 대해 다시 offer를 만들고 sdp세팅을 해줌
        if (peerConnectionRef.current) {
            const offer = await peerConnectionRef.current.createOffer();
            await peerConnectionRef.current.setLocalDescription(offer);

            return offer;
        }

        return null;
    };

    // 화면 공유 Offer를 수신하는 함수
    const receiveScreenShareOffer = async (
        offer: RTCSessionDescriptionInit,
    ) => {
        console.log('offer:::', offer);

        // 피어 연결에 상대방의 스트림 정보 설정
        await peerConnectionRef.current!.setRemoteDescription(offer);

        // 피어 연결에서 상대방의 스트림 받기
        peerConnectionRef.current!.ontrack = (event) => {
            console.log('eventStreams:::', event.streams);
            if (
                event.streams &&
                event.streams[0] &&
                remoteScreenTestRef.current
            ) {
                remoteScreenTestRef.current.srcObject = event.streams[0];
            }
        };

        // Answer 생성 후 상대방에게 전송
        const answer = await peerConnectionRef.current!.createAnswer();
        await peerConnectionRef.current!.setLocalDescription(answer);
        socketRef.current!.emit('screenShareAnswer', answer);
    };

    // 화면 공유 Answer를 수신하는 함수
    const receiveScreenShareAnswer = async (
        answer: RTCSessionDescriptionInit,
    ) => {
        await peerConnectionRef.current?.setRemoteDescription(answer);
    };

    const handleAudio = () => {
        setIsAudioOn(!isAudioOn);

        if (myVideoRef.current) {
            let myAudioObj: MediaStream = myVideoRef.current
                .srcObject as MediaStream;
            let myAudioTracks = myAudioObj.getAudioTracks();
            myAudioTracks.forEach((track) => {
                track.enabled = !track.enabled;
            });
            myVideoRef.current.srcObject = myAudioObj;
        }
    };

    const handleVideo = () => {
        setIsVideoOn(!isVideoOn);

        if (myVideoRef.current) {
            let myVideoObj: MediaStream = myVideoRef.current
                .srcObject as MediaStream;
            let myVideoTracks = myVideoObj.getVideoTracks();
            myVideoTracks.forEach((track) => {
                track.enabled = !track.enabled;
            });
            myVideoRef.current.srcObject = myVideoObj;
        }
    };

    const navigateToMypage = () => {
        router.back();
    };

    const handleMainVideo = (type: string) => {
        if (mainVideoRef.current) {
            if (type === 'myvideo') {
                if (myVideoRef.current)
                    mainVideoRef.current.srcObject =
                        myVideoRef.current.srcObject;
            } else if (type === 'opponentvideo') {
                if (remoteVideoRef.current)
                    mainVideoRef.current.srcObject =
                        remoteVideoRef.current.srcObject;
            } else if (type === 'myscreen') {
                if (myScreenRef.current)
                    mainVideoRef.current.srcObject =
                        myScreenRef.current.srcObject;
            } else if (type === 'opponentscreen') {
                if (remoteScreenRef.current)
                    mainVideoRef.current.srcObject =
                        remoteScreenRef.current.srcObject;
            }
        }
    };

    return (
        <div className="w-screen h-screen relative bg-[#202124] overflow-hidden p-8">
            <video
                id="mainvideo"
                className="w-full h-[calc(100vh-356px)] mb-8 bg-black rounded-md"
                ref={mainVideoRef}
                autoPlay
            ></video>

            <div className="w-full flex gap-4">
                <video
                    id="myvideo"
                    className="bg-black w-[240px] h-[180px] rounded-md cursor-pointer hover:outline-2 hover:outline hover:outline-blue-500"
                    ref={myVideoRef}
                    onClick={() => handleMainVideo('myvideo')}
                    autoPlay
                />
                <video
                    id="remotevideo"
                    className="bg-black w-[240px] h-[180px] rounded-md cursor-pointer hover:outline-2 hover:outline hover:outline-blue-500"
                    ref={remoteVideoRef}
                    onClick={() => handleMainVideo('opponentvideo')}
                    autoPlay
                />
                {/* <video
                    id="myscreen"
                    className="bg-black w-[240px] h-[180px] rounded-md cursor-pointer hover:outline-2 hover:outline hover:outline-blue-500"
                    ref={myScreenRef}
                    onClick={() => handleMainVideo('myscreen')}
                    autoPlay
                />
                <video
                    id="remotescreen"
                    className="bg-black w-[240px] h-[180px] rounded-md cursor-pointer hover:outline-2 hover:outline hover:outline-blue-500"
                    ref={remoteScreenRef}
                    onClick={() => handleMainVideo('opponentscreen')}
                    autoPlay
                /> */}
                <video
                    id="localvideo"
                    className="bg-black w-[240px] h-[180px] rounded-md cursor-pointer hover:outline-2 hover:outline hover:outline-blue-500"
                    ref={localVideoRef}
                    autoPlay
                />
                <video
                    id="remoteScreenTestRef"
                    className="bg-black w-[240px] h-[180px] rounded-md cursor-pointer hover:outline-2 hover:outline hover:outline-blue-500"
                    ref={remoteScreenTestRef}
                    autoPlay
                />
            </div>

            <div className="flex justify-center mt-8">
                <div className="flex gap-6">
                    <div
                        className={`w-12 h-12 rounded-full ${
                            isAudioOn
                                ? 'bg-[#3C4043] hover:bg-[#2B3239]'
                                : 'bg-red-500 hover:bg-red-600'
                        } transition-all flex justify-center items-center cursor-pointer`}
                        onClick={handleAudio}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                            />
                        </svg>
                    </div>
                    <div
                        className={`w-12 h-12 rounded-full ${
                            isVideoOn
                                ? 'bg-[#3C4043] hover:bg-[#2B3239]'
                                : 'bg-red-500 hover:bg-red-600'
                        } transition-all flex justify-center items-center cursor-pointer`}
                        onClick={handleVideo}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                            />
                        </svg>
                    </div>
                    <div
                        className="w-12 h-12 rounded-full bg-[#3C4043] hover:bg-[#2B3239] transition-all flex justify-center items-center cursor-pointer"
                        onClick={startScreenSharing}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                            />
                        </svg>
                    </div>
                    <div
                        className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 transition-all flex justify-center items-center cursor-pointer"
                        onClick={navigateToMypage}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;