import peerjs from "peerjs";

export let me: any;

export const connectPeerJs = async () => {
  me = new peerjs();
};

export const addOpenListener = async (roomId: string) => {
  me.on("open", (peerId: string) => {
    window.peerId = peerId;
    window.socket.emit("room:joining", { roomId, peerId });
  });
};

export const addOnCallListener = async (stream: MediaStream, setPeers: any) => {
  me.on("call", (call: any) => {
    call.answer(stream);
    call.on("stream", (peerStream: any) => {
      setPeers((prev: any) => {
        return prev.map((p: any) => {
          if (call.peer === p.peerId) {
            p.stream = peerStream;
          }
          return p;
        });
      });
    });
  });
};

export const addLocalStreamListener = async (setStream: Function) => {
  //@ts-ignore
  navigator.getUserMedia =
    //@ts-ignore
    navigator.getUserMedia ||
    //@ts-ignore
    navigator.webkitGetUserMedia ||
    //@ts-ignore
    navigator.mozGetUserMedia;
  //@ts-ignore
  navigator.getUserMedia(
    { video: true, audio: true },
    function (stream: any) {
      setStream(stream);
    },
    function (err: string) {
      console.log("Failed to get local stream", err);
    }
  );
};

export const addJoinedListener = async (stream: MediaStream, setPeers: any) => {
  window.socket.on(
    "room:joined",
    ({ peerId, participants }: { peerId: string; participants: any }) => {
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream: any) => {
        setPeers((prev: any) => {
          return prev.map((p: any) => {
            if (call.peer === p.peerId) {
              p.stream = peerStream;
            }
            return p;
          });
        });
      });

      setPeers(participants);
    }
  );
};

export const addLeaveListener = (setPeers: any) => {
  window.socket.on("room:leave", (peerId: string) => {
    setPeers((prev: any) => {
      return prev.filter((p: any) => p.peerId !== peerId);
    });
  });
};

export const disconnect = () => {
  me?.disconnect();
  window.socket?.off("room:joined");
  window.socket?.off("room:leave");
};
