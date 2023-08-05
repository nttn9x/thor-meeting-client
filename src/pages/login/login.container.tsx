import React from "react";
import { Navigate, generatePath } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";

import { Button, TextField } from "@thor/system-ui";

import { AppRouters } from "@thor/constants";
import useLoginHook from "./login.hook";

const Login = () => {
  const { t, user, onSubmit, register, handleSubmit, errors } = useLoginHook();
  if (!_isEmpty(user)) {
    return (
      <Navigate
        to={generatePath(`../${AppRouters.Apartment}`)}
        replace={true}
      />
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[400px]">
        <div className="flex flex-col gap-6">
          <TextField
            inputProps={{ ...register("username") }}
            label={t("username")}
            errorMessage={errors.username?.message}
          />

          <TextField
            inputProps={{ ...register("password") }}
            label={t("password")}
            errorMessage={errors.password?.message}
          />
        </div>
        <Button className="mt-8 w-full" variant="contained" type="submit">
          {t("login")}
        </Button>
      </form>
    </div>
  );
};

export default Login;
