import { useEffect, useRef } from "react";
import useRoomHook from "./use-room.hook";

import Actions from "./room-actions.component";

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
    localStream,
    showCamera,
    toggleCamera,
    enableMic,
    toggleMic,
  } = useRoomHook();

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-auto overflow-hidden">
        <div
          ref={refVideos}
          className="grid grid-flow-row grid-cols-2 md:grid-cols-4 grid-rows-3 w-full h-full p-8 gap-8"
        >
          <VideoPlayer stream={localStream} />
        </div>
      </div>
      {localStream && (
        <Actions
          showCamera={showCamera}
          toggleCamera={toggleCamera}
          enableMic={enableMic}
          toggleMic={toggleMic}
        />
      )}
    </div>
  );
}
