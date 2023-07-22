import React from "react";
import Actions from "./lobby-actions.component";
import LobbyBanner from "./lobby-banner.component";

const DashBoard = () => {
  return (
    <>
      <div className="flex p-8 md:p-16 gap-2"></div>
      <div className="flex p-8 md:p-16 flex-col md:flex-row">
        <div className="flex-1">
          <LobbyBanner />
          <Actions />
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
};

export default DashBoard;
