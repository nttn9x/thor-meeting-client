import clsx from "clsx";
import React from "react";

interface IInput extends React.HTMLAttributes<HTMLInputElement> {
  value?: string;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input({ className, onEnter, ...rest }: IInput) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      onEnter?.(e);
    }
  };

  return (
    <input
      className={clsx(
        "border-slate-300 border-2 hover:border-0 w-full px-4 py-2 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700",
        className
      )}
      placeholder="you@example.com"
      onKeyUp={handleKeyPress}
      {...rest}
    />
  );
}
