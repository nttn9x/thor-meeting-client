import React, { useState } from "react";
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
    navigate(`/name/${uuidv4()}`);
  };

  const joinRoom = () => {
    if (!code) {
      return;
    }
    navigate(`/name/${code}`);
  };

  return (
    <div className="mt-10 flex flex-wrap gap-6">
      <Button
        data-testid="new-meeting-button"
        onClick={onCreateMeeting}
        variant="primary"
      >
        {t("new_meeting")}
      </Button>

      <Input
        data-testid="code-input"
        placeholder="Enter a code"
        className={clsx({
          "peer w-full md:!w-80 focus:w-52 focus:md:!w-64": !code,
          "!w-52 md:!w-64": code,
        })}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCode(e.target.value)
        }
        onEnter={joinRoom}
      />
      <Button
        data-testid="join-button"
        className={clsx(
          "!text-primary-500 border-x border-y border-white dark:border-stone-950 hover:border-primary-500 dark:hover:border-primary-500",
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
