import React, { forwardRef } from "react";
import clsx from "clsx";

export interface IInput extends React.HTMLAttributes<HTMLInputElement> {
  value?: string;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<IInput, any>(
  ({ className, onEnter, ...rest }, ref) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key == "Enter") {
        onEnter?.(e);
      }
    };

    return (
      <input
        ref={ref}
        className={clsx(
          "border-slate-300 focus:border-primary-500 outline-none border-x border-y w-full px-4 py-2 rounded-md dark:bg-slate-800 dark:hover:bg-slate-700",
          className
        )}
        onKeyUp={handleKeyPress}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
