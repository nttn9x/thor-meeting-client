import clsx from "clsx";
import _isEmpty from "lodash/isEmpty";
import React, { useState } from "react";
import { ArrowLeft } from "react-feather";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  generatePath,
  useNavigate,
  useParams,
} from "react-router-dom";

import { MeetingRouter } from "@thor/constants";
import { useAppDispatch, useAppSelector } from "@thor/store";
import { selectUser, setUser } from "@thor/store/slices/room/room.slice";

import Button from "@thor/system-ui/button";
import Input from "@thor/system-ui/input";
import Link from "@thor/system-ui/link";
import Switch from "@thor/system-ui/switch";

const Settings = () => {
  const dispatch = useAppDispatch();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const [state, setState] = useState<any>({
    name: "",
    video: true,
    audio: true,
  });

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: any) => ({ ...prev, name: e.target.value }));
  };

  const join = () => {
    if (!state.name) {
      return;
    }

    dispatch(setUser({ user: { ...state } }));
  };

  const goBack = () => {
    navigate("..");
  };

  const onSettingsChange = (name: string, value: boolean) => {
    setState((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  if (!_isEmpty(user)) {
    return (
      <Navigate
        to={generatePath(`../${MeetingRouter.Room}`, {
          roomId: roomId!,
        })}
        replace={true}
      />
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-80 md:w-96  flex flex-wrap gap-6">
        <div className="w-full flex gap-3 items-center">
          <Link
            variant="primary"
            className="ease-in duration-300 !p-0"
            onClick={goBack}
          >
            <ArrowLeft className="w-9 h-9" />
          </Link>

          <label className="text-3xl md:text-4xl">
            {t("what_s_your_name")}
          </label>
        </div>

        <Input
          data-testid="name-input"
          autoFocus
          value={state.name}
          placeholder={t("enter_your_name")}
          onChange={onNameChange}
          onEnter={join}
        />
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Switch
              id="video"
              name="video"
              onChange={onSettingsChange}
              value={state.video}
            />
            <label
              data-testid="video-label"
              className="cursor-pointer"
              htmlFor="video"
            >
              {t("video")}
            </label>
          </div>
          <div className="flex gap-3">
            <Switch
              id="audio"
              name="audio"
              onChange={onSettingsChange}
              value={state.audio}
            />
            <label className="cursor-pointer" htmlFor="audio">
              {t("audio")}
            </label>
          </div>
        </div>
        <Button
          data-testid="let-talk-button"
          variant="contained"
          className={clsx("w-full", {
            invisible: !state.name,
            visible: state.name,
          })}
          onClick={join}
        >
          {t("let_s_talk")}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
