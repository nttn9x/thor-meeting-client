import React from "react";

import PortfolioContext from "./portfolio.context";

import Portfolio from "./portfolio-main/portfolio-main.component";

const Container = () => {
  return (
    <PortfolioContext>
      <Portfolio />
    </PortfolioContext>
  );
};

export default Container;
