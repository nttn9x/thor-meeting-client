import React, { forwardRef } from "react";

import Input, { IInput } from "../input";
import clsx from "clsx";

interface ITextField extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  inputProps?: IInput;
}

const TextField = forwardRef<ITextField, any>(
  ({ label, inputProps, errorMessage }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label>{label}</label>}
        <Input
          ref={ref}
          {...inputProps}
          className={clsx({
            "border-red-600": errorMessage,
          })}
        />
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>
    );
  }
);

export default TextField;
