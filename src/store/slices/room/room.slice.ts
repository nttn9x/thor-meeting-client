import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";

export type Channel = "redux" | "general";

export interface Message {
  id: number;
  channel: Channel;
  userName: string;
  text: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    getUsersInRoom: build.query<Message[], any>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        console.log("arg", arg);
        // create a websocket connection when the cache subscription starts
        const socket = io(import.meta.env.VITE_SOCKET_API);

        try {
          socket.on("connect", () => {
            //@ts-ignore
            socket.data = { id: socket.id };

            socket.emit("room:join", { roomId: "123" });
          });

          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const onUsers = (otherUsers: any) => {
            console.log("otherUsers 41", otherUsers);
            // otherUsers.forEach((userIdToCall: string) => {
            //   const peer = createRTCPeerConnection(userIdToCall);
            //   peers[userIdToCall] = { peer };
            //   localStream!.getTracks().forEach((track) => {
            //     peer.addTrack(track, localStream!);
            //   });
            // });
          };

          //   const listener = (event: MessageEvent) => {
          //     const data = JSON.parse(event.data);
          //     if (!isMessage(data) || data.channel !== arg) return;

          //     updateCachedData((draft) => {
          //       draft.push(data);
          //     });
          //   };

          socket.on("room:users", onUsers);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves

        socket.offAny();
      },
    }),
  }),
});

export const { useGetUsersInRoomQuery } = api;
