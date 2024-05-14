import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

// import SendIcon from '@mui/icons-material/Send';

// 제이슨 삭제
// import ShopPro from '../data/Shop.json';
import { getProductList } from "../../../core/util/http/admin/ProductService";
import { Button } from "@mui/material";
// import { Link } from 'react-router-dom';

export default function ShopCard() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductList();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // 할인된 가격을 계산하는 함수
  function calculateDiscountedPrice(price, discount) {
    return price - price * (discount / 100);
  }

  // 가격을 천 단위로 포맷팅하는 함수
  function formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }
  const sortedProducts = products
    .map((product) => ({
      ...product,
      discount: Math.floor(product.discount * 100),
    })) // discount 변환
    .sort(() => 0.5 - Math.random()) // 랜덤 정렬
    .slice(0, 4); // 상위 4개 선택

  // JSON 데이터에서 카드 정보를 추출하고 상위 5개만 선택 4개로 수정
  // const sortedProducts = ShopPro.sort((a, b) => {
  //   const aAverageRate = calculateAverageRating(a.reviews);
  //   const bAverageRate = calculateAverageRating(b.reviews);
  //   return bAverageRate - aAverageRate; // 내림차순 정렬
  // }).slice(0, 4); // 상위 5개만 선택

  return (
    <div id="shopCard">
      <div className="ShopCard">
        <h2>골프 인기상품 </h2>
        {/* <h2>기간한정특가</h2> */}
        <a href="/product">
          <Button variant="contained">바로가기</Button>
        </a>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        className="shop-card-container"
      >
        {sortedProducts.map((product, index) => (
          <a
            href={`/product/view/${product.product_no}`}
            key={index}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ margin: "10px" }} className="Card">
              <CardMedia
                component="img"
                height="350"
                image={product.path} // 'path' 필드를 사용하여 이미지 URL 설정
                alt={product.brand_name} // 'brand_name' 필드를 사용하여 alt 텍스트 설정
                style={{ padding: "10px" }}
              />
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {product.discount}%
                  </Avatar>
                }
              />
              <Typography
                noWrap
                component="div"
                style={{
                  fontSize: "1em",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  padding: "0px 20px", // 양쪽에 20px의 패딩 추가
                }}
              >
                {product.product}
              </Typography>

              <Typography
                noWrap
                component="div"
                style={{
                  fontSize: "0.9em",
                  margin: "0px 20px", // 양쪽에 20px의 마진 추가
                }}
              >
                {product.brand_name}
              </Typography>

              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ textDecoration: "line-through" }}
                >
                  {formatPrice(product.price)}원
                </Typography>

                <Typography variant="body2" style={{ fontSize: "1.1em" }}>
                  가 격 :{" "}
                  {formatPrice(
                    calculateDiscountedPrice(product.price, product.discount)
                  )}
                  원
                </Typography>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}

// 평균 평점 계산 함수
// function calculateAverageRating(reviews) {
//   if (reviews.length === 0) return 0;
//   const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0);
//   return totalRating / reviews.length;
// }
