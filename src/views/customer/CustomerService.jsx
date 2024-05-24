import Beaner from "./common/Beaner";
import Center from "./common/Center";
import CustomerLayout from "./common/CustomerLayout";
import RightMenu from "./common/RightMenu";

function CustomerService() {
  return (
    <div className="Container">
      <div className="inner">
        <CustomerLayout>
          <Center />
          <RightMenu />
        </CustomerLayout>
        <Beaner></Beaner>
      </div>
    </div>
  );
}
export default CustomerService;
