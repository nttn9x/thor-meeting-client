import React, { useState } from "react";
import { Switch as SwitchLib } from "@headlessui/react";

interface IProps {
  id?: string;
  name: string;
  value?: boolean | undefined;
  onChange: any;
}

export default function Switch({ onChange, value, ...rest }: IProps) {
  const [enabled, setEnabled] = useState<boolean | undefined>(value);

  const _onChange = () => {
    setEnabled(!enabled);

    onChange?.(rest.name, !enabled);
  };

  return (
    <SwitchLib
      checked={enabled}
      onChange={_onChange}
      className={`${enabled ? "bg-primary-500" : "bg-primary-100"}
    relative inline-flex h-[26px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      {...rest}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </SwitchLib>
  );
}
