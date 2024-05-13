import React from "react";
import { Outlet } from "react-router-dom";

const SubLayout = ({ ...rest }) => {
  return (
    <div style={{ paddingTop: "70px", height: "100%" }}>
      <Outlet />
    </div>
  );
};

export default SubLayout;
