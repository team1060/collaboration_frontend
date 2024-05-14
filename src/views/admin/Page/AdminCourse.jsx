import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import {
  getCourse,
  updateCourse,
  deleteCourse,
  postCourse,
  fetchGolfNames,
} from "../../../core/util/http/admin/GolfCourse.js";
import CourseModal from "../AdminCourseComponents/CourseModal.jsx";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [golfNames, setGolfNames] = useState({}); // 골프장 이름을 저장할 객체
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [filterCategory, setFilterCategory] = useState("course_name"); // 필터링할 카테고리 기본값
  // 코스 데이터 가져오기
  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourse();
      const sortedData = data
        .map((course) => ({ ...course, id: course.course_no }))
        .sort((a, b) => new Date(b.golf_date) - new Date(a.golf_date)); // 최신순으로 정렬
      setCourses(sortedData);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // 골프장 이름 데이터 가져오기
    const fetchGolfNamesData = async () => {
      const data = await fetchGolfNames();
      // data를 골프장 번호를 키로 하는 객체로 변환하여 저장
      const golfNamesObj = data.reduce((acc, golf) => {
        acc[golf.golf_no] = golf.name;
        return acc;
      }, {});
      setGolfNames(golfNamesObj);
    };

    fetchGolfNamesData();
  }, []);
  // DataGrid 컬럼 정의

  const columns = [
    { field: "course_no", headerName: "NO", width: 70 },
    {
      field: "golf_no",
      headerName: "골프장 이름",
      width: 130,
      valueGetter: (params) => golfNames[params.row.golf_no] || "알 수 없음",
    },
    { field: "course_name", headerName: "코스 이름", width: 130 },
    { field: "greenpee", headerName: "그린피", width: 130 },
    { field: "golf_time", headerName: "티오프 시간", width: 90 },
    { field: "golf_date", headerName: "예약 날짜", width: 130 },
    {
      field: "golf_status",
      headerName: "예약 상태",
      width: 130,
      valueGetter: (params) =>
        params.row.golf_status === 0 ? "예약 가능" : "예약 불가",
    },
    // 여기에 추가적인 컬럼을 정의할 수 있습니다.
  ];
  // "생성" 버튼 클릭 핸들러
  const handleCreateClick = () => {
    setSelectedCourse({}); // 새로운 코스 객체 초기화
    setOpenModal(true);
  };

  const handleSelectionChange = (newSelectionModel) => {
    console.log(newSelectionModel);
    setSelectedRowIds(newSelectionModel);
  };

  //수정
  const handleUpdateClick = () => {
    if (selectedRowIds.length === 1) {
      console.log("들어감");
      const selectedRowData = courses.find(
        (course) => course.course_no === selectedRowIds[0]
      );
      setSelectedCourse(selectedRowData);
      setOpenModal(true);
      console.log(selectedRowData);
      console.log("모달 열림"); // 추가된 로그
    } else {
      alert("수정할 코스를 하나만 선택해주세요.");
    }
  };

  //삭제
  const handleDeleteClick = async () => {
    if (selectedRowIds.length > 0) {
      // 예약 불가 상태인 코스가 있는지 확인
      const hasBookedCourse = selectedRowIds.some((course_no) => {
        const course = courses.find((c) => c.course_no === course_no);
        return course && course.golf_status === 1; // '예약 불가' 상태를 1로 가정
      });

      if (hasBookedCourse) {
        alert("코스 데이터 내부에 예약이 되어있습니다. 확인해주세요.");
        return; // 함수 실행 중단
      }

      // 예약 불가 상태가 아닌 경우, 사용자에게 삭제를 확인
      if (window.confirm("선택한 코스를 삭제하시겠습니까?")) {
        try {
          await Promise.all(
            selectedRowIds.map((course_no) => deleteCourse(course_no))
          );
          window.location.reload(); // 페이지 새로고침
        } catch (error) {
          console.error("Error deleting course:", error);
          // 에러 처리 로직을 여기에 추가
        }
      }
    } else {
      alert("삭제할 코스를 선택해주세요.");
    }
  };

  // 검색 입력 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 카테고리 필터링 핸들러
  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };
  // 필터링된 데이터
  const filteredCourses = courses.filter((course) => {
    // 필터링 카테고리에 따라 검색
    const courseValue = course[filterCategory]
      ? course[filterCategory].toString()
      : "";
    return courseValue.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="AdminGlobal">
      <h2 style={{ textAlign: "center" }}>골프장 관리 </h2>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <FormControl variant="outlined">
          <InputLabel id="filter-category-label">카테고리</InputLabel>
          <Select
            labelId="filter-category-label"
            id="filter-category"
            value={filterCategory}
            onChange={handleFilterCategoryChange}
            label="카테고리"
          >
            <MenuItem value="course_no">NO</MenuItem>
            <MenuItem value="golf_no">골프장 이름</MenuItem>
            <MenuItem value="course_name">코스 이름</MenuItem>
            <MenuItem value="greenpee">그린피</MenuItem>
            <MenuItem value="golf_time">티오프 시간</MenuItem>
            <MenuItem value="golf_date">예약 날짜</MenuItem>
            <MenuItem value="golf_status">예약 상태</MenuItem>
            {/* 필요에 따라 추가 옵션 */}
          </Select>
        </FormControl>
        <TextField
          label="검색"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "400px" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button onClick={handleCreateClick} variant="contained" color="primary">
          생성
        </Button>
        <Button onClick={handleUpdateClick} variant="contained" color="primary">
          수정
        </Button>
        <Button onClick={handleDeleteClick} variant="contained" color="primary">
          삭제
        </Button>
      </Box>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={filteredCourses}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange}
          selectionModel={selectedRowIds}
        />

        {selectedCourse && (
          <CourseModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            course={selectedCourse}
            onUpdate={updateCourse}
            onPost={postCourse}
          />
        )}
      </div>
    </div>
  );
};

export default AdminCourse;
