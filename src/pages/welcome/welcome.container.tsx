import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";

import { useAppDispatch, useAppSelector } from "@thor/store";
import { setUser } from "@thor/store/slices/user/user.slice";
import Button from "@thor/system-ui/button";
import Input from "@thor/system-ui/input";

const DashBoard = () => {
  const dispatch = useAppDispatch();
  const { roomId } = useParams();
  const user = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const [name, setName] = useState<string>("");

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const join = () => {
    if (!name) {
      return;
    }
    dispatch(setUser({ user: { name } }));
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

        <Input
          autoFocus
          value={name}
          placeholder={t("enter_your_name")}
          onChange={onNameChange}
          onEnter={join}
        />

        <Button
          disabled={!name}
          variant="primary"
          className="w-full"
          onClick={join}
        >
          {t("join")}
        </Button>
      </div>
    </div>
  );
};

export default DashBoard;
