import clsx from "clsx";
import React from "react";

interface IInput extends React.HTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...rest }: IInput) {
  return (
    <input
      className={clsx(
        "w-full px-4 py-2 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700",
        className
      )}
      placeholder="you@example.com"
      {...rest}
    />
  );
}
