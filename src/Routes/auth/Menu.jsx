
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

function Menu() {
    return (
        <>
            <Typography variant="h6" fontWeight="bold" className="title">
                마이페이지
            </Typography>
            <hr />
            <Typography variant="h7" fontWeight="bold" className="spantext">
                주문관리
            </Typography>
            <NavLink to="/member/mypage/info">- 주문내역</NavLink>
            <NavLink to="/member/mypage/review">- 나의 상품평</NavLink>
            <NavLink to="/member/mypage/cart">- 장바구니</NavLink>
            <hr />
            <Typography variant="h7" fontWeight="bold" className="spantext">
                예약관리
            </Typography>
            <NavLink to="/member/mypage/reserve">- 예약내역</NavLink>
            <NavLink to="/member/mypage/cancel">- 취소내역</NavLink>
            <hr />
            <Typography variant="h7" fontWeight="bold" className="spantext">
                회원관리
            </Typography>
            <NavLink to="/member/mypage/login/modify">- 개인정보 수정</NavLink>
            <NavLink to="/member/mypage/login/remove">- 회원탈퇴</NavLink>
        </>
    )
}

export default Menu;