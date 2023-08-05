import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageLoading from "./system-ui/loading/page-loading.component";

import { AppRouters } from "./constants";

import { AuthLayout, CommonLayout, Dashboard, Login } from "./pages";

import { Meeting, Apartment, Portfolio } from "./modules";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" Component={CommonLayout}>
            <Route index element={<Dashboard />} />
            <Route path={`${AppRouters.Meeting}/*`} element={<Meeting />} />
            <Route
              path={`${AppRouters.Apartment}/*`}
              element={
                <AuthLayout>
                  <Apartment />
                </AuthLayout>
              }
            />
            <Route path={AppRouters.Login} element={<Login />} />
          </Route>
          <Route path={`${AppRouters.Portfolio}/*`} element={<Portfolio />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export { App };
