import React from "react";
import { toast } from "react-toastify";

function CustomerLayout({ children }) {
  return (
    <div className="container">
      <div className="inner">
        <toast></toast>
        <div className="Customer">{children}</div>
        <div className="Baener">
          <img src="."></img>
        </div>
      </div>
    </div>
  );
}
export default CustomerLayout;
