import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import peerjs from "peerjs";

import useSocket from "./use-socket";

export default function useRoomHook() {
  const { roomId } = useParams();
  const { socket } = useSocket();
  const [me, setMe] = useState<any>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, setPeers] = useState<any[]>([]);

  useEffect(() => {
    if (!roomId || !socket) {
      return;
    }

    (async () => {
      const me = new peerjs();
      me.on("open", (peerId: string) => {
        socket.emit("room:joining", { roomId, peerId });
      });

      setMe(me);

      me.on("call", (call: any) => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            call.answer(stream); // Answer the call with an A/V stream.
            call.on("stream", () => {
              setStream(stream);
            });
          })
          .catch((err) => {
            console.error("Failed to get local stream", err);
          });
      });

      var getUserMedia =
        //@ts-ignore
        navigator.getUserMedia ||
        //@ts-ignore
        navigator.webkitGetUserMedia ||
        //@ts-ignore
        navigator.mozGetUserMedia;
      getUserMedia(
        { video: true, audio: true },
        function (stream: any) {
          setStream(stream);
        },
        function (err: string) {
          console.log("Failed to get local stream", err);
        }
      );

      socket.on("room:leave", (peerId: string) => {
        setPeers((prev: any) => {
          return prev.filter((p: any) => p.peerId !== peerId);
        });
      });
    })();

    return () => {
      socket.off("room:leave");
    };
  }, [roomId, socket]);

  useEffect(() => {
    if (!stream) {
      return;
    }

    socket.on(
      "room:joined",
      ({ peerId, participants }: { peerId: string; participants: any }) => {
        const call = me.call(peerId, stream);
        call.on("stream", (peerStream: any) => {
          setPeers((prev) => {
            return prev.map((p) => {
              if (call.peer === p.peerId) {
                p.stream = peerStream;
              }
              return p;
            });
          });
        });
        console.log("participants", participants);

        setPeers(participants);
      }
    );

    me.on("call", (call: any) => {
      call.answer(stream);
      call.on("stream", (peerStream: any) => {
        setPeers((prev) => {
          return prev.map((p) => {
            if (call.peer === p.peerId) {
              p.stream = peerStream;
            }
            return p;
          });
        });
      });
    });

    return () => {
      me?.disconnect();

      socket.off("room:joined");
    };
  }, [stream]);

  return { peers, stream };
}
