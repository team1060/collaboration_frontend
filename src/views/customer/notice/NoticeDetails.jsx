import { fontSize } from "@mui/system";

function NoticeDetails() {
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
            <span style={{ color: "#ff9b9c" }}>
              [공지사항]
              <span style={{ color: "black" }}> 넌공지사항 제목이다</span>
            </span>
            <span style={{ fontSize: "15px" }}>2024.05.21</span>
          </div>
          <div className="NoticeContent">
            <span>안녕하세요 갈연수입니다</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NoticeDetails;
