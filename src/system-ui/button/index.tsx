import clsx from "clsx";
import React from "react";

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "contained" | "outlined";
  color?: "primary";
  disabled?: boolean;
}

export default function Button({
  className,
  children,
  variant,
  disabled,
  ...rest
}: IButton) {
  return (
    <button
      disabled={disabled}
      className={clsx("rounded px-4 py-2 text-white", className, {
        "!bg-gray-500 disabled:opacity-75": disabled,
        "bg-primary-500": variant === "contained",
      })}
      {...rest}
    >
      {children}
    </button>
  );
}
