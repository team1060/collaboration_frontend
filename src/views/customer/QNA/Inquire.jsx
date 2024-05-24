import { Link } from "react-router-dom";

import CustomerLayout from "../common/CustomerLayout";
import QNA from "./QNA";

function Inquire() {
  return (
    <div>
      <div>
        <CustomerLayout>
          <QNA />
        </CustomerLayout>
      </div>
    </div>
  );
}
export default Inquire;
