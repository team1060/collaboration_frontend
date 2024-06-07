import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { apiRequest } from "src/core/util/http/request";
import { API_URL } from "src/core/util/http/urls";

function QNA() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("상담유형");
  const [selectedDetail, setSelectedDetail] = useState("");
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [title, setTilte] = useState("");
  const [content, setContent] = useState("");
  const [detailOptions, setDetailOptions] = useState([]);
  const [qna, setQna] = useState([]);
  let [textareaCount, settextareaCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState(["상담유형"]);

  const handleDropdown = () => setIsOpen(!isOpen);

  const handleSelectType = (type) => {
    setSelectedType(type);
    const selectedCategory = categories.find((cat) => cat.name === type);
    const childCategories = categories.filter(
      (cat) => cat.parentCategory === selectedCategory?.categoryNo
    );
    setDetailOptions(childCategories.map((cat) => cat.name));
    setIsOpen(false);
    setSelectedDetail("");
    setIsDetailOpen(false);
  };
  const handleDetailDropdown = () => {
    console.log("handleDetailDropdown");
    setIsDetailOpen(() => !isDetailOpen);
    console.log(isDetailOpen);
  };
  useEffect(() => {
    const qna = async () => {
      try {
        const response = await apiRequest.get(API_URL.CATEGORY_LIST_GET);
        if (response.data) {
          setCategories(response.data);
          const filteredCategories = response.data.filter(
            (cat) => cat.name === "골프" || cat.name === "쇼핑"
          );
          console.log(response.data);
          setSubOptions((prevOptions) => [
            ...prevOptions,
            ...filteredCategories.map((cat) => cat.name),
          ]);
        }
      } catch (error) {}
    };

    qna();
  }, []);

  const handleDetailOptionSelect = (detailOption) => {
    setSelectedDetail(detailOption);
    setIsDetailOpen(!isDetailOpen);
  };

  const onTextareaHandler = (e) => {
    const newText = e.target.value;
    setContent(newText);
    settextareaCount(
      newText.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
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
      }
      if (imageFiles.length === 0) return;

      const newFiles = [...files, ...compressedFiles];
      setFiles(newFiles);
      setTimeout(() => {
        generatePreviews(compressedFiles);
      }, 600);
    } catch (error) {
      console.log(error);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categoryNo", 3);
    formData.append("memberNo", 35);
    formData.append("keyword", selectedDetail);
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const response = await apiRequest.postFormData(
        API_URL.BOARD_QNA_INSERT,
        formData
      );
      console.log("Response:", response.data);

      console.log("백엔드 응답:", response);
      alert("문의가 등록되었습니다.");
      setTilte("");
      setContent("");
      setPreviews([]);
      setFiles([]);
      settextareaCount(0);
      setSelectedDetail("");
    } catch (error) {
      console.error("문의 등록에 실패했습니다.", error);
      alert("문의 등록에 실패했습니다.");
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
              <span style={{ fontSize: "13px", color: "#02387f" }}>
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
          <tbody>
            <tr>
              <td style={{ height: "100%" }}>
                <span>문의유형</span>
              </td>
              <td
                style={{
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div className="BigOption" onClick={handleDropdown}>
                    {selectedType}
                    <div className={`OptionList ${isOpen ? "show" : ""}`}>
                      {subOptions.map((option, index) => (
                        <ul
                          key={index}
                          onClick={() => handleSelectType(option)}
                          className="OpationItem"
                        >
                          <li>{option}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
                  {selectedType !== "상담유형" && (
                    <div
                      className="DetailsOption"
                      onClick={handleDetailDropdown}
                    >
                      {isDetailOpen ? (
                        <div>{selectedDetail}</div>
                      ) : (
                        <div
                          className={`OptionList ${isDetailOpen ? "show" : ""}`}
                        >
                          {detailOptions.map((option, index) => (
                            <ul
                              key={index}
                              onClick={() => handleDetailOptionSelect(option)}
                              className="OpationItem"
                            >
                              <li>
                                <span>{option}</span>
                              </li>
                            </ul>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
                <input
                  placeholder="제목을입력해주세요"
                  name="title"
                  value={title}
                  onChange={(e) => setTilte(e.target.value)}
                ></input>
              </td>
            </tr>
            <tr>
              <td style={{ height: "400px" }}>
                <span>문의내용</span>
              </td>
              <td>
                <textarea
                  maxLength={"2500"}
                  onChange={onTextareaHandler}
                  name="content"
                  value={content}
                ></textarea>
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
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      <input
                        id="fileInput"
                        type="file"
                        name="files"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      <i />
                    </div>
                  )}
                </div>
                <p style={{ marginTop: "10px" }}>
                  개당 3MB 미만의{" "}
                  <span style={{ color: "black" }}>
                    BMP, GIF, JPG, FPEG, PNG, TIF{" "}
                  </span>
                  파일만 등록 가능합니다.
                </p>
                <p>
                  상품과 무관한 내용이거나 음란 및 불법적인 내용은 통보 없이
                  상제될 수 있습니다.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="RecordBtn">
          <button>취소</button>
          <button onClick={postSubmit}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default QNA;
