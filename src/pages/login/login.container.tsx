import React from "react";
import { useTranslation } from "react-i18next";

import TextField from "@thor/system-ui/text-field";
import Button from "@thor/system-ui/button";

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[400px]">
        <div className="flex flex-col gap-6">
          <TextField label={t("username")} />

          <TextField label={t("password")} />
        </div>
        <Button className="mt-8 w-full" variant="contained">
          {t("login")}
        </Button>
      </div>
    </div>
  );
};

export default Login;
