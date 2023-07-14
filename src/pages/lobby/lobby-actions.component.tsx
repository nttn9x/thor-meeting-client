import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Button from "@thor/system-ui/button";
import Input from "@thor/system-ui/input";

const DashBoardActions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        {t("new_meeting")}
      </Button>

      <Input
        placeholder="Enter a code"
        className={clsx({
          "peer !w-80 focus:w-full focus:md:!w-64": !code,
          "!w-full md:!w-64": code,
        })}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCode(e.target.value)
        }
        onEnter={joinRoom}
      />
      <Button
        className={clsx(
          "!text-primary-500 border-x border-y border-white hover:border-primary-500",
          {
            "invisible peer-focus:visible": !code,
          }
        )}
        onClick={joinRoom}
      >
        {t("join")}
      </Button>
    </div>
  );
};

export default DashBoardActions;
