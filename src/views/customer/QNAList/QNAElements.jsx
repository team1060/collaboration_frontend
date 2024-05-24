import { Link } from "react-router-dom";

function QNAElements() {
  return (
    <div className="QNAForm">
      <span style={{ fontSize: "27px", fontWeight: "bold" }}>1:1문의</span>
      <br />
      <br />
      <span>
        상담 업무시간 평일 09:00 ~ 17:00,{" "}
        <span style={{ color: "red" }}>공휴일</span> /
        <span style={{ color: "red" }}>주말</span>
        문의는 평일 업무시간 내에 순차적으로 답변 진행 됩니다.
      </span>
      <ul>
        <div
          className="QNAHeader
        "
        >
          <div className="Type">
            <span>유형</span>
          </div>
          <div className="Title">
            <span>제목</span>
          </div>
          <div className="Code">
            <span>예약코드</span>
          </div>
          <div className="Created">
            <span>작성일</span>
          </div>
          <div className="Status">
            <span>답변상태</span>
          </div>
        </div>
        <li>
          <div className="QNAContent">
            <div className="Type">
              <span>여자아이돌</span>
            </div>

            <div className="Title">
              <Link to="/customerService/QNADetails">
                <span style={{ color: "black" }}>아이브</span>
              </Link>
            </div>

            <div className="Code">
              <span>2024ABCDEF</span>
            </div>
            <div className="Created">
              <span>2024.05.22</span>
            </div>
            <div className="Status">
              <span style={{ color: "#ff9b9c" }}>접수</span>
            </div>
          </div>
        </li>
      </ul>
      <div className="page">
        <span>1</span>
        <Link to="/customerService/QNA">
          <span className="Recode">1:1문의하기</span>
        </Link>
      </div>
    </div>
  );
}
export default QNAElements;
