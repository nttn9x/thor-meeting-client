import { ThemMode } from "@thor/utils/theme.util";
import React from "react";
import { Moon, Sun } from "react-feather";
import { useNavigate } from "react-router-dom";

import { useThemeContext } from "@thor/context/use-theme.context";
import { AppRouters } from "@thor/constants";

export default function LayoutHeader() {
  const { mode, changeMode } = useThemeContext();
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate(AppRouters.Root);
  };

  return (
    <header className="fixed top-0 w-full py-3 px-4 md:py-4 md:px-8 flex justify-between items-center">
      <div onClick={goToDashboard} className="cursor-pointer">
        <span className="font-semibold text-primary-500 mr-1">Thor</span>Meeting
      </div>
      <button onClick={changeMode}>
        {mode === ThemMode.Dark ? <Moon /> : <Sun />}
      </button>
    </header>
  );
}
