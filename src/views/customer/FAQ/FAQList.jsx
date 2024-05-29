import { useState } from "react";
import { Link } from "react-router-dom";

function FAQList() {
  const [search, setSearch] = useState("");
  const initialQuestions = [
    { id: 1, title: "아이브", answer: "장원영" },
    { id: 2, title: "아이브", answer: "리즈" },
    { id: 3, title: "아이브", answer: "안유진" },
    { id: 4, title: "아이브", answer: "안유진" },
    { id: 5, title: "아이브", answer: "안유진" },
    { id: 6, title: "아이브", answer: "안유진" },
    { id: 7, title: "아이브", answer: "안유진" },
    { id: 8, title: "아이브", answer: "안유진" },
    { id: 9, title: "아이브", answer: "안유진" },
    { id: 10, title: "아이브", answer: "안유진" },
    { id: 11, title: "아이브", answer: "장원영" },
    { id: 12, title: "아이브", answer: "리즈" },
    { id: 13, title: "아이브", answer: "안유진" },
    { id: 14, title: "아이브", answer: "안유진" },
    { id: 15, title: "아이브", answer: "안유진" },
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleAnswer = (id) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: !prevAnswers[id],
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

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
              {currentItems.map((question) => (
                <div key={question.id} className="Question">
                  <li onClick={() => toggleAnswer(question.id)}>
                    <span className={answers[question.id] ? "Completed" : ""}>
                      {question.title}
                    </span>
                    <i
                      className={`icon-arrow ${
                        answers[question.id] ? "up" : "down"
                      }`}
                    ></i>
                  </li>
                  {answers[question.id] && (
                    <div className="Answer">
                      <span>{question.answer}</span>
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
              {Array.from(
                { length: Math.ceil(questions.length / itemsPerPage) },
                (_, i) => (
                  <span
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    style={{
                      fontWeight: currentPage === i + 1 ? "bold" : "normal",
                    }}
                  >
                    {i + 1}
                  </span>
                )
              )}
              <div className="IconBox">
                <i style={{ transform: "translateX(0.5px)" }} />
              </div>
              <div className="IconBox">
                <i onClick={() => paginate()}>
                  <i className="duble"></i>
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
