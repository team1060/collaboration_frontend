import { Link } from "react-router-dom";

function RightMenu() {
  return (
    <div className="Container">
      <div className="inner">
        <div className="Right">
          <div className="InquiryBox">
            <p> 1:1 문의</p>
            <p>궁금하신 사항을 남겨주세요</p>
            <div className="Buttonbox">
              <Link to={"/customerService/QNAList"}>
                <button style={{ color: "black" }}>문의 내역 확인</button>
              </Link>
              <Link to="/customerService/QNA">
                <button>문의 하기 </button>
              </Link>
            </div>
          </div>
          <div className="NoticeBox">
            <div className="NoticTitle">
              <span>공지사항</span>
              <Link to="/customerService/Notice">
                <span style={{ color: "#3d3f41" }}>
                  더보기
                  <i />
                </span>
              </Link>
            </div>
            <ul>
              <Link to="/customerService/NoticeDetails">
                <li>
                  <span>[미정]</span>
                  <span style={{ color: "#3d3f41" }}>김미정염미정</span>
                </li>
              </Link>
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
    </div>
  );
}
export default RightMenu;
