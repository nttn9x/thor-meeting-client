import io from "socket.io-client";
export let socket: any;

export const connectSocket = async () => {
  socket = await io(import.meta.env.VITE_SOCKET_API);
  socket.emit("socket:joining");

  window.socket = socket;
};
