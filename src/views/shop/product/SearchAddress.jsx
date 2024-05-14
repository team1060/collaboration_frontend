// SearchAddress.jsx
import React, { useState } from "react";
import axios from "axios";
import { Button, Container } from "@mui/material";
import InputField from "./InputField";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const SearchAddress = ({
  closeAddressModal,
  onSelectAddress,
  onSearchComplete,
}) => {
  const [addressList, setAddressList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const countPerPage = 10;

  const handleAddressSearch = async () => {
    try {
      setSearchButtonClicked(true);
      const response = await axios.get(
        "https://www.juso.go.kr/addrlink/addrLinkApi.do",
        {
          params: {
            confmKey: "U01TX0FVVEgyMDIzMDgxNzExMDcwODExNDAyMzk=",
            currentPage,
            countPerPage,
            keyword: document.getElementById("keyword").value,
            resultType: "json",
          },
        }
      );

      console.log("주소 검색 응답:", response.data);

      const results = response.data.results.juso;
      setAddressList(results);
      setTotalPages(
        Math.ceil(response.data.results.common.totalCount / countPerPage)
      );
    } catch (error) {
      console.error("주소 검색 중 오류 발생:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    // 검색 버튼이 클릭된 상태에서만 검색을 다시 수행
    if (searchButtonClicked) {
      handleAddressSearch();
    }
  };
  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  const handleNumberClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      handlePageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const displayRange = 10;

    let startPage = Math.max(1, currentPage - Math.floor(displayRange / 2));
    let endPage = Math.min(totalPages, startPage + displayRange - 1);

    if (endPage - startPage + 1 < displayRange) {
      startPage = Math.max(1, endPage - displayRange + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handleNumberClick(i)}
          variant={currentPage === i ? "contained" : "outlined"}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </Button>
      );
    }

    return pages;
  };
  const handleAddressSelect = (address) => {
    // setSelectedAddress(address);

    // onSelectAddress 콜백을 사용하여 선택한 주소의 상세 정보를 전달
    onSelectAddress(address);

    // 선택한 주소를 처리한 후 주소 모달을 닫을 수도 있습니다.
    closeAddressModal();
    console.log(address);
  };

  // x 버튼 클릭 시 모달 닫기
  const handleCloseModal = () => {
    // 모달을 닫는 함수 호출
    closeAddressModal();
  };

  return (
    <Container className="addressFormWrap" id="SearchAddress">
      {/* 주소 검색 입력 폼과 검색 버튼 */}
      <div className="modalHeader">
        <span className="closeButton" onClick={handleCloseModal}>
          <CloseOutlinedIcon />
        </span>
      </div>
      <form>
        <InputField
          className="popSearchInput"
          label={
            <Button
              onClick={handleAddressSearch}
              variant="contained"
              size="large"
            >
              검색
            </Button>
          }
          placeholder="주소를 입력해주세요"
          name="keyword"
          id="keyword"
        />
      </form>
      <div className="jusoexample">
        {" "}
        예시 : 도로명(반포대로 58), 건물명(독립기념관), 지번(삼성동 25)
      </div>

      {/* 주소 검색 결과 목록 */}
      {searchButtonClicked && (
        <table className="addressTable">
          <thead>
            <tr>
              <th className="noIdx">No</th>
              <th className="roadAddress">도로명주소</th>
              <th className="zipNo">우편번호</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {addressList?.map((address, index) => (
              <tr
                key={address.bdMgtSn}
                onClick={() => handleAddressSelect(address)}
              >
                <td>{currentPage * 10 + index - 9}</td>
                <td className="roadAddresstbody">
                  <strong>{address.roadAddrPart1}</strong>
                  <br />
                  [지번] {address.jibunAddr}
                  <br />
                </td>
                <td>{address.zipNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        {searchButtonClicked && (
          <>
            <Button variant="outlined" onClick={handleFirstPage}>
              {"<<"}
            </Button>
            <Button variant="outlined" onClick={handlePrevPage}>
              {"<"}
            </Button>
            {renderPageNumbers()}
            <Button variant="outlined" onClick={handleNextPage}>
              {">"}
            </Button>
            <Button variant="outlined" onClick={handleLastPage}>
              {">>"}
            </Button>
          </>
        )}
      </div>
    </Container>
  );
};

export default SearchAddress;
