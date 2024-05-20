import { Link } from "react-router-dom";

function LeftMenu() {
  return (
    <div className="Container">
      <div className="inner">
        <div className="SideMenu">
          <ul>
            <li>
              <h2>고객센터</h2>
            </li>
            <li>
              <span>자주 찾는 질문</span>
            </li>
            <li>
              <Link to="/customerService/Inquire">
                <span>1:1 문의 하기</span>
              </Link>
            </li>
            <li>
              <span>1:1문의</span>
            </li>
            <li>
              <span>공지 사항</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default LeftMenu;
