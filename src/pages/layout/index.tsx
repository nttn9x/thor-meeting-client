import { Outlet } from "react-router-dom";
import LayoutHeader from "./header.component";

const Layout = () => {
  return (
    <>
      <LayoutHeader />
      <main className="h-full w-full pt-14">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
