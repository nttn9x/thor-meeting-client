import { useEffect, useState } from "react";
import { Sun, Moon } from "react-feather";
import { ThemMode, getThemeMode, setThemeMode } from "@thor/utils/theme.util";

export default function LayoutHeader() {
  const [mode, setMode] = useState<string>(getThemeMode());

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  const changeMode = () => {
    const value = mode === ThemMode.Dark ? ThemMode.Light : ThemMode.Dark;

    setMode(value);

    setThemeMode(value);
  };

  return (
    <header className="fixed top-0 w-full p-4 flex justify-end">
      <button onClick={changeMode}>
        {mode === ThemMode.Dark ? <Moon /> : <Sun />}
      </button>
    </header>
  );
}
