import { BrowserRouter, Route, Routes } from "react-router-dom";

import Welcome from "./pages/welcome";
import Lobby from "./pages/lobby";
import Room from "./pages/room";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg absolute top-0 left-0 w-full h-full"></div>
      <Routes>
        <Route path="/">
          <Route index element={<Welcome />} />
          <Route path="lobby" element={<Lobby />} />
          <Route path="room/:roomId" element={<Room />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { App };
