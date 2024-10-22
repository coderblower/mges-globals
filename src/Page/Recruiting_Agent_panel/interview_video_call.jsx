import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const VideoCallComponent = () => {
    const [localStream, setLocalStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const remoteVideoRef = useRef();
    const socket = io('http://localhost:6001'); // WebSocket server

    useEffect(() => {
        // Initialize peer connection when the component mounts
        const initWebRTC = async () => {
            // Get local media stream (video/audio)
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);

                // Create a new peer connection
                const pc = new RTCPeerConnection();

                // Add local stream tracks to peer connection
                stream.getTracks().forEach(track => {
                    pc.addTrack(track, stream);
                });

                // Handle ICE candidates
                pc.onicecandidate = event => {
                    if (event.candidate) {
                        socket.emit('ice-candidate', event.candidate);
                    }
                };

                // Handle incoming remote stream
                pc.ontrack = event => {
                    remoteVideoRef.current.srcObject = event.streams[0];
                };

                // Handle socket events for offer/answer/ICE candidates
                socket.on('offer', async (offer) => {
                    await pc.setRemoteDescription(new RTCSessionDescription(offer));
                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer);
                    socket.emit('answer', answer);
                });

                socket.on('answer', async (answer) => {
                    await pc.setRemoteDescription(new RTCSessionDescription(answer));
                });

                socket.on('ice-candidate', async (candidate) => {
                    try {
                        await pc.addIceCandidate(new RTCIceCandidate(candidate));
                    } catch (error) {
                        console.error('Error adding received ICE candidate', error);
                    }
                });

                // Set the peer connection state
                setPeerConnection(pc);
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };

        initWebRTC();

        // Clean up when the component unmounts
        return () => {
            if (peerConnection) {
                peerConnection.close();
            }
            socket.disconnect();
        };
    }, []);

    const initiateCall = async () => {
        if (peerConnection) {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            socket.emit('offer', offer);
        }
    };

    return (
        <div>
            <h2>Video Call</h2>
            <video autoPlay playsInline ref={remoteVideoRef} style={{ width: '500px', height: '300px' }} />
            <button onClick={initiateCall}>Start Call</button>
        </div>
    );
};

export default VideoCallComponent;
