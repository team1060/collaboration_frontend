import React from "react";
import { toast } from "react-toastify";
import LeftMenu from "./LeftMenu";

function CustomerLayout({ children }) {
  return (
    <div className="container">
      <div className="inner">
        <div className="Customer">
          <LeftMenu />
          {children}
        </div>
      </div>
    </div>
  );
}
export default CustomerLayout;
