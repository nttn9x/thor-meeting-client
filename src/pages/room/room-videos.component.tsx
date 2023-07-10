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
  const { refVideos, localStream } = useRoomHook();

  return (
    <div
      ref={refVideos}
      className="container max-w-screen-lg grid grid-cols-4 gap-4 h-ful"
    >
      <VideoPlayer stream={localStream} />
      {/* {users?.map((p: any, i: number) => {
        return (
          <div key={i}>
            <VideoPlayer stream={p.stream} />
            <div>{i + "index"}</div>
          </div>
        );
      })} */}
    </div>
  );
}
