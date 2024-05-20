function RightMenu() {
  return (
    <div className="Container">
      <div className="inner">
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
    </div>
  );
}
export default RightMenu;
