import { Link } from "react-router-dom";

function QNADetailContent() {
  return (
    <div className="QNADetailForm">
      <span>참여내역</span>
      <table>
        <tr>
          <td>제목</td>
          <td>아이브</td>
        </tr>
        <tr>
          <td>작성자/문의자</td>
          <td>갈연수</td>
          <td className="duble">작성일</td>
          <td>2024.05.22</td>
        </tr>
        <tr>
          <td>진행상태</td>
          <td>접수 or 답변완료</td>
          <td className="duble">전화번호</td>
          <td>dd</td>
        </tr>
        <tr>
          <td>이메일</td>
          <td>dd</td>
          <td className="duble">답변상태</td>
          <td style={{ color: "#ff9b9c" }}>접수 or 답변완료</td>
        </tr>
        <tr>
          <td>질문유형</td>
          <td>dd</td>
        </tr>
        <tr>
          <td>예약코드</td>
          <td>dd</td>
        </tr>
        <tr>
          <td>문의내역</td>
          <td colSpan={"3"}>
            Yeah Dear priest, 고백할 게 있어 피 한 방울과 tears, 그저 연극일 뿐
            이건 은밀한 독백, 아름답지만 born bad 예측하지 마, no way, you just
            talk too much Oh, 아름답지만 섬찟할 거야 첫인상은 강한 게 좋지 Oh,
            다정하지만 얼음장 같아 Gonna make you crazy Ooh, 평온했던 심장이
            나를 볼 때, yeah, I like that, 멎을지 몰라 Now, I'm changing, can't
            you see? (Five, six, seven, eight) Watch me, don't touch me Love me,
            don't hurt me Watch me, don't touch me 주문 걸어, accendio Watch me,
            don't touch me Love me, don't hurt me Watch me, don't touch me 주문
            걸어, accendio Ah-ah, ah-ah-ah, ah-ah, ah-ah-ah Ah-ah, ah-ah-ah,
            손끝으로, accendio Ah-ah, ah-ah-ah, ah-ah, ah-ah-ah Ah-ah, ah-ah-ah,
            손끝으로, accendio Oh, 절벽에서 turn 처음 보는 색채로 물든 동공 그
            감정은 pure, 그 눈빛은 love 쉽지는 않을 거야, out of control 향기
            가득 채워 둔 미로, 연기 속으로 널 밀어 여섯 방울, magic syrup and we
            pop into the mirror 온몸에 붙어있는 pearl, 두 손가락으로 swirl
            보여줘 달콤한 curse, let them B-U-R-N, yeah Ooh, 평온했던 심장이
            나를 볼 때, yeah, I like that, 멎을지 몰라 Now I'm changing, can't
            you see? (Five, six, seven, eight) Watch me, don't touch me Lovе me,
            don't hurt me Watch me, don't touch mе 주문 걸어, accendio Watch me,
            don't touch me Love me, don't hurt me Watch me, don't touch me 주문
            걸어, accendio Ah-ah, ah-ah-ah, ah-ah, ah-ah-ah Ah-ah, ah-ah-ah,
            손끝으로, accendio Ah-ah, ah-ah-ah, ah-ah, ah-ah-ah Ah-ah, ah-ah-ah,
            손끝으로, accendio Watch me, don't touch me Love me, don't hurt me
            Watch me, don't touch me 주문 걸어, accendio Watch me, don't touch
            me Love me, don't hurt me Watch me, don't touch me 주문 걸어,
            accendio Ah-ah, ah-ah-ah, ah-ah, ah-ah-ah Ah-ah, ah-ah-ah, 손끝으로,
            accendio Ah-ah, ah-ah-ah, ah-ah, ah-ah-ah Ah-ah, ah-ah-ah, 손끝으로,
            accendio
          </td>
        </tr>
        <tr>
          <td>답변내용</td>
          <td colSpan={"3"}>아이브최고</td>
        </tr>
      </table>
      <div className="Check">
        <Link to="/customerService/QNAList">
          <span>확인</span>
        </Link>
      </div>
    </div>
  );
}
export default QNADetailContent;
