import Room from "./room.container";
import RoomContext from "./room.context";

const RoomContainer = () => {
  return (
    <RoomContext>
      <Room />
    </RoomContext>
  );
};

export default RoomContainer;
