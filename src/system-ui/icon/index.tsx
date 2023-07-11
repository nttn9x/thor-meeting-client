import React from "react";

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary";
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function Icon({
  className,
  children,
  variant,
  disabled,
  icon,
  ...rest
}: IButton) {
  return (
    <button
      className="h-12 w-12 hover:bg-slate-300 hover:text-primary-700 text-primary-300 rounded-full py-4 px-1 relative hover:text-primary-600"
      {...rest}
    >
      {icon}
    </button>
  );
}
