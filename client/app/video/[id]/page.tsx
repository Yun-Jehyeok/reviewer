"use client";

// 라이브러리 임포트
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// Socket.IO 클라이언트 인스턴스 생성
const socket = io(process.env.NEXT_PUBLIC_SERVER_URL as string, {
    path: "/api/video",
});

const Video = () => {
    const [isAudioOn, setIsAudioOn] = useState<boolean>(true);
    const router = useRouter();

    // 비디오 요소 참조
    const mainVideoRef = useRef<HTMLVideoElement>(null);
    const myVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionRef = useRef<RTCPeerConnection>();

    const roomName = "1"; // 룸 이름

    const getMedia = async () => {
        try {
            // 자신의 미디어 스트림 정보를 가져옴 (카메라, 마이크 등)
            const stream = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true,
            });

            // 자신의 비디오에 스트림 설정
            if (myVideoRef.current) {
                myVideoRef.current.srcObject = stream;
            }

            if (!(peerConnectionRef.current && socket)) {
                return;
            }

            // 스트림을 peerConnection에 등록
            stream.getTracks().forEach((track) => {
                if (!peerConnectionRef.current) {
                    return;
                }
                peerConnectionRef.current.addTrack(track, stream);
            });

            // ICE candidate 이벤트 설정
            peerConnectionRef.current.onicecandidate = (e) => {
                if (e.candidate) {
                    if (!socket) return;

                    console.log("recv candidate");
                    socket.emit("candidate", e.candidate, roomName);
                }
            };

            // 수신한 트랙 설정
            peerConnectionRef.current.ontrack = (e) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = e.streams[0];
                }
            };
        } catch (e) {
            console.error(e);
        }
    };

    const createOffer = async () => {
        if (!(peerConnectionRef.current && socket)) return;
        try {
            const sdp = await peerConnectionRef.current.createOffer(); // 오퍼를 만들어서
            await peerConnectionRef.current.setLocalDescription(sdp);
            socket.emit("offer", sdp, roomName); // 서버에 전송

            // 서버에선 오퍼를 수신 받고, 해당 룸의 모든 사용자에게 getOffer 송신(sdp를 모든 유저에게 전달)
        } catch (error) {
            console.error("Error creating offer:", error);
        }
    };

    const createAnswer = async (sdp: RTCSessionDescription) => {
        if (!(peerConnectionRef.current && socket)) return;
        try {
            await peerConnectionRef.current.setRemoteDescription(sdp); // 원격 디스크립션 설정
            const answerSdp = await peerConnectionRef.current.createAnswer(); // 답변 생성
            await peerConnectionRef.current.setLocalDescription(answerSdp); // 로컬 디스크립션 설정
            socket.emit("answer", answerSdp, roomName); // 서버에 답변 전달

            // 서버는 답변을 전달 받고 다시 getAnswer 송신을 통해 방의 모든 사용자에게 답변을 보냄
        } catch (error) {
            console.error("Error creating answer:", error);
        }
    };

    useEffect(() => {
        // 1. RTCPeerConnection 초기화
        peerConnectionRef.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // STUN 서버 설정
        });

        // 3. 모든 유저 정보를 받고,
        socket.on("all_users", (allUsers: Array<{ id: string }>) => {
            // 유저가 1명이라도 있다면 createOffer
            if (allUsers.length > 0) createOffer();
        });

        // 4. 유저가 룸에 참가해 오퍼를 만들고, 이를 방의 모든 사용자에게 송신해서
        // 모든 유저는 오퍼를 받음
        socket.on("getOffer", (sdp: RTCSessionDescription) => {
            createAnswer(sdp); // 수신한 오퍼로 답변 생성
        });

        socket.on("getAnswer", (sdp: RTCSessionDescription) => {
            if (peerConnectionRef.current) {
                peerConnectionRef.current.setRemoteDescription(sdp); // 5. 수신한 답변으로 원격 디스크립션 설정
            }
        });

        socket.on("getCandidate", async (candidate: RTCIceCandidate) => {
            if (peerConnectionRef.current) {
                await peerConnectionRef.current.addIceCandidate(candidate);
            }
        });

        // 2. Room 에 참가 -> Room 참가시, all_users 를 수신하며, 그 안엔 모든 유저 정보가 있음
        socket.emit("join_room", { room: roomName });

        // 미디어 스트림 가져오기
        getMedia();

        return () => {
            socket.disconnect();
            if (peerConnectionRef.current) peerConnectionRef.current.close();
        };
    }, []);

    const startScreenSharing = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });
            if (myVideoRef.current) {
                myVideoRef.current.srcObject = screenStream;
            }
        } catch (error) {
            console.error("Error accessing screen sharing:", error);
        }
    };

    const handleAudioToggle = () => {
        setIsAudioOn((prev) => !prev);
        if (myVideoRef.current) {
            const mediaStream = myVideoRef.current.srcObject as MediaStream;
            mediaStream.getAudioTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
        }
    };

    const handleMainVideo = (type: "myvideo" | "opponentvideo") => {
        if (mainVideoRef.current) {
            if (type === "myvideo" && myVideoRef.current) {
                // 나의 비디오를 클릭했을 때
                mainVideoRef.current.srcObject = myVideoRef.current.srcObject;
            } else if (type === "opponentvideo" && remoteVideoRef.current) {
                // 상대방 비디오를 클릭했을 때
                mainVideoRef.current.srcObject = remoteVideoRef.current.srcObject;
            }
        }
    };

    const navigateToMypage = () => {
        router.back();
    };

    return (
        <div className="w-screen h-screen relative bg-[#202124] overflow-hidden p-8">
            <video id="mainvideo" ref={mainVideoRef} className="w-full h-[calc(100vh-356px)] mb-8 bg-black rounded-md" autoPlay />
            <div className="w-full flex gap-4">
                <video ref={myVideoRef} className="bg-black w-[240px] h-[180px] rounded-md cursor-pointer" autoPlay onClick={() => handleMainVideo("myvideo")} />
                <video ref={remoteVideoRef} className="bg-black w-[240px] h-[180px] rounded-md cursor-pointer" autoPlay onClick={() => handleMainVideo("opponentvideo")} />
            </div>
            <div className="flex justify-center mt-8">
                <div className="flex gap-6">
                    <div
                        className={`w-12 h-12 flex justify-center items-center rounded-full ${isAudioOn ? "bg-[#3C4043] hover:bg-[#2B3239]" : "bg-red-500 hover:bg-red-600"}`}
                        onClick={handleAudioToggle}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                            />
                        </svg>
                    </div>
                    <div className="w-12 h-12 flex justify-center items-center rounded-full bg-[#3C4043] hover:bg-[#2B3239]" onClick={startScreenSharing}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                            />
                        </svg>
                    </div>
                    <div className="w-12 h-12 flex justify-center items-center rounded-full bg-red-500 hover:bg-red-600" onClick={navigateToMypage}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
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

export default Video;
