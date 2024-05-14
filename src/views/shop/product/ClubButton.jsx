import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";
import { useState } from "react";

const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 0px;
  &:hover {
    background-color: #01387f;
    color: white;
  }
  &.active {
    background-color: #01387f;
    color: white;
  }
`;

function ClubButton({ parentClub }) {
  // 클릭된 버튼의 상태를 저장하기 위한 state
  const [activeButton, setActiveButton] = useState("전체");

  // 클릭 이벤트 핸들러
  const handleButtonClick = (buttonText) => {
    setActiveButton(buttonText);
    parentClub(buttonText);
    // console.log(buttonText)
  };

  return (
    <Container>
      <Grid item lg={12}>
        <div id="Brand">
          <div className="brandBox">
            <h2>골프클럽</h2>
          </div>
          <div className="brandButton">
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <StyledButton
                onClick={() => handleButtonClick("전체")}
                className={activeButton === "전체" ? "active" : ""}
              >
                전체
              </StyledButton>
              <StyledButton
                onClick={() => handleButtonClick("드라이버")}
                className={activeButton === "드라이버" ? "active" : ""}
              >
                드라이버
              </StyledButton>
              <StyledButton
                onClick={() => handleButtonClick("우드")}
                className={activeButton === "우드" ? "active" : ""}
              >
                우드
              </StyledButton>
              <StyledButton
                onClick={() => handleButtonClick("유틸리티")}
                className={activeButton === "유틸리티" ? "active" : ""}
              >
                유틸리티
              </StyledButton>
              <StyledButton
                onClick={() => handleButtonClick("아이언")}
                className={activeButton === "아이언" ? "active" : ""}
              >
                아이언
              </StyledButton>
              <StyledButton
                onClick={() => handleButtonClick("퍼터")}
                className={activeButton === "퍼터" ? "active" : ""}
              >
                퍼터
              </StyledButton>
            </ButtonGroup>
          </div>
        </div>
      </Grid>
    </Container>
  );
}

export default ClubButton;
