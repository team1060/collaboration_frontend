import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../../../core/util/http/SearchContext";
import { apiRequest } from "src/core/util/http/request";
import { API_URL } from "src/core/util/http/urls";

function Center() {
  const [search, setSearch] = useState("");
  const [faq, setFaq] = useState([]);
  const [openBoardNo, setOpenBoardNo] = useState(null);
  const { setSearchResults } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await apiRequest.get(
          API_URL.CATEGORY_LIST_DETAILS_GET(2)
        );
        console.log("FAQs loaded", response.data);
        setFaq(response.data.slice(0, 5));
      } catch (error) {
        console.log("Error fetching FAQs", error);
      }
    };
    fetchFAQs();
  }, []);

  const toggleAnswer = (boardNo) => {
    setOpenBoardNo((prev) => (prev === boardNo ? null : boardNo));
  };

  const handleSearch = async () => {
    if (search.trim() === "") {
      alert("검색어를 입력해주세요");
      return;
    }
    try {
      const results = await mainSearch(search);
      setSearchResults(results);
      navigate(`/customerService/FAQ?search=${search}`);
    } catch (error) {
      console.error("검색 중 오류 발생", error);
      alert("검색 중 문제가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  const mainSearch = async (keyword) => {
    try {
      const response = await apiRequest.postPrams(
        API_URL.BOARD_LIST_SEARCH_POST,
        {},
        { params: { keyword } }
      );
      console.log("검색결과나오냐", response.data);
      return response.data.filter((item) => item.category.categoryNo !== 1);
    } catch (error) {
      console.log("왜안되무", error);
      throw error;
    }
  };

  return (
    <div className="Container">
      <div className="inner">
        <div className="Center">
          <div className="Search">
            <span>골프의 민족 고객 센터 입니다. 무엇을 도와 드릴까요?</span>
            <div className="SearchBox">
              <input
                placeholder="검색어를 입력하세요"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button onClick={handleSearch}>검색</button>
            </div>
            <div className="Keyword">
              <i>
                <span>키워드</span>
              </i>
              <span className="Tip">
                #개인정보변경 #배송문의 #예약취소 #환불
              </span>
            </div>
          </div>
          <div className="FAQ">
            <div className="FAQTitle">
              <span>자주 찾는 질문</span>
              <Link to="/customerService/FAQ">
                <span style={{ color: "#3d3f41" }}>
                  더보기 <i />
                </span>
              </Link>
            </div>
            <div>
              <ul>
                {faq.map((item) => (
                  <li
                    key={item.boardNo}
                    onClick={() => toggleAnswer(item.boardNo)}
                  >
                    <div className="Question">
                      <span style={{ marginLeft: "10px" }}>
                        Q. {item.title}
                      </span>
                      <i
                        className={`icon-arrow ${
                          openBoardNo === item.boardNo ? "active" : ""
                        }`}
                      />
                    </div>
                    {openBoardNo === item.boardNo && (
                      <div className="Answer">
                        <span style={{ color: "#ff9b9c", marginLeft: "10px" }}>
                          A.
                        </span>
                        <span> {item.content}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Center;
