import clsx from "clsx";
import React from "react";

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary";
  disabled?: boolean;
}

export default function Link({
  className,
  children,
  variant,
  disabled,
  ...rest
}: IButton) {
  return (
    <button
      disabled={disabled}
      className={clsx("rounded px-4 py-2", className, {
        "text-primary-500": variant === "primary",
      })}
      {...rest}
    >
      {children}
    </button>
  );
}
