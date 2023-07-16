import React from "react";

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary";
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function Icon({ icon, ...rest }: IButton) {
  return (
    <button
      className="h-12 w-12 hover:bg-slate-300 hover:text-primary-700 text-primary-500 rounded-full py-4 px-1 relative hover:text-primary-600"
      {...rest}
    >
      {icon}
    </button>
  );
}
