import { useState } from "react";
function Center() {
  const [search, setSearch] = useState("");

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
                onKeyDown={sendEnter}
              ></input>
              <button type="submit" onClick={handleSearch}>
                검색
              </button>
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
              <span>
                더보기
                <i></i>
              </span>
            </div>
            <ul>
              <li>
                <span>[쇼핑] </span>{" "}
                <span style={{ marginRight: "200px" }}>
                  Q. 배송기간은 어떻게 되나요?
                </span>
                <i></i>
              </li>
              <li>
                <span>[쇼핑] </span>{" "}
                <span style={{ marginRight: "200px" }}>
                  Q. 배송기간은 어떻게 되나요?
                </span>
                <i></i>
              </li>
              <li>
                <span>[쇼핑] </span>{" "}
                <span style={{ marginRight: "200px" }}>
                  Q. 배송기간은 어떻게 되나요?
                </span>
                <i></i>
              </li>
              <li>
                <span>[쇼핑] </span>{" "}
                <span style={{ marginRight: "200px" }}>
                  Q. 배송기간은 어떻게 되나요?
                </span>
                <i></i>
              </li>
              <li>
                <span>[쇼핑] </span>{" "}
                <span style={{ marginRight: "200px" }}>
                  Q. 배송기간은 어떻게 되나요?
                </span>
                <i></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Center;
