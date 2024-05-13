import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import useScrollToTop from "../hooks/useScrollToTop";

const MainLayout = ({ ...rest }) => {
  let { scrollComponent } = useScrollToTop();

  return (
    <div
      ref={scrollComponent}
      className={"h-full pt-[70px] pb-[92px] overflow-auto"}
    >
      <Outlet />
      <Navbar />
    </div>
  );
};

export default MainLayout;
