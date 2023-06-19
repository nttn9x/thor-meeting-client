import clsx from "clsx";
import React from "react";

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary";
}

export default function Button({
  className,
  children,
  variant,
  ...rest
}: IButton) {
  return (
    <button
      className={clsx("rounded px-4 py-2", className, {
        "bg-primary-500": variant === "primary",
      })}
      {...rest}
    >
      {children}
    </button>
  );
}
