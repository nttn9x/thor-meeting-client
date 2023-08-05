import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@thor/store";
import { selectUser, setUser } from "@thor/store/slices/room/room.slice";

const useSettingsHook = () => {
  const dispatch = useAppDispatch();
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
  return { state, t, user, goBack, onSettingsChange, onNameChange, join };
};

export default useSettingsHook;
