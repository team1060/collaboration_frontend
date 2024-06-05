import { useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "src/core/util/http/request";
import { API_URL } from "src/core/util/http/urls";
import { useEffect } from "react";

function FAQList() {
  const [search, setSearch] = useState("");
  const [faq, setFaq] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = faq.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(faq.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(faq.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const NextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const RealEndPage = () => setCurrentPage(totalPages);

  useEffect(() => {
    const FaqList = async () => {
      try {
        const response = await apiRequest.get(
          API_URL.CATEGORY_LIST_DETAILS_GET(2)
        );
        console.log("아...", response.data);
        setFaq(response.data);
      } catch (error) {
        console.error("ㅜㅜ:", error);
      }
    };

    FaqList();
  }, []);

  const toggleAnswer = (boardNo) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [boardNo]: !prevAnswers[boardNo],
    }));
  };

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

  return (
    <div className="Containers">
      <div className="inner">
        <div className="FAQForm">
          <div className="FAQHeader">
            <span>자주찾는질문</span>
            <div className="BtnBox">
              <button>
                <span>전체</span>
                <i />
              </button>
              <button>
                <span>전체</span>
                <i />
              </button>
            </div>
            <div className="SearchBox">
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
          <div className="QuestionForm">
            <ul>
              {currentItems.map((item) => (
                <div key={item.boardNo} className="Question">
                  <li onClick={() => toggleAnswer(item.boardNo)}>
                    <span className={answers[item.boardNo] ? "Completed" : ""}>
                      {item.title}
                    </span>
                    <i
                      className={`icon-arrow ${
                        answers[item.boardNo] ? "up" : "down"
                      }`}
                    ></i>
                  </li>
                  {answers[item.boardNo] && (
                    <div className="Answer">
                      <span>{item.content}</span>
                    </div>
                  )}
                </div>
              ))}
            </ul>
          </div>
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
                    padding: "5px",
                    fontWeight: currentPage === number ? "bold" : "normal",
                  }}
                >
                  {number}
                </span>
              ))}

              <div className="IconBox">
                <i
                  style={{ transform: "translateX(0.5px)" }}
                  onClick={NextPage}
                />
              </div>
              <div className="IconBox">
                <i>
                  <i className="duble" onClick={RealEndPage}></i>
                </i>
              </div>
            </div>
            <div className="Recode">
              <Link to={"/customerService/QNA"}>
                <span>1:1문의하기</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQList;
