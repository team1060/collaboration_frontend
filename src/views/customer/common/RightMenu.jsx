import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "src/core/util/http/request";
import { API_URL } from "src/core/util/http/urls";

function RightMenu() {
  const [notice, setNotice] = useState([]);
  const [selectedBoardNo, setSelectedBoardNo] = useState(null);
  const [notiLook, setNotiLook] = useState([]);

  useEffect(() => {
    const NoticeList = async () => {
      try {
        const response = await apiRequest.get(
          API_URL.CATEGORY_LIST_DETAILS_GET(1)
        );
        console.log("하위", response.data);
        setNotice(response.data.slice(0, 5));
      } catch (error) {
        console.log("왜죠?", error);
      }
    };
    NoticeList();
  }, []);

  // useEffect(() => {
  //   if (selectedBoardNo) {
  //     const NotiLook = async () => {
  //       try {
  //         const response = await apiRequest.get(
  //           API_URL.BOARD_LIST_BOARDNO_GET(selectedBoardNo)
  //         );
  //         console.log("하위2".response.data);
  //       } catch (error) {
  //         console.log("왜죠?2", error);
  //       }
  //     };
  //     NotiLook();
  //   }
  // }, [selectedBoardNo]);
  return (
    <div className="R-Container">
      <div className="inner">
        <div className="Right">
          <div className="Bcg"></div>
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
              {notice.map((notice) => (
                <li key={notice.boardNo}>
                  <Link to={`/customerService/NoticeDetails/${notice.boardNo}`}>
                    <span>[공지사항]</span>
                    <span style={{ color: "#3d3f41" }}>{notice.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RightMenu;
