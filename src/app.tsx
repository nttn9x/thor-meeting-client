import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import Welcome from "./pages/welcome";
import Lobby from "./pages/lobby";
import Room from "./pages/room";

const Layout = () => {
  return (
    <>
      <main className="h-full w-full">
        <div className="bg fixed top-0 left-0 w-full h-full"></div>
        <Outlet />
      </main>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Layout}>
          <Route index element={<Welcome />} />
          <Route path="lobby" element={<Lobby />} />
          <Route path="room/:roomId" element={<Room />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { App };
