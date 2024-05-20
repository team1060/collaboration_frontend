import React from "react";

function CustomerLayout({ children }) {
  return (
    <div className="container">
      <div className="inner">
        <div className="Customer">{children}</div>
        <div className="Baener">넌배너다</div>
      </div>
    </div>
  );
}
export default CustomerLayout;
