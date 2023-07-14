import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { XCircle } from "react-feather";
import _isEmpty from "lodash/isEmpty";

import { useAppDispatch, useAppSelector } from "@thor/store";
import { setUser } from "@thor/store/slices/user/user.slice";
import Button from "@thor/system-ui/button";
import Input from "@thor/system-ui/input";
import clsx from "clsx";
import Link from "@thor/system-ui/link";
import { AppRouters } from "@thor/constants";
import Switch from "@thor/system-ui/switch";

const DashBoard = () => {
  const dispatch = useAppDispatch();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
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

    console.log(" { ...state }", { ...state });
    dispatch(setUser({ user: { ...state } }));
  };

  const goBack = () => {
    navigate(AppRouters.Lobby);
  };

  const onSettingsChange = (name: string, value: Boolean) => {
    setState((prev: any) => {
      console.log("a", { ...prev, [name]: value });
      return { ...prev, [name]: value };
    });
  };

  if (!_isEmpty(user)) {
    return <Navigate to={`/room/${roomId}`} replace={true} />;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-80 md:w-96  flex flex-wrap gap-6">
        <div className="mb-10 w-full text-center">
          <label className="text-5xl">{t("what_s_your_name")}</label>
        </div>
        <Link
          variant="primary"
          className="ease-in duration-300 absolute top-2 left-2"
          onClick={goBack}
        >
          <XCircle className="w-8 h-8" />
        </Link>
        <Input
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
            <label className="cursor-pointer" htmlFor="video">
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
          variant="primary"
          className={clsx("w-full", {
            invisible: !state.name,
            visible: name,
          })}
          onClick={join}
        >
          {t("let_s_talk")}
        </Button>
      </div>
    </div>
  );
};

export default DashBoard;
