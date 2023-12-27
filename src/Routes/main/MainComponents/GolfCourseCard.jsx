import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const GolfCourseCard = ({ course, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ maxWidth:"1200px", margin: "0 auto" }} className='GolfCourseCard'>
      <Card sx={{ display: 'flex', margin: '20px', padding: '10px' }}>
        {/* 이미지 자리 (임시로 색상만 표시) */}
        <CardMedia
          component="img"
          sx={{ width: 450, height: 250 }}
          image="./img/pc04.jpg" // 이미지 경로 수정
          alt="Golf Course"
        />

        <CardContent sx={{ flex: '1' }}>
          <Typography component="h5" variant="h5">
            {course.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {course.description}
          </Typography>
          <Typography variant="subtitle1">
            {course.holes} 홀 / 파 {course.pars}
          </Typography>
          <Typography variant="subtitle1">
            면적: {course.landArea}㎡
          </Typography>
          <Typography variant="subtitle1">
            {course.contact}
          </Typography>
          {/* 예약 버튼은 그대로 유지 */}
          <Link to={"/"}>
          <Button variant="contained" color="primary">
            상세보기
          </Button>
          </Link>
        </CardContent>
      </Card>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default GolfCourseCard;
