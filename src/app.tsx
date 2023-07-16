import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Lobby from "./pages/lobby";
import Room from "./pages/room";
import Welcome from "./pages/welcome";
import Layout from "./pages/layout";
import PageLoading from "./system-ui/loading/page-loading.component";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
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
