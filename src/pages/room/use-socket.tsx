import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    if (socket) {
      return;
    }

    (async () => {
      const socket = await io("https://thor-meeting-server.onrender.com");

      setSocket(socket);
    })();

    return () => {
      socket?.disconnect();
    };
  }, [setSocket]);

  return { socket };
}
