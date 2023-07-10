import { useNavigate } from "react-router-dom";

import { Mic, MicOff, PhoneOff, Video, VideoOff } from "react-feather";

import { AppRouters } from "@thor/constants";
import Button from "@thor/system-ui/button";
import clsx from "clsx";
import { useRoomContext } from "./room.context";

export default function RoomActions() {
  const navigate = useNavigate();
  const {
    toggleMedia,
    state: { localStream, device },
  } = useRoomContext();

  const join = () => {
    navigate(AppRouters.Lobby, { replace: true });
  };

  if (!localStream) {
    return null;
  }

  return (
    <div className="flex-initial py-6 flex items-center justify-center gap-3">
      <Button
        onClick={() => toggleMedia?.("video")}
        className={clsx(
          "rounded-full h-12 w-12 px-0 flex justify-center items-center text-primary-500",
          {
            ["bg-slate-200"]: device.video,
            ["bg-slate-600"]: !device.video,
          }
        )}
      >
        {device.video ? <Video /> : <VideoOff />}
      </Button>
      <Button
        variant="primary"
        className="rounded-full h-14 w-14 bg-red-600"
        onClick={join}
      >
        <PhoneOff />
      </Button>

      <Button
        onClick={() => toggleMedia?.("audio")}
        className={clsx(
          "rounded-full h-12 w-12 px-0 flex justify-center items-center text-primary-500",
          {
            ["bg-slate-200"]: device.audio,
            ["bg-slate-600"]: !device.audio,
          }
        )}
      >
        {device.audio ? <Mic /> : <MicOff />}
      </Button>
    </div>
  );
}
