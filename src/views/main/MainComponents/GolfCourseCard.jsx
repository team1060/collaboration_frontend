import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import { Link } from 'react-router-dom';

const GolfCourseCard = ({ course, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      style={{ maxWidth: "1200px", margin: "0 auto", marginBottom: "120px" }}
      className="GolfCourseCard"
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // 화면이 작을 때는 세로로, md 이상일 때는 가로로 나오도록 설정
          margin: { xs: "5px", md: "0" },
          padding: "10px",
        }}
      >
        {/* 이미지 자리 (임시로 색상만 표시) */}
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: 450 }, // 화면이 작을 때는 100%, md 이상일 때는 50%로 설정
            height: { xs: 200, md: 250 },
          }} // 화면이 작을 때는 고정값, md 이상일 때는 자동으로 설정 }}
          image={`/img/golf/${course.golf_no}.jpg`} // 이미지 경로 수정
          alt="Golf Course"
        />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            justifyContent: "space-between",
          }}
          style={{ position: "relative" }}
        >
          <div>
            <Typography component="h5" variant="h5" paddingBottom="20px">
              {course.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              paddingBottom="20px"
            >
              {course.description}
            </Typography>
            <Typography variant="subtitle1">
              {course.holes} 홀 / 파 {course.pars}
            </Typography>
            <Typography variant="subtitle1">
              면적: {course.land_area}㎡
            </Typography>
            <Typography variant="subtitle1">{course.contact}</Typography>
          </div>
          <div style={{ position: "absolute", right: 0, bottom: 0 }}>
            <a href={`/golf/info/${course.golf_no}`}>
              <Button variant="contained" color="primary">
                상세보기
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default GolfCourseCard;
