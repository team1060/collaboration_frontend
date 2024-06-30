import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiRequest } from "src/core/util/http/request";
import { API_URL } from "src/core/util/http/urls";
import { useSearch } from "../../../core/util/http/SearchContext";

function FAQList() {
  const { searchResults, setSearchResults } = useSearch();
  const [search, setSearch] = useState("");
  const [faq, setFaq] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searching = params.get("search");
    if (searching) {
      setSearch(searching);
      handleSearch(searching);
    } else {
      setSearchResults([]);
    }
  }, [location.search]);

  const currentItems = (searchResults.length > 0 ? searchResults : faq).slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    (searchResults.length > 0 ? searchResults : faq).length / itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];

  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [detailOptions, setDetailOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdown = () => setIsOpen(!isOpen);
  const [selectedType, setSelectedType] = useState("전체선택");
  const [selectedDetail, setSelectedDetail] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleSelectType = (type) => {
    setSelectedType(type);
    const selectedCategory = categories.find((cat) => cat.name === type);
    const childCategories = categories.filter(
      (cat) => cat.parentCategory === selectedCategory?.categoryNo
    );
    setDetailOptions(childCategories.map((cat) => cat.name));
    setIsOpen(false);
    setSelectedDetail("");
    setIsDetailOpen(false);
  };

  const handleDetailDropdown = () => {
    setIsDetailOpen((prev) => !prev);
  };

  const handleDetailOptionSelect = (option, e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setSelectedDetail(option);
    setIsDetailOpen(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiRequest.get(API_URL.CATEGORY_LIST_GET);
        if (response.data) {
          setCategories(response.data);
          const filteredCategories = response.data.filter(
            (cat) => cat.name === "골프" || cat.name === "쇼핑"
          );
          setSubOptions(filteredCategories.map((cat) => cat.name));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await apiRequest.get(
          API_URL.CATEGORY_LIST_DETAILS_GET(2)
        );
        console.log("FAQs loaded", response.data);
        setFaq(response.data);
      } catch (error) {
        console.log("Error fetching FAQs", error);
      }
    };

    fetchFAQs();
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    const selectedCategoryDetails = categories.find(
      (cat) => cat.name === category
    );
    const childCategories = categories.filter(
      (cat) => cat.parentCategory === selectedCategoryDetails?.categoryNo
    );
    setDetailOptions(childCategories.map((cat) => cat.name));
    setIsOpen(!isOpen);
  };

  for (
    let i = 1;
    i <=
    Math.ceil(
      (searchResults.length > 0 ? searchResults : faq).length / itemsPerPage
    );
    i++
  ) {
    pageNumbers.push(i);
  }
  const NextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const RealEndPage = () => setCurrentPage(totalPages);

  const toggleAnswer = (boardNo) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [boardNo]: !prevAnswers[boardNo],
    }));
  };

  const sendEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(search);
    }
  };

  const handleSearch = async (searching) => {
    try {
      const results = await mainSearch(searching);
      setSearchResults(results);
      if (results.length === 0) {
        alert(
          "해당하는 검색 결과가 없습니다. 다른 검색어로 다시 검색해보시거나, 1:1문의를 통해 궁금하신 것을 해결해 보세요."
        );
      }
    } catch (error) {
      console.error("검색 중 오류 발생", error);
    }
  };

  const mainSearch = async (keyword) => {
    try {
      const response = await apiRequest.postPrams(
        API_URL.BOARD_LIST_SEARCH_POST,
        {},
        { params: { keyword } }
      );
      console.log("검색결과", response.data);

      const filterNotice = response.data.filter(
        (item) => item.category.categoryNo !== 1
      );

      return filterNotice;
    } catch (error) {
      console.log("검색 오류", error);
      throw error;
    }
  };

  return (
    <div className="Containers">
      <div className="inner">
        <div className="FAQForm">
          <div className="FAQHeader">
            <span>자주찾는질문</span>
            <div className="BtnBox">
              <div className="BigOption" onClick={handleDropdown}>
                {selectedType || "전체 선택"}
                <div className={`OptionList ${isOpen ? "show" : ""}`}>
                  {subOptions.map((option, index) => (
                    <ul
                      key={index}
                      onClick={() => handleSelectType(option)}
                      className="OpationItem"
                    >
                      <li>{option}</li>
                    </ul>
                  ))}
                </div>
              </div>
              <div className="DetailsOption" onClick={handleDetailDropdown}>
                {selectedDetail || "전체 선택"}
                {isDetailOpen && (
                  <div className="OptionList">
                    {detailOptions.map((option, index) => (
                      <ul
                        key={index}
                        onClick={(e) => handleDetailOptionSelect(option, e)}
                        className="OpationItem"
                      >
                        <li>
                          <span>{option}</span>
                        </li>
                        <i />
                      </ul>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="SearchBox">
              <input
                placeholder="검색어를 입력해주세요"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={sendEnter}
              />
              <button onClick={() => handleSearch(search)}>
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
                    />
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
            <Link to={"/customerService/QNA"}>
              <div className="Recode">
                <span>1:1문의하기</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQList;
