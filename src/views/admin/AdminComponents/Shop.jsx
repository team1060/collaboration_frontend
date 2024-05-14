import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TablePagination,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import shopData from "../data/shopData.json"; // 경로는 실제 파일 위치에 따라 다름

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.orderId}</TableCell>
        <TableCell>{row.customerId}</TableCell>
        <TableCell>{row.orderPrice}</TableCell>
        <TableCell>{row.orderStatus}</TableCell>
        <TableCell>{row.request}</TableCell>
        <TableCell>{row.orderDate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                상품목록
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>제품</TableCell>
                    <TableCell>할인율</TableCell>
                    <TableCell align="right">가격</TableCell>
                    <TableCell align="right">할인된 가격</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((productRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {productRow.product}
                      </TableCell>
                      <TableCell>{productRow.discount}%</TableCell>
                      <TableCell align="right">{productRow.price}</TableCell>
                      <TableCell align="right">
                        {productRow.discountedPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ShopTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("");
  const [filterCategory, setFilterCategory] = useState("orderId"); // 기본 필터 카테고리는 'orderId'

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // 카테고리에 따른 필터링 로직
  const filteredData = shopData.filter((item) =>
    item[filterCategory]
      ?.toString()
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  // 현재 페이지에 표시될 데이터
  const displayedData = filteredData
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  return (
    <Paper>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <TextField
          label="검색"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          style={{ width: "300px" }}
        />
        <Select value={filterCategory} onChange={handleFilterCategoryChange}>
          <MenuItem value="orderId">주문번호</MenuItem>
          <MenuItem value="customerId">회원아이디</MenuItem>
          <MenuItem value="orderPrice">주문가격</MenuItem>
          <MenuItem value="orderStatus">주문상태</MenuItem>
          <MenuItem value="request">요청사항</MenuItem>
          <MenuItem value="orderDate">주문날짜</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>주문번호</TableCell>
              <TableCell>회원아이디</TableCell>
              <TableCell>주문가격</TableCell>
              <TableCell>주문상태</TableCell>
              <TableCell>요청사항</TableCell>
              <TableCell>주문날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
