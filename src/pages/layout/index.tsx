import React from "react";
import { Outlet } from "react-router-dom";
import LayoutHeader from "./header.component";

const CommonLayout = () => {
  return (
    <>
      <LayoutHeader />
      <main className="h-full w-full pt-12 md:pt-14">
        <Outlet />
      </main>
    </>
  );
};

const AuthLayout = () => {
  return (
    <>
      <main className="h-full w-full pt-12 md:pt-14">
        <Outlet />
      </main>
    </>
  );
};

export { CommonLayout, AuthLayout };
