import * as PeerJsUtil from "@thor/utils/peer.util";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useRoomHook() {
  const { roomId } = useParams();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, setPeers] = useState<any[]>([]);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    PeerJsUtil.addOpenListener(roomId);
    PeerJsUtil.addLocalStreamListener(setStream);
    PeerJsUtil.addLeaveListener(setPeers);
    return () => {
      PeerJsUtil.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    if (!stream) {
      return;
    }

    PeerJsUtil.addJoinedListener(stream, setPeers);
    PeerJsUtil.addOnCallListener(stream, setPeers);
  }, [stream]);

  return { peers, stream };
}
