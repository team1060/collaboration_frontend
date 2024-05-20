import { useState } from "react";
import Header from "../layout/Header";
// import "../../styles/customer/CustomerService.scss";

function CustomerService() {
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
    <div className="container">
      <div className="inner">
        <div className="Customer">
          <div className="SideMenu">
            <ul>
              <li>
                <h2>고객센터</h2>
              </li>
              <li>
                <span>자주 찾는 질문</span>
              </li>
              <li>
                <span>1:1 문의 하기</span>
              </li>
              <li>
                <span>1:1문의</span>
              </li>
              <li>
                <span>공지 사항</span>
              </li>
            </ul>
          </div>
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
          <div className="Right">
            <div className="InquiryBox">
              <p> 1:1 문의</p>
              <p>궁금하신 사항을 남겨주세요</p>
              <div className="Buttonbox">
                <button>문의 내역 확인</button>
                <button>문의 하기 </button>
              </div>
            </div>
            <div className="NoticeBox">
              <div className="NoticTitle">
                <span>공지사항</span>
                <span>
                  더보기
                  <i></i>
                </span>
              </div>
              <ul>
                <li>
                  <span>[미정]</span>
                  <span>김미정염미정</span>
                </li>
                <li>
                  <span>[미정]</span>
                  <span>김미정염미정</span>
                </li>
                <li>
                  <span>[미정]</span>
                  <span>김미정염미정</span>
                </li>
                <li>
                  <span>[미정]</span>
                  <span>김미정염미정</span>
                </li>
                <li>
                  <span>[미정]</span>
                  <span>김미정염미정</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="Baener">넌배너다</div>
      </div>
    </div>
  );
}
export default CustomerService;
