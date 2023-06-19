import { useContext } from "react";

import Videos from "./room-videos.component";
import { RoomContext } from "./room.context";

export default function Room() {
  const { isConnected } = useContext(RoomContext);

  if (!isConnected) {
    return <>Connecting</>;
  }

  return (
    <div className="flex justify-center">
      <Videos />
    </div>
  );
}
