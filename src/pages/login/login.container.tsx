import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import TextField from "@thor/system-ui/text-field";
import Button from "@thor/system-ui/button";
import { useAppDispatch } from "@thor/store";
import { setUser } from "@thor/store/slices/user/user.slice";
import { AppRouters } from "@thor/constants";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const login = () => {
    dispatch(setUser({ user: {} }));

    navigate(AppRouters.Apartment)
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[400px]">
        <div className="flex flex-col gap-6">
          <TextField label={t("username")} />

          <TextField label={t("password")} />
        </div>
        <Button className="mt-8 w-full" variant="contained" onClick={login}>
          {t("login")}
        </Button>
      </div>
    </div>
  );
};

export default Login;
