import { useState } from "react";

function Qna() {
  const [inquiryOptione, setInquiryOptione] = useState(false);
  const [inquiryType, setInquiryType] = useState("상담유형");
  const [arrow, setArrow] = useState(true);
  const toggleInquirytype = () => {
    setInquiryOptione(!inquiryOptione);
    setArrow(!arrow);
  };
  const changeInquiryType = (type) => {
    setInquiryType(type);
    setInquiryOptione(false);
    setArrow(!arrow);
  };

  let [textareaCount, settextareaCount] = useState(0);
  const onTextareaHandler = (e) => {
    settextareaCount(
      e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
    );
  };
  return (
    <div className="Container">
      <div className="inner">
        <div className="Qnaform">
          <div className="precautions">
            <span>1:1문의하기</span>
            <br />
            <br />
            <span>
              고객님의 소중한 의견을 빠르고 정확하게 해결하기 위해 최선을
              다하겠습니다.
            </span>
            <br />
            <span>
              문의에 대한 답변은 [고객센터&gt;&gt;&gt;1:1문의] 에서 확인할 수
              있습니다.
            </span>
            <br />
            <span>
              항공상담 업무시간 (한국시간 기준) 평일 09:00~17:00, 공휴일 /
              주말 문의는 평일 업무시간 내에 순차적으로 답변 진행됩니다 .{" "}
            </span>
            <br />
            <span>
              문의내용 및 첨부파일은 전자상거래법에 따라 3년간 보관 후 삭제하고
              있습니다.
            </span>
            <br />
            <span>
              고객님의 개인정보보호를 위하여 문의내용 및 첨부파일에 개인정보를
              포함하지 않도록 주의하시기 바랍니다.
            </span>
          </div>
          <div className="">
            <table>
              <tr>
                <td style={{ height: "100%" }}>
                  <span>문의유형</span>
                </td>
                <td>
                  <button onClick={toggleInquirytype}>
                    <span>{inquiryType}</span>
                    <i className={`icon-arrow ${arrow ? "down" : "up"}`} />
                  </button>
                  {inquiryOptione && (
                    <>
                      <div className="TypeChoces">
                        <div className="TypeChoce">
                          <button onClick={() => changeInquiryType("쇼핑")}>
                            <span>쇼핑</span>
                          </button>
                        </div>
                        <div className="TypeChoce">
                          <button onClick={() => changeInquiryType("예약")}>
                            <span>예약</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <span>작성자</span>
                </td>
                <td>
                  <span>에스파</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>예약코드</span>
                </td>
                <td>
                  <span>수퍼노바</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>제목</span>
                </td>
                <td>
                  <input placeholder="제목을입력해주세요"></input>
                </td>
              </tr>
              <tr>
                <td style={{ height: "400px" }}>
                  <span>문의내용</span>
                </td>
                <td>
                  <textarea
                    placeholder="최대2500자까지입력이가능합니다"
                    maxLength={"2500"}
                    onChange={onTextareaHandler}
                  ></textarea>
                  <span style={{ textAlign: "right" }}>{textareaCount}</span>
                  <span>/2500 </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>파일첨부</span>
                </td>
                <td>
                  <span>카리나</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Qna;
