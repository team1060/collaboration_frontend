import { useState } from "react";
import { Link } from "react-router-dom";
function Notice() {
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
        <tr>
          <div className="Number">
            <td>번호</td>
          </div>
          <div className="Type">
            <td>구분</td>
          </div>
          <div className="Title">
            <td>제목</td>
          </div>
          <div className="Created">
            <td>등록일</td>
          </div>
        </tr>
        <tr>
          <div className="Number">
            <td>2098</td>
          </div>
          <div className="Type">
            <td>이미지수정</td>
          </div>
          <div className="Title">
            <Link to="/customerService/NoticeDetails">
              <td style={{ color: "black" }}>넌 제목이다</td>
            </Link>
          </div>
          <div className="Created">
            <td>2024.05.21</td>
          </div>
        </tr>
        <tr>
          <div className="Number">
            <td>2098</td>
          </div>
          <div className="Type">
            <td>이미지수정</td>
          </div>
          <div className="Title">
            <td>넌 제목이다</td>
          </div>
          <div className="Created">
            <td>2024.05.21</td>
          </div>
        </tr>
        <tr>
          <div className="Number">
            <td>2098</td>
          </div>
          <div className="Type">
            <td>이미지수정</td>
          </div>
          <div className="Title">
            <td>넌 제목이다</td>
          </div>
          <div className="Created">
            <td>2024.05.21</td>
          </div>
        </tr>
        <tr>
          <div className="Number">
            <td>2098</td>
          </div>
          <div className="Type">
            <td>이미지수정</td>
          </div>
          <div className="Title">
            <td>넌 제목이다</td>
          </div>
          <div className="Created">
            <td>2024.05.21</td>
          </div>
        </tr>
        <tr>
          <div className="Number">
            <td>2098</td>
          </div>
          <div className="Type">
            <td>이미지수정</td>
          </div>
          <div className="Title">
            <td>넌 제목이다</td>
          </div>
          <div className="Created">
            <td>2024.05.21</td>
          </div>
        </tr>
        <tr>
          <div className="Number">
            <td>2098</td>
          </div>
          <div className="Type">
            <td>이미지수정</td>
          </div>
          <div className="Title">
            <td>넌 제목이다</td>
          </div>
          <div className="Created">
            <td>2024.05.21</td>
          </div>
        </tr>
        <tr>
          <div className="Number">
            <td>2098</td>
          </div>
          <div className="Type">
            <td>이미지수정</td>
          </div>
          <div className="Title">
            <td>넌 제목이다</td>
          </div>
          <div className="Created">
            <td>2024.05.21</td>
          </div>
        </tr>
        <tr>
          <div className="Number">
            <td>2098</td>
          </div>
          <div className="Type">
            <td>이미지수정</td>
          </div>
          <div className="Title">
            <td>넌 제목이다</td>
          </div>
          <div className="Created">
            <td>2024.05.21</td>
          </div>
        </tr>
        <tr>
          <div className="Number">
            <td>2098</td>
          </div>
          <div className="Type">
            <td>이미지수정</td>
          </div>
          <div className="Title">
            <td>넌 제목이다</td>
          </div>
          <div className="Created">
            <td>2024.05.21</td>
          </div>
        </tr>
        <tr>
          <div className="Number">
            <td>2098</td>
          </div>
          <div className="Type">
            <td>이미지수정</td>
          </div>
          <div className="Title">
            <td>넌 제목이다</td>
          </div>
          <div className="Created">
            <td>2024.05.21</td>
          </div>
        </tr>
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
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <div className="IconBox">
            <i style={{ transform: "translateX(0.5px)" }} />
          </div>
          <div className="IconBox">
            <i>
              <i className="duble"></i>
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Notice;
