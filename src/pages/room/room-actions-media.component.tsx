import { useNavigate } from "react-router-dom";

import { Mic, MicOff, PhoneOff, Video, VideoOff, Airplay } from "react-feather";

import { AppRouters } from "@thor/constants";
import Button from "@thor/system-ui/button";
import clsx from "clsx";
import { useRoomContext } from "./room.context";

export default function RoomMediaActions() {
  const navigate = useNavigate();
  const {
    toggleMedia,
    state: { device },
  } = useRoomContext();

  const cancel = () => {
    navigate(AppRouters.Lobby, { replace: true });
  };

  return (
    <div className="basis-4/6 flex items-center justify-center gap-4">
      <Button
        onClick={() => toggleMedia?.("video")}
        className={clsx(
          "rounded-full h-12 w-12 px-0 flex justify-center items-center",
          {
            ["bg-slate-600 text-primary-300"]: device.video,
            ["bg-slate-300 text-primary-700"]: !device.video,
          }
        )}
      >
        {device.video ? (
          <Video className="w-5 h-5 m-auto" />
        ) : (
          <VideoOff className="w-5 h-5 m-auto" />
        )}
      </Button>

      <Button
        onClick={() => toggleMedia?.("audio")}
        className={clsx(
          "rounded-full h-12 w-12 px-0 flex justify-center items-center",
          {
            ["bg-slate-600 text-primary-300"]: device.audio,
            ["bg-slate-300 text-primary-700"]: !device.audio,
          }
        )}
      >
        {device.audio ? (
          <Mic className="w-5 h-5 m-auto" />
        ) : (
          <MicOff className="w-5 h-5 m-auto" />
        )}
      </Button>

      <Button
        className={clsx(
          "rounded-full h-12 w-12 px-0 flex justify-center items-center",
          {
            ["bg-slate-600 text-primary-300"]: true,
          }
        )}
      >
        <Airplay />
      </Button>

      <Button
        variant="primary"
        className="rounded-full h-12 w-12 bg-red-600"
        onClick={cancel}
      >
        <PhoneOff className="w-5 h-5 m-auto" />
      </Button>
    </div>
  );
}
