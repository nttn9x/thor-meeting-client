import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import Button from "@thor/system-ui/button";
import Input from "@thor/system-ui/input";

const DashBoardActions = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>();

  const onCreateMeeting = () => {
    navigate(`/room/${uuidv4()}`);
  };

  const joinRoom = () => {
    if (!code) {
      return;
    }
    navigate(`/room/${code}`);
  };

  return (
    <div className="mt-10 flex flex-wrap gap-6">
      <Button onClick={onCreateMeeting} variant="primary">
        New Meeting
      </Button>

      <Input
        placeholder="Enter a code"
        className={clsx({
          "peer !w-80 focus:!w-64": !code,
          "!w-64": code,
        })}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCode(e.target.value)
        }
      />
      <Button
        className={clsx("text-primary-500 hover:bg-slate-800", {
          "invisible peer-focus:visible": !code,
        })}
        onClick={joinRoom}
      >
        Join
      </Button>
    </div>
  );
};

export default DashBoardActions;
