import { useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

function QNA() {
  const [inquiryOptione, setInquiryOptione] = useState(false);
  const [numberOption, setNumberOption] = useState(false);
  const [inquiryType, setInquiryType] = useState("상담유형");
  const [arrow, setArrow] = useState(true);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
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

  const isMaxImagesReached = previews.length >= 3;

  const generatePreviews = (imageFiles) => {
    const newPreviews = Array.from(imageFiles).map((imageFile) =>
      URL.createObjectURL(imageFile)
    );
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleImgDelete = (idx) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== idx));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== idx));
    URL.revokeObjectURL(previews[idx]);
  };
  const handleFileChange = async (e) => {
    const imageFiles = e.target.files;
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 110,
    };

    try {
      const compressedFiles = [];
      for (const file of imageFiles) {
        const compressedBlob = await imageCompression(file, options);
        const compressedFile = new File([compressedBlob], file.name, {
          type: file.type,
        });
        compressedFiles.push(compressedFile);
        console.log(compressedFile);
      }
      if (imageFiles.length === 0) return;
      const resolveAfter3Sec = new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      const newFiles = [...files, ...compressedFiles];
      setFiles(newFiles);
      setTimeout(() => {
        generatePreviews(compressedFiles);
      }, 600);
      // generatePreviews(imageFiles);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Qnaform">
      <div className="precautions">
        <span>1:1문의하기</span>
        <ul>
          <li>
            <span>
              고객님의 소중한 의견을 빠르고 정확하게 해결하기 위해 최선을
              다하겠습니다.
            </span>
          </li>
          <li>
            <span>
              문의에 대한 답변은
              <span
                style={{
                  fontSize: "13px",
                  color: "#02387f",
                }}
              >
                [고객센터&gt;&gt;&gt;1:1문의]
              </span>
              에서 확인할 수 있습니다.
            </span>
          </li>
          <li>
            <span>
              항공상담 업무시간 (한국시간 기준) 
              <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                평일 09:00~17:00,
              </span>
              <span style={{ color: "red" }}> 공휴일/주말 </span>문의는 평일
              업무시간 내에 순차적으로 답변 진행됩니다 .
            </span>
          </li>
          <li>
            <span>
              문의내용 및 첨부파일은 전자상거래법에 따라 3년간 보관 후 삭제하고
              있습니다.
            </span>
          </li>
          <li>
            <span
              style={{
                fontSize: "13px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              고객님의 개인정보보호를 위하여 문의내용 및 첨부파일에 개인정보를
              포함하지 않도록 주의하시기 바랍니다.
            </span>
          </li>
        </ul>
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
              <div className="NumberType">
                <button>
                  <span>예약번호선택</span>
                  <i />
                </button>
              </div>
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
            <td style={{ height: "100px" }}>
              <span>파일첨부</span>
            </td>
            <td>
              <div className="recordImg">
                {previews.length > 0 && (
                  <ul style={{ display: "flex" }}>
                    {previews.map((src, i) => (
                      <li key={i} className="deleteBtn">
                        <img src={src} alt={`Preview ${i}`} />
                        <i onClick={() => handleImgDelete(i)} />
                      </li>
                    ))}
                  </ul>
                )}
                {!isMaxImagesReached && (
                  <div
                    className="addIcon"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <input
                      id="fileInput"
                      type="file"
                      name="image"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <i />
                  </div>
                )}
              </div>
            </td>
          </tr>
        </table>
        <div className="RecordBtn">
          <button>취소</button>
          <button>등록</button>
        </div>
      </div>
    </div>
  );
}
export default QNA;
