import { Link } from "react-router-dom";

import LeftMenu from "../common/LeftMenu";
import CustomerLayout from "../common/CustomerLayout";
import Qna from "../Inquire/Qna";

function Inquire() {
  return (
    <div className="container">
      <div className="inner">
        <CustomerLayout>
          <LeftMenu />
          <Qna />
        </CustomerLayout>
      </div>
    </div>
  );
}
export default Inquire;
