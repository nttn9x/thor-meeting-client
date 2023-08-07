import React from "react";
import Header from "../components/header.component";

interface IAboutPartOne {
  mask?: boolean;
}

export default function AboutPartOne({ mask }: IAboutPartOne) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-start-2 col-span-4 ...">
        <div className="flex flex-col gap-4 mt-32">
          <Header title={"ABOUT ME"} />

          <p className="text-6xl font-bold content">
            {!mask && (
              <>
                I'm a{" "}
                <span className="text-primary-500">specifically skilled</span>{" "}
                guy with strong focus on producing hight quality & impactful
                smooth user experience
              </>
            )}
            {mask && (
              <>
                A programmer with skills that haven't been replaced by A.I yet -
                Creating awesome things only if the paycheck is equal good
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
