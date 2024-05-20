import Center from "./common/Center";
import CustomerLayout from "./common/CustomerLayout";
import LeftMenu from "./common/LeftMenu";
import RightMenu from "./common/RightMenu";

function CustomerService() {
  return (
    <div className="Container">
      <div className="inner">
        <CustomerLayout>
          <LeftMenu />
          <Center />
          <RightMenu />
        </CustomerLayout>
      </div>
    </div>
  );
}
export default CustomerService;
