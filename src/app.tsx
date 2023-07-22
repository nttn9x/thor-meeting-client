import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageLoading from "./system-ui/loading/page-loading.component";

import { Meeting } from "./modules";
import { AppRouters } from "./constants";
import { AuthLayout, CommonLayout, Dashboard, Login } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" Component={CommonLayout}>
            <Route index element={<Dashboard />} />

            <Route path={`${AppRouters.Meeting}/*`} element={<Meeting />} />
          </Route>

          <Route path="auth" Component={AuthLayout}>
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export { App };
