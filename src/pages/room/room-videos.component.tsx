import { useEffect, useRef } from "react";
import { useAppSelector } from "@thor/store";
import { getRandomColor } from "@thor/utils/color.util";

import clsx from "clsx";

import { useRoomContext } from "./room.context";

interface IVideoPlayerProps {
  stream?: MediaStream;
  show: boolean;
}

const VideoPlayer = ({ stream, show }: IVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute("playsinline", "true");
    }
  }, [stream]);

  return (
    <video
      className={clsx("h-full w-full object-cover", {
        ["hidden"]: !show,
      })}
      data-testid="peer-video"
      ref={videoRef}
      autoPlay
      muted
    />
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
        <div className="overflow-hidden w-full h-full rounded-lg">
          <VideoPlayer show={Boolean(device.video)} stream={localStream} />
          <div
            className={clsx(
              "relative border-2 border-primary-400 border-solid w-full h-full rounded-lg bg-slate-800 flex justify-center items-center",
              {
                ["hidden"]: device.video,
              }
            )}
          >
            <div
              style={{ color: getRandomColor() }}
              className="w-20 md:w-60 h-20 md:h-60 bg-slate-700 rounded-full flex justify-center items-center text-4xl md:text-8xl capitalize"
            >
              {user.name?.charAt(0)}
            </div>
            <div className="text-primary-100 px-4 rounded-bl-lg bg-slate-950/25  absolute bottom-0 left-0 h-8 flex items-center">
              {user.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
