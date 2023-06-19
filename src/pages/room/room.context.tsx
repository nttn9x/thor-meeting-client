import { createContext, useEffect, useState } from "react";
import { connectSocket } from "@thor/utils/socket.util";
import { connectPeerJs } from "@thor/utils/peer.util";

interface IRoom {
  isConnected: boolean; // socket is connected
}

const emptyState = { isConnected: false };

export const RoomContext = createContext(emptyState);

interface IProps {
  children: React.ReactNode;
}

const Room = ({ children }: IProps) => {
  const [state, setState] = useState<IRoom>(emptyState);

  useEffect(() => {
    (async () => {
      await connectSocket();
      await connectPeerJs();

      window.socket?.on("socket:connected", () => {
        setState({ isConnected: true });
      });
    })();
  }, [setState]);

  return <RoomContext.Provider value={state}>{children}</RoomContext.Provider>;
};

export default Room;
