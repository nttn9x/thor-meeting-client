import React from "react";
interface IHeader {
  title: string;
}

export default function Header({ title }: IHeader) {
  return (
    <span className="tracking-widest sticky top-0 md:relative text-xs font-light tracking-[0.5em] opacity-80">
      {title}
    </span>
  );
}
