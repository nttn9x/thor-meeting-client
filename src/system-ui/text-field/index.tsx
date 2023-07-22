import React from "react";

import Input, { IInput } from "../input";

interface ITextField {
  label?: string;
  inputProps?: IInput;
}

export default function TextField({ label, inputProps }: ITextField) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label>{label}</label>}
      <Input {...inputProps} />
    </div>
  );
}
