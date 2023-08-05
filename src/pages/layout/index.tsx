import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppSelector } from "@thor/store";
import { selectUser } from "@thor/store/slices/user/user.slice";
import { AppRouters } from "@thor/constants";

import LayoutHeader from "./header.component";

const CommonLayout = () => {
  return (
    <>
      <LayoutHeader />
      <main className="h-screen w-full pt-12 md:pt-14">
        <Outlet />
      </main>
    </>
  );
};

const AuthLayout = ({ children }: any) => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(AppRouters.Login);
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export { CommonLayout, AuthLayout };
