import { Navigate, useParams } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";

import { useAppSelector } from "@thor/store";

import Room from "./room.container";
import RoomContext from "./room.context";

const RoomContainer = () => {
  const user = useAppSelector((state) => state.user);
  const { roomId } = useParams();

  const isEmpty = _isEmpty(user);

  return (
    <RoomContext>
      {isEmpty && <Navigate to={`/name/${roomId}`} />}
      {!isEmpty && <Room />}
    </RoomContext>
  );
};

export default RoomContainer;
