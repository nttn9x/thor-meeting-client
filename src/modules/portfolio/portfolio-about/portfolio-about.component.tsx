import React from "react";
import AboutPartOne from "./portfolio-about-part-1.component";
import AboutPartTwo from "./portfolio-about-part-2.component";

interface IAbout {
  mask?: boolean;
}

export default function About(props: IAbout) {
  return (
    <>
      <AboutPartOne {...props} />
      <AboutPartTwo />
    </>
  );
}
