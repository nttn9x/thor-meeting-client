import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import { useParams } from "react-router-dom";

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

async function getLocalStream(
  constraints = {
    audio: true,
    video: true,
  }
) {
  return await navigator.mediaDevices.getUserMedia(constraints);
}

export default function useRoomHook() {
  const { roomId } = useParams();
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [showCamera, setShowCamera] = useState<boolean>(true);
  const [enableMic, setEnableMic] = useState<boolean>(true);
  const refVideos = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getLocalStream().then((stream: MediaStream) => {
      setLocalStream(stream);
    });
  }, [setLocalStream]);

  useEffect(() => {
    if (!localStream || !refVideos || !refVideos.current) {
      return;
    }

    const peers: any = {};

    const socket = io(import.meta.env.VITE_SOCKET_API);

    function callOtherUsers(otherUsers: string[]) {
      otherUsers.forEach((userIdToCall: string) => {
        const peer = createPeer(userIdToCall);
        peers[userIdToCall] = peer;
        localStream!.getTracks().forEach((track: any) => {
          peer.addTrack(track, localStream!);
        });
      });
    }

    function createPeer(userIdToCall: string) {
      const peer = new RTCPeerConnection(configuration);
      peer.onnegotiationneeded = () =>
        userIdToCall ? handleNegotiationNeededEvent(peer, userIdToCall) : null;
      peer.onicecandidate = handleICECandidateEvent;
      peer.ontrack = (e: RTCTrackEvent) => {
        if (document.getElementById(userIdToCall)) {
          return;
        }
        console.log("ontrack");
        const container = document.createElement("div");
        container.classList.add("remote-video-container");
        container.classList.add("w-full");
        container.classList.add("h-full");
        container.classList.add("rounded-lg");
        container.classList.add("overflow-hidden");
        const video = document.createElement("video");
        video.srcObject = e.streams[0];
        video.autoplay = true;
        video.playsInline = true;
        video.classList.add("remote-video");
        video.classList.add("h-full");
        video.classList.add("w-full");
        video.classList.add("object-cover");
        container.appendChild(video);

        container.id = userIdToCall;
        refVideos.current!.appendChild(container);
      };
      return peer;
    }

    async function handleNegotiationNeededEvent(
      peer: RTCPeerConnection,
      userIdToCall: string
    ) {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      const payload = {
        sdp: peer.localDescription,
        userIdToCall,
      };

      socket.emit("peer connection request", payload);
    }

    async function handleReceiveOffer({
      sdp,
      callerId,
    }: {
      callerId: string;
      sdp: RTCSessionDescription;
    }) {
      const peer = createPeer(callerId);
      peers[callerId] = peer;
      const desc = new RTCSessionDescription(sdp);
      await peer.setRemoteDescription(desc);

      localStream!.getTracks().forEach((track: any) => {
        peer.addTrack(track, localStream!);
      });

      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      const payload = {
        userToAnswerTo: callerId,
        sdp: peer.localDescription,
      };

      socket.emit("peer:answer", payload);
    }

    function handleAnswer({
      sdp,
      answererId,
    }: {
      answererId: string;
      sdp: RTCSessionDescription;
    }) {
      const desc = new RTCSessionDescription(sdp);
      peers[answererId]
        .setRemoteDescription(desc)
        .catch((e: any) => console.log(e));
    }

    function handleICECandidateEvent(e: any) {
      if (e.candidate) {
        Object.keys(peers).forEach((id) => {
          const payload = {
            target: id,
            candidate: e.candidate,
          };
          socket.emit("peer:ice-candidate", payload);
        });
      }
    }

    function handleReceiveIce({
      candidate,
      from,
    }: {
      candidate: RTCIceCandidate;
      from: string;
    }) {
      const inComingCandidate = new RTCIceCandidate(candidate);
      peers[from].addIceCandidate(inComingCandidate);
    }

    function handleDisconnect(userId: any) {
      delete peers[userId];
      document.getElementById(userId)!.remove();
    }

    socket.on("connect", async () => {
      socket.emit("room:join", roomId);

      socket.on("room:all-other-users", callOtherUsers);
      socket.on("peer:offer", handleReceiveOffer);
      socket.on("peer:answer", handleAnswer);
      socket.on("peer:ice-candidate", handleReceiveIce);
      socket.on("user:leave", handleDisconnect);
    });

    return () => {
      if (!socket) {
        return;
      }
      socket.off("room:all-other-users", callOtherUsers);
      socket.off("peer:offer", handleReceiveOffer);
      socket.off("peer:answer", handleAnswer);
      socket.off("peer:ice-candidate", handleReceiveIce);
      socket.off("user:leave", handleDisconnect);
    };
  }, [localStream, roomId, refVideos]);

  const toggleCamera = useCallback(() => {
    const videoTrack = localStream!
      .getTracks()
      .find((track) => track.kind === "video");

    setShowCamera(!videoTrack!.enabled);

    videoTrack!.enabled = !videoTrack!.enabled;
  }, [localStream, setShowCamera]);

  const toggleMic = useCallback(() => {
    const audioTrack = localStream!
      .getTracks()
      .find((track) => track.kind === "audio");
    setEnableMic(!audioTrack!.enabled);

    audioTrack!.enabled = !audioTrack!.enabled;
  }, [localStream, setEnableMic]);

  return {
    refVideos,
    localStream,
    showCamera,
    toggleCamera,
    enableMic,
    toggleMic,
  };
}
