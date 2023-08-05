import React from "react";
import { companies } from "./portfolio-experience.constant";
import Header from "../components/header.component";

export default function Experience() {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-start-2 col-span-4 ...">
        <div id="experience" className="mt-20 flex flex-col gap-6">
          <Header title={"EXPERIENCE"} />
          <div className="group/list flex flex-col gap-12">
            {companies.map((c, i) => (
              <div
                key={i}
                className="group group/item md:hover:!opacity-100 relative hover:cursor-pointer flex flex-col md:flex-row gap-3"
              >
                <div className="absolute z-0 -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

                <div className="flex-none z-10 w-32 text-secondary opacity-20 font-medium text-sm">
                  {c.time}
                </div>
                <div className="flex-1 z-10">
                  <div className="text-primary-500 font-bold text-xl group-hover/item:text-primary-400">
                    {c.name}
                  </div>
                  <div className="text-secondary-500 font-medium">
                    {c.position}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {c.skills.map((s, j) => (
                      <div
                        key={j}
                        className="rounded-full bg-primary-400/20 py-1 px-3 text-xs font-bold text-primary-500"
                      >
                        {s.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
