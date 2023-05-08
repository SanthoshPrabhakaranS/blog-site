import React from "react";
import Navbar from "../navbar";
import Sidebar from "../sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full h-full flex flex-row gap-10 px-[2rem]">
        <div className="w-[70%]">{children}</div>
        <Sidebar />
      </div>
    </>
  );
};

export default Layout;
