import { useSocket } from "@thor/context/socket.context";
import { createContext, useEffect } from "react";
import { useParams } from "react-router-dom";

export const RoomContext = createContext({});

interface IProps {
  children: React.ReactNode;
}

const Room = ({ children }: IProps) => {
  const { roomId } = useParams();
  const socket = useSocket();

  useEffect(() => {
    socket.emit("room:join", { roomId });
  }, [roomId]);

  return <RoomContext.Provider value={{}}>{children}</RoomContext.Provider>;
};

export default Room;
