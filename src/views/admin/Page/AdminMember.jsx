import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAllMembers } from "../../../core/util/http/admin/MemberService";
import MemberModal from "../AdminMemberComponents/MemberModal";

const AdminMember = () => {
  const [members, setMembers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);
  const fetchMembers = async () => {
    const data = await getAllMembers();
    // 날짜 순으로 정렬
    const sortedData = data.sort(
      (a, b) => new Date(b.regdate) - new Date(a.regdate)
    );
    setMembers(sortedData.map((member, index) => ({ ...member, id: index })));
  };
  const columns = [
    { field: "email", headerName: "Email", width: 250 },
    { field: "nickname", headerName: "Nickname", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "regdate",
      headerName: "가입날짜",
      width: 200,
      valueGetter: (params) => params.row.regdate.split("T")[0],
    },
    {
      field: "type",
      headerName: "등급",
      width: 100,
      valueGetter: (params) =>
        ["회원", "중간관리자", "관리자"][params.row.type],
    },
    { field: "role", headerName: "권한", width: 100 },
    // 추가적인 컬럼들 필요시 여기에 추가
  ];

  const [filterCategory, setFilterCategory] = useState("email"); // 필터링할 카테고리 기본값
  // 검색 기능
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // 카테고리 필터링 핸들러
  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };
  // 필터링된 데이터
  const filteredMembers = members.filter((member) => {
    // 검색어가 비어있으면 모든 데이터 반환
    if (searchTerm === "") {
      return true;
    }

    if (filterCategory === "type") {
      const typeNames = ["회원", "중간관리자", "관리자"];
      return typeNames[member.type]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    } else {
      const memberValue = member[filterCategory]
        ? member[filterCategory].toString()
        : "";
      return memberValue.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  // const handleCreateClick = () => {
  //   setSelectedMember(null);
  //   setOpenModal(true);
  // };

  const handleSelectionChange = (newSelectionModel) => {
    setSelectedRowIds(newSelectionModel);
  };

  const handleUpdateClick = () => {
    if (selectedRowIds.length === 1) {
      const selectedRowData = members.find(
        (member) => member.id === selectedRowIds[0]
      );
      setSelectedMember(selectedRowData);
      setOpenModal(true);
    } else {
      alert("수정할 회원을 하나만 선택해주세요.");
    }
  };

  // const handleDeleteClick = async () => {
  //   if (selectedRowIds.length > 0) {
  //     if (window.confirm('선택한 회원을 삭제하시겠습니까?')) {
  //       await Promise.all(selectedRowIds.map(memberId => {
  //         const member = members.find(m => m.id === memberId);
  //         return deleteMember(member.email);
  //       }));
  //       window.location.reload(); // 페이지 새로고침
  //     }
  //   } else {
  //     alert('삭제할 회원을 선택해주세요.');
  //   }
  // };

  return (
    <div className="AdminGlobal">
      <h2 style={{ textAlign: "center" }}>회원 관리 </h2>
      {/* 검색 필드 */}
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
            <MenuItem value="email">회원이메일 검색하기</MenuItem>
            <MenuItem value="nickname">닉네임 검색하기</MenuItem>
            <MenuItem value="name">이름 검색하기</MenuItem>
            <MenuItem value="regdate">가입날짜 검색하기</MenuItem>
            <MenuItem value="type">등급 검색하기</MenuItem>

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
        {/* <Button onClick={handleCreateClick} variant="contained" color="primary">생성</Button> */}
        <Button onClick={handleUpdateClick} variant="contained" color="primary">
          등급 및 권한 수정
        </Button>
        {/* <Button onClick={handleDeleteClick} variant="contained" color="primary">삭제</Button> */}
      </Box>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={filteredMembers}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange}
          selectionModel={selectedRowIds}
        />
      </div>
      {openModal && (
        <MemberModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          member={selectedMember}
          fetchMembers={fetchMembers}
        />
      )}
    </div>
  );
};

export default AdminMember;
