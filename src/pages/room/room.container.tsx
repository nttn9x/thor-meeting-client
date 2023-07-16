import { Navigate, useParams } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";

import { useAppSelector } from "@thor/store";

import Actions from "./room-actions.component";
import Videos from "./room-videos.component";

import RoomContext from "./room.context";
import { selectUser } from "@thor/store/slices/user/user.slice";

const RoomContainer = () => {
  const user = useAppSelector(selectUser);
  const { roomId } = useParams();

  const isEmpty = _isEmpty(user);

  return (
    <RoomContext>
      {isEmpty && <Navigate to={`/name/${roomId}`} />}
      {!isEmpty && (
        <div className="flex flex-col h-full w-full">
          <Videos />
          <Actions />
        </div>
      )}
    </RoomContext>
  );
};

export default RoomContainer;
