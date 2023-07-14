import { Outlet } from "react-router-dom";
import LayoutHeader from "./header.component";

const Layout = () => {
  return (
    <>
      <LayoutHeader />
      <main className="h-full w-full">
        <div className="bg fixed top-0 left-0 w-full h-full"></div>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
