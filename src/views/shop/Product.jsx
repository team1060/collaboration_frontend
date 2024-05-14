// 상품 / 목록 /
import * as React from "react";
import ClubButton from "./product/ClubButton";
import { getProductList } from "../../core/util/http/shop/apiProduct";
import ProductList from "./product/ProductList";
import { useState } from "react";

function Product() {
  const [clubName, setClubName] = useState();

  const parentClub = (clubName) => {
    setClubName(clubName);
    console.log(clubName);
  };

  const fetchData = async () => {
    try {
      await getProductList();
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();

  return (
    <div>
      <ClubButton parentClub={parentClub} />
      {/* <ProductImg /> */}
      <ProductList clubName={clubName} />
    </div>
  );
}

export default Product;
