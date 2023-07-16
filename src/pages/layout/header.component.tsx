import { useEffect, useState } from "react";
import { Sun, Moon } from "react-feather";
import { ThemMode, getThemeMode, setThemeMode } from "@thor/utils/theme.util";
import useSound from "@thor/context/use-sound.context";

import LampSwitchMP3 from "@thor/assets/mp3/lamp_switch.mp3";

export default function LayoutHeader() {
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
    <header className="fixed top-0 w-full py-3 px-4 md:py-4 md:px-8 flex justify-between items-center">
      <div>
        <span className="font-semibold text-primary-500 mr-1">Thor</span>Meeting
      </div>
      <button onClick={changeMode}>
        {mode === ThemMode.Dark ? <Moon /> : <Sun />}
      </button>
    </header>
  );
}
