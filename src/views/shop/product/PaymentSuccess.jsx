// PaymentSuccess.jsx

import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMaxPaymentNo, getMaxShippingNo, postPayment, postPaymentOptions, postShipping } from '../../../core/util/http/shop/apiPayment';

const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
const kakaoPayResponse = localStorage.getItem("kakaoPayResponse")

const PaymentSuccess = () => {
    const [user, setUser] = useState('');
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [tid, setTid] = useState('');
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const { search } = location;

    let paymentData, shippingData, productData;

    // paymentData 파싱
    const paymentInfoString = localStorage.getItem("paymentInfo");
    if (paymentInfoString) {
        try {
            paymentData = JSON.parse(paymentInfoString);
            console.log(paymentData);
        } catch (error) {
            console.error('Error parsing paymentInfo:', error);
            // 파싱 오류에 대한 처리를 추가할 수 있습니다.
        }
    }

    // shippingData 파싱
    const shippingInfoString = localStorage.getItem("shippingInfo");
    if (shippingInfoString) {
        try {
            shippingData = JSON.parse(shippingInfoString);
            console.log(shippingData);
        } catch (error) {
            console.error('Error parsing shippingInfo:', error);
            // 파싱 오류에 대한 처리를 추가할 수 있습니다.
        }
    }

    // productData 파싱
    const productInfoString = localStorage.getItem("productInfo");
    if (productInfoString) {
        try {
            productData = JSON.parse(productInfoString);
            console.log(productData);
        } catch (error) {
            console.error('Error parsing productInfo:', error);
            // 파싱 오류에 대한 처리를 추가할 수 있습니다.
        }
    }

    useEffect(() => {
        // 로그인한 유저 확인
        if (ACCESS_TOKEN) {
            const token = jwtDecode(ACCESS_TOKEN);
            const userEmail = token.email;
            setUser(userEmail);
        }

        // tid 설정
        const responseTid = JSON.parse(kakaoPayResponse).tid;
        setTid(responseTid);
    }, [kakaoPayResponse, ACCESS_TOKEN]);

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
    }, [search, user, tid]);

    const handlePaymentSuccess = async () => {

        try {
            const shippingResponse = await postShipping(shippingData);
            console.log('Shipping response:', shippingResponse);
            // 서버 응답에 따른 로직 추가

        } catch (error) {
            console.error('Error sending shipping:', error);
            // 에러 처리 로직 추가
        }
        let shippingNo;
        try {
            shippingNo = await getMaxShippingNo();
            console.log("shipping_no : " + shippingNo)
        } catch (error) {
            console.error('Error get max-shipping-no:', error);

        }

        const payment = {
            product_no: paymentData.product_no,
            email: paymentData.email,
            shipping_no: shippingNo,
            status: paymentData.status,
            payment_date: paymentResponse?.approved_at,
            payment_method: paymentResponse?.payment_method_type,
            amount: paymentResponse?.amount?.total,
            delivery_message: paymentData.delivery_message,
            installment: paymentResponse?.card_info !== undefined ? paymentData?.card_info?.install_month : null,
            card: paymentResponse?.card_info !== undefined ? paymentData?.card_info?.kakaopay_purchase_corp : null
        };

        try {
            console.log(payment);
            const paymentResponse = await postPayment(payment);
            console.log('Payment response:', paymentResponse);
            // 서버 응답에 따른 로직 추가
        } catch (error) {
            console.error('Error sending payment:', error);
            // 에러 처리 로직 추가
        }


        let paymentNo;
        try {
            paymentNo = await getMaxPaymentNo();
            console.log("payment_no : " + paymentNo)
        } catch (error) {
            console.error('Error get max-payment-no:', error);
        }
        const options = productData.map((item) => {
            return {
                p_buy_no: paymentNo,
                option_no: item.optionNo,
                count: item.count,
                price: item.price

                // 추가 필요한 필드가 있다면 여기에 추가
            };
        });

        try {
            console.log(options);
            const optionsResponse = await postPaymentOptions(options);
            console.log('Options response:', optionsResponse);
            // 서버 응답에 따른 로직 추가
        } catch (error) {
            console.error('Error sending options:', error);
            // 에러 처리 로직 추가
        } finally {
            localStorage.removeItem("shippingInfo");
            localStorage.removeItem("productInfo");
            localStorage.removeItem("kakaoPayResponse");
            localStorage.removeItem("paymentInfo");
            window.location.href = '/member/mypage/info';
        }
    }

    useEffect(() => {
        console.log(paymentResponse);
        if (paymentResponse !== null && paymentResponse.code === undefined && paymentResponse.code !== -702) {
            handlePaymentSuccess();
        } else {
            console.log('실행 실패');
        }

    }, [paymentResponse]);
    return (
        <></>
    );
};

export default PaymentSuccess;
