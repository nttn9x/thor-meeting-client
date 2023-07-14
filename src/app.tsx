import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import Lobby from "./pages/lobby";
import Room from "./pages/room";
import Welcome from "./pages/welcome";
import Layout from "./pages/layout";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p> Loading...</p>}>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route index element={<Lobby />} />
            <Route path="room/:roomId" element={<Room />} />
            <Route path="name/:roomId" element={<Welcome />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export { App };
