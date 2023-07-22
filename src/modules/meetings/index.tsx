import React from "react";
import { Route, Routes } from "react-router-dom";

import Lobby from "./lobby";
import Room from "./room";
import Settings from "./settings";

import { MeetingRouter } from "@thor/constants";

const Meeting = () => {
  return (
    <Routes>
      <Route index element={<Lobby />} />
      <Route path={MeetingRouter.Room} element={<Room />} />
      <Route path={MeetingRouter.Settings} element={<Settings />} />
    </Routes>
  );
};

export default Meeting;
