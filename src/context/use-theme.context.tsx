import React, { createContext, useContext, useEffect, useState } from "react";

import { ThemMode, getThemeMode, setThemeMode } from "@thor/utils/theme.util";

import LampSwitchMP3 from "@thor/assets/mp3/lamp_switch.mp3";

import useSound from "@thor/hook/use-sound.hook";

interface IProps {
  children: React.ReactNode;
}

interface IThemeContext {
  mode: string;
  changeMode: () => void;
}

const initialState = { mode: "light", changeMode: () => {} };

export const ThemeContext = createContext<any>(initialState);

const Theme = ({ children }: IProps) => {
  const [mode, setMode] = useState<string>(getThemeMode());
  const { play } = useSound(LampSwitchMP3);

  useEffect(() => {
    document.documentElement.className = mode;

    setThemeMode(mode);
  }, [mode]);

  const changeMode = () => {
    const value = mode === ThemMode.Dark ? ThemMode.Light : ThemMode.Dark;

    setMode(value);

    play();
  };

  return (
    <ThemeContext.Provider value={{ mode, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext<IThemeContext>(ThemeContext);

export default Theme;
