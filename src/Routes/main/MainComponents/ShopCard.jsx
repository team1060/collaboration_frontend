import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import '../style/ShopCard.scss'
import SendIcon from '@mui/icons-material/Send';

import ShopPro from '../data/Shop.json';
import { Button } from '@mui/material';

export default function ShopCard() {
  
// 할인된 가격을 계산하는 함수
function calculateDiscountedPrice(price, discount) {
  return price - (price * (discount / 100));
}

// 가격을 천 단위로 포맷팅하는 함수
function formatPrice(price) {
  return new Intl.NumberFormat('ko-KR', { 
    style: 'decimal', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  }).format(price);
}

// JSON 데이터에서 카드 정보를 추출하고 상위 5개만 선택 4개로 수정 
const sortedProducts = ShopPro.sort((a, b) => {
  const aAverageRate = calculateAverageRating(a.reviews);
  const bAverageRate = calculateAverageRating(b.reviews);
  return bAverageRate - aAverageRate; // 내림차순 정렬
}).slice(0, 4); // 상위 5개만 선택

  return (
    <div id='shopCard'>
      
      <div className='ShopCard'>
       <h2>골프 인기상품 </h2>
       {/* <h2>기간한정특가</h2> */}
       <a href="/">
        <Button variant="contained">
          바로가기
        </Button>
        </a>
      </div>
         <div style={{ display: 'flex', flexDirection: 'row', maxWidth:"1200px", margin:"0 auto"}} className="shop-card-container">
        {sortedProducts.map((product, index) => (
          <Card key={index} sx={{  margin: '10px' }} className='Card'>
            {/* 카드 내용 */}
           <CardMedia
                component="img"
                height="350"
                image={product.images.image}
                alt={product.brand}
                style={{padding:"10px"}}
              />
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {product.discount}%
                </Avatar>
              }
              // action={
              //   <IconButton aria-label="settings">
              //     <MoreVertIcon />
              //   </IconButton>
              // }
              title={product.product}
              subheader={product.brand}
            />
      
      
            <CardContent>
            <Typography variant="body2" color="text.secondary" style={{ textDecoration: 'line-through' }}>
              {formatPrice(product.price)}원
            </Typography>
            <Typography variant="body2"  style={{ fontSize: '1.1em' }}>
             할인 금액: {formatPrice(calculateDiscountedPrice(product.price, product.discount))}원
            </Typography>
          </CardContent>
      
          </Card>
        ))}
      </div>
    </div>
  );
}

// 평균 평점 계산 함수
function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0);
  return totalRating / reviews.length;
}
