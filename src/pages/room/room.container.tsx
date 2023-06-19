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
      style={{ width: 100, height: 100 }}
      ref={videoRef}
      autoPlay
      muted={true}
    />
  );
};

export default function Room() {
  const { stream, peers } = useRoomHook();
  return (
    <div className="flex h-ful">
      aadsad
      <VideoPlayer stream={stream} />
      {peers.map((peer: any, index: number) => (
        <div key={index}>
          <VideoPlayer stream={peer.stream} />
          <div>{peer.peerId}</div>
        </div>
      ))}
    </div>
  );
}
