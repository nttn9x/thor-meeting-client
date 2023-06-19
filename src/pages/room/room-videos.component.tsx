import { useEffect, useRef } from "react";

import useRoomHook from "./use-room.hook";

const VideoPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <video
      data-testid="peer-video"
      className="w-52 h-52"
      ref={videoRef}
      autoPlay
      muted
    />
  );
};

export default function RoomVideos() {
  const { stream, peers } = useRoomHook();

  return (
    <div className="container max-w-screen-lg grid grid-cols-4 gap-4 h-ful">
      <VideoPlayer stream={stream} />
      {peers.map((peer: any, index: number) => {
        if (peer.peerId === window.peerId) {
          return null;
        }

        return (
          <div key={index}>
            <VideoPlayer stream={peer.stream} />
            <div>{peer.peerId}</div>
          </div>
        );
      })}
    </div>
  );
}
