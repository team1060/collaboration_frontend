// PaymentSuccess.jsx

import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
const kakaoPayResponse = localStorage.getItem("kakaoPayResponse")
const paymentData = localStorage.getItem("paymentInfo")
const shippingData = localStorage.getItem("shippingInfo")
const productData = localStorage.getItem("productInfo")

const PaymentSuccess = () => {
    const [user, setUser] = useState('');
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [tid, setTid] = useState('');
    const location = useLocation();
    const { search } = location;

    // 로그인한 유저 
    useEffect(() => {
        if (ACCESS_TOKEN) {
            const token = jwtDecode(ACCESS_TOKEN);
            const userEmail = token.email;
            setUser(userEmail);
        }

    }, [user]);

    // tid
    useEffect(() => {
        const responseTid = JSON.parse(kakaoPayResponse).tid;
        setTid(responseTid);
    }, [kakaoPayResponse])

    // pg_token
    useEffect(() => {
        const params = new URLSearchParams(search);
        const pgToken = params.get('pg_token');

        console.log('Payment success! pg_token:', pgToken);
        const YOUR_SERVICE_APP_ADMIN_KEY = 'ff6bb12c12dceb7251e95224fc91846c';
        // 결제 승인 API 호출
        const approvePayment = async () => {
            try {
                const response = await fetch('https://kapi.kakao.com/v1/payment/approve', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `KakaoAK ${YOUR_SERVICE_APP_ADMIN_KEY}`,
                    },
                    body: new URLSearchParams({
                        cid: 'TC0ONETIME', // Your merchant ID
                        partner_order_id: 132709, // Set your own order ID
                        partner_user_id: user, // Set your own user ID
                        tid: tid, // PaymentSuccess 페이지로 넘어온 pg_token을 사용하여 결제 준비 시 발급받은 tid
                        pg_token: pgToken,
                    }).toString(),
                });
                const data = await response.json();
                setPaymentResponse(data);

                // 여기에서 결제 완료에 대한 UI 처리 또는 다른 필요한 작업 수행
                console.log('Payment response:', data);
            } catch (error) {
                console.error('Error approving payment:', error);
                // 에러에 대한 UI 처리 또는 다른 필요한 작업 수행
            }


        };
        if (tid) {
            approvePayment();

        }
    }, [search, user, tid, kakaoPayResponse]);

    return (
        <div>
            <h2>Payment Success</h2>
            {/* 여기에 결제 성공 정보를 표시할 UI 추가 */}
        </div>
    );
};

export default PaymentSuccess;
