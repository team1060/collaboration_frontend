import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "src/core/util/http/request";
import { API_URL } from "src/core/util/http/urls";

function Notice() {
  const [search, setSearch] = useState("");
  const [noti, setNoti] = useState([]);
  const [notiLook, setNotiLook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = noti.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(noti.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [selectedBoardNo, setSelectedBoardNo] = useState(null);

  const pagesPerGroup = 10;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const NextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const PrevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const FirstPage = () => setCurrentPage(1);
  const RealEndPage = () => setCurrentPage(totalPages);

  const sendEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (search === "") {
      alert("검색어를 입력해주세요");
      return;
    }
  };

  useEffect(() => {
    const NoticeList = async () => {
      try {
        const response = await apiRequest.get(
          API_URL.CATEGORY_LIST_DETAILS_GET(1)
        );
        console.log("나오니", response.data);
        setNoti(response.data);
      } catch (error) {
        console.log("와이낫", error);
      } finally {
        setIsLoading(false);
      }
    };
    NoticeList();
  }, []);

  useEffect(() => {
    if (selectedBoardNo) {
      const NotiLook = async () => {
        try {
          const response = await apiRequest.get(
            API_URL.BOARD_LIST_BOARDNO_GET(selectedBoardNo)
          );
          console.log("나와라2", response.data);
        } catch (error) {
          console.log("와이낫", error);
        }
      };
      NotiLook();
    }
  }, [selectedBoardNo]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="NoticeForm">
      <div className="NoticeHeader">
        <span style={{ fontSize: "27px", fontWeight: "bold" }}>공지사항</span>
        <div style={{ display: "flex" }}>
          <input
            placeholder="검색어를 입력해주세요"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={sendEnter}
          ></input>
          <button onClick={handleSearch}>
            <span>검색</span>
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className="Number">번호</th>
            <th className="Title">제목</th>
            <th className="Created">등록일</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className="Number">{item.boardNo}</td>
              <td className="Title">
                <Link to={`/customerService/NoticeDetails/${item.boardNo}`}>
                  <span style={{ color: "black" }}>{item.title}</span>
                </Link>
              </td>
              <td className="Created">
                {new Date(item.regdate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="Page">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {pageNumbers.map((number) => (
            <span
              key={number}
              onClick={() => paginate(number)}
              style={{
                cursor: "pointer",
                margin: "0 5px",
                fontWeight: currentPage === number ? "bold" : "normal",
              }}
            >
              {number}
            </span>
          ))}

          <div className="IconBox" style={{ marginLeft: "10px" }}>
            <i style={{ transform: "translateX(0.5px)" }} onClick={NextPage} />
          </div>
          <div className="IconBox">
            <i>
              <i className="duble" onClick={RealEndPage}></i>
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notice;
