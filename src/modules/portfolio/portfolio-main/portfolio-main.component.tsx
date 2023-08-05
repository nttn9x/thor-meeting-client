import React from "react";
import clsx from "clsx";

import LayoutHeader from "@thor/pages/layout/header.component";

import "./portfolio-main.scss";

import Banner from "../portfolio-banner/portfolio-banner.component";
import About from "../portfolio-about/portfolio-about.component";
import Experience from "../portfolio-experience/portfolio-experience.component";
// import Menu from "../menu.component";
// import Project from "../project.component";
import { usePortfolioContext } from "../portfolio.context";

// import Footer from "@me/app/footer";

const Portfolio = () => {
  const { root, mask } = usePortfolioContext();

  return (
    <>
      <div
        ref={root}
        className="layer z-0 flex flex-col text-stone-600 dark:bg-stone-900 dark:text-[--text-body]"
      >
        <LayoutHeader />
        <Banner />
        <About />
        <Experience />
        {/* <Footer /> */}
      </div>

      <div
        ref={mask}
        className={clsx(
          "absolute z-10 top-0 left-0 right-0 flex flex-col pointer-events-none dark:text-black",
          "mask"
        )}
      >
        <LayoutHeader />
        <Banner mask />
        <About mask />
        <Experience />
        {/*
          <Footer /> */}
      </div>
    </>
  );
};

export default Portfolio;
