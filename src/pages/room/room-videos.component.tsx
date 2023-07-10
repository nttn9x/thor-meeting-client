import { useEffect, useRef } from "react";

import { useRoomContext } from "./room.context";
import { useAppSelector } from "@thor/store";

const VideoPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="overflow-hidden w-full h-full rounded-lg">
      <video
        className="h-full w-full object-cover"
        data-testid="peer-video"
        ref={videoRef}
        autoPlay
        muted
      />
    </div>
  );
};

export default function RoomVideos() {
  const {
    refVideos,
    state: { localStream, device },
  } = useRoomContext();
  const user = useAppSelector((state) => state.user);

  return (
    <div className="flex-auto overflow-hidden">
      <div
        ref={refVideos!}
        className="grid grid-flow-row w-full h-full px-8 pt-8 gap-8 grid-cols-1 grid-rows-1"
      >
        {device.video && <VideoPlayer stream={localStream} />}
        {!device.video && (
          <div className="border-2 border-primary-400 border-solid w-full h-full rounded-lg bg-slate-800 flex justify-center items-center">
            <div className="w-40 md:w-60 h-40 md:h-60 bg-slate-700 rounded-full flex justify-center items-center text-8xl capitalize">
              {user.name?.charAt(0)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
