import { margin } from "@mui/system";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "src/core/util/http/request";
import { API_URL } from "src/core/util/http/urls";

function NoticeDetails() {
  const { boardNo } = useParams();
  const [notice, setNotice] = useState([]);
  const [error, setError] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const NoticeLook = async () => {
      try {
        const response = await apiRequest.get(
          API_URL.BOARD_LIST_BOARDNO_GET(boardNo)
        );
        console.log("나와라", response.data);
        setNotice(response.data);
      } catch (error) {
        console.log("와이낫", error);
        setError(error.toString());
      }
    };
    NoticeLook();
  }, [boardNo]);

  useEffect(() => {
    const NoticeList = async () => {
      try {
        const response = await apiRequest.get(
          API_URL.CATEGORY_LIST_DETAILS_GET(1)
        );
        console.log("ㅎ", response.data);
        setNotices(response.data);
      } catch (error) {
        console.log("gg", error);
      }
    };
    NoticeList();
  }, []);

  const findAdjacentNotices = () => {
    const index = notices.findIndex((n) => n.boardNo === parseInt(boardNo));
    const prevNotice = index > 0 ? notices[index - 1] : null;
    const nextNotice = index < notices.length - 1 ? notices[index + 1] : null;
    return { prevNotice, nextNotice };
  };

  const { prevNotice, nextNotice } = findAdjacentNotices();

  return (
    <div className="Container">
      <div className="Inner">
        <div className=" NoticeDetailForm">
          <div style={{ marginTop: "30px", marginBottom: "30px" }}>
            <span style={{ fontSize: "27px", fontWeight: "bold" }}>
              공지사항
            </span>
          </div>
          <div className="NoticeTItle">
            <span style={{ color: "#ff9b9c", marginLeft: "10px" }}>
              [공지사항]
              <span style={{ color: "black" }}> {notice.title}</span>
            </span>
            <span style={{ fontSize: "15px" }}>
              {moment(notice.regdate).format("YYYY-MM-DD")}
            </span>
          </div>
          <div className="NoticeContent">
            <span>{notice.content}</span>
          </div>
          <div className="ListBtn">
            <Link to="/customerService/Notice">
              <button>목록</button>
            </Link>
          </div>
          <div className="NotiNav">
            <ul>
              {prevNotice ? (
                <li className="BeforeNoti">
                  <Link
                    to={`/customerService/NoticeDetails/${prevNotice.boardNo}`}
                  >
                    <i />
                    <span>
                      이전글{" "}
                      <span style={{ marginLeft: "40px" }}>
                        {prevNotice.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ) : (
                <li className="BeforeNoti">
                  <i />
                  <span>
                    이전글{" "}
                    <span style={{ marginLeft: "40px" }}>
                      이전글이 없습니다.
                    </span>
                  </span>
                </li>
              )}
              {nextNotice ? (
                <li className="NextNoti">
                  <Link
                    to={`/customerService/NoticeDetails/${nextNotice.boardNo}`}
                  >
                    <i />
                    <span>
                      다음글{" "}
                      <span style={{ marginLeft: "40px" }}>
                        {nextNotice.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ) : (
                <li className="NextNoti">
                  <i />
                  <span>
                    다음글{" "}
                    <span style={{ marginLeft: "40px" }}>
                      다음글이 없습니다.
                    </span>
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NoticeDetails;
