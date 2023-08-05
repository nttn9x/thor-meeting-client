import React, { useRef } from "react";
import Header from "../components/header.component";

const skills = [
  {
    name: "WEB APPLICATION",
  },
  {
    name: "MOBILE",
  },
  {
    name: "TRAINING",
  },
];

const Skill = ({ name }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseOver = () => {
    if (ref.current) {
      ref.current.classList.add("hover");
    }
  };

  const mouseOut = () => {
    if (ref.current) {
      ref.current.classList.remove("hover");
    }
  };

  return (
    <div ref={ref} className="heading relative">
      <div className="grid grid-cols-6 border-y border-gray-800">
        <div className="col-start-2 col-span-4 relative">
          <div
            className="inline-flex hidden-cursor"
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
          >
            <h2 className="heading-content font-bold text-6xl tracking-widest z-20">
              {name}
            </h2>
            <h2 className="font-bold absolute top-0 left-0 text-6xl tracking-widest opacity-20 z-10">
              {name}
            </h2>
          </div>
        </div>
      </div>
      <div className="heading-mask bg-primary-500 absolute top-0 left-0 right-0 grid grid-cols-6 border-y border-gray-800">
        <div className="col-start-2 col-span-4 relative">
          <div>
            <h2 className="font-bold text-6xl tracking-widest z-10">{name}</h2>
            <h2 className="font-bold absolute top-0 left-0 text-6xl tracking-widest opacity-20">
              {name}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AboutPartTwo() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="mt-20 grid grid-cols-6 gap-4">
          <div className="col-start-2 col-span-4 ...">
            <div className="flex flex-col gap-4 mt-32">
              <Header title={"WHAT I DO"} />
            </div>
          </div>
        </div>

        <div>
          {skills.map((s, i) => (
            <Skill key={i} {...s} />
          ))}
        </div>
      </div>
    </>
  );
}
