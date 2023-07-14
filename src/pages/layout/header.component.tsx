import { useEffect, useState } from "react";
import { Sun, Moon } from "react-feather";
import { ThemMode, getMode, setMode } from "@thor/utils/theme.util";

export default function LayoutHeader() {
  const [mode, _setMode] = useState<string>(getMode());

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  const changeMode = () => {
    const value = mode === ThemMode.Dark ? ThemMode.Light : ThemMode.Dark;

    _setMode(value);

    setMode(value);
  };

  return (
    <header className="w-full p-4 flex justify-end">
      <button onClick={changeMode}>
        {mode === ThemMode.Dark ? <Moon /> : <Sun />}
      </button>
    </header>
  );
}
