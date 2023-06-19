import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Room from "./pages/room";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg absolute top-0 left-0 w-full h-full"></div>
      <Routes>
        <Route path="/">
          <Route index element={<Dashboard />} />

          <Route path="room/:roomId" element={<Room />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { App };
