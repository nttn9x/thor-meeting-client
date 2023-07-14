import Actions from "./room-actions.component";
import Videos from "./room-videos.component";

export default function RoomVideos() {
  return (
    <div className="flex flex-col h-full w-full">
      <Videos />
      <Actions />
    </div>
  );
}
