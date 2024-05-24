import { Link } from "react-router-dom";

function LeftMenu() {
  return (
    <div className="Container">
      <div className="inner">
        <div className="SideMenu">
          <ul>
            <li>
              <Link to={"/customerService"}>
                <h2 style={{ color: "black" }}>고객센터</h2>
              </Link>
            </li>
            <li>
              <Link to={"/customerService/FAQ"}>
                <span>자주 찾는 질문</span>
              </Link>
            </li>
            <li>
              <Link to="/customerService/QNA">
                <span>1:1 문의 하기</span>
              </Link>
            </li>
            <li>
              <Link to="/customerService/QNAList">
                <span>1:1문의</span>
              </Link>
            </li>
            <li>
              <Link to={"/customerService/Notice"}>
                <span>공지 사항</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default LeftMenu;
