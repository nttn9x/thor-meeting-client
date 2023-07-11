import clsx from "clsx";
import React from "react";

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary";
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function Badge({
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
      <span className="absolute inset-0 object-right-top -mr-6">
        <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
          6
        </div>
      </span>
    </button>
  );
}
