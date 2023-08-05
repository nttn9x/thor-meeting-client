import clsx from "clsx";
import _isEmpty from "lodash/isEmpty";
import React from "react";
import { ArrowLeft } from "react-feather";
import { Navigate, generatePath, useParams } from "react-router-dom";

import { MeetingRouter } from "@thor/constants";

import Button from "@thor/system-ui/button";
import Input from "@thor/system-ui/input";
import Link from "@thor/system-ui/link";
import Switch from "@thor/system-ui/switch";
import useSettingsHook from "./settings.hook";

const Settings = () => {
  const { roomId } = useParams();
  const { state, t, user, goBack, onSettingsChange, onNameChange, join } =
    useSettingsHook();

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
