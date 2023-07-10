import { useNavigate } from "react-router-dom";

import { PhoneOff, VideoOff, Video, Mic, MicOff } from "react-feather";

import { AppRouters } from "@thor/constants";
import Button from "@thor/system-ui/button";

export default function RoomActions({
  showCamera,
  toggleCamera,
  enableMic,
  toggleMic,
}: any) {
  const navigate = useNavigate();

  const join = () => {
    navigate(AppRouters.Lobby);
  };

  return (
    <div className="h-20 md:h-28 flex items-center justify-center gap-3">
      <Button
        className="rounded-full h-12 w-12 px-0 flex justify-center items-center"
        onClick={toggleCamera}
      >
        {showCamera ? <VideoOff /> : <Video />}
      </Button>
      <Button
        variant="primary"
        className="rounded-full h-14 w-14 bg-red-600"
        onClick={join}
      >
        <PhoneOff />
      </Button>

      <Button
        className="rounded-full h-12 w-12 px-0 flex justify-center items-center"
        onClick={toggleMic}
      >
        {enableMic ? <MicOff /> : <Mic />}
      </Button>
    </div>
  );
}
