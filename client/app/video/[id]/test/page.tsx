'use client';

import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function Home() {
    const localVideoRef = useRef<HTMLVideoElement>(null); // 로컬 비디오 요소에 대한 참조
    const remoteVideoRef = useRef<HTMLVideoElement>(null); // 원격 비디오 요소에 대한 참조
    let localStream: MediaStream | null = null; // 로컬 미디어 스트림
    let peerConnection: RTCPeerConnection | null = null; // 피어 연결 객체
    let screenStream: MediaStream | null = null; // 화면 공유 미디어 스트림

    useEffect(() => {
        init(); // 컴포넌트가 처음 렌더링될 때 실행되는 초기화 함수

        // 서버로부터 화면 공유에 대한 요청을 수신하는 이벤트 핸들러 등록
        socket.on(
            'screenShareOffer',
            async (offer: RTCSessionDescriptionInit) => {
                await receiveScreenShareOffer(offer);
            },
        );

        // 서버로부터 화면 공유에 대한 응답을 수신하는 이벤트 핸들러 등록
        socket.on(
            'screenShareAnswer',
            async (answer: RTCSessionDescriptionInit) => {
                await receiveScreenShareAnswer(answer);
            },
        );

        // 서버로부터 화면 공유에 대한 ICE 후보를 수신하는 이벤트 핸들러 등록
        socket.on(
            'screenShareCandidate',
            async (candidate: RTCIceCandidate) => {
                await receiveScreenShareCandidate(candidate);
            },
        );

        // 서버로부터 비디오 통화에 대한 요청을 수신하는 이벤트 핸들러 등록
        socket.on('videoOffer', async (offer: RTCSessionDescriptionInit) => {
            await receiveVideoOffer(offer);
        });

        // 서버로부터 비디오 통화에 대한 응답을 수신하는 이벤트 핸들러 등록
        socket.on('videoAnswer', async (answer: RTCSessionDescriptionInit) => {
            await receiveVideoAnswer(answer);
        });

        // 서버로부터 비디오 통화에 대한 ICE 후보를 수신하는 이벤트 핸들러 등록
        socket.on('videoCandidate', async (candidate: RTCIceCandidate) => {
            await receiveVideoCandidate(candidate);
        });

        // 컴포넌트가 언마운트될 때 실행되는 클린업 함수
        return () => {
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
            }
            if (screenStream) {
                screenStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    // 미디어 스트림을 초기화하는 함수
    const init = async () => {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream;
            }
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    // 화면 공유를 시작하는 함수
    const startScreenSharing = async () => {
        try {
            screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = screenStream;
            }
            const offer = await createScreenShareOffer();
            socket.emit('screenShareOffer', offer);
        } catch (error) {
            console.error('Error accessing screen sharing.', error);
        }
    };

    // 화면 공유 Offer를 생성하는 함수
    const createScreenShareOffer = async () => {
        if (!screenStream) return;
        peerConnection = new RTCPeerConnection();
        screenStream
            .getTracks()
            .forEach((track) =>
                peerConnection?.addTrack(track, screenStream as MediaStream),
            );

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        return offer;
    };

    // 화면 공유 Offer를 수신하는 함수
    const receiveScreenShareOffer = async (
        offer: RTCSessionDescriptionInit,
    ) => {
        peerConnection = new RTCPeerConnection();

        if (peerConnection) {
            peerConnection.ontrack = (event) => {
                if (
                    event.streams &&
                    event.streams[0] &&
                    remoteVideoRef.current
                ) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
            };
        }

        await peerConnection?.setRemoteDescription(offer);

        const answer = await peerConnection?.createAnswer();
        await peerConnection?.setLocalDescription(
            answer as RTCSessionDescriptionInit,
        );

        socket.emit('screenShareAnswer', answer);
    };

    // 화면 공유 Answer를 수신하는 함수
    const receiveScreenShareAnswer = async (
        answer: RTCSessionDescriptionInit,
    ) => {
        await peerConnection?.setRemoteDescription(answer);
    };

    // 화면 공유 Candidate를 수신하는 함수
    const receiveScreenShareCandidate = async (candidate: RTCIceCandidate) => {
        await peerConnection?.addIceCandidate(candidate);
    };

    // 비디오 통화를 시작하는 함수
    const startVideoCall = async () => {
        if (!localStream) return;
        peerConnection = new RTCPeerConnection();
        localStream
            .getTracks()
            .forEach((track) =>
                peerConnection?.addTrack(track, localStream as MediaStream),
            );

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit('videoOffer', offer);
    };

    // 비디오 통화 Offer를 수신하는 함수
    const receiveVideoOffer = async (offer: RTCSessionDescriptionInit) => {
        peerConnection = new RTCPeerConnection();

        if (peerConnection) {
            peerConnection.ontrack = (event) => {
                if (
                    event.streams &&
                    event.streams[0] &&
                    remoteVideoRef.current
                ) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
            };
        }

        await peerConnection?.setRemoteDescription(offer);

        const answer = await peerConnection?.createAnswer();
        await peerConnection?.setLocalDescription(
            answer as RTCSessionDescriptionInit,
        );

        socket.emit('videoAnswer', answer);
    };

    // 비디오 통화 Answer를 수신하는 함수
    const receiveVideoAnswer = async (answer: RTCSessionDescriptionInit) => {
        await peerConnection?.setRemoteDescription(answer);
    };

    // 비디오 통화 Candidate를 수신하는 함수
    const receiveVideoCandidate = async (candidate: RTCIceCandidate) => {
        await peerConnection?.addIceCandidate(candidate);
    };

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted playsInline />{' '}
            {/* 로컬 비디오 요소 */}
            <video ref={remoteVideoRef} autoPlay playsInline />{' '}
            {/* 원격 비디오 요소 */}
            <button onClick={startScreenSharing}>
                Start Screen Sharing
            </button>{' '}
            {/* 화면 공유 시작 버튼 */}
            <button onClick={startVideoCall}>Start Video Call</button>{' '}
            {/* 비디오 통화 시작 버튼 */}
        </div>
    );
}
