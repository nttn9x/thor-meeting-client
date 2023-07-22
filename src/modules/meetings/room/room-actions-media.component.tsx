import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { Mic, MicOff, PhoneOff, Video, VideoOff, Airplay } from "react-feather";

import { AppRouters } from "@thor/constants";
import Button from "@thor/system-ui/button";

import { useRoomContext } from "./room.context";

export default function RoomMediaActions() {
  const navigate = useNavigate();
  const {
    toggleMedia,
    state: { device },
  } = useRoomContext();

  const cancel = () => {
    navigate(AppRouters.Meeting, { replace: true });
  };

  return (
    <div className="basis-5/6 md:basis-4/6 flex items-center justify-start md:justify-center gap-2 md:gap-4">
      <Button
        onClick={() => toggleMedia?.("video")}
        className={clsx(
          "rounded-full w-11 md:w-12 h-11 md:h-12 px-0 flex justify-center items-center",
          {
            ["bg-stone-400 text-primary-300"]: device.video,
            ["bg-stone-700 text-primary-700"]: !device.video,
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
          "rounded-full w-11 md:w-12 h-11 md:h-12 px-0 flex justify-center items-center",
          {
            ["bg-stone-400 text-primary-300"]: device.audio,
            ["bg-stone-700 text-primary-700"]: !device.audio,
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
          "rounded-full w-11 md:w-12 h-11 md:h-12 px-0 flex justify-center items-center",
          {
            ["bg-stone-400 text-primary-300"]: true,
          }
        )}
      >
        <Airplay className="w-5 h-5 m-auto" />
      </Button>

      <Button
        variant="primary"
        className="bg-red-600 rounded-full w-11 md:w-12 h-11 md:h-12 px-0 flex justify-center items-center"
        onClick={cancel}
      >
        <PhoneOff className="w-5 h-5 m-auto" />
      </Button>
    </div>
  );
}
