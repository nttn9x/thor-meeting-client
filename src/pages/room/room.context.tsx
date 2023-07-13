import { useAppSelector } from "@thor/store";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { getRandomColor } from "@thor/utils/color.util";
import { configuration, getGridTemplate, getLocalStream } from "./room.util";

interface IProps {
  children: React.ReactNode;
}

interface IState {
  localStream?: MediaStream;

  device: {
    audio: boolean;
    video: boolean;
  };

  socket?: Socket;
}

interface IRoomContext {
  state: IState;

  toggleMedia?: any;

  refVideos?: React.RefObject<HTMLDivElement>;
}

const initialState = {
  state: {
    device: {
      video: true,
      audio: true,
    },
  },
};

export const RoomContext = createContext<IRoomContext>(initialState);

const Room = ({ children }: IProps) => {
  const { roomId } = useParams();
  const user = useAppSelector((state) => state.user);
  const refVideos = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<IState>({ ...initialState.state });

  useEffect(() => {
    getLocalStream().then((localStream: MediaStream) => {
      setState((prev) => ({ ...prev, localStream }));
    });
  }, [setState]);

  useEffect(() => {
    const localStream = state.localStream;
    if (!localStream || !refVideos?.current) {
      return;
    }

    const peers: any = {};

    const socket = io(import.meta.env.VITE_SOCKET_API, {
      query: { name: user.name, video: "asd asd as da" },
    });

    setState((prev) => ({
      ...prev,
      socket,
    }));

    function drawGrid() {
      refVideos.current!.className = `grid grid-flow-row w-full h-full px-8 pt-8 gap-8 ${getGridTemplate(
        refVideos?.current?.childNodes.length || 1
      )}`;
    }

    function callOtherUsers(otherUsers: string[]) {
      otherUsers.forEach(({ id: userIdToCall, data }: any) => {
        const peer = createPeer(userIdToCall, data);
        peers[userIdToCall] = { peer, data };
        localStream!.getTracks().forEach((track: any) => {
          peer.addTrack(track, localStream!);
        });
      });
    }

    function createPeer(userIdToCall: string, data: any) {
      const peer = new RTCPeerConnection(configuration);
      peer.onnegotiationneeded = () =>
        userIdToCall ? handleNegotiationNeededEvent(peer, userIdToCall) : null;
      peer.onicecandidate = handleICECandidateEvent;
      peer.ontrack = (e: RTCTrackEvent) => {
        if (document.getElementById(userIdToCall)) {
          return;
        }

        const video = document.createElement("video");
        video.srcObject = e.streams[0];
        video.id = `${userIdToCall}-video`;
        video.autoplay = true;
        video.playsInline = true;
        video.className = "remote-video h-full w-full object-cover";

        if (!Boolean(data.video)) {
          video.classList.add("hidden");
        }

        const avatarContainer = document.createElement("div");
        avatarContainer.id = `${userIdToCall}-avatar`;
        avatarContainer.className =
          "border-2 border-slate-700 border-solid w-full h-full rounded-lg bg-slate-800 flex justify-center items-center";
        if (Boolean(data.video)) {
          avatarContainer.classList.add("hidden");
        }
        const avatarBody = document.createElement("div");
        avatarBody.className =
          "w-20 md:w-60 h-20 md:h-60 bg-slate-700 rounded-full flex justify-center items-center text-4xl md:text-8xl capitalize";
        avatarBody.innerHTML = data?.name?.charAt(0);
        avatarBody.style.color = getRandomColor();
        const avatarName = document.createElement("div");
        avatarName.className =
          "text-primary-100 px-4 rounded-bl-lg bg-slate-950/25  absolute bottom-0 left-0 h-8 flex items-center";
        avatarName.innerHTML = data?.name;

        avatarContainer.appendChild(avatarBody);
        avatarContainer.appendChild(avatarName);

        const container = document.createElement("div");
        container.className =
          "relative remote-video-container rounded-lg overflow-hidden h-full w-full";
        container.appendChild(video);
        container.appendChild(avatarContainer);
        container.id = userIdToCall;

        refVideos.current!.appendChild(container);

        drawGrid();
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

      socket.emit("peer:request", payload);
    }

    async function handleReceiveOffer({
      sdp,
      callerId,
      data,
    }: {
      callerId: string;
      data: any;
      sdp: RTCSessionDescription;
    }) {
      const peer = createPeer(callerId, data);
      peers[callerId] = { peer, data };
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
      peers[answererId].peer
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
      peers[from].peer.addIceCandidate(inComingCandidate);
    }

    function handleHideVideo(userId: any) {
      refVideos?.current
        ?.querySelector(`#${userId + "-video"}`)
        ?.classList.add("hidden");
      refVideos?.current
        ?.querySelector(`#${userId + "-avatar"}`)
        ?.classList.remove("hidden");
    }

    function handleShowVideo(userId: any) {
      refVideos?.current
        ?.querySelector(`#${userId + "-video"}`)
        ?.classList.remove("hidden");
      refVideos?.current
        ?.querySelector(`#${userId + "-avatar"}`)
        ?.classList.add("hidden");
    }

    function handleDisconnect(userId: any) {
      delete peers[userId];

      refVideos?.current?.querySelector(`#${userId}`)?.remove();

      drawGrid();
    }

    socket.on("connect", async () => {
      socket.emit("room:join", roomId);

      socket.on("room:all-other-users", callOtherUsers);
      socket.on("peer:offer", handleReceiveOffer);
      socket.on("peer:answer", handleAnswer);
      socket.on("peer:ice-candidate", handleReceiveIce);
      socket.on("peer:hide-video", handleHideVideo);
      socket.on("peer:show-video", handleShowVideo);
      socket.on("peer:leave", handleDisconnect);
    });

    return () => {
      if (!socket) {
        return;
      }
      localStream.getTracks().forEach(function (track) {
        track.stop();
      });

      socket.disconnect();
    };
  }, [state.localStream, setState, roomId, refVideos]);

  const toggleMedia: any = useCallback(
    (type: "video" | "audio") => {
      const track = state
        .localStream!.getTracks()
        .find((track) => track.kind === type);

      track!.enabled = !track!.enabled;

      setState((prev) => ({
        ...prev,
        device: {
          ...prev.device,
          [type]: track!.enabled,
        },
      }));

      if (type === "video") {
        state.socket?.emit(
          !track?.enabled ? "peer:hide-video" : "peer:show-video",
          { id: state.socket.id, roomId }
        );
      }
    },
    [state.localStream, setState, state.socket, roomId]
  );

  return (
    <RoomContext.Provider value={{ state, toggleMedia, refVideos }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => useContext<IRoomContext>(RoomContext);

export default Room;
