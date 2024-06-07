import { NavLink } from "react-router-dom";

function LeftMenu() {
  return (
    <div className="Container">
      <div className="inner">
        <div className="SideMenu">
          <ul>
            <li>
              <NavLink to="/customerService" style={{ color: "#333" }}>
                <h2>고객센터</h2>
              </NavLink>
            </li>
            <li>
              <NavLink to="/customerService/FAQ" className="menu-item">
                <span>자주 찾는 질문</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/customerService/QNA" className="menu-item">
                <span>1:1 문의 하기</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/customerService/QNAList" className="menu-item">
                <span>1:1문의</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/customerService/Notice" className="menu-item">
                <span>공지 사항</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
