import React from "react";
import { Users, Share2 } from "react-feather";

import Badge from "@thor/system-ui/badge";
import Icon from "@thor/system-ui/icon";

import { useRoomContext } from "./room.context";
import RoomMediaActions from "./room-actions-media.component";

export default function RoomActions() {
  const {
    state: { localStream },
  } = useRoomContext();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      alert("Copied");
    } catch (err) {
      console.log("err", err);
    }
  };

  if (!localStream) {
    return null;
  }

  return (
    <div className="flex-initial p-4 md:p-6">
      <div className="flex flex-row">
        <div className="hidden md:block basis-1/6"></div>
        <RoomMediaActions />
        <div className="basis-1/6 flex items-center justify-end gap-0 md:gap-3">
          <Icon onClick={copy} icon={<Share2 className="w-5 h-5 m-auto" />} />
          <Badge icon={<Users className="w-5 h-5 m-auto" />} />
        </div>
      </div>
    </div>
  );
}
